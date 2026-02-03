'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Locale, i18n } from '@/i18n/config';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLang: Locale;
  dictionary: {
    language: {
      english: string;
      chinese: string;
      switch: string;
    };
  };
}

export function LanguageSwitcher({ currentLang, dictionary }: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Remove the current locale from pathname and create new path
  const getPathWithoutLocale = () => {
    const segments = pathname.split('/');
    if (segments[1] && i18n.locales.includes(segments[1] as Locale)) {
      return '/' + segments.slice(2).join('/');
    }
    return pathname;
  };

  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-700 hover:text-black">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">
            {currentLang === 'en' ? dictionary.language.english : dictionary.language.chinese}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link 
            href={`/en${pathWithoutLocale}`}
            className={currentLang === 'en' ? 'font-semibold bg-slate-100' : ''}
          >
            {dictionary.language.english}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            href={`/zh-TW${pathWithoutLocale}`}
            className={currentLang === 'zh-TW' ? 'font-semibold bg-slate-100' : ''}
          >
            {dictionary.language.chinese}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
