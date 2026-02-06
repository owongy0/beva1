'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';
import { Locale } from '@/i18n/config';

interface Testimonial {
  quote: string;
  name: string;
  treatment: string;
  rating: number;
  image: string;
}

interface TestimonialShowcaseProps {
  lang: Locale;
}

// Memoized stars component
const StarRating = memo(function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <svg 
          key={i} 
          className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
});

export function TestimonialShowcase({ lang }: TestimonialShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      quote: lang === 'zh-TW' 
        ? 'BEVA診所的醫生非常專業，讓我在整個治療過程中感到非常安心。手術後恢復很快，第二天就能正常活動了。'
        : 'The doctors at BEVA Clinic are extremely professional and made me feel at ease throughout my entire treatment. Recovery was remarkably fast.',
      name: lang === 'zh-TW' ? '陳女士' : 'Mrs. Chan',
      treatment: lang === 'zh-TW' ? '子宮肌瘤栓塞術' : 'Uterine Fibroid Embolization',
      rating: 5,
      image: '/doctor-talking-with-male-patient-GettyImages-172600009-1040x615.jpg',
    },
    {
      quote: lang === 'zh-TW'
        ? '多年來的膝關節疼痛終於得到緩解。感謝BEVA團隊的細心照顧，現在我又可以和孫子一起散步了。'
        : 'After years of chronic knee pain, I finally found relief. Thanks to the caring team at BEVA, I can now walk with my grandchildren again.',
      name: lang === 'zh-TW' ? '李先生' : 'Mr. Lee',
      treatment: lang === 'zh-TW' ? '膝動脈栓塞術' : 'Genicular Artery Embolization',
      rating: 5,
      image: '/photo-VCG-HPI-COVID19-Male-Doc-Male-Pt-2000px.jpg',
    },
    {
      quote: lang === 'zh-TW'
        ? '從預約到術後跟進，整個體驗都非常順暢。微創治療真的改變了我的生活，強烈推薦給有類似問題的朋友。'
        : 'From booking to post-procedure follow-up, the entire experience was seamless. The minimally invasive treatment truly transformed my life.',
      name: lang === 'zh-TW' ? '張先生' : 'Mr. Cheung',
      treatment: lang === 'zh-TW' ? '前列腺動脈栓塞術' : 'Prostate Artery Embolization',
      rating: 5,
      image: '/womanwithdoctor640440_3_pyramid.jpg',
    },
  ];

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const interval = setInterval(() => {
      timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          nextTestimonial();
        });
      }, 6000);
    }, 6000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, [nextTestimonial]);

  const current = testimonials[currentIndex];

  return (
    <div className="order-1">
      {/* Fashionable stacked layout: Image on top, quote card staggered below */}
      <div className="relative">
        {/* Image Card - Top */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
          <Image 
            src={current.image}
            alt="Patient testimonial"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            quality={75}
            priority={currentIndex === 0}
          />
          {/* Gradient overlay for text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          
          {/* Patient badge on image */}
          <div className="absolute top-4 left-4">
            <span className="inline-block px-3 py-1.5 bg-white/90 rounded-full text-xs font-medium text-slate-800">
              {lang === 'zh-TW' ? '病人分享' : 'Patient Story'}
            </span>
          </div>

          {/* Navigation arrows on image */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-3">
            <button
              onClick={prevTestimonial}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              aria-label="Previous testimonial"
              style={{ willChange: 'transform' }}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              aria-label="Next testimonial"
              style={{ willChange: 'transform' }}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Quote Card - Staggered/Offset below */}
        <div className="relative -mt-16 sm:-mt-20 mx-4 sm:mx-6">
          <div 
            className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-xl border border-stone-100"
            style={{ transform: 'translateZ(0)' }}
          >
            {/* Quote icon */}
            <div className="absolute -top-3 left-6 w-6 h-6 bg-[#00477f] rounded-full flex items-center justify-center">
              <Quote className="w-3 h-3 text-white" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-3">
              <StarRating rating={current.rating} />
            </div>

            {/* Quote text */}
            <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Author info */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <div>
                <p className="font-semibold text-slate-900 text-sm sm:text-base">{current.name}</p>
                <p className="text-[#00477f] text-xs sm:text-sm">{current.treatment}</p>
              </div>

              {/* Dots indicator */}
              <div className="flex gap-1.5">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-[#00477f] w-5' 
                        : 'bg-stone-300 hover:bg-stone-400 w-2'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
