
import React, { createContext, useState, useContext, useEffect } from "react";

type Language = "ar" | "en" | "fr" | "es" | "ur";

interface LanguageContextType {
  language: Language;
  changeLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple translation dictionary
const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Arabic translations
    "home": "الرئيسية",
    "login": "تسجيل الدخول",
    "register": "إنشاء حساب",
    "findTrucks": "البحث عن شاحنات",
    "dashboard": "لوحة التحكم",
    "chat": "المحادثات",
    "profile": "الملف الشخصي"
    // Add more translations as needed
  },
  en: {
    // English translations
    "home": "Home",
    "login": "Login",
    "register": "Register",
    "findTrucks": "Find Trucks",
    "dashboard": "Dashboard",
    "chat": "Messages",
    "profile": "Profile"
    // Add more translations as needed
  },
  fr: {
    // French translations
    "home": "Accueil",
    "login": "Connexion",
    "register": "S'inscrire",
    "findTrucks": "Rechercher des Camions",
    "dashboard": "Tableau de Bord",
    "chat": "Messages",
    "profile": "Profil"
    // Add more translations as needed
  },
  es: {
    // Spanish translations
    "home": "Inicio",
    "login": "Iniciar Sesión",
    "register": "Registrarse",
    "findTrucks": "Buscar Camiones",
    "dashboard": "Panel de Control",
    "chat": "Mensajes",
    "profile": "Perfil"
    // Add more translations as needed
  },
  ur: {
    // Urdu translations
    "home": "ہوم",
    "login": "لاگ ان",
    "register": "رجسٹر",
    "findTrucks": "ٹرک تلاش کریں",
    "dashboard": "ڈیش بورڈ",
    "chat": "پیغامات",
    "profile": "پروفائل"
    // Add more translations as needed
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Arabic
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || "ar";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.dir = language === "ar" || language === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
