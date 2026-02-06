'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-stone-50 via-stone-100/50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
          {/* Left - Text Content */}
          <div className="space-y-4 sm:space-y-5 text-center md:text-left order-2 md:order-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.15] text-slate-900 tracking-tight">
              {t.hero.title}
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed max-w-md mx-auto md:mx-0">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-1 justify-center md:justify-start">
              <Button 
                onClick={scrollToContact}
                className="bg-[#00477f] text-white hover:bg-[#003d70] px-5 sm:px-6 py-4 sm:py-5 text-sm sm:text-base font-semibold shadow-lg shadow-[#00477f]/20 transition-all hover:shadow-xl hover:shadow-[#00477f]/30 w-full sm:w-auto"
              >
                {t.hero.bookConsultation}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('procedures')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-[#00477f] text-[#00477f] hover:bg-sky-50 px-5 sm:px-6 py-4 sm:py-5 text-sm sm:text-base font-semibold transition-all w-full sm:w-auto"
              >
                {t.hero.ourProcedures}
              </Button>
            </div>
          </div>
          
          {/* Right - Image Carousel */}
          <div className="relative order-1 md:order-2">
            <div className="aspect-[4/3] bg-stone-100 rounded-xl sm:rounded-2xl overflow-hidden border border-stone-200 shadow-lg relative">
              {/* Images */}
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
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
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                      index === currentSlide 
                        ? 'bg-white w-4 sm:w-5' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
