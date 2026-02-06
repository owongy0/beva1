'use client';

import { ChatMessage } from '@/lib/chatbot-data';
import { Bot, User, AlertTriangle } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
  isSelected?: boolean;
}

export function MessageBubble({ message, isSelected }: MessageBubbleProps) {
  const isBot = message.role === 'bot';

  if (message.type === 'emergency') {
    return (
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-4 h-4 text-red-600" />
        </div>
        <div className="flex-1">
          <div className="bg-red-50 border border-red-200 rounded-2xl rounded-tl-none px-4 py-3">
            <p className="text-red-800 font-semibold text-sm">{message.content}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
        isBot ? 'bg-[#00477f]/10' : 'bg-gray-200'
      }`}>
        {isBot ? (
          <Bot className="w-4 h-4 text-[#00477f]" />
        ) : (
          <User className="w-4 h-4 text-gray-600" />
        )}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
        isBot 
          ? 'bg-gray-100 rounded-tl-none text-gray-800' 
          : 'bg-[#00477f] text-white rounded-tr-none'
      } ${isSelected ? 'ring-2 ring-[#00477f]/30' : ''}`}>
        {message.content}
      </div>
    </div>
  );
}
