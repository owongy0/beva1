'use client';

import { QuickReplyOption } from '@/lib/chatbot-data';
import { Check } from 'lucide-react';

interface QuickRepliesProps {
  options: QuickReplyOption[];
  selectedValues: string[];
  onOptionClick: (option: QuickReplyOption) => void;
}

export function QuickReplies({ options, selectedValues, onOptionClick }: QuickRepliesProps) {
  const isContinueButton = (option: QuickReplyOption) => option.id === 'continue';
  
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        const isContinue = isContinueButton(option);
        
        if (isContinue) {
          return (
            <button
              key={option.id}
              onClick={() => onOptionClick(option)}
              className="px-4 py-2 bg-[#00477f] text-white rounded-full text-sm font-medium hover:bg-[#003d70] transition-colors"
            >
              {option.label}
            </button>
          );
        }
        
        return (
          <button
            key={option.id}
            onClick={() => onOptionClick(option)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              isSelected
                ? 'bg-[#00477f] text-white border-[#00477f]'
                : 'bg-white text-gray-700 border-gray-300 hover:border-[#00477f] hover:text-[#00477f]'
            }`}
          >
            <span className="flex items-center gap-1">
              {isSelected && <Check className="w-3 h-3" />}
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
