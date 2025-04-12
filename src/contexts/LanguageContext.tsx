
import React, { createContext, useState, useContext, useEffect } from "react";

export type Language = "ar" | "en" | "fr" | "es" | "ur" | "hi" | "zh";

interface LanguageContextType {
  language: Language;
  changeLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Enhanced translation dictionary with all 7 languages
const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Arabic translations
    "home": "الرئيسية",
    "login": "تسجيل الدخول",
    "register": "إنشاء حساب",
    "findTrucks": "البحث عن شاحنات",
    "dashboard": "لوحة التحكم",
    "chat": "المحادثات",
    "profile": "الملف الشخصي",
    "bookings": "الحجوزات",
    "trucksNearby": "شاحنات قريبة",
    "recentActivity": "النشاطات الأخيرة",
    "todaysEarnings": "أرباح اليوم",
    "bookingsThisWeek": "حجوزات هذا الأسبوع",
    "averageRating": "متوسط التقييم",
    "weeklyEarningsOverview": "نظرة عامة على الأرباح الأسبوعية",
    "newRequests": "طلبات جديدة",
    "respond": "الرد",
    "viewChat": "عرض المحادثة",
    "recentBookings": "الحجوزات الأخيرة",
    "viewAll": "عرض الكل",
    "customer": "العميل",
    "route": "المسار",
    "date": "التاريخ",
    "amount": "المبلغ",
    "status": "الحالة",
    "actions": "الإجراءات",
    "pending": "معلق",
    "inProgress": "قيد التنفيذ",
    "completed": "مكتمل",
    "editTruckProfile": "تعديل ملف الشاحنة",
    "availableForBookings": "متاح للحجز",
    "currentlyUnavailable": "غير متاح حالياً"
  },
  en: {
    // English translations
    "home": "Home",
    "login": "Login",
    "register": "Register",
    "findTrucks": "Find Trucks",
    "dashboard": "Dashboard",
    "chat": "Messages",
    "profile": "Profile",
    "bookings": "Bookings",
    "trucksNearby": "Trucks Nearby",
    "recentActivity": "Recent Activity",
    "todaysEarnings": "Today's Earnings",
    "bookingsThisWeek": "Bookings This Week",
    "averageRating": "Average Rating",
    "weeklyEarningsOverview": "Weekly Earnings Overview",
    "newRequests": "New Requests",
    "respond": "Respond",
    "viewChat": "View Chat",
    "recentBookings": "Recent Bookings",
    "viewAll": "View All",
    "customer": "Customer",
    "route": "Route",
    "date": "Date",
    "amount": "Amount",
    "status": "Status",
    "actions": "Actions",
    "pending": "Pending",
    "inProgress": "In Progress",
    "completed": "Completed",
    "editTruckProfile": "Edit Truck Profile",
    "availableForBookings": "Available for Bookings",
    "currentlyUnavailable": "Currently Unavailable"
  },
  fr: {
    // French translations
    "home": "Accueil",
    "login": "Connexion",
    "register": "S'inscrire",
    "findTrucks": "Rechercher des Camions",
    "dashboard": "Tableau de Bord",
    "chat": "Messages",
    "profile": "Profil",
    "bookings": "Réservations",
    "trucksNearby": "Camions à Proximité",
    "recentActivity": "Activité Récente",
    "todaysEarnings": "Gains d'Aujourd'hui",
    "bookingsThisWeek": "Réservations Cette Semaine",
    "averageRating": "Note Moyenne",
    "weeklyEarningsOverview": "Aperçu des Gains Hebdomadaires",
    "newRequests": "Nouvelles Demandes",
    "respond": "Répondre",
    "viewChat": "Voir la Discussion",
    "recentBookings": "Réservations Récentes",
    "viewAll": "Voir Tout",
    "customer": "Client",
    "route": "Itinéraire",
    "date": "Date",
    "amount": "Montant",
    "status": "Statut",
    "actions": "Actions",
    "pending": "En Attente",
    "inProgress": "En Cours",
    "completed": "Terminé",
    "editTruckProfile": "Modifier le Profil du Camion",
    "availableForBookings": "Disponible pour les Réservations",
    "currentlyUnavailable": "Actuellement Indisponible"
  },
  es: {
    // Spanish translations
    "home": "Inicio",
    "login": "Iniciar Sesión",
    "register": "Registrarse",
    "findTrucks": "Buscar Camiones",
    "dashboard": "Panel de Control",
    "chat": "Mensajes",
    "profile": "Perfil",
    "bookings": "Reservas",
    "trucksNearby": "Camiones Cercanos",
    "recentActivity": "Actividad Reciente",
    "todaysEarnings": "Ganancias de Hoy",
    "bookingsThisWeek": "Reservas Esta Semana",
    "averageRating": "Calificación Promedio",
    "weeklyEarningsOverview": "Resumen de Ganancias Semanales",
    "newRequests": "Nuevas Solicitudes",
    "respond": "Responder",
    "viewChat": "Ver Chat",
    "recentBookings": "Reservas Recientes",
    "viewAll": "Ver Todo",
    "customer": "Cliente",
    "route": "Ruta",
    "date": "Fecha",
    "amount": "Importe",
    "status": "Estado",
    "actions": "Acciones",
    "pending": "Pendiente",
    "inProgress": "En Progreso",
    "completed": "Completado",
    "editTruckProfile": "Editar Perfil del Camión",
    "availableForBookings": "Disponible para Reservas",
    "currentlyUnavailable": "Actualmente No Disponible"
  },
  ur: {
    // Urdu translations
    "home": "ہوم",
    "login": "لاگ ان",
    "register": "رجسٹر",
    "findTrucks": "ٹرک تلاش کریں",
    "dashboard": "ڈیش بورڈ",
    "chat": "پیغامات",
    "profile": "پروفائل",
    "bookings": "بکنگز",
    "trucksNearby": "قریبی ٹرک",
    "recentActivity": "حالیہ سرگرمی",
    "todaysEarnings": "آج کی کمائی",
    "bookingsThisWeek": "اس ہفتے کی بکنگز",
    "averageRating": "اوسط ریٹنگ",
    "weeklyEarningsOverview": "ہفتہ وار کمائی کا جائزہ",
    "newRequests": "نئی درخواستیں",
    "respond": "جواب دیں",
    "viewChat": "چیٹ دیکھیں",
    "recentBookings": "حالیہ بکنگز",
    "viewAll": "سب دیکھیں",
    "customer": "کسٹمر",
    "route": "راستہ",
    "date": "تاریخ",
    "amount": "رقم",
    "status": "حالت",
    "actions": "اقدامات",
    "pending": "زیر التواء",
    "inProgress": "جاری ہے",
    "completed": "مکمل",
    "editTruckProfile": "ٹرک پروفائل میں ترمیم کریں",
    "availableForBookings": "بکنگ کے لئے دستیاب",
    "currentlyUnavailable": "فی الحال دستیاب نہیں"
  },
  hi: {
    // Hindi translations
    "home": "होम",
    "login": "लॉगिन",
    "register": "रजिस्टर",
    "findTrucks": "ट्रक खोजें",
    "dashboard": "डैशबोर्ड",
    "chat": "संदेश",
    "profile": "प्रोफाइल",
    "bookings": "बुकिंग",
    "trucksNearby": "आस-पास के ट्रक",
    "recentActivity": "हालिया गतिविधि",
    "todaysEarnings": "आज की कमाई",
    "bookingsThisWeek": "इस सप्ताह की बुकिंग",
    "averageRating": "औसत रेटिंग",
    "weeklyEarningsOverview": "साप्ताहिक कमाई का अवलोकन",
    "newRequests": "नए अनुरोध",
    "respond": "जवाब दें",
    "viewChat": "चैट देखें",
    "recentBookings": "हालिया बुकिंग",
    "viewAll": "सभी देखें",
    "customer": "ग्राहक",
    "route": "मार्ग",
    "date": "तारीख",
    "amount": "राशि",
    "status": "स्थिति",
    "actions": "कार्रवाई",
    "pending": "लंबित",
    "inProgress": "प्रगति पर है",
    "completed": "पूर्ण",
    "editTruckProfile": "ट्रक प्रोफ़ाइल संपादित करें",
    "availableForBookings": "बुकिंग के लिए उपलब्ध",
    "currentlyUnavailable": "वर्तमान में अनुपलब्ध"
  },
  zh: {
    // Chinese translations
    "home": "主页",
    "login": "登录",
    "register": "注册",
    "findTrucks": "寻找卡车",
    "dashboard": "仪表板",
    "chat": "消息",
    "profile": "个人资料",
    "bookings": "预订",
    "trucksNearby": "附近的卡车",
    "recentActivity": "最近活动",
    "todaysEarnings": "今日收益",
    "bookingsThisWeek": "本周预订",
    "averageRating": "平均评分",
    "weeklyEarningsOverview": "每周收益概览",
    "newRequests": "新请求",
    "respond": "回复",
    "viewChat": "查看聊天",
    "recentBookings": "最近预订",
    "viewAll": "查看全部",
    "customer": "客户",
    "route": "路线",
    "date": "日期",
    "amount": "金额",
    "status": "状态",
    "actions": "操作",
    "pending": "待处理",
    "inProgress": "进行中",
    "completed": "已完成",
    "editTruckProfile": "编辑卡车资料",
    "availableForBookings": "可预订",
    "currentlyUnavailable": "当前不可用"
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
    document.documentElement.dir = ["ar", "ur"].includes(language) ? "rtl" : "ltr";
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
