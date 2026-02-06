'use client';

import { useState, useEffect, useCallback, useRef, memo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/get-dictionary';

interface HeroCarouselProps {
  lang: Locale;
  t: Dictionary;
}

// Memoized slide content to prevent re-renders
const SlideContent = memo(function SlideContent({ 
  t, 
  scrollToContact, 
  scrollToProcedures 
}: { 
  t: Dictionary; 
  scrollToContact: () => void;
  scrollToProcedures: () => void;
}) {
  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 md:pt-48 pb-20 sm:pb-24 md:pb-28">
      <div className="max-w-2xl">
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
              onClick={scrollToProcedures}
              className="border-2 border-white text-white hover:bg-white/10 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold transition-all w-full sm:w-auto bg-transparent"
            >
              {t.hero.ourProcedures}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export function HeroCarousel({ lang, t }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const images = [
    { src: '/doctor-talking-with-male-patient-GettyImages-172600009-1040x615.jpg', priority: true },
    { src: '/photo-VCG-HPI-COVID19-Male-Doc-Male-Pt-2000px.jpg', priority: false },
    { src: '/womanwithdoctor640440_3_pyramid.jpg', priority: false },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Auto-scroll every 5 seconds - use requestAnimationFrame for better performance
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let rafId: number;
    
    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        rafId = requestAnimationFrame(() => {
          nextSlide();
          scheduleNext();
        });
      }, 5000);
    };
    
    scheduleNext();
    
    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [nextSlide]);

  // Mark as loaded after mount - use a ref to avoid the lint error
  const isMountedRef = useRef(false);
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      // Defer setState to next tick to avoid sync setState warning
      Promise.resolve().then(() => setIsLoaded(true));
    }
  }, []);

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToProcedures = useCallback(() => {
    document.getElementById('procedures')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className="relative min-h-[600px] sm:min-h-[700px] md:min-h-[800px] flex items-end overflow-hidden">
      {/* Background Images - Optimized with Next.js Image */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          } ${isLoaded ? '' : 'opacity-0'}`}
          style={{ willChange: 'opacity' }}
        >
          <Image
            src={img.src}
            alt={`BEVA Clinic - Slide ${index + 1}`}
            fill
            priority={img.priority}
            sizes="100vw"
            className="object-cover"
            quality={80}
            onLoadingComplete={() => {
              if (index === 0) setIsLoaded(true);
            }}
          />
        </div>
      ))}
      
      {/* Dark overlay for text readability */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40"
        style={{ transform: 'translateZ(0)' }} // GPU layer
      />
      
      {/* Content */}
      <SlideContent 
        t={t} 
        scrollToContact={scrollToContact}
        scrollToProcedures={scrollToProcedures}
      />
      
      {/* Dots Indicator - Bottom center */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/70 w-2.5'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
