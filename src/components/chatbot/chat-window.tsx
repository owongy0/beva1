'use client';

import { useRef, useEffect } from 'react';
import { X, RotateCcw, MessageCircle, Phone } from 'lucide-react';
import { Locale, ChatMessage, QuickReplyOption } from '@/lib/chatbot-data';
import { useChatbot } from '@/hooks/use-chatbot';
import { MessageBubble } from './message-bubble';
import { QuickReplies } from './quick-replies';
import { TypingIndicator } from './typing-indicator';
import { ConditionResultCard } from './condition-result';

interface ChatWindowProps {
  lang: Locale;
  categoryNames: Record<string, Record<Locale, string>>;
  onViewTreatment: (categoryId: string, conditionId: string) => void;
  onClose: () => void;
}

export function ChatWindow({ lang, categoryNames, onViewTreatment, onClose }: ChatWindowProps) {
  const {
    messages,
    conversationState,
    isTyping,
    handleOptionClick,
    startNewConversation,
  } = useChatbot({ lang, categoryNames });

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleBookAppointment = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };

  // Get selected values for the current step
  const getSelectedValues = () => {
    if (conversationState.step === 'symptoms') {
      return conversationState.selectedSymptoms;
    }
    return [];
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#00477f] text-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">
              {lang === 'zh-TW' ? 'BEVA 助手' : 'BEVA Assistant'}
            </h3>
            <p className="text-xs text-white/70">
              {lang === 'zh-TW' ? '在線' : 'Online'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={startNewConversation}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            title={lang === 'zh-TW' ? '重新開始' : 'Start over'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            title={lang === 'zh-TW' ? '關閉' : 'Close'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message, index) => (
          <div key={message.id} className="space-y-2">
            <MessageBubble 
              message={message} 
              isSelected={message.role === 'user' && index === messages.length - 1}
            />
            
            {/* Render quick replies for bot messages */}
            {message.role === 'bot' && message.type === 'quick_replies' && message.options && (
              <div className="ml-11">
                {message.step === 'symptoms' ? (
                  // Symptom selection with continue button below
                  <QuickReplies
                    options={message.options}
                    selectedValues={getSelectedValues()}
                    onOptionClick={handleOptionClick}
                    showContinue={true}
                    continueLabel={lang === 'zh-TW' ? '繼續 →' : 'Continue →'}
                    onContinue={() => {
                      const continueOption = message.options?.find(opt => opt.id === 'continue');
                      if (continueOption) {
                        handleOptionClick(continueOption);
                      }
                    }}
                    lang={lang}
                  />
                ) : (
                  // Other steps - normal quick replies
                  <QuickReplies
                    options={message.options}
                    selectedValues={[]}
                    onOptionClick={handleOptionClick}
                    lang={lang}
                  />
                )}
              </div>
            )}

            {/* Render results */}
            {message.role === 'bot' && message.type === 'results' && message.results && (
              <div className="ml-11 space-y-3 mt-2">
                {message.results.map((result) => (
                  <ConditionResultCard
                    key={result.conditionId}
                    result={result}
                    lang={lang}
                    onViewTreatment={onViewTreatment}
                    onBookAppointment={handleBookAppointment}
                  />
                ))}
                
                {/* Action buttons after results */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={startNewConversation}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    {lang === 'zh-TW' ? '重新評估' : 'Reassess'}
                  </button>
                  <button
                    onClick={handleBookAppointment}
                    className="flex-1 px-4 py-2 bg-[#00477f] text-white rounded-lg text-sm font-medium hover:bg-[#003d70] transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    {lang === 'zh-TW' ? '預約諮詢' : 'Book Consultation'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00477f]/10 flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 text-[#00477f]" />
            </div>
            <TypingIndicator />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          {lang === 'zh-TW' 
            ? '此工具僅供參考，不能替代專業醫療建議'
            : 'This tool is for informational purposes only'}
        </p>
      </div>
    </div>
  );
}
