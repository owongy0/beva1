'use client';

import { useState, useCallback, memo } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { ChatWindow } from './chat-window';
import { Locale } from '@/lib/chatbot-data';

interface ChatWidgetProps {
  lang: Locale;
  categoryNames: Record<string, Record<Locale, string>>;
  onOpenTreatmentDialog: (categoryIndex: number) => void;
}

// Memoized button to prevent unnecessary re-renders
const ChatButton = memo(function ChatButton({ 
  isOpen, 
  onClick, 
  label 
}: { 
  isOpen: boolean; 
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="w-14 h-14 rounded-full bg-[#00477f] text-white shadow-lg shadow-[#00477f]/30 flex items-center justify-center hover:bg-[#003d70] transition-colors"
      aria-label={label}
      style={{ willChange: 'transform' }}
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <MessageCircle className="w-6 h-6" />
      )}
    </button>
  );
});

export function ChatWidget({ lang, categoryNames, onOpenTreatmentDialog }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleViewTreatment = useCallback((categoryId: string) => {
    onOpenTreatmentDialog(Number(categoryId));
    closeChat();
  }, [onOpenTreatmentDialog, closeChat]);

  const buttonLabel = isOpen 
    ? (lang === 'zh-TW' ? '關閉聊天' : 'Close chat')
    : (lang === 'zh-TW' ? '打開聊天' : 'Open chat');

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      {isOpen && (
        <div 
          className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] sm:h-[550px] animate-in fade-in slide-in-from-bottom-4 duration-200"
          style={{ 
            maxWidth: 'min(400px, calc(100vw - 2rem))',
            willChange: 'transform, opacity'
          }}
        >
          <ChatWindow 
            lang={lang} 
            categoryNames={categoryNames}
            onViewTreatment={handleViewTreatment}
            onClose={closeChat}
          />
        </div>
      )}
      
      <ChatButton 
        isOpen={isOpen} 
        onClick={toggleChat}
        label={buttonLabel}
      />
    </div>
  );
}
