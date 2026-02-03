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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Stethoscope,
  Heart,
  Activity,
  Users,
  Award,
  Check,
  MapPin,
  Phone,
  Clock,
  GraduationCap,
  Brain,
  ArrowRight,
  Microscope,
  Sparkles,
  Target,
} from 'lucide-react';
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

// Icon mapping for team members
const teamIcons = [Award, Stethoscope, GraduationCap, Award];

// Procedure icon mapping
const procedureIcons = [Brain, Heart, Activity, Users, Target, Microscope];

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
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">{t.procedures.title}</h2>
            <div className="w-24 h-1.5 bg-[#00477f] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t.procedures.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.procedures.items.map((procedure, index) => {
              const IconComponent = procedureIcons[index % procedureIcons.length];
              return (
                <Dialog 
                  key={index}
                  open={openDialogs[index]} 
                  onOpenChange={(open) => setOpenDialogs(prev => ({ ...prev, [index]: open }))}
                >
                  <DialogTrigger asChild>
                    <Card className="border-0 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col group overflow-hidden bg-white rounded-2xl border-t-4 border-t-[#00477f] hover:-translate-y-2">
                      <CardHeader className="flex-grow pb-4 pt-6">
                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                          <IconComponent className="w-12 h-12 text-[#00477f]" />
                        </div>
                        <CardTitle className="text-slate-900 text-xl font-bold group-hover:text-[#00477f] transition-colors duration-300 leading-tight">{procedure.title}</CardTitle>
                        <CardDescription className="text-slate-500 text-base mt-2 leading-relaxed">
                          {procedure.shortDescription}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 mt-auto pb-6">
                        <p className="text-center text-sm text-[#00477f] font-medium group-hover:text-[#00477f] transition-colors flex items-center justify-center gap-2">
                          {t.procedures.learnMore}
                          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl"><IconComponent className="w-10 h-10 text-[#00477f]" /></span>
                        <DialogTitle className="text-2xl">{procedure.title}</DialogTitle>
                      </div>
                      <DialogDescription className="text-gray-600">
                        {procedure.shortDescription}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-6">
                      <div>
                        <h3 className="font-semibold text-black mb-2">{t.procedures.learnMore}</h3>
                        <p className="text-gray-700 leading-relaxed">{procedure.fullDescription}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-black mb-2">
                          {lang === 'zh-TW' ? '治療優點' : 'Benefits'}
                        </h3>
                        <ul className="space-y-2">
                          {procedure.benefits.map((benefit, i) => (
                            <li key={i} className="text-gray-700 text-sm flex items-start gap-2">
                              <span className="text-[#00477f] mt-1">•</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-black mb-2">
                          {lang === 'zh-TW' ? '康復' : 'Recovery'}
                        </h3>
                        <p className="text-gray-700">{procedure.recovery}</p>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button 
                          onClick={() => {
                            setOpenDialogs(prev => ({ ...prev, [index]: false }));
                            setTimeout(scrollToContact, 100);
                          }}
                          className="w-full bg-[#00477f] text-white hover:bg-[#00477f] py-6 text-lg font-semibold shadow-lg shadow-[#00477f]/20"
                        >
                          {t.contact.bookAppointment}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">{t.whyUs.title}</h2>
            <div className="w-24 h-1.5 bg-[#00477f] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t.whyUs.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.whyUs.points.map((point, index) => (
              <div key={index} className="flex flex-col items-center text-center p-8 rounded-2xl bg-slate-50 hover:bg-[#f0f5fa]/50 transition-colors duration-300 group">
                <div className="w-16 h-16 bg-[#00477f] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-[#00477f]/20 group-hover:shadow-xl group-hover:shadow-[#00477f]/30 group-hover:scale-110 transition-all duration-300">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{point.title}</h3>
                <p className="text-slate-600 leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Meet Our Team Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">{t.team.title}</h2>
            <div className="w-24 h-1.5 bg-[#00477f] mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t.team.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.team.members.map((doctor, index) => {
              const IconComponent = teamIcons[index % teamIcons.length];
              return (
                <Dialog 
                  key={index}
                  open={openTeamDialogs[index]} 
                  onOpenChange={(open) => setOpenTeamDialogs(prev => ({ ...prev, [index]: open }))}
                >
                  <DialogTrigger asChild>
                    <Card className="border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden">
                      <CardHeader className="text-center pb-4">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300">
                          <IconComponent className="w-10 h-10 text-gray-600" />
                        </div>
                        <CardTitle className="text-lg group-hover:text-gray-700 transition-colors">{doctor.name}</CardTitle>
                        <CardDescription className="space-y-1">
                          <p className="font-medium text-black">{doctor.title}</p>
                          <p className="text-gray-500">{doctor.specialty}</p>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                          <Award className="w-4 h-4" />
                          <span>{doctor.experience}</span>
                        </div>
                        <p className="text-center text-xs text-gray-400 mt-3 group-hover:text-gray-500 transition-colors">
                          {lang === 'zh-TW' ? '點擊查看簡介' : 'Click to view profile'}
                        </p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-10 h-10 text-gray-600" />
                        </div>
                        <div>
                          <DialogTitle className="text-2xl mb-1">{doctor.name}</DialogTitle>
                          <DialogDescription className="text-base">
                            <span className="block font-medium text-black">{doctor.title}</span>
                            <span className="block text-gray-500">{doctor.specialty}</span>
                          </DialogDescription>
                        </div>
                      </div>
                    </DialogHeader>
                    <div className="mt-4 space-y-6">
                      {/* Education */}
                      <div>
                        <h3 className="font-semibold text-black mb-3 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5" />
                          {t.team.education}
                        </h3>
                        <ul className="space-y-2">
                          {doctor.education.map((edu, i) => (
                            <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                              <span className="text-black mt-1">•</span>
                              {edu}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Certifications */}
                      <div>
                        <h3 className="font-semibold text-black mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5" />
                          {t.team.certifications}
                        </h3>
                        <ul className="space-y-2">
                          {doctor.certifications.map((cert, i) => (
                            <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                              <span className="text-black mt-1">•</span>
                              {cert}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Expertise */}
                      <div>
                        <h3 className="font-semibold text-black mb-3 flex items-center gap-2">
                          <Stethoscope className="w-5 h-5" />
                          {t.team.expertise}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {doctor.expertise.map((exp, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Bio */}
                      <div>
                        <h3 className="font-semibold text-black mb-3">
                          {lang === 'zh-TW' ? '簡介' : 'About'}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{doctor.bio}</p>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button 
                          onClick={() => {
                            setOpenTeamDialogs(prev => ({ ...prev, [index]: false }));
                            setTimeout(scrollToContact, 100);
                          }}
                          className="w-full bg-[#00477f] text-white hover:bg-[#00477f] py-6 text-lg font-semibold shadow-lg shadow-[#00477f]/20"
                        >
                          {t.contact.bookAppointment}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
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
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-slate-900 flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-[#e6eef5] rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#00477f]" />
                    </div>
                    {lang === 'zh-TW' ? '地址' : 'Address'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">
                    {t.contact.address}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-slate-900 flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-[#e6eef5] rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#00477f]" />
                    </div>
                    {lang === 'zh-TW' ? '聯絡方式' : 'Contact'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-slate-600">{t.contact.phone}</p>
                  <p className="text-slate-600">{t.contact.email}</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-slate-900 flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-[#e6eef5] rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#00477f]" />
                    </div>
                    {lang === 'zh-TW' ? '營業時間' : 'Operating Hours'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-slate-600">
                    <p>{t.contact.hours}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="h-full min-h-[400px]">
              <Card className="relative isolate z-0 border-gray-200 h-full overflow-hidden">
                <CardContent className="p-0 h-full">
                  <ClinicMap />
                </CardContent>
              </Card>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-1">
              <img 
                src="/BEVA1.svg" 
                alt="BEVA Clinic" 
                className="h-12 w-auto mb-5"
              />
              <p className="text-slate-600 text-sm leading-relaxed">
                {t.footer.aboutText}
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-5 text-[#00477f]">{t.footer.quickLinks}</h4>
              <ul className="space-y-3 text-slate-700">
                <li><a href={`/${lang}#procedures`} className="hover:text-[#00477f] transition-colors">{t.nav.procedures}</a></li>
                <li><a href={`/${lang}#contact`} className="hover:text-[#00477f] transition-colors">{t.nav.contact}</a></li>
                <li><a href={`/${lang}#faq`} className="hover:text-[#00477f] transition-colors">{t.nav.faq}</a></li>
                <li><Link href={`/${lang}/bookings`} className="hover:text-[#00477f] transition-colors">{t.nav.myBookings}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-5 text-[#00477f]">{t.procedures.title}</h4>
              <ul className="space-y-3 text-slate-700">
                {t.procedures.items.slice(0, 3).map((proc, i) => (
                  <li key={i}><a href={`/${lang}#procedures`} className="hover:text-[#00477f] transition-colors">{proc.title}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-5 text-[#00477f]">{t.footer.contactInfo}</h4>
              <ul className="space-y-3 text-slate-700 text-sm">
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
