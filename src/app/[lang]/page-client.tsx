'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
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
  ArrowRight,
  Mail,
  User,
  X,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/get-dictionary';

// Extracted components
import { HeroCarousel } from '@/components/hero-carousel';
import { TestimonialCarousel } from '@/components/testimonial-carousel';
import { SectionHeader } from '@/components/section-header';
import { Footer } from '@/components/footer';
import { ChatWidget } from '@/components/chatbot';

// Dynamically import the map component to avoid SSR issues
const ClinicMap = dynamic(() => import('@/components/map').then((mod) => mod.ClinicMap), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-[400px] flex items-center justify-center bg-stone-50">
      <p className="text-stone-500">Loading map...</p>
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

  const openTreatmentDialog = (categoryIndex: number) => {
    setOpenDialogs(prev => ({ ...prev, [categoryIndex]: true }));
  };

  // Category names for chatbot
  const categoryNames: Record<string, Record<Locale, string>> = {};
  t.procedures.categories.forEach(cat => {
    categoryNames[cat.id] = {
      en: cat.name,
      'zh-TW': cat.name
    };
  });

  return (
    <main className="bg-white text-slate-900">
      {/* Hero Section with Auto-scrolling Carousel */}
      <HeroCarousel lang={lang} t={t} />

      {/* Procedures Section */}
      <section id="procedures" className="py-12 sm:py-16 md:py-24 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader 
            title={t.procedures.title} 
            subtitle={t.procedures.subtitle} 
          />

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {t.procedures.categories.map((category, catIndex) => (
              <Dialog 
                key={catIndex}
                open={openDialogs[catIndex]} 
                onOpenChange={(open) => setOpenDialogs(prev => ({ ...prev, [catIndex]: open }))}
              >
                <DialogTrigger asChild>
                  <button className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 hover:border-[#00477f]/20 h-full flex flex-col text-left">
                    {/* Category Image */}
                    <div className="aspect-[2/1] overflow-hidden bg-stone-100">
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
                  <DialogHeader className="sticky top-0 bg-white border-b px-4 sm:px-6 py-3 sm:py-4 z-10 flex flex-row items-center justify-between gap-3 text-left">
                    <div className="flex-1 min-w-0">
                      <DialogTitle className="text-lg sm:text-2xl font-bold text-slate-900 text-left">{category.name}</DialogTitle>
                      <p className="text-slate-500 text-xs sm:text-sm mt-0.5 sm:mt-1 hidden sm:block">{category.description}</p>
                    </div>
                    <DialogClose asChild>
                      <button className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 hover:scale-105 active:scale-95 flex items-center justify-center transition-all shrink-0">
                        <X className="w-4 h-4 text-slate-600" />
                      </button>
                    </DialogClose>
                  </DialogHeader>
                  
                  {/* Treatments List */}
                  <div className="p-3 sm:p-6 space-y-2 sm:space-y-3 overflow-y-auto max-h-[calc(100vh-180px)] sm:max-h-[60vh]">
                    {category.treatments.map((treatment, treatIndex) => (
                      <Dialog key={treatIndex}>
                        <DialogTrigger asChild>
                          <button className="w-full text-left bg-white border border-stone-200 hover:border-[#00477f]/30 hover:bg-sky-50/50 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 transition-all duration-200 group shadow-sm hover:shadow-md">
                            <div className="flex items-center justify-between gap-3 sm:gap-4">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-slate-900 text-sm sm:text-lg group-hover:text-[#00477f] transition-colors line-clamp-1">
                                  {treatment.title}
                                </h4>
                                <p className="text-slate-500 text-xs sm:text-sm mt-0.5 sm:mt-1 line-clamp-2 leading-relaxed">
                                  {treatment.shortDescription}
                                </p>
                              </div>
                              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-100 group-hover:bg-[#00477f] flex items-center justify-center shrink-0 transition-all">
                                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-white transition-colors" />
                              </div>
                            </div>
                          </button>
                        </DialogTrigger>
                        
                        <DialogContent className="max-w-3xl w-full h-full sm:h-auto sm:max-h-[85vh] overflow-hidden p-0 sm:rounded-2xl">
                          {/* Treatment Header with Close */}
                          <DialogHeader className="sticky top-0 bg-white border-b px-4 sm:px-6 py-3 sm:py-4 z-10 flex flex-row items-start justify-between gap-3 text-left">
                            <div className="flex-1 min-w-0 text-left">
                              <DialogTitle className="text-base sm:text-xl font-bold text-slate-900 leading-tight text-left">{treatment.title}</DialogTitle>
                              <p className="text-slate-500 text-xs sm:text-sm mt-0.5 line-clamp-2">{treatment.shortDescription}</p>
                            </div>
                            <DialogClose asChild>
                              <button className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 hover:scale-105 active:scale-95 flex items-center justify-center transition-all shrink-0">
                                <X className="w-4 h-4 text-slate-600" />
                              </button>
                            </DialogClose>
                          </DialogHeader>
                          
                          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-140px)] sm:max-h-[60vh]">
                            <div className="space-y-5 sm:space-y-6">
                              {/* Overview Section */}
                              <section className="bg-white">
                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                  <div className="w-1 h-4 sm:h-5 bg-[#00477f] rounded-full"></div>
                                  <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                                    {lang === 'zh-TW' ? '概述' : 'Overview'}
                                  </h3>
                                </div>
                                <div className="pl-3">
                                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">{treatment.fullDescription}</p>
                                </div>
                              </section>

                              {/* Benefits Section */}
                              <section>
                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                  <div className="w-1 h-4 sm:h-5 bg-[#00477f] rounded-full"></div>
                                  <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                                    {lang === 'zh-TW' ? '治療優點' : 'Benefits'}
                                  </h3>
                                </div>
                                <ul className="space-y-2 sm:space-y-2.5 pl-3">
                                  {treatment.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-2.5 sm:gap-3">
                                      <div className="w-5 h-5 sm:w-5 sm:h-5 rounded-full bg-[#00477f]/10 flex items-center justify-center shrink-0 mt-0">
                                        <Check className="w-3 h-3 sm:w-3 sm:h-3 text-[#00477f]" />
                                      </div>
                                      <span className="text-slate-700 text-xs sm:text-sm leading-relaxed flex-1">{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              </section>

                              {/* Recovery Section */}
                              <section className="bg-gradient-to-br from-sky-50/80 to-blue-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-sky-100">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
                                    <Clock className="w-4 h-4 sm:w-4 sm:h-4 text-[#00477f]" />
                                  </div>
                                  <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                                    {lang === 'zh-TW' ? '康復時間' : 'Recovery Time'}
                                  </h3>
                                </div>
                                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed pl-10 sm:pl-11">{treatment.recovery}</p>
                              </section>

                              {/* CTA Button */}
                              <div className="pt-2">
                                <Button 
                                  onClick={() => {
                                    setOpenDialogs(prev => ({ ...prev, [catIndex]: false }));
                                    setTimeout(scrollToContact, 100);
                                  }}
                                  className="w-full bg-[#00477f] text-white hover:bg-[#003d70] hover:shadow-lg hover:shadow-[#00477f]/20 py-4 sm:py-5 text-sm sm:text-base font-semibold transition-all"
                                >
                                  {t.contact.bookAppointment}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                  
                  {/* Dialog Footer */}
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
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader 
            title={t.team.title} 
            subtitle={t.team.subtitle} 
          />
          
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
                      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-stone-100 h-full">
                        {/* Photo Placeholder */}
                        <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-stone-100 to-stone-200 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center group-hover:from-sky-100 group-hover:to-blue-200 transition-all duration-500">
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
                          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-stone-50 rounded-full text-xs sm:text-sm text-slate-700 font-medium">
                            {doctor.experience}
                          </span>
                        </div>

                        {/* Quote */}
                        <p className="text-slate-500 text-center text-xs sm:text-sm italic mb-6 sm:mb-8 leading-relaxed line-clamp-2">
                          &ldquo;{doctor.bio.substring(0, 80)}...&rdquo;
                        </p>

                        {/* Actions */}
                        <div className="space-y-2 sm:space-y-3">
                          <Button 
                            variant="outline" 
                            className="w-full border-[#00477f] text-[#00477f] hover:bg-sky-50 py-4 sm:py-5 text-sm sm:text-base"
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
                    <DialogHeader className="sticky top-0 bg-white border-b px-4 sm:px-6 py-3 sm:py-4 z-10 flex flex-row items-start justify-between gap-3 text-left">
                      <div className="flex items-start gap-3 sm:gap-6">
                        <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-sky-100 to-blue-200 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-xl sm:text-2xl lg:text-3xl font-light text-[#00477f]">
                            {doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 pt-1 text-left">
                          <DialogTitle className="text-lg sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-0.5 leading-tight text-left">{doctor.name}</DialogTitle>
                          <p className="text-[#00477f] font-medium text-sm sm:text-base lg:text-lg">{doctor.title}</p>
                          <p className="text-slate-500 text-xs sm:text-sm">{doctor.specialty} • {doctor.experience}</p>
                        </div>
                      </div>
                      <DialogClose asChild>
                        <button className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 hover:scale-105 active:scale-95 flex items-center justify-center transition-all shrink-0">
                          <X className="w-4 h-4 text-slate-600" />
                        </button>
                      </DialogClose>
                    </DialogHeader>

                    <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-140px)] sm:max-h-[60vh]">
                      <div className="space-y-6 sm:space-y-8">
                        {/* Bio */}
                        <section className="bg-stone-50/50 rounded-xl sm:rounded-2xl p-4 sm:p-5">
                          <div className="flex items-center gap-2 mb-2 sm:mb-3">
                            <div className="w-1 h-4 sm:h-5 bg-[#00477f] rounded-full"></div>
                            <h3 className="font-semibold text-slate-900 text-base sm:text-lg">
                              {lang === 'zh-TW' ? '簡介' : 'About'}
                            </h3>
                          </div>
                          <p className="text-slate-700 text-sm leading-relaxed pl-3">{doctor.bio}</p>
                        </section>

                        {/* Expertise */}
                        <section>
                          <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#00477f]/10 flex items-center justify-center">
                              <Stethoscope className="w-4 h-4 sm:w-4 sm:h-4 text-[#00477f]" />
                            </div>
                            <h3 className="font-semibold text-slate-900 text-base sm:text-lg">{t.team.expertise}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2 pl-2">
                            {doctor.expertise.map((exp, i) => (
                              <span key={i} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-sky-50 to-blue-50 text-[#00477f] text-xs sm:text-sm rounded-full font-medium border border-sky-100">
                                {exp}
                              </span>
                            ))}
                          </div>
                        </section>

                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                          {/* Education */}
                          <section className="bg-white border border-stone-200 rounded-xl sm:rounded-2xl p-4 sm:p-5">
                            <div className="flex items-center gap-2 mb-2 sm:mb-3">
                              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00477f]/10 flex items-center justify-center">
                                <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00477f]" />
                              </div>
                              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">{t.team.education}</h3>
                            </div>
                            <ul className="space-y-2 sm:space-y-2.5">
                              {doctor.education.map((edu, i) => (
                                <li key={i} className="text-slate-700 text-xs sm:text-sm flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#00477f] mt-1.5 shrink-0"></span>
                                  <span className="leading-relaxed">{edu}</span>
                                </li>
                              ))}
                            </ul>
                          </section>

                          {/* Certifications */}
                          <section className="bg-white border border-stone-200 rounded-xl sm:rounded-2xl p-4 sm:p-5">
                            <div className="flex items-center gap-2 mb-2 sm:mb-3">
                              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00477f]/10 flex items-center justify-center">
                                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00477f]" />
                              </div>
                              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">{t.team.certifications}</h3>
                            </div>
                            <ul className="space-y-2 sm:space-y-2.5">
                              {doctor.certifications.map((cert, i) => (
                                <li key={i} className="text-slate-700 text-xs sm:text-sm flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#00477f] mt-1.5 shrink-0"></span>
                                  <span className="leading-relaxed">{cert}</span>
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
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
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
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
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
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
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
          <SectionHeader 
            title={t.contact.title} 
            subtitle={t.contact.subtitle} 
          />
          
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
                  className="w-full bg-white text-[#00477f] hover:bg-stone-100 py-4 sm:py-5 md:py-6 text-base sm:text-lg font-semibold"
                  onClick={() => window.location.href = `tel:${t.contact.phone.replace(/\s/g, '')}`}
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {t.contact.phone}
                </Button>
              </div>

              {/* Info Items */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#00477f]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-slate-900 mb-0.5 sm:mb-1 text-sm sm:text-base">
                      {lang === 'zh-TW' ? '診所地址' : 'Clinic Address'}
                    </h4>
                    <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                      {t.contact.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#00477f]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-slate-900 mb-0.5 sm:mb-1 text-sm sm:text-base">
                      {lang === 'zh-TW' ? '營業時間' : 'Operating Hours'}
                    </h4>
                    <p className="text-slate-700 text-xs sm:text-sm">
                      {t.contact.hours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#00477f]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-slate-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Email</h4>
                    <a href={`mailto:${t.contact.email}`} className="text-slate-700 hover:text-[#00477f] transition-colors text-xs sm:text-sm break-all">
                      {t.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map - Right Side */}
            <div className="lg:col-span-3 h-[300px] sm:h-[350px] lg:h-auto min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
              <div className="bg-stone-100 rounded-2xl sm:rounded-3xl overflow-hidden h-full border border-stone-200">
                <ClinicMap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-stone-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 md:mb-4 tracking-tight">{t.faq.title}</h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-[#00477f] mx-auto rounded-full mb-4 md:mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed px-4">
              {lang === 'zh-TW' ? '查找有關我們治療項目和服務的常見問題答案' : 'Find answers to common questions about our procedures and services'}
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {t.faq.items.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-stone-200">
                <AccordionTrigger className="text-left font-medium text-sm sm:text-base text-black hover:no-underline py-3 sm:py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <Footer lang={lang} t={t} />

      {/* Chatbot Widget */}
      <ChatWidget 
        lang={lang} 
        categoryNames={categoryNames}
        onOpenTreatmentDialog={openTreatmentDialog}
      />
    </main>
  );
}
