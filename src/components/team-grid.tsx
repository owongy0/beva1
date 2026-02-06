'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Award, GraduationCap, Stethoscope, X, ArrowRight } from 'lucide-react';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/get-dictionary';

interface TeamGridProps {
  lang: Locale;
  t: Dictionary;
  onBookAppointment: () => void;
}

export function TeamGrid({ lang, t, onBookAppointment }: TeamGridProps) {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      {/* 2x3 Grid - 1 column mobile, 2 columns tablet, 3 columns desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {t.team.members.map((doctor, index) => {
          const isFlipped = flippedCards[index] || false;
          
          return (
            <div 
              key={index} 
              className="relative h-[380px] sm:h-[420px] lg:h-[480px] group"
              style={{ perspective: '1000px' }}
            >
              {/* Card Inner - Handles the flip */}
              <div 
                className="relative w-full h-full transition-transform duration-500"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* FRONT of card */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-stone-100 h-full flex flex-col overflow-hidden">
                    {/* Large Portrait Image Area - Takes up ~65% of card */}
                    <div className="relative h-[65%] bg-gradient-to-br from-stone-100 to-stone-200 overflow-hidden">
                      {/* Placeholder for doctor portrait photo */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl sm:text-6xl lg:text-7xl font-light text-slate-300">
                          {doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </span>
                      </div>
                      {/* Subtle gradient overlay at bottom for text readability */}
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/80 to-transparent" />
                    </div>

                    {/* Content Area - ~35% of card */}
                    <div className="flex-1 p-3 sm:p-4 flex flex-col">
                      {/* Name & Title */}
                      <div className="mb-3">
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base lg:text-lg leading-tight mb-0.5">
                          {doctor.name}
                        </h3>
                        <p className="text-[#00477f] font-medium text-xs sm:text-sm">{doctor.title}</p>
                        <p className="text-slate-500 text-[10px] sm:text-xs mt-0.5">{doctor.specialty}</p>
                      </div>

                      {/* Action Button */}
                      <div className="mt-auto">
                        <button 
                          onClick={() => toggleFlip(index)}
                          className="flex items-center gap-1.5 text-[#00477f] hover:text-[#003d70] text-xs sm:text-sm font-medium transition-colors"
                        >
                          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-sky-50 flex items-center justify-center">
                            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </span>
                          <span>{lang === 'zh-TW' ? '關於' : 'About'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BACK of card */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-stone-100 h-full flex flex-col overflow-hidden">
                    {/* Header with close */}
                    <div className="flex items-start justify-between p-3 sm:p-4 border-b border-stone-100">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base sm:text-lg">{doctor.name}</h3>
                        <p className="text-[#00477f] text-sm">{doctor.title}</p>
                      </div>
                      <button 
                        onClick={() => toggleFlip(index)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
                      >
                        <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
                      </button>
                    </div>

                    {/* Scrollable content */}
                    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
                      {/* Bio */}
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {doctor.bio}
                      </p>

                      {/* Expertise */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Stethoscope className="w-4 h-4 text-[#00477f]" />
                          <span className="text-sm font-semibold text-slate-900">{t.team.expertise}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {doctor.expertise.map((exp, i) => (
                            <span key={i} className="px-2.5 py-1 bg-sky-50 text-[#00477f] text-xs rounded-full">
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Education */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <GraduationCap className="w-4 h-4 text-[#00477f]" />
                          <span className="text-sm font-semibold text-slate-900">{t.team.education}</span>
                        </div>
                        <ul className="space-y-1.5">
                          {doctor.education.map((edu, i) => (
                            <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00477f] mt-1.5 shrink-0"></span>
                              <span>{edu}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Certifications */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-4 h-4 text-[#00477f]" />
                          <span className="text-sm font-semibold text-slate-900">{t.team.certifications}</span>
                        </div>
                        <ul className="space-y-1.5">
                          {doctor.certifications.map((cert, i) => (
                            <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00477f] mt-1.5 shrink-0"></span>
                              <span>{cert}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA at bottom */}
                    <div className="p-3 sm:p-4 border-t border-stone-100">
                      <Button 
                        className="w-full bg-[#00477f] text-white hover:bg-[#003d70] py-2.5 text-sm font-medium"
                        onClick={onBookAppointment}
                      >
                        {t.contact.bookAppointment}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
