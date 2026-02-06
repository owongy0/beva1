'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Locale } from '@/i18n/config';

interface Testimonial {
  quote: string;
  name: string;
  treatment: string;
  rating: number;
}

interface TestimonialCarouselProps {
  lang: Locale;
}

export function TestimonialCarousel({ lang }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      quote: lang === 'zh-TW' 
        ? 'BEVA診所的醫生非常專業，讓我在整個治療過程中感到非常安心。手術後恢復很快，第二天就能正常活動了。'
        : 'The doctors at BEVA Clinic are extremely professional and made me feel at ease throughout my entire treatment. Recovery was remarkably fast—I was back to normal activities the very next day.',
      name: lang === 'zh-TW' ? '陳女士' : 'Mrs. Chan',
      treatment: lang === 'zh-TW' ? '子宮肌瘤栓塞術' : 'Uterine Fibroid Embolization',
      rating: 5,
    },
    {
      quote: lang === 'zh-TW'
        ? '多年來的膝關節疼痛終於得到緩解。感謝BEVA團隊的細心照顧，現在我又可以和孫子一起散步了。'
        : 'After years of chronic knee pain, I finally found relief. Thanks to the caring team at BEVA, I can now walk with my grandchildren again without discomfort.',
      name: lang === 'zh-TW' ? '李先生' : 'Mr. Lee',
      treatment: lang === 'zh-TW' ? '膝動脈栓塞術' : 'Genicular Artery Embolization',
      rating: 5,
    },
    {
      quote: lang === 'zh-TW'
        ? '從預約到術後跟進，整個體驗都非常順暢。微創治療真的改變了我的生活，強烈推薦給有類似問題的朋友。'
        : 'From booking to post-procedure follow-up, the entire experience was seamless. The minimally invasive treatment truly transformed my life—I highly recommend BEVA to anyone facing similar issues.',
      name: lang === 'zh-TW' ? '張先生' : 'Mr. Cheung',
      treatment: lang === 'zh-TW' ? '前列腺動脈栓塞術' : 'Prostate Artery Embolization',
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="order-1">
      <div className="bg-gradient-to-br from-[#00477f] to-[#003d70] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden min-h-[320px] sm:min-h-[380px] flex flex-col">
        {/* Quote Icon */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-20">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 sm:w-16 sm:h-16">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
        </div>
        
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm font-medium">
            {lang === 'zh-TW' ? '病人分享' : 'Patient Stories'}
          </span>
        </div>

        {/* Testimonial Content */}
        <div className="flex-1 flex flex-col justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index === currentIndex 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-8 absolute pointer-events-none'
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              
              {/* Author */}
              <div className="border-t border-white/20 pt-4">
                <p className="font-semibold text-sm sm:text-base">{testimonial.name}</p>
                <p className="text-white/70 text-xs sm:text-sm">{testimonial.treatment}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4 sm:mt-6 pt-4 border-t border-white/20">
          {/* Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prevTestimonial}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          
          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-white w-4' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
