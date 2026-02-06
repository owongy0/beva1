'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  Locale,
  ChatMessage,
  QuickReplyOption,
  ConversationState,
  getWelcomeMessage,
  getBodyAreaOptions,
  getSymptomOptions,
  getDurationOptions,
  getSeverityOptions,
  checkEmergency,
  matchConditions,
  getDisclaimer,
  bodyAreas,
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

export function useChatbot({ lang, categoryNames }: UseChatbotProps): UseChatbotReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationState, setConversationState] = useState<ConversationState>({
    step: 'welcome',
    selectedSymptoms: [],
    matchedConditions: [],
    isEmergency: false,
  });
  const [isTyping, setIsTyping] = useState(false);

  // Initialize conversation when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startNewConversation();
    }
  }, [isOpen]);

  // Load from localStorage
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

  // Save to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbot_state', JSON.stringify({
        messages,
        conversationState,
      }));
    }
  }, [messages, conversationState]);

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
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    setIsTyping(false);
  }, []);

  const startNewConversation = useCallback(async () => {
    setMessages([]);
    setConversationState({
      step: 'welcome',
      selectedSymptoms: [],
      matchedConditions: [],
      isEmergency: false,
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
      options: getBodyAreaOptions(lang),
    });

    setConversationState(prev => ({ ...prev, step: 'body_area' }));
  }, [lang, addMessage, showTyping]);

  const handleBodyAreaSelect = useCallback(async (bodyAreaId: string) => {
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
    
    // Check for emergency
    const emergency = checkEmergency(selectedSymptoms, lang);
    if (emergency.isEmergency) {
      setConversationState(prev => ({
        ...prev,
        step: 'emergency',
        isEmergency: true,
        emergencyMessage: emergency.message,
      }));

      await showTyping(300);

      addMessage({
        role: 'bot',
        content: emergency.message || '',
        type: 'emergency',
      });

      await showTyping(500);

      const emergencyDisclaimer = lang === 'zh-TW'
        ? '請立即致電緊急服務熱線（香港：999）或前往最近的急症室。您的症狀可能需要立即醫療關注。'
        : 'Please call emergency services immediately (Hong Kong: 999) or go to the nearest emergency room. Your symptoms may require immediate medical attention.';

      addMessage({
        role: 'bot',
        content: emergencyDisclaimer,
        type: 'text',
      });

      // Still show results for non-emergency conditions if any
      if (selectedSymptoms.length > 0) {
        await showTyping(600);
        showResults(selectedSymptoms);
      }
      return;
    }

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
  }, [conversationState.selectedSymptoms, showTyping]);

  const showResults = useCallback(async (symptomIds: string[]) => {
    const matched = matchConditions(symptomIds, lang, categoryNames);
    
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

    await showTyping(400);

    // Add disclaimer
    addMessage({
      role: 'bot',
      content: getDisclaimer(lang),
      type: 'text',
    });
  }, [lang, categoryNames, addMessage, showTyping]);

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
        handleBodyAreaSelect(option.value);
        break;
      case 'select_symptom':
        if (option.value === 'continue') {
          // Add user message showing selected symptoms
          const selectedLabels = conversationState.selectedSymptoms.map(symptomId => {
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
  }, [addMessage, handleBodyAreaSelect, handleSymptomSelect, handleContinueToDuration, handleDurationSelect, handleSeveritySelect, startNewConversation, closeChat]);

  return {
    isOpen,
    messages,
    conversationState,
    isTyping,
    toggleChat,
    closeChat,
    handleOptionClick,
    startNewConversation,
  };
}
