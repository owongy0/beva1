'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import {
  Locale,
  ChatMessage,
  QuickReplyOption,
  ConversationState,
  getWelcomeMessage,
  getBodyAreaOptions,
  getGenderOptions,
  getSymptomOptions,
  getDurationOptions,
  getSeverityOptions,
  matchConditions,
  bodyAreas,
  femalePelvicSymptoms,
  malePelvicSymptoms,
} from '@/lib/chatbot-data';

interface UseChatbotProps {
  lang: Locale;
  categoryNames: Record<string, Record<Locale, string>>;
}

interface UseChatbotReturn {
  isOpen: boolean;
  messages: ChatMessage[];
  conversationState: ConversationState;
  isTyping: boolean;
  toggleChat: () => void;
  closeChat: () => void;
  handleOptionClick: (option: QuickReplyOption) => void;
  startNewConversation: () => void;
}

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Static options - computed once per language
const getInitialOptions = (lang: Locale) => getBodyAreaOptions(lang);

export function useChatbot({ lang, categoryNames }: UseChatbotProps): UseChatbotReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationState, setConversationState] = useState<ConversationState>({
    step: 'welcome',
    selectedSymptoms: [],
    followUpAnswers: {},
    matchedConditions: [],
  });
  const [isTyping, setIsTyping] = useState(false);
  
  // Use ref for typing timeout to avoid re-renders
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: generateId(),
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const showTyping = useCallback(async (delay: number = 800) => {
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    setIsTyping(true);
    
    return new Promise<void>((resolve) => {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        resolve();
      }, delay);
    });
  }, []);

  // Define showResults early since it's used by handleSeveritySelect
  const showResults = useCallback(async (symptomIds: string[]) => {
    const matched = matchConditions(
      symptomIds, 
      lang, 
      categoryNames, 
      conversationState.selectedGender
    );
    
    setConversationState(prev => ({
      ...prev,
      matchedConditions: matched,
      step: 'results',
    }));

    if (matched.length === 0) {
      const noMatchMessage = lang === 'zh-TW'
        ? '根據您提供的資訊，我們無法確定具體的治療建議。建議您預約諮詢，讓我們的專科醫生為您進行詳細評估。'
        : 'Based on the information provided, we cannot determine specific treatment recommendations. We suggest booking a consultation for a detailed evaluation by our specialists.';

      addMessage({
        role: 'bot',
        content: noMatchMessage,
        type: 'text',
      });
    } else {
      const resultsMessage = lang === 'zh-TW'
        ? `根據您的症狀，以下治療項目可能適合您的情況：`
        : `Based on your symptoms, the following treatments may be suitable for your condition:`;

      addMessage({
        role: 'bot',
        content: resultsMessage,
        type: 'results',
        results: matched,
      });

      await showTyping(500);

      const nextStepMessage = lang === 'zh-TW'
        ? '您可以點擊上方「了解更多」查看治療詳情，或點擊「預約諮詢」與我們的專科醫生聯繫。'
        : 'You can click "Learn More" above to view treatment details, or "Book Consultation" to connect with our specialists.';

      addMessage({
        role: 'bot',
        content: nextStepMessage,
        type: 'text',
      });
    }
  }, [lang, categoryNames, conversationState.selectedGender, addMessage, showTyping]);

  const startNewConversation = useCallback(async () => {
    setMessages([]);
    setConversationState({
      step: 'welcome',
      selectedSymptoms: [],
      followUpAnswers: {},
      matchedConditions: [],
    });

    await showTyping(500);
    
    // Welcome message
    addMessage({
      role: 'bot',
      content: getWelcomeMessage(lang),
      type: 'text',
    });

    await showTyping(600);

    // Ask for body area
    const bodyAreaQuestion = lang === 'zh-TW' 
      ? '請問您哪個身體部位有不適？'
      : 'Which body area are you experiencing issues with?';
    
    addMessage({
      role: 'bot',
      content: bodyAreaQuestion,
      type: 'quick_replies',
      options: getInitialOptions(lang),
      step: 'body_area',
    });

    setConversationState(prev => ({ ...prev, step: 'body_area' }));
  }, [lang, addMessage, showTyping]);

  // Initialize conversation when opened - only once
  useEffect(() => {
    if (isOpen && !isInitializedRef.current && messages.length === 0) {
      isInitializedRef.current = true;
      // Defer to avoid synchronous setState in effect
      Promise.resolve().then(() => {
        startNewConversation();
      });
    }
  }, [isOpen, messages.length, startNewConversation]);

  // Load from localStorage - only on mount
  useEffect(() => {
    const saved = localStorage.getItem('chatbot_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.messages?.length > 0) {
          setMessages(parsed.messages);
          setConversationState(parsed.conversationState);
        }
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save to localStorage - debounced
  useEffect(() => {
    if (messages.length > 0) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem('chatbot_state', JSON.stringify({
          messages,
          conversationState,
        }));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, conversationState]);

  const handleBodyAreaSelect = useCallback(async (bodyAreaId: string) => {
    // Special handling for pelvic - need gender first
    if (bodyAreaId === 'pelvic') {
      setConversationState(prev => ({
        ...prev,
        step: 'gender_select',
        selectedBodyArea: bodyAreaId,
      }));

      await showTyping(500);

      const genderQuestion = lang === 'zh-TW'
        ? '請問您的生理性別？這有助於我們為您推薦最適合的治療方案。'
        : 'What is your biological sex? This helps us recommend the most suitable treatments for you.';

      addMessage({
        role: 'bot',
        content: genderQuestion,
        type: 'quick_replies',
        options: getGenderOptions(lang),
        step: 'gender_select',
      });
      return;
    }

    // Special handling for hemorrhoids - go straight to symptoms
    if (bodyAreaId === 'hemorrhoids') {
      setConversationState(prev => ({
        ...prev,
        step: 'symptoms',
        selectedBodyArea: bodyAreaId,
      }));

      await showTyping(500);

      const symptomQuestion = lang === 'zh-TW'
        ? `請問您有什麼痔瘡症狀？（可多選，完成後點擊「繼續」）`
        : `What hemorrhoid symptoms are you experiencing? (Select all that apply, then click "Continue")`;

      const symptoms = getSymptomOptions(lang, bodyAreaId);
      
      // Add continue option
      const continueOption: QuickReplyOption = {
        id: 'continue',
        label: lang === 'zh-TW' ? '繼續 →' : 'Continue →',
        value: 'continue',
        action: 'select_symptom',
      };

      addMessage({
        role: 'bot',
        content: symptomQuestion,
        type: 'quick_replies',
        options: [...symptoms, continueOption],
        step: 'symptoms',
      });
      return;
    }

    const area = bodyAreas.find(a => a.id === bodyAreaId);
    if (!area) return;

    setConversationState(prev => ({
      ...prev,
      step: 'symptoms',
      selectedBodyArea: bodyAreaId,
    }));

    await showTyping(500);

    const symptomQuestion = lang === 'zh-TW'
      ? `請問您有什麼症狀？（可多選，完成後點擊「繼續」）`
      : `What symptoms are you experiencing? (Select all that apply, then click "Continue")`;

    const symptoms = getSymptomOptions(lang, bodyAreaId);
    
    // Add continue option
    const continueOption: QuickReplyOption = {
      id: 'continue',
      label: lang === 'zh-TW' ? '繼續 →' : 'Continue →',
      value: 'continue',
      action: 'select_symptom',
    };

    addMessage({
      role: 'bot',
      content: symptomQuestion,
      type: 'quick_replies',
      options: [...symptoms, continueOption],
      step: 'symptoms',
    });
  }, [lang, addMessage, showTyping]);

  const handleGenderSelect = useCallback(async (gender: 'male' | 'female') => {
    setConversationState(prev => ({
      ...prev,
      step: 'symptoms',
      selectedGender: gender,
    }));

    await showTyping(500);

    const symptomQuestion = gender === 'female' 
      ? (lang === 'zh-TW' ? '請問您有什麼婦科症狀？（可多選，完成後點擊「繼續」）' : 'What gynecological symptoms are you experiencing? (Select all that apply, then click "Continue")')
      : (lang === 'zh-TW' ? '請問您有什麼泌尿生殖症狀？（可多選，完成後點擊「繼續」）' : 'What urological symptoms are you experiencing? (Select all that apply, then click "Continue")');

    const symptoms = getSymptomOptions(lang, 'pelvic', gender);
    
    // Add continue option
    const continueOption: QuickReplyOption = {
      id: 'continue',
      label: lang === 'zh-TW' ? '繼續 →' : 'Continue →',
      value: 'continue',
      action: 'select_symptom',
    };

    addMessage({
      role: 'bot',
      content: symptomQuestion,
      type: 'quick_replies',
      options: [...symptoms, continueOption],
      step: 'symptoms',
    });
  }, [lang, addMessage, showTyping]);

  const handleSymptomSelect = useCallback(async (symptomId: string) => {
    setConversationState(prev => {
      const alreadySelected = prev.selectedSymptoms.includes(symptomId);
      const newSymptoms = alreadySelected
        ? prev.selectedSymptoms.filter(s => s !== symptomId)
        : [...prev.selectedSymptoms, symptomId];
      
      return { ...prev, selectedSymptoms: newSymptoms };
    });
  }, []);

  const handleContinueToDuration = useCallback(async () => {
    const { selectedSymptoms } = conversationState;
    
    // Check if any symptoms selected
    if (selectedSymptoms.length === 0) {
      await showTyping(400);
      const selectOneMessage = lang === 'zh-TW'
        ? '請至少選擇一個症狀以繼續。'
        : 'Please select at least one symptom to continue.';
      
      addMessage({
        role: 'bot',
        content: selectOneMessage,
        type: 'text',
      });
      return;
    }

    setConversationState(prev => ({ ...prev, step: 'duration' }));

    await showTyping(500);

    const durationQuestion = lang === 'zh-TW'
      ? '這些症狀持續了多久？'
      : 'How long have you been experiencing these symptoms?';

    addMessage({
      role: 'bot',
      content: durationQuestion,
      type: 'quick_replies',
      options: getDurationOptions(lang),
    });
  }, [conversationState, lang, addMessage, showTyping]);

  const handleDurationSelect = useCallback(async (duration: string) => {
    setConversationState(prev => ({ ...prev, step: 'severity', duration }));

    await showTyping(500);

    const severityQuestion = lang === 'zh-TW'
      ? '症狀的嚴重程度如何？'
      : 'How would you rate the severity of your symptoms?';

    addMessage({
      role: 'bot',
      content: severityQuestion,
      type: 'quick_replies',
      options: getSeverityOptions(lang),
    });
  }, [lang, addMessage, showTyping]);

  const handleSeveritySelect = useCallback(async (severity: string) => {
    setConversationState(prev => ({ ...prev, step: 'results', severity }));

    await showTyping(600);
    showResults(conversationState.selectedSymptoms);
  }, [conversationState.selectedSymptoms, showTyping, showResults]);

  const handleOptionClick = useCallback((option: QuickReplyOption) => {
    // Handle based on action type
    switch (option.action) {
      case 'select_body_area':
        // Add user message for body area selection
        addMessage({
          role: 'user',
          content: option.label,
          type: 'text',
        });
        
        // Check if this is gender selection
        if (option.value === 'male' || option.value === 'female') {
          handleGenderSelect(option.value as 'male' | 'female');
        } else {
          handleBodyAreaSelect(option.value);
        }
        break;
      case 'select_symptom':
        if (option.value === 'continue') {
          // Add user message showing selected symptoms
          const selectedLabels = conversationState.selectedSymptoms.map(symptomId => {
            // Check pelvic symptoms based on gender
            if (conversationState.selectedBodyArea === 'pelvic' && conversationState.selectedGender) {
              const symptoms = conversationState.selectedGender === 'female' 
                ? femalePelvicSymptoms 
                : malePelvicSymptoms;
              const symptom = symptoms.find((s) => s.id === symptomId);
              if (symptom) return symptom.label[lang];
            }
            
            for (const area of bodyAreas) {
              const symptom = area.symptoms.find(s => s.id === symptomId);
              if (symptom) return symptom.label[lang];
            }
            return symptomId;
          }).join(', ');
          
          addMessage({
            role: 'user',
            content: selectedLabels || (lang === 'zh-TW' ? '繼續' : 'Continue'),
            type: 'text',
          });
          handleContinueToDuration();
        } else {
          // Toggle symptom selection without adding message
          handleSymptomSelect(option.value);
        }
        break;
      case 'select_duration':
        addMessage({
          role: 'user',
          content: option.label,
          type: 'text',
        });
        handleDurationSelect(option.value);
        break;
      case 'select_severity':
        addMessage({
          role: 'user',
          content: option.label,
          type: 'text',
        });
        handleSeveritySelect(option.value);
        break;
      case 'view_condition':
        // This will be handled by the parent component
        break;
      case 'book_appointment':
        // Scroll to contact section and close chat
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        closeChat();
        break;
      case 'start_over':
        startNewConversation();
        break;
      case 'close':
        closeChat();
        break;
    }
  }, [addMessage, handleBodyAreaSelect, handleGenderSelect, handleSymptomSelect, handleContinueToDuration, handleDurationSelect, handleSeveritySelect, startNewConversation, closeChat, lang, conversationState]);

  return useMemo(() => ({
    isOpen,
    messages,
    conversationState,
    isTyping,
    toggleChat,
    closeChat,
    handleOptionClick,
    startNewConversation,
  }), [isOpen, messages, conversationState, isTyping, toggleChat, closeChat, handleOptionClick, startNewConversation]);
}
