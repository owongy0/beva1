'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/get-dictionary';

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
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-slate-50 via-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
                {t.hero.title}
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                {t.hero.subtitle}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild className="bg-[#00477f] text-white hover:bg-[#00477f] px-8 py-6 text-lg font-semibold shadow-lg shadow-[#00477f]/20 transition-all hover:shadow-xl hover:shadow-[#00477f]/30">
                  <a href="#contact">{t.hero.bookConsultation}</a>
                </Button>
                <Button asChild variant="outline" className="border-2 border-[#00477f] text-[#00477f] hover:bg-[#f0f5fa] px-8 py-6 text-lg font-semibold transition-all">
                  <a href="#procedures">{t.hero.ourProcedures}</a>
                </Button>
              </div>
            </div>
            
            {/* Right - Hero Image */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src="/doctor-talking-with-male-patient-GettyImages-172600009-1040x615.jpg" 
                  alt="BEVA Clinic Medical Facility" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Procedures Section */}
      <section id="procedures" className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">{t.procedures.title}</h2>
            <div className="w-24 h-1.5 bg-[#00477f] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t.procedures.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {t.procedures.items.map((procedure, index) => {
              return (
                <Dialog 
                  key={index}
                  open={openDialogs[index]} 
                  onOpenChange={(open) => setOpenDialogs(prev => ({ ...prev, [index]: open }))}
                >
                  <DialogTrigger asChild>
                    <button className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-[#00477f]/20 h-full flex flex-col text-left">
                      {/* Title */}
                      <h3 className="font-bold text-slate-900 text-lg leading-tight mb-3 group-hover:text-[#00477f] transition-colors">
                        {procedure.title}
                      </h3>
                      
                      {/* Short description */}
                      <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow">
                        {procedure.shortDescription}
                      </p>
                      
                      {/* Learn more link */}
                      <div className="flex items-center gap-2 text-[#00477f] font-medium text-sm pt-4 border-t border-slate-100 group-hover:border-[#00477f]/20 transition-colors">
                        <span>{lang === 'zh-TW' ? '了解更多' : 'Learn more'}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-4xl w-[95vw] max-h-[85vh] overflow-y-auto">
                    <DialogHeader className="pb-6 border-b">
                      <div>
                        <DialogTitle className="text-2xl font-bold text-slate-900">{procedure.title}</DialogTitle>
                        <p className="text-slate-500 mt-2">{procedure.shortDescription}</p>
                      </div>
                    </DialogHeader>
                    
                    <div className="pt-8 space-y-8">
                      <section>
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">
                          {lang === 'zh-TW' ? '概述' : 'Overview'}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">{procedure.fullDescription}</p>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">
                          {lang === 'zh-TW' ? '治療優點' : 'Benefits'}
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {procedure.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-3 bg-slate-50 rounded-lg p-3">
                              <Check className="w-5 h-5 text-[#00477f] mt-0.5 shrink-0" />
                              <span className="text-slate-600 text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </section>

                      <section className="bg-gradient-to-r from-[#f8fafc] to-[#e6eef5] rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-[#00477f]" />
                          {lang === 'zh-TW' ? '康復時間' : 'Recovery'}
                        </h3>
                        <p className="text-slate-600">{procedure.recovery}</p>
                      </section>

                      {/* Placeholder for future video/content */}
                      <section className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center bg-slate-50/50">
                        <div className="text-slate-400">
                          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Stethoscope className="w-8 h-8 text-slate-300" />
                          </div>
                          <p className="text-sm">{lang === 'zh-TW' ? '視頻與詳細資料即將推出' : 'Video and detailed materials coming soon'}</p>
                        </div>
                      </section>

                      <Button 
                        onClick={() => {
                          setOpenDialogs(prev => ({ ...prev, [index]: false }));
                          setTimeout(scrollToContact, 100);
                        }}
                        className="w-full bg-[#00477f] text-white hover:bg-[#003d70] py-6 text-lg font-semibold shadow-lg shadow-[#00477f]/20"
                      >
                        {t.contact.bookAppointment}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {lang === 'zh-TW' ? '為何選擇我們' : 'Why Choose Us'}
            </h2>
            <div className="w-24 h-1.5 bg-[#00477f] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {lang === 'zh-TW' 
                ? '我們結合專業醫療團隊、先進微創技術與以病人為本的服務理念，為您提供安全、有效的治療方案。'
                : 'We combine expert medical teams, advanced minimally invasive techniques, and patient-centered care to deliver safe, effective treatments.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Expert Team */}
            <div className="bg-slate-50 rounded-2xl p-8 hover:bg-[#f0f5fa] transition-colors duration-300">
              <div className="w-14 h-14 bg-[#00477f]/10 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-[#00477f]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {lang === 'zh-TW' ? '專科醫生團隊' : 'Specialist Doctors'}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {lang === 'zh-TW'
                  ? '由資深血管介入專科醫生主理，具備豐富臨床經驗及國際專業認證。'
                  : 'Led by experienced interventional specialists with international certifications and proven clinical expertise.'}
              </p>
            </div>

            {/* Minimally Invasive */}
            <div className="bg-slate-50 rounded-2xl p-8 hover:bg-[#f0f5fa] transition-colors duration-300">
              <div className="w-14 h-14 bg-[#00477f]/10 rounded-xl flex items-center justify-center mb-6">
                <Stethoscope className="w-7 h-7 text-[#00477f]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {lang === 'zh-TW' ? '微創治療技術' : 'Minimally Invasive'}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {lang === 'zh-TW'
                  ? '採用先進血管內治療，傷口細小、恢復快，無需傳統開刀手術。'
                  : 'Advanced endovascular procedures with tiny incisions, faster recovery—no traditional open surgery needed.'}
              </p>
            </div>

            {/* Same-Day Discharge */}
            <div className="bg-slate-50 rounded-2xl p-8 hover:bg-[#f0f5fa] transition-colors duration-300">
              <div className="w-14 h-14 bg-[#00477f]/10 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-[#00477f]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {lang === 'zh-TW' ? '即日出院' : 'Same-Day Discharge'}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {lang === 'zh-TW'
                  ? '多數治療可於日間中心完成，當天即可回家休息，減少住院時間。'
                  : 'Most procedures done at our day procedure centre—return home the same day with minimal hospital stay.'}
              </p>
            </div>

            {/* Personalised Care */}
            <div className="bg-slate-50 rounded-2xl p-8 hover:bg-[#f0f5fa] transition-colors duration-300">
              <div className="w-14 h-14 bg-[#00477f]/10 rounded-xl flex items-center justify-center mb-6">
                <User className="w-7 h-7 text-[#00477f]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {lang === 'zh-TW' ? '個人化治療方案' : 'Personalised Care'}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {lang === 'zh-TW'
                  ? '根據每位病人的情況制定專屬治療計劃，確保最佳治療效果。'
                  : 'Tailored treatment plans based on your specific condition for optimal outcomes and peace of mind.'}
              </p>
            </div>

            {/* Modern Facilities */}
            <div className="bg-slate-50 rounded-2xl p-8 hover:bg-[#f0f5fa] transition-colors duration-300">
              <div className="w-14 h-14 bg-[#00477f]/10 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7 text-[#00477f]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {lang === 'zh-TW' ? '現代化醫療設施' : 'Modern Facilities'}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {lang === 'zh-TW'
                  ? '配備先進醫療設備的日間治療中心，提供安全舒適的治療環境。'
                  : 'State-of-the-art day procedure centre equipped with advanced medical technology in a comfortable setting.'}
              </p>
            </div>

            {/* Comprehensive Support */}
            <div className="bg-slate-50 rounded-2xl p-8 hover:bg-[#f0f5fa] transition-colors duration-300">
              <div className="w-14 h-14 bg-[#00477f]/10 rounded-xl flex items-center justify-center mb-6">
                <Phone className="w-7 h-7 text-[#00477f]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {lang === 'zh-TW' ? '全程跟進服務' : 'Ongoing Support'}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {lang === 'zh-TW'
                  ? '從諮詢到術後跟進，提供全程醫療支援，解答您的所有疑問。'
                  : 'From initial consultation through recovery, we provide continuous support and answer all your questions.'}
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button 
              onClick={scrollToContact}
              className="bg-[#00477f] text-white hover:bg-[#003d70] px-12 py-6 text-lg font-semibold shadow-lg shadow-[#00477f]/20"
            >
              {t.contact.bookAppointment}
            </Button>
          </div>
        </div>
      </section>
      {/* Meet Our Team Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">{t.team.title}</h2>
            <div className="w-24 h-1.5 bg-[#00477f] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t.team.subtitle}
            </p>
          </div>
          
          {/* Horizontal Scroll Carousel */}
          <div className="relative">
            {/* Scroll Buttons */}
            <button 
              onClick={() => document.getElementById('team-scroll')?.scrollBy({ left: -400, behavior: 'smooth' })}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-[#00477f] hover:shadow-xl transition-all -ml-4 lg:ml-0"
            >
              ←
            </button>
            <button 
              onClick={() => document.getElementById('team-scroll')?.scrollBy({ left: 400, behavior: 'smooth' })}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-[#00477f] hover:shadow-xl transition-all -mr-4 lg:mr-0"
            >
              →
            </button>

            {/* Scroll Container */}
            <div 
              id="team-scroll"
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {t.team.members.map((doctor, index) => (
                <Dialog 
                  key={index}
                  open={openTeamDialogs[index]} 
                  onOpenChange={(open) => setOpenTeamDialogs(prev => ({ ...prev, [index]: open }))}
                >
                  <DialogTrigger asChild>
                    <div className="snap-center shrink-0 w-[320px] sm:w-[380px]">
                      <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-slate-100 h-full">
                        {/* Photo Placeholder */}
                        <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:from-[#e6eef5] group-hover:to-[#d1e3f6] transition-all duration-500">
                          <span className="text-4xl font-light text-slate-400 group-hover:text-[#00477f]">
                            {doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </span>
                        </div>

                        {/* Name & Title */}
                        <div className="text-center mb-4">
                          <h3 className="font-bold text-slate-900 text-2xl mb-1 group-hover:text-[#00477f] transition-colors">
                            {doctor.name}
                          </h3>
                          <p className="text-[#00477f] font-medium">{doctor.title}</p>
                          <p className="text-slate-500 text-sm">{doctor.specialty}</p>
                        </div>

                        {/* Experience Badge */}
                        <div className="flex justify-center mb-6">
                          <span className="px-4 py-2 bg-slate-50 rounded-full text-sm text-slate-600 font-medium">
                            {doctor.experience}
                          </span>
                        </div>

                        {/* Quote */}
                        <p className="text-slate-500 text-center text-sm italic mb-8 leading-relaxed">
                          "{doctor.bio.substring(0, 100)}..."
                        </p>

                        {/* Actions */}
                        <div className="space-y-3">
                          <Button 
                            variant="outline" 
                            className="w-full border-[#00477f] text-[#00477f] hover:bg-[#f0f5fa]"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenTeamDialogs(prev => ({ ...prev, [index]: true }));
                            }}
                          >
                            {lang === 'zh-TW' ? '查看簡介' : 'View Profile'}
                          </Button>
                          <Button 
                            className="w-full bg-[#00477f] text-white hover:bg-[#003d70]"
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
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="pb-6 border-b">
                      <div className="flex items-start gap-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-[#e6eef5] to-[#d1e3f6] rounded-full flex items-center justify-center shrink-0">
                          <span className="text-3xl font-light text-[#00477f]">
                            {doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <DialogTitle className="text-3xl font-bold text-slate-900 mb-1">{doctor.name}</DialogTitle>
                          <p className="text-[#00477f] font-medium text-lg">{doctor.title}</p>
                          <p className="text-slate-500">{doctor.specialty} • {doctor.experience}</p>
                        </div>
                      </div>
                    </DialogHeader>

                    <div className="pt-6 space-y-8">
                      {/* Bio */}
                      <section>
                        <h3 className="font-semibold text-slate-900 mb-3 text-lg">
                          {lang === 'zh-TW' ? '簡介' : 'About'}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">{doctor.bio}</p>
                      </section>

                      {/* Expertise */}
                      <section>
                        <h3 className="font-semibold text-slate-900 mb-3 text-lg flex items-center gap-2">
                          <Stethoscope className="w-5 h-5 text-[#00477f]" />
                          {t.team.expertise}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {doctor.expertise.map((exp, i) => (
                            <span key={i} className="px-4 py-2 bg-[#f0f5fa] text-[#00477f] text-sm rounded-full font-medium">
                              {exp}
                            </span>
                          ))}
                        </div>
                      </section>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Education */}
                        <section>
                          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-[#00477f]" />
                            {t.team.education}
                          </h3>
                          <ul className="space-y-2">
                            {doctor.education.map((edu, i) => (
                              <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                                <span className="text-[#00477f] mt-1">•</span>
                                {edu}
                              </li>
                            ))}
                          </ul>
                        </section>

                        {/* Certifications */}
                        <section>
                          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                            <Award className="w-5 h-5 text-[#00477f]" />
                            {t.team.certifications}
                          </h3>
                          <ul className="space-y-2">
                            {doctor.certifications.map((cert, i) => (
                              <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
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
                        className="w-full bg-[#00477f] text-white hover:bg-[#003d70] py-6 text-lg font-semibold shadow-lg shadow-[#00477f]/20"
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

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">{t.contact.title}</h2>
            <div className="w-24 h-1.5 bg-[#00477f] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t.contact.subtitle}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Info - Left Side */}
            <div className="lg:col-span-2 space-y-8">
              {/* Main CTA Card */}
              <div className="bg-gradient-to-br from-[#00477f] to-[#003d70] rounded-3xl p-8 text-white shadow-xl shadow-[#00477f]/20">
                <h3 className="text-2xl font-bold mb-3">
                  {lang === 'zh-TW' ? '預約諮詢' : 'Book a Consultation'}
                </h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  {lang === 'zh-TW' 
                    ? '與我們的專科醫生團隊預約初步諮詢，討論您的治療選項。'
                    : 'Schedule an initial consultation with our specialist team to discuss your treatment options.'}
                </p>
                <Button 
                  className="w-full bg-white text-[#00477f] hover:bg-slate-100 py-6 text-lg font-semibold"
                  onClick={() => window.location.href = `tel:${t.contact.phone.replace(/\s/g, '')}`}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {t.contact.phone}
                </Button>
              </div>

              {/* Info Items */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#e6eef5] rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#00477f]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">
                      {lang === 'zh-TW' ? '診所地址' : 'Clinic Address'}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {t.contact.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#e6eef5] rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-[#00477f]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">
                      {lang === 'zh-TW' ? '營業時間' : 'Operating Hours'}
                    </h4>
                    <p className="text-slate-600">
                      {t.contact.hours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#e6eef5] rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-[#00477f]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                    <a href={`mailto:${t.contact.email}`} className="text-slate-600 hover:text-[#00477f] transition-colors">
                      {t.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map - Right Side */}
            <div className="lg:col-span-3 h-[400px] lg:h-auto min-h-[400px]">
              <div className="bg-slate-100 rounded-3xl overflow-hidden h-full border border-slate-200">
                <ClinicMap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">{t.faq.title}</h2>
            <div className="w-24 h-1.5 bg-[#00477f] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-600 leading-relaxed">
              {lang === 'zh-TW' ? '查找有關我們治療項目和服務的常見問題答案' : 'Find answers to common questions about our procedures and services'}
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {t.faq.items.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-200">
                <AccordionTrigger className="text-left font-medium text-black hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 text-slate-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
            <div className="md:col-span-5">
              <img 
                src="/BEVA1.svg" 
                alt="BEVA Clinic" 
                className="h-12 w-auto mb-4"
              />
              <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                {t.footer.aboutText}
              </p>
            </div>
            
            <div className="md:col-span-3 md:col-start-7">
              <h4 className="font-bold text-lg mb-4 text-[#00477f]">{t.footer.quickLinks}</h4>
              <ul className="space-y-2 text-slate-700">
                <li><a href={`/${lang}#procedures`} className="hover:text-[#00477f] transition-colors">{t.nav.procedures}</a></li>
                <li><a href={`/${lang}#about`} className="hover:text-[#00477f] transition-colors">{t.nav.about}</a></li>
                <li><a href={`/${lang}#contact`} className="hover:text-[#00477f] transition-colors">{t.nav.contact}</a></li>
                <li><a href={`/${lang}#faq`} className="hover:text-[#00477f] transition-colors">{t.nav.faq}</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-4">
              <h4 className="font-bold text-lg mb-4 text-[#00477f]">{t.footer.contactInfo}</h4>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li>{t.contact.address}</li>
                <li className="text-[#00477f] font-semibold">{t.contact.phone}</li>
                <li>{t.contact.email}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-300 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-600 text-sm">
              {t.footer.copyright}
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-[#00477f] text-sm transition-colors">
                {lang === 'zh-TW' ? '私隱政策' : 'Privacy Policy'}
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00477f] text-sm transition-colors">
                {lang === 'zh-TW' ? '服務條款' : 'Terms of Service'}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
