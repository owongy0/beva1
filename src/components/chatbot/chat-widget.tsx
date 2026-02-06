'use client';

import { useState, useCallback, useEffect } from 'react';
import { MessageCircle, X, Stethoscope } from 'lucide-react';
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
  const [showPreview, setShowPreview] = useState(false);
  const [hasScrolledPastTreatments, setHasScrolledPastTreatments] = useState(false);

  // Monitor scroll position to show preview only after treatments section
  useEffect(() => {
    const handleScroll = () => {
      // Get the treatments section
      const proceduresSection = document.getElementById('procedures');
      if (proceduresSection) {
        const rect = proceduresSection.getBoundingClientRect();
        // Show preview when user has scrolled past the treatments section (bottom of it is above viewport bottom)
        const hasPassed = rect.bottom < window.innerHeight;
        setHasScrolledPastTreatments(hasPassed);
        
        // Auto-show preview when first passing the treatments section
        if (hasPassed && !hasScrolledPastTreatments && !isOpen) {
          setShowPreview(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolledPastTreatments, isOpen]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
    setShowPreview(false);
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

  const previewTitle = lang === 'zh-TW' ? '不確定需要什麼治療？' : 'Not sure which treatment you need?';
  const previewDesc = lang === 'zh-TW' 
    ? '回答幾個簡單問題，我們會推薦適合您的治療項目' 
    : 'Answer a few simple questions and we\'ll recommend suitable treatments for you';
  const previewCta = lang === 'zh-TW' ? '立即開始 →' : 'Get Started →';

  return (
    <>
      {/* CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      {/* Preview Card + Floating Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {/* Preview Card - Only show after scrolling past treatments with fade-in */}
          {showPreview && hasScrolledPastTreatments && (
            <div 
              className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 max-w-[280px] cursor-pointer hover:shadow-2xl transition-all duration-500 ease-out"
              style={{
                animation: 'fadeInUp 0.5s ease-out forwards',
              }}
              onClick={toggleChat}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00477f]/10 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-5 h-5 text-[#00477f]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{previewTitle}</h4>
                  <p className="text-gray-600 text-xs leading-relaxed mb-2">{previewDesc}</p>
                  <span className="text-[#00477f] text-xs font-medium">{previewCta}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPreview(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 -mt-1 -mr-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          
          {/* Floating Button */}
          <button
            onClick={toggleChat}
            className="w-14 h-14 bg-[#00477f] text-white rounded-full shadow-lg hover:bg-[#003d70] hover:shadow-xl transition-all flex items-center justify-center group"
            aria-label={lang === 'zh-TW' ? '開啟聊天' : 'Open chat'}
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            
            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {lang === 'zh-TW' ? '治療建議助手' : 'Treatment Advisor'}
            </span>
          </button>
        </div>
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
