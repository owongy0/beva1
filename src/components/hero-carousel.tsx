'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/get-dictionary';

interface HeroCarouselProps {
  lang: Locale;
  t: Dictionary;
}

export function HeroCarousel({ lang, t }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    '/doctor-talking-with-male-patient-GettyImages-172600009-1040x615.jpg',
    '/photo-VCG-HPI-COVID19-Male-Doc-Male-Pt-2000px.jpg',
    '/womanwithdoctor640440_3_pyramid.jpg',
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[600px] sm:min-h-[700px] md:min-h-[800px] flex items-end">
      {/* Background Images - Full bleed */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={img}
            alt={`BEVA Clinic - Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40" />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 md:pt-48 pb-20 sm:pb-24 md:pb-28">
        <div className="max-w-2xl">
          {/* Text Content */}
          <div className="space-y-5 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-white tracking-tight">
              {t.hero.title}
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-lg">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button 
                onClick={scrollToContact}
                className="bg-[#00477f] text-white hover:bg-[#003d70] px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold shadow-lg shadow-[#00477f]/30 transition-all hover:shadow-xl hover:shadow-[#00477f]/40 w-full sm:w-auto"
              >
                {t.hero.bookConsultation}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('procedures')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white hover:bg-white/10 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold transition-all w-full sm:w-auto bg-transparent"
              >
                {t.hero.ourProcedures}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dots Indicator - Bottom center */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
