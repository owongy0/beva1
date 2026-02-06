'use client';

import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/get-dictionary';

interface FooterProps {
  lang: Locale;
  t: Dictionary;
}

export function Footer({ lang, t }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-stone-50 to-stone-100 text-slate-800 py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
          {/* Brand & About */}
          <div className="md:col-span-5 lg:col-span-4">
            <img 
              src="/BEVA1.svg" 
              alt="BEVA Clinic" 
              className="h-10 sm:h-12 w-auto mb-4 sm:mb-5"
            />
            <p className="text-slate-700 text-sm leading-relaxed max-w-xs mb-6">
              {t.footer.aboutText}
            </p>
            
            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-sm text-slate-900 mb-3">
                {lang === 'zh-TW' ? '關注我們' : 'Follow Us'}
              </h4>
              <div className="flex flex-wrap gap-3">
                {/* Facebook */}
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white rounded-full shadow-sm border border-stone-200 flex items-center justify-center text-slate-500 hover:text-[#1877F2] hover:border-[#1877F2] hover:shadow-md transition-all duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                {/* Instagram */}
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white rounded-full shadow-sm border border-stone-200 flex items-center justify-center text-slate-500 hover:text-[#E4405F] hover:border-[#E4405F] hover:shadow-md transition-all duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                {/* YouTube */}
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white rounded-full shadow-sm border border-stone-200 flex items-center justify-center text-slate-500 hover:text-[#FF0000] hover:border-[#FF0000] hover:shadow-md transition-all duration-200"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                {/* WeChat */}
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white rounded-full shadow-sm border border-stone-200 flex items-center justify-center text-slate-500 hover:text-[#07C160] hover:border-[#07C160] hover:shadow-md transition-all duration-200"
                  aria-label="WeChat"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.032zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
                  </svg>
                </a>
                {/* Xiaohongshu */}
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white rounded-full shadow-sm border border-stone-200 flex items-center justify-center text-slate-500 hover:text-[#FF2442] hover:border-[#FF2442] hover:shadow-md transition-all duration-200"
                  aria-label="Xiaohongshu"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.615 14.154h-1.538v-3.077h-1.539v3.077h-3.076v-1.538h1.538v-1.539h-3.077V11.54h1.539V10h1.538v1.538h1.539V10h1.538v1.538h1.539v1.539h-1.539v1.538h1.538v1.539z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7 lg:col-span-3 lg:col-start-6">
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-5 text-[#00477f]">{t.footer.quickLinks}</h4>
            <ul className="space-y-3 text-slate-700 text-sm">
              <li>
                <a href={`/${lang}#procedures`} className="hover:text-[#00477f] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-stone-300 rounded-full group-hover:bg-[#00477f] transition-colors"></span>
                  {t.nav.procedures}
                </a>
              </li>
              <li>
                <a href={`/${lang}#about`} className="hover:text-[#00477f] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-stone-300 rounded-full group-hover:bg-[#00477f] transition-colors"></span>
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href={`/${lang}#contact`} className="hover:text-[#00477f] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-stone-300 rounded-full group-hover:bg-[#00477f] transition-colors"></span>
                  {t.nav.contact}
                </a>
              </li>
              <li>
                <a href={`/${lang}#faq`} className="hover:text-[#00477f] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-stone-300 rounded-full group-hover:bg-[#00477f] transition-colors"></span>
                  {t.nav.faq}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="font-bold text-base sm:text-lg mb-4 sm:mb-5 text-[#00477f]">{t.footer.contactInfo}</h4>
            <ul className="space-y-4 text-slate-700 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#00477f] mt-0.5 shrink-0" />
                <span className="leading-relaxed">{t.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#00477f] shrink-0" />
                <a href={`tel:${t.contact.phone.replace(/\s/g, '')}`} className="text-[#00477f] font-semibold hover:underline">
                  {t.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#00477f] mt-0.5 shrink-0" />
                <a href={`mailto:${t.contact.email}`} className="hover:text-[#00477f] transition-colors break-all">
                  {t.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-stone-200 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs sm:text-sm text-center sm:text-left">
              {t.footer.copyright}
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-[#00477f] text-xs sm:text-sm transition-colors">
                {lang === 'zh-TW' ? '私隱政策' : 'Privacy Policy'}
              </a>
              <a href="#" className="text-slate-400 hover:text-[#00477f] text-xs sm:text-sm transition-colors">
                {lang === 'zh-TW' ? '服務條款' : 'Terms of Service'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
