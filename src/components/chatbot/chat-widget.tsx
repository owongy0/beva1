'use client';

import { useState, useCallback } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Locale } from '@/lib/chatbot-data';
import { useChatbot } from '@/hooks/use-chatbot';
import { ChatWindow } from './chat-window';

interface ChatWidgetProps {
  lang: Locale;
  categoryNames: Record<string, Record<Locale, string>>;
  onOpenTreatmentDialog: (categoryIndex: number) => void;
}

export function ChatWidget({ lang, categoryNames, onOpenTreatmentDialog }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Map condition to category index
  const handleViewTreatment = useCallback((categoryId: string, conditionId: string) => {
    const categoryIndexMap: Record<string, number> = {
      neurovascular: 0,
      neuromodulation: 1,
      urogenital: 2,
      gastrointestinal: 3,
      musculoskeletal: 4,
      vascular: 5,
    };

    const categoryIndex = categoryIndexMap[categoryId];
    if (categoryIndex !== undefined) {
      onOpenTreatmentDialog(categoryIndex);
      // Don't close the chat so user can come back to it
    }
  }, [onOpenTreatmentDialog]);

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#00477f] text-white rounded-full shadow-lg hover:bg-[#003d70] hover:shadow-xl transition-all flex items-center justify-center group"
          aria-label={lang === 'zh-TW' ? '開啟聊天' : 'Open chat'}
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {lang === 'zh-TW' ? '需要協助？' : 'Need help?'}
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-w-[calc(100vw-48px)] max-h-[calc(100vh-100px)]">
          <ChatWindow
            lang={lang}
            categoryNames={categoryNames}
            onViewTreatment={handleViewTreatment}
            onClose={closeChat}
          />
        </div>
      )}
    </>
  );
}
