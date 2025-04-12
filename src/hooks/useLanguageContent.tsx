
import { useLanguage } from "@/contexts/LanguageContext";

export const useLanguageContent = () => {
  const { language } = useLanguage();
  
  const getTruckTypesDescription = () => {
    switch (language) {
      case 'en':
        return "Choose your departure and destination to get offers from various truck types available";
      case 'fr':
        return "Choisissez votre point de départ et votre destination pour obtenir des offres de différents types de camions disponibles";
      case 'es':
        return "Elija su punto de partida y destino para recibir ofertas de varios tipos de camiones disponibles";
      case 'ur':
        return "دستیاب مختلف قسم کے ٹرکوں سے پیشکشیں حاصل کرنے کے لیے اپنی روانگی اور منزل کا انتخاب کریں۔";
      case 'hi':
        return "उपलब्ध विभिन्न प्रकार के ट्रकों से ऑफर प्राप्त करने के लिए अपने प्रस्थान और गंतव्य का चयन करें";
      case 'zh':
        return "选择您的出发地和目的地，以获得各种可用卡车类型的报价";
      case 'ar':
      default:
        return "اختر موقع الانطلاق والوجهة للحصول على عروض من مختلف أنواع الشاحنات المتاحة";
    }
  };

  const getPageTitle = () => {
    switch (language) {
      case 'en':
        return "Find Trucks";
      case 'fr':
        return "Rechercher des Camions";
      case 'es':
        return "Buscar Camiones";
      case 'ur':
        return "ٹرک تلاش کریں";
      case 'hi':
        return "ट्रक खोजें";
      case 'zh':
        return "寻找卡车";
      case 'ar':
      default:
        return "البحث عن شاحنات";
    }
  };

  // New function for getting dashboard content
  const getDashboardContent = () => {
    switch (language) {
      case 'en':
        return {
          title: "Dashboard",
          subtitle: "Manage your truck details and bookings",
          availableStatus: "Available for Bookings",
          unavailableStatus: "Currently Unavailable"
        };
      case 'fr':
        return {
          title: "Tableau de Bord",
          subtitle: "Gérer les détails de votre camion et les réservations",
          availableStatus: "Disponible pour les Réservations",
          unavailableStatus: "Actuellement Indisponible"
        };
      case 'es':
        return {
          title: "Panel de Control",
          subtitle: "Gestione los detalles de su camión y las reservas",
          availableStatus: "Disponible para Reservas",
          unavailableStatus: "Actualmente No Disponible"
        };
      case 'ur':
        return {
          title: "ڈیش بورڈ",
          subtitle: "اپنے ٹرک کی تفصیلات اور بکنگز کا انتظام کریں",
          availableStatus: "بکنگ کے لئے دستیاب",
          unavailableStatus: "فی الحال دستیاب نہیں"
        };
      case 'hi':
        return {
          title: "डैशबोर्ड",
          subtitle: "अपने ट्रक के विवरण और बुकिंग का प्रबंधन करें",
          availableStatus: "बुकिंग के लिए उपलब्ध",
          unavailableStatus: "वर्तमान में अनुपलब्ध"
        };
      case 'zh':
        return {
          title: "仪表板",
          subtitle: "管理您的卡车详情和预订",
          availableStatus: "可预订",
          unavailableStatus: "当前不可用"
        };
      case 'ar':
      default:
        return {
          title: "لوحة التحكم",
          subtitle: "إدارة تفاصيل الشاحنة والحجوزات",
          availableStatus: "متاح للحجز",
          unavailableStatus: "غير متاح حالياً"
        };
    }
  };

  // New function for chat content
  const getChatContent = () => {
    switch (language) {
      case 'en':
        return {
          title: "Messages",
          subtitle: "Chat with truck drivers or customers about your transportation needs",
          searchPlaceholder: "Search conversations",
          noConversations: "No conversations yet",
          findTrucksPrompt: "Find a truck and request a quote to start chatting",
          waitCustomers: "Wait for customer requests or search for potential jobs",
          selectConversation: "Select a conversation",
          selectPrompt: "Choose a conversation from the list to start chatting",
          messageInput: "Type a message...",
          online: "Online",
          offline: "Offline",
          away: "Away",
          back: "Back"
        };
      case 'fr':
        return {
          title: "Messages",
          subtitle: "Discutez avec des chauffeurs de camion ou des clients à propos de vos besoins de transport",
          searchPlaceholder: "Rechercher des conversations",
          noConversations: "Pas encore de conversations",
          findTrucksPrompt: "Trouvez un camion et demandez un devis pour commencer à discuter",
          waitCustomers: "Attendez les demandes des clients ou recherchez des emplois potentiels",
          selectConversation: "Sélectionnez une conversation",
          selectPrompt: "Choisissez une conversation dans la liste pour commencer à discuter",
          messageInput: "Tapez un message...",
          online: "En ligne",
          offline: "Hors ligne",
          away: "Absent",
          back: "Retour"
        };
      case 'es':
        return {
          title: "Mensajes",
          subtitle: "Chatea con conductores de camiones o clientes sobre tus necesidades de transporte",
          searchPlaceholder: "Buscar conversaciones",
          noConversations: "Aún no hay conversaciones",
          findTrucksPrompt: "Encuentra un camión y solicita un presupuesto para comenzar a chatear",
          waitCustomers: "Espera solicitudes de clientes o busca trabajos potenciales",
          selectConversation: "Selecciona una conversación",
          selectPrompt: "Elige una conversación de la lista para comenzar a chatear",
          messageInput: "Escribe un mensaje...",
          online: "En línea",
          offline: "Desconectado",
          away: "Ausente",
          back: "Volver"
        };
      case 'ur':
        return {
          title: "پیغامات",
          subtitle: "اپنی نقل و حمل کی ضروریات کے بارے میں ٹرک ڈرائیوروں یا گاہکوں سے چیٹ کریں",
          searchPlaceholder: "گفتگو تلاش کریں",
          noConversations: "ابھی تک کوئی گفتگو نہیں",
          findTrucksPrompt: "چیٹ شروع کرنے کے لیے ٹرک تلاش کریں اور قیمت کی درخواست کریں",
          waitCustomers: "گاہکوں کی درخواستوں کا انتظار کریں یا ممکنہ کاموں کی تلاش کریں",
          selectConversation: "ایک گفتگو منتخب کریں",
          selectPrompt: "چیٹ شروع کرنے کے لیے فہرست سے گفتگو منتخب کریں",
          messageInput: "پیغام لکھیں...",
          online: "آن لائن",
          offline: "آف لائن",
          away: "دور",
          back: "واپس"
        };
      case 'hi':
        return {
          title: "संदेश",
          subtitle: "अपनी परिवहन आवश्यकताओं के बारे में ट्रक चालकों या ग्राहकों के साथ चैट करें",
          searchPlaceholder: "वार्तालाप खोजें",
          noConversations: "अभी तक कोई वार्तालाप नहीं",
          findTrucksPrompt: "चैट शुरू करने के लिए ट्रक खोजें और कोटेशन का अनुरोध करें",
          waitCustomers: "ग्राहकों के अनुरोधों का इंतजार करें या संभावित कार्यों की खोज करें",
          selectConversation: "एक वार्तालाप चुनें",
          selectPrompt: "चैट शुरू करने के लिए सूची से एक वार्तालाप चुनें",
          messageInput: "संदेश टाइप करें...",
          online: "ऑनलाइन",
          offline: "ऑफलाइन",
          away: "अनुपस्थित",
          back: "वापस"
        };
      case 'zh':
        return {
          title: "消息",
          subtitle: "与卡车司机或客户聊天，了解您的运输需求",
          searchPlaceholder: "搜索对话",
          noConversations: "尚无对话",
          findTrucksPrompt: "找到卡车并请求报价以开始聊天",
          waitCustomers: "等待客户请求或搜索潜在工作",
          selectConversation: "选择对话",
          selectPrompt: "从列表中选择对话以开始聊天",
          messageInput: "输入消息...",
          online: "在线",
          offline: "离线",
          away: "离开",
          back: "返回"
        };
      case 'ar':
      default:
        return {
          title: "الرسائل",
          subtitle: "تحدث مع سائقي الشاحنات أو العملاء حول احتياجات النقل الخاصة بك",
          searchPlaceholder: "بحث عن محادثات",
          noConversations: "لا توجد محادثات بعد",
          findTrucksPrompt: "ابحث عن شاحنة واطلب عرض أسعار لبدء المحادثة",
          waitCustomers: "انتظر طلبات العملاء أو ابحث عن وظائف محتملة",
          selectConversation: "اختر محادثة",
          selectPrompt: "اختر محادثة من القائمة لبدء الدردشة",
          messageInput: "اكتب رسالة...",
          online: "متصل",
          offline: "غير متصل",
          away: "بعيد",
          back: "العودة"
        };
    }
  };
  
  return {
    getTruckTypesDescription,
    getPageTitle,
    getDashboardContent,
    getChatContent
  };
};
