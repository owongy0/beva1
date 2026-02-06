'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

import {
  Stethoscope,
  Award,
  Check,
  MapPin,
  Phone,
  Clock,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Mail,
  User,
  X,
  ChevronLeft,
  Brain,
  Activity,
  Heart,
  Bone,
  Microscope,
  Search,
  ChevronLeft as ArrowLeftIcon,
  ChevronRight as ArrowRightIcon,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/get-dictionary';

// Category icon mapping
const categoryIcons: Record<string, React.ReactNode> = {
  neurovascular: <Brain className="w-6 h-6" />,
  neuromodulation: <Activity className="w-6 h-6" />,
  urogenital: <Heart className="w-6 h-6" />,
  gastrointestinal: <Search className="w-6 h-6" />,
  musculoskeletal: <Bone className="w-6 h-6" />,
  vascular: <Microscope className="w-6 h-6" />,
};

// Hero Carousel Component
function HeroCarousel({ lang, t }: { lang: Locale; t: Dictionary }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    '/doctor-talking-with-male-patient-GettyImages-172600009-1040x615.jpg',
    '/doctor-talking-with-male-patient-GettyImages-172600009-1040x615.jpg',
    '/doctor-talking-with-male-patient-GettyImages-172600009-1040x615.jpg',
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
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-50 via-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left - Text Content */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center md:text-left order-2 md:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
              {t.hero.title}
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto md:mx-0">
              {t.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 justify-center md:justify-start">
              <Button 
                onClick={scrollToContact}
                className="bg-[#00477f] text-white hover:bg-[#003d70] px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold shadow-lg shadow-[#00477f]/20 transition-all hover:shadow-xl hover:shadow-[#00477f]/30 w-full sm:w-auto"
              >
                {t.hero.bookConsultation}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('procedures')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-[#00477f] text-[#00477f] hover:bg-[#f0f5fa] px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold transition-all w-full sm:w-auto"
              >
                {t.hero.ourProcedures}
              </Button>
            </div>
          </div>
          
          {/* Right - Image Carousel */}
          <div className="relative order-1 md:order-2">
            <div className="aspect-[4/3] bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 shadow-lg relative">
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
                <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                aria-label="Next slide"
              >
                <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
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

// Testimonial Carousel Component
function TestimonialCarousel({ lang }: { lang: Locale }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
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
                "{testimonial.quote}"
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
              <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
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

// Dynamically import the map component to avoid SSR issues
const ClinicMap = dynamic(() => import('@/components/map').then((mod) => mod.ClinicMap), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-[400px] flex items-center justify-center bg-gray-50">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

interface HomePageClientProps {
  lang: Locale;
  dictionary: Dictionary;
}





export default function HomePageClient({ lang, dictionary }: HomePageClientProps) {
  const [openDialogs, setOpenDialogs] = useState<Record<number, boolean>>({});
  const [openTeamDialogs, setOpenTeamDialogs] = useState<Record<number, boolean>>({});

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const t = dictionary;

  return (
    <main className="bg-white text-slate-900">
      {/* Hero Section with Auto-scrolling Carousel */}
      <HeroCarousel lang={lang} t={t} />

      {/* Procedures Section */}
      <section id="procedures" className="py-12 sm:py-16 md:py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 md:mb-4 tracking-tight">{t.procedures.title}</h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-[#00477f] mx-auto rounded-full mb-4 md:mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
              {t.procedures.subtitle}
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {t.procedures.categories.map((category, catIndex) => (
              <Dialog 
                key={catIndex}
                open={openDialogs[catIndex]} 
                onOpenChange={(open) => setOpenDialogs(prev => ({ ...prev, [catIndex]: open }))}
              >
                <DialogTrigger asChild>
                  <button className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-[#00477f]/20 h-full flex flex-col text-left">
                    {/* Category Image */}
                    <div className="aspect-[2/1] overflow-hidden bg-gray-100">
                      <img 
                        src="/doctor-talking-with-male-patient-GettyImages-172600009-1040x615.jpg"
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Category Info */}
                    <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                      <h3 className="font-semibold text-slate-900 text-base sm:text-lg leading-tight group-hover:text-[#00477f] transition-colors text-left">
                        {category.name}
                      </h3>
                      
                      {/* Arrow Icon */}
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#00477f] flex items-center justify-center shrink-0 group-hover:bg-[#00477f] transition-colors">
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#00477f] group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </button>
                </DialogTrigger>
                
                <DialogContent className="max-w-5xl w-full h-full sm:h-auto sm:max-h-[90vh] overflow-hidden p-0 sm:rounded-2xl">
                  {/* Category Header with Close Button */}
                  <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-3 sm:py-4 z-10 flex items-center justify-between">
                    <div>
                      <DialogTitle className="text-lg sm:text-2xl font-bold text-slate-900">{category.name}</DialogTitle>
                      <p className="text-slate-500 text-xs sm:text-sm mt-0.5 sm:mt-1 hidden sm:block">{category.description}</p>
                    </div>
                    <DialogClose asChild>
                      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                      </button>
                    </DialogClose>
                  </div>
                  
                  {/* Treatments List */}
                  <div className="p-3 sm:p-6 space-y-2 sm:space-y-4 overflow-y-auto max-h-[calc(100vh-180px)] sm:max-h-[60vh]">
                    {category.treatments.map((treatment, treatIndex) => (
                      <Dialog key={treatIndex}>
                        <DialogTrigger asChild>
                          <button className="w-full text-left bg-slate-50 hover:bg-[#f0f5fa] rounded-lg sm:rounded-xl p-3 sm:p-5 transition-colors group">
                            <div className="flex items-start justify-between gap-3 sm:gap-4">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-slate-900 text-sm sm:text-lg group-hover:text-[#00477f] transition-colors line-clamp-1">
                                  {treatment.title}
                                </h4>
                                <p className="text-slate-500 text-xs sm:text-sm mt-0.5 sm:mt-1 line-clamp-2">
                                  {treatment.shortDescription}
                                </p>
                              </div>
                              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 group-hover:text-[#00477f] shrink-0 mt-0.5" />
                            </div>
                          </button>
                        </DialogTrigger>
                        
                        <DialogContent className="max-w-3xl w-full h-full sm:h-auto sm:max-h-[85vh] overflow-hidden p-0 sm:rounded-2xl">
                          {/* Treatment Header with Close */}
                          <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-3 sm:py-4 z-10 flex items-start justify-between gap-3">
                            <DialogHeader className="flex-1 text-left">
                              <DialogTitle className="text-base sm:text-xl font-bold text-slate-900 leading-tight">{treatment.title}</DialogTitle>
                              <p className="text-slate-500 text-xs sm:text-sm mt-0.5 line-clamp-2">{treatment.shortDescription}</p>
                            </DialogHeader>
                            <DialogClose asChild>
                              <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors shrink-0">
                                <X className="w-4 h-4 text-slate-600" />
                              </button>
                            </DialogClose>
                          </div>
                          
                          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] sm:max-h-[60vh]">
                            <section>
                              <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2 sm:mb-3">
                                {lang === 'zh-TW' ? '概述' : 'Overview'}
                              </h3>
                              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{treatment.fullDescription}</p>
                            </section>

                            <section>
                              <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2 sm:mb-3">
                                {lang === 'zh-TW' ? '治療優點' : 'Benefits'}
                              </h3>
                              <ul className="space-y-1.5 sm:space-y-2">
                                {treatment.benefits.map((benefit, i) => (
                                  <li key={i} className="flex items-start gap-2 sm:gap-3 bg-slate-50 rounded-lg p-2 sm:p-3">
                                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00477f] mt-0.5 shrink-0" />
                                    <span className="text-slate-600 text-xs sm:text-sm">{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </section>

                            <section className="bg-gradient-to-r from-[#f8fafc] to-[#e6eef5] rounded-lg sm:rounded-xl p-3 sm:p-4">
                              <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1.5 sm:mb-2 flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00477f]" />
                                {lang === 'zh-TW' ? '康復時間' : 'Recovery'}
                              </h3>
                              <p className="text-slate-600 text-xs sm:text-sm">{treatment.recovery}</p>
                            </section>

                            <Button 
                              onClick={() => {
                                setOpenDialogs(prev => ({ ...prev, [catIndex]: false }));
                                setTimeout(scrollToContact, 100);
                              }}
                              className="w-full bg-[#00477f] text-white hover:bg-[#003d70] py-4 sm:py-5 text-sm sm:text-base font-semibold"
                            >
                              {t.contact.bookAppointment}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                  
                  {/* Footer */}
                  <div className="sticky bottom-0 bg-white border-t px-4 sm:px-6 py-3 sm:py-4">
                    <Button 
                      onClick={() => {
                        setOpenDialogs(prev => ({ ...prev, [catIndex]: false }));
                        setTimeout(scrollToContact, 100);
                      }}
                      className="w-full bg-[#00477f] text-white hover:bg-[#003d70] py-4 sm:py-5 text-sm sm:text-base font-semibold"
                    >
                      {t.contact.bookAppointment}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 md:mb-4 tracking-tight">{t.team.title}</h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-[#00477f] mx-auto rounded-full mb-4 md:mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
              {t.team.subtitle}
            </p>
          </div>
          
          {/* Horizontal Scroll Carousel */}
          <div className="relative">
            {/* Scroll Buttons - Hidden on mobile */}
            <button 
              onClick={() => document.getElementById('team-scroll')?.scrollBy({ left: -300, behavior: 'smooth' })}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg items-center justify-center text-slate-600 hover:text-[#00477f] hover:shadow-xl transition-all -ml-2 lg:ml-0"
            >
              ←
            </button>
            <button 
              onClick={() => document.getElementById('team-scroll')?.scrollBy({ left: 300, behavior: 'smooth' })}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg items-center justify-center text-slate-600 hover:text-[#00477f] hover:shadow-xl transition-all -mr-2 lg:mr-0"
            >
              →
            </button>

            {/* Scroll Container */}
            <div 
              id="team-scroll"
              className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-1 sm:px-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {t.team.members.map((doctor, index) => (
                <Dialog 
                  key={index}
                  open={openTeamDialogs[index]} 
                  onOpenChange={(open) => setOpenTeamDialogs(prev => ({ ...prev, [index]: open }))}
                >
                  <DialogTrigger asChild>
                    <div className="snap-center shrink-0 w-[280px] sm:w-[320px] lg:w-[380px]">
                      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-slate-100 h-full">
                        {/* Photo Placeholder */}
                        <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center group-hover:from-[#e6eef5] group-hover:to-[#d1e3f6] transition-all duration-500">
                          <span className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-400 group-hover:text-[#00477f]">
                            {doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </span>
                        </div>

                        {/* Name & Title */}
                        <div className="text-center mb-3 sm:mb-4">
                          <h3 className="font-bold text-slate-900 text-lg sm:text-xl lg:text-2xl mb-1 group-hover:text-[#00477f] transition-colors">
                            {doctor.name}
                          </h3>
                          <p className="text-[#00477f] font-medium text-sm sm:text-base">{doctor.title}</p>
                          <p className="text-slate-500 text-xs sm:text-sm">{doctor.specialty}</p>
                        </div>

                        {/* Experience Badge */}
                        <div className="flex justify-center mb-4 sm:mb-6">
                          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-50 rounded-full text-xs sm:text-sm text-slate-600 font-medium">
                            {doctor.experience}
                          </span>
                        </div>

                        {/* Quote */}
                        <p className="text-slate-500 text-center text-xs sm:text-sm italic mb-6 sm:mb-8 leading-relaxed line-clamp-2">
                          "{doctor.bio.substring(0, 80)}..."
                        </p>

                        {/* Actions */}
                        <div className="space-y-2 sm:space-y-3">
                          <Button 
                            variant="outline" 
                            className="w-full border-[#00477f] text-[#00477f] hover:bg-[#f0f5fa] py-4 sm:py-5 text-sm sm:text-base"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenTeamDialogs(prev => ({ ...prev, [index]: true }));
                            }}
                          >
                            {lang === 'zh-TW' ? '查看簡介' : 'View Profile'}
                          </Button>
                          <Button 
                            className="w-full bg-[#00477f] text-white hover:bg-[#003d70] py-4 sm:py-5 text-sm sm:text-base"
                            onClick={(e) => {
                              e.stopPropagation();
                              scrollToContact();
                            }}
                          >
                            {t.contact.bookAppointment}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>

                  {/* Detail Modal */}
                  <DialogContent className="max-w-3xl w-full h-full sm:h-auto sm:max-h-[90vh] overflow-hidden p-0 sm:rounded-2xl">
                    {/* Modal Header with Close */}
                    <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-3 sm:py-4 z-10 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 sm:gap-6">
                        <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#e6eef5] to-[#d1e3f6] rounded-full flex items-center justify-center shrink-0">
                          <span className="text-xl sm:text-2xl lg:text-3xl font-light text-[#00477f]">
                            {doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 pt-1">
                          <DialogTitle className="text-lg sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-0.5 leading-tight">{doctor.name}</DialogTitle>
                          <p className="text-[#00477f] font-medium text-sm sm:text-base lg:text-lg">{doctor.title}</p>
                          <p className="text-slate-500 text-xs sm:text-sm">{doctor.specialty} • {doctor.experience}</p>
                        </div>
                      </div>
                      <DialogClose asChild>
                        <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors shrink-0">
                          <X className="w-4 h-4 text-slate-600" />
                        </button>
                      </DialogClose>
                    </div>

                    <div className="p-4 sm:p-6 space-y-5 sm:space-y-8 overflow-y-auto max-h-[calc(100vh-140px)] sm:max-h-[60vh]">
                      {/* Bio */}
                      <section>
                        <h3 className="font-semibold text-slate-900 mb-2 sm:mb-3 text-base sm:text-lg">
                          {lang === 'zh-TW' ? '簡介' : 'About'}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{doctor.bio}</p>
                      </section>

                      {/* Expertise */}
                      <section>
                        <h3 className="font-semibold text-slate-900 mb-2 sm:mb-3 text-base sm:text-lg flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-[#00477f]" />
                          {t.team.expertise}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {doctor.expertise.map((exp, i) => (
                            <span key={i} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#f0f5fa] text-[#00477f] text-xs sm:text-sm rounded-full font-medium">
                              {exp}
                            </span>
                          ))}
                        </div>
                      </section>

                      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                        {/* Education */}
                        <section>
                          <h3 className="font-semibold text-slate-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#00477f]" />
                            {t.team.education}
                          </h3>
                          <ul className="space-y-1.5 sm:space-y-2">
                            {doctor.education.map((edu, i) => (
                              <li key={i} className="text-slate-600 text-xs sm:text-sm flex items-start gap-2">
                                <span className="text-[#00477f] mt-1">•</span>
                                {edu}
                              </li>
                            ))}
                          </ul>
                        </section>

                        {/* Certifications */}
                        <section>
                          <h3 className="font-semibold text-slate-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#00477f]" />
                            {t.team.certifications}
                          </h3>
                          <ul className="space-y-1.5 sm:space-y-2">
                            {doctor.certifications.map((cert, i) => (
                              <li key={i} className="text-slate-600 text-xs sm:text-sm flex items-start gap-2">
                                <span className="text-[#00477f] mt-1">•</span>
                                {cert}
                              </li>
                            ))}
                          </ul>
                        </section>
                      </div>

                      <Button 
                        onClick={() => {
                          setOpenTeamDialogs(prev => ({ ...prev, [index]: false }));
                          setTimeout(scrollToContact, 100);
                        }}
                        className="w-full bg-[#00477f] text-white hover:bg-[#003d70] py-4 sm:py-6 text-sm sm:text-lg font-semibold shadow-lg shadow-[#00477f]/20"
                      >
                        {t.contact.bookAppointment}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Image Break Section */}
      <section className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: 'url(/doctor-talking-with-male-patient-GettyImages-172600009-1040x615.jpg)' }}
        />
        <div className="absolute inset-0 bg-[#00477f]/60" />
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-3xl">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {lang === 'zh-TW' ? '您的健康，是我們的首要使命' : 'Your Health Is Our Priority'}
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
              {lang === 'zh-TW' 
                ? '我們致力為每位病人提供最優質的醫療服務，讓您在舒適的環境中獲得最佳的治療效果。'
                : 'We are dedicated to providing every patient with the highest quality medical care in a comfortable environment for the best possible outcomes.'}
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with Image */}
      <section id="about" className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 md:mb-4 tracking-tight">
              {lang === 'zh-TW' ? '為何選擇我們' : 'Why Choose Us'}
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-[#00477f] mx-auto rounded-full mb-4 md:mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left - Testimonial Carousel */}
            <TestimonialCarousel lang={lang} />

            {/* Right - Key Points */}
            <div className="order-2 space-y-6 sm:space-y-8">
              {/* Point 1: Expert Team */}
              <div className="flex gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#00477f]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 sm:w-7 sm:h-7 text-[#00477f]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    {lang === 'zh-TW' ? '專科醫生團隊' : 'Expert Specialist Team'}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {lang === 'zh-TW'
                      ? '由資深血管介入專科醫生主理，具備豐富臨床經驗及國際專業認證，為您提供最值得信賴的醫療服務。'
                      : 'Led by experienced interventional specialists with international certifications and decades of proven clinical expertise you can trust.'}
                  </p>
                </div>
              </div>

              {/* Point 2: Minimally Invasive */}
              <div className="flex gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#00477f]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Stethoscope className="w-6 h-6 sm:w-7 sm:h-7 text-[#00477f]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    {lang === 'zh-TW' ? '先進微創技術' : 'Advanced Minimally Invasive Techniques'}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {lang === 'zh-TW'
                      ? '採用最先進的血管內治療技術，傷口細小、恢復快速，大部份治療無需住院，讓您更快重回正常生活。'
                      : 'Utilizing cutting-edge endovascular procedures with tiny incisions and faster recovery—most treatments require no hospital stay, so you can return to normal life sooner.'}
                  </p>
                </div>
              </div>

              {/* Point 3: Patient-Centered Care */}
              <div className="flex gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#00477f]/10 rounded-xl flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 sm:w-7 sm:h-7 text-[#00477f]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    {lang === 'zh-TW' ? '以病人為本的服務' : 'Patient-Centered Care'}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {lang === 'zh-TW'
                      ? '從初次諮詢到術後跟進，我們提供全程個人化醫療支援，確保每位病人都獲得最適切的治療方案和貼心照顧。'
                      : 'From initial consultation through recovery, we provide personalized medical support every step of the way, ensuring each patient receives the most appropriate treatment plan and attentive care.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <Button 
              onClick={scrollToContact}
              className="bg-[#00477f] text-white hover:bg-[#003d70] px-8 sm:px-12 py-5 sm:py-6 text-base sm:text-lg font-semibold shadow-lg shadow-[#00477f]/20 w-full sm:w-auto"
            >
              {t.contact.bookAppointment}
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 md:mb-4 tracking-tight">{t.contact.title}</h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-[#00477f] mx-auto rounded-full mb-4 md:mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
              {t.contact.subtitle}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Contact Info - Left Side */}
            <div className="lg:col-span-2 space-y-5 sm:space-y-8">
              {/* Main CTA Card */}
              <div className="bg-gradient-to-br from-[#00477f] to-[#003d70] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 text-white shadow-xl shadow-[#00477f]/20">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                  {lang === 'zh-TW' ? '預約諮詢' : 'Book a Consultation'}
                </h3>
                <p className="text-white/80 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {lang === 'zh-TW' 
                    ? '與我們的專科醫生團隊預約初步諮詢，討論您的治療選項。'
                    : 'Schedule an initial consultation with our specialist team to discuss your treatment options.'}
                </p>
                <Button 
                  className="w-full bg-white text-[#00477f] hover:bg-slate-100 py-4 sm:py-5 md:py-6 text-base sm:text-lg font-semibold"
                  onClick={() => window.location.href = `tel:${t.contact.phone.replace(/\s/g, '')}`}
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {t.contact.phone}
                </Button>
              </div>

              {/* Info Items */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#e6eef5] rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#00477f]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-slate-900 mb-0.5 sm:mb-1 text-sm sm:text-base">
                      {lang === 'zh-TW' ? '診所地址' : 'Clinic Address'}
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                      {t.contact.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#e6eef5] rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#00477f]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-slate-900 mb-0.5 sm:mb-1 text-sm sm:text-base">
                      {lang === 'zh-TW' ? '營業時間' : 'Operating Hours'}
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      {t.contact.hours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#e6eef5] rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#00477f]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-slate-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Email</h4>
                    <a href={`mailto:${t.contact.email}`} className="text-slate-600 hover:text-[#00477f] transition-colors text-xs sm:text-sm break-all">
                      {t.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map - Right Side */}
            <div className="lg:col-span-3 h-[300px] sm:h-[350px] lg:h-auto min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
              <div className="bg-slate-100 rounded-2xl sm:rounded-3xl overflow-hidden h-full border border-slate-200">
                <ClinicMap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 md:mb-4 tracking-tight">{t.faq.title}</h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-[#00477f] mx-auto rounded-full mb-4 md:mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed px-4">
              {lang === 'zh-TW' ? '查找有關我們治療項目和服務的常見問題答案' : 'Find answers to common questions about our procedures and services'}
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {t.faq.items.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-200">
                <AccordionTrigger className="text-left font-medium text-sm sm:text-base text-black hover:no-underline py-3 sm:py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 text-slate-800 py-10 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 mb-8 sm:mb-10">
            <div className="md:col-span-5">
              <img 
                src="/BEVA1.svg" 
                alt="BEVA Clinic" 
                className="h-10 sm:h-12 w-auto mb-3 sm:mb-4"
              />
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm">
                {t.footer.aboutText}
              </p>
            </div>
            
            <div className="md:col-span-3 md:col-start-7">
              <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-[#00477f]">{t.footer.quickLinks}</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-slate-700 text-xs sm:text-sm">
                <li><a href={`/${lang}#procedures`} className="hover:text-[#00477f] transition-colors">{t.nav.procedures}</a></li>
                <li><a href={`/${lang}#about`} className="hover:text-[#00477f] transition-colors">{t.nav.about}</a></li>
                <li><a href={`/${lang}#contact`} className="hover:text-[#00477f] transition-colors">{t.nav.contact}</a></li>
                <li><a href={`/${lang}#faq`} className="hover:text-[#00477f] transition-colors">{t.nav.faq}</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-4">
              <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-[#00477f]">{t.footer.contactInfo}</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-slate-700 text-xs sm:text-sm">
                <li className="break-words">{t.contact.address}</li>
                <li className="text-[#00477f] font-semibold">{t.contact.phone}</li>
                <li className="break-all">{t.contact.email}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-300 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <p className="text-slate-600 text-xs sm:text-sm text-center sm:text-left">
              {t.footer.copyright}
            </p>
            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="text-gray-400 hover:text-[#00477f] text-xs sm:text-sm transition-colors">
                {lang === 'zh-TW' ? '私隱政策' : 'Privacy Policy'}
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00477f] text-xs sm:text-sm transition-colors">
                {lang === 'zh-TW' ? '服務條款' : 'Terms of Service'}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
