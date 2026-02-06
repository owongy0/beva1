// Theme constants for BEVA Clinic
// Centralized color and styling values to maintain consistency

export const COLORS = {
  // Primary brand colors
  primary: '#00477f',
  primaryHover: '#003d70',
  primaryLight: '#e6eef5',
  
  // Accent colors
  sky: {
    50: 'bg-sky-50',
    100: 'bg-sky-100',
  },
  blue: {
    50: 'bg-blue-50',
    100: 'bg-blue-100',
    200: 'bg-blue-200',
  },
  
  // Neutral colors - using stone for warmth
  stone: {
    50: 'bg-stone-50',
    100: 'bg-stone-100',
    200: 'bg-stone-200',
  },
  
  // Text colors
  text: {
    primary: 'text-slate-900',
    secondary: 'text-slate-700',
    muted: 'text-slate-500',
  },
} as const;

// Section spacing constants
export const SPACING = {
  section: 'py-12 sm:py-16 md:py-24',
  sectionLarge: 'py-12 sm:py-16 md:py-24 lg:py-32',
  container: 'max-w-6xl mx-auto px-4 sm:px-6',
  containerWide: 'max-w-7xl mx-auto px-4 sm:px-6',
} as const;

// Common component classes
export const CLASSES = {
  // Section headers
  sectionTitle: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 md:mb-4 tracking-tight',
  sectionSubtitle: 'text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed px-4',
  accentBar: 'w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-[#00477f] mx-auto rounded-full mb-4 md:mb-6',
  
  // Cards
  card: 'bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300',
  cardBorder: 'border border-stone-100 hover:border-[#00477f]/20',
  
  // Buttons
  primaryButton: 'bg-[#00477f] text-white hover:bg-[#003d70] font-semibold shadow-lg shadow-[#00477f]/20 transition-all hover:shadow-xl hover:shadow-[#00477f]/30',
  outlineButton: 'border-2 border-[#00477f] text-[#00477f] hover:bg-sky-50 font-semibold transition-all',
  
  // Icons
  iconContainer: 'bg-sky-100 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0',
  iconContainerLarge: 'w-12 h-12 sm:w-14 sm:h-14 bg-[#00477f]/10 rounded-xl flex items-center justify-center shrink-0',
} as const;
