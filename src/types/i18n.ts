export type SupportedLocale = 'en' | 'it';

export interface LocaleMessages {
  categoryManager: {
    title: string;
    subtitle: string;
    yourCategories: string;
  };
  search: {
    placeholder: string;
    searching: string;
    noCategoriesFound: string;
  };
  emptyState: {
    noCategoriesYet: string;
    description: string;
  };
  toast: {
    addedSuccessfully: string;
    alreadyAdded: string;
    removed: string;
  };
  loading: {
    loading: string;
  };
}

export interface I18nContextType {
  locale: SupportedLocale;
  messages: LocaleMessages;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string) => string;
} 