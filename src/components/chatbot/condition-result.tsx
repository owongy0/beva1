'use client';

import { ConditionResult as ConditionResultType, Locale, getMatchScoreLabel } from '@/lib/chatbot-data';
import { ArrowRight, Stethoscope } from 'lucide-react';

interface ConditionResultProps {
  result: ConditionResultType;
  lang: Locale;
  onViewTreatment: (categoryId: string, conditionId: string) => void;
  onBookAppointment: () => void;
}

export function ConditionResultCard({ 
  result, 
  lang, 
  onViewTreatment, 
  onBookAppointment 
}: ConditionResultProps) {
  const getScoreColor = (score: string) => {
    switch (score) {
      case 'high':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-[#00477f]/10 flex items-center justify-center shrink-0">
          <Stethoscope className="w-5 h-5 text-[#00477f]" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm leading-tight">
            {result.title}
          </h4>
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getScoreColor(result.matchScore)}`}>
            {getMatchScoreLabel(result.matchScore, lang)}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 text-xs mb-3 line-clamp-2">
        {result.shortDescription}
      </p>
      
      <div className="flex gap-2">
        <button
          onClick={() => onViewTreatment(result.categoryId, result.conditionId)}
          className="flex-1 px-3 py-2 bg-[#00477f] text-white rounded-lg text-xs font-medium hover:bg-[#003d70] transition-colors flex items-center justify-center gap-1"
        >
          {lang === 'zh-TW' ? '了解更多' : 'Learn More'}
          <ArrowRight className="w-3 h-3" />
        </button>
        <button
          onClick={onBookAppointment}
          className="px-3 py-2 border border-[#00477f] text-[#00477f] rounded-lg text-xs font-medium hover:bg-[#00477f]/5 transition-colors"
        >
          {lang === 'zh-TW' ? '預約' : 'Book'}
        </button>
      </div>
    </div>
  );
}
