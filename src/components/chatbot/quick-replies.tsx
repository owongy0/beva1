'use client';

import { QuickReplyOption } from '@/lib/chatbot-data';
import { Check } from 'lucide-react';

interface QuickRepliesProps {
  options: QuickReplyOption[];
  selectedValues: string[];
  onOptionClick: (option: QuickReplyOption) => void;
  showContinue?: boolean;
  continueLabel?: string;
  onContinue?: () => void;
  lang?: 'en' | 'zh-TW';
}

export function QuickReplies({ 
  options, 
  selectedValues, 
  onOptionClick,
  showContinue,
  continueLabel,
  onContinue,
  lang = 'en'
}: QuickRepliesProps) {
  // Filter out the continue button from options
  const symptomOptions = options.filter(opt => opt.id !== 'continue');
  const hasSelections = selectedValues.length > 0;
  
  return (
    <div className="space-y-3">
      {/* Symptom options */}
      <div className="flex flex-wrap gap-2">
        {symptomOptions.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          
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
      
      {/* Continue button - shown below symptoms */}
      {showContinue && (
        <div className="pt-2 border-t border-gray-200">
          <button
            onClick={onContinue}
            disabled={!hasSelections}
            className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              hasSelections
                ? 'bg-[#00477f] text-white hover:bg-[#003d70]'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {continueLabel || (lang === 'zh-TW' ? '繼續' : 'Continue')}
            <span className="text-xs opacity-75">
              ({selectedValues.length} {lang === 'zh-TW' ? '已選擇' : 'selected'})
            </span>
          </button>
          {!hasSelections && (
            <p className="text-xs text-gray-500 text-center mt-1.5">
              {lang === 'zh-TW' ? '請選擇至少一個症狀' : 'Please select at least one symptom'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
