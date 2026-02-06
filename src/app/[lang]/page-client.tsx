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
  MessageCircle,
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
import { TestimonialShowcase } from '@/components/testimonial-showcase';
import { SectionHeader } from '@/components/section-header';
import { Footer } from '@/components/footer';
import { ChatWidget } from '@/components/chatbot';
import { TeamGrid } from '@/components/team-grid';

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
          
          <TeamGrid 
            lang={lang} 
            t={t} 
            onBookAppointment={scrollToContact}
          />
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

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left - Testimonial Showcase */}
            <TestimonialShowcase lang={lang} />

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
          
          <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 items-center">
            {/* Contact Info - Left Side */}
            <div className="lg:col-span-2 space-y-5 sm:space-y-6 flex flex-col justify-center h-full">
              {/* Main CTA Card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#00477f] to-[#003d70] rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 text-white shadow-xl shadow-[#00477f]/20">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                        {lang === 'zh-TW' ? '預約諮詢' : 'Book a Consultation'}
                      </h3>
                      <p className="text-white/70 text-xs sm:text-sm">
                        {lang === 'zh-TW' ? '專科醫生一對一諮詢' : 'One-on-one with our specialists'}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {lang === 'zh-TW' 
                      ? '與我們的專科醫生團隊預約初步諮詢，討論您的治療選項。'
                      : 'Schedule an initial consultation with our specialist team to discuss your treatment options.'}
                  </p>
                  
                  {/* Phone Button */}
                  <Button 
                    className="w-full bg-white text-[#00477f] hover:bg-stone-100 py-4 sm:py-5 text-sm sm:text-base font-semibold shadow-lg"
                    onClick={() => window.location.href = `tel:${t.contact.phone.replace(/\s/g, '')}`}
                  >
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    {t.contact.phone}
                  </Button>
                  
                  {/* WhatsApp Button */}
                  <Button 
                    variant="outline"
                    className="w-full border-2 border-white/80 text-white hover:bg-white/15 bg-transparent/10 py-3 sm:py-4 text-sm sm:text-base font-semibold backdrop-blur-sm mt-3"
                    onClick={() => window.open(`https://wa.me/${t.contact.whatsapp.replace(/\D/g, '')}`, '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {t.contact.whatsappLabel}
                  </Button>
                </div>
              </div>

              {/* Contact Info Cards - Two Rows */}
              <div className="space-y-3 sm:space-y-4">
                {/* Address Card */}
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(t.contact.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-[#00477f]/30 transition-all group"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#00477f]/10 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#00477f] transition-colors">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#00477f] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm sm:text-base mb-0.5">
                      {lang === 'zh-TW' ? '診所地址' : 'Clinic Address'}
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {t.contact.address}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#00477f] transition-colors shrink-0" />
                </a>

                {/* Hours Card */}
                <div className="flex items-center gap-4 p-4 sm:p-5 bg-white rounded-xl sm:rounded-2xl border border-stone-200 shadow-sm">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-50 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm sm:text-base mb-0.5">
                      {lang === 'zh-TW' ? '營業時間' : 'Opening Hours'}
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      {t.contact.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map - Right Side */}
            <div className="lg:col-span-3 h-[350px] sm:h-[400px] lg:h-auto min-h-[350px] sm:min-h-[400px] lg:min-h-[500px]">
              <div className="bg-stone-100 rounded-2xl sm:rounded-3xl overflow-hidden h-full border border-stone-200 shadow-lg">
                <ClinicMap />
              </div>
              {/* Map Caption */}
              <div className="mt-3 sm:mt-4 flex items-center gap-2 text-slate-500">
                <MapPin className="w-4 h-4 text-[#00477f]" />
                <p className="text-xs sm:text-sm">
                  {lang === 'zh-TW' ? '點擊地圖查看詳細位置' : 'Click map to view detailed location'}
                </p>
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
