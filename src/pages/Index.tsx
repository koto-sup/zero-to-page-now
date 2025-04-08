
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Truck, 
  Snowflake, 
  MessageSquare, 
  Clock,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative bg-gradient-to-br from-moprd-blue to-moprd-teal text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover opacity-20"
            autoPlay
            muted
            loop
            playsInline
            src="https://player.vimeo.com/external/373839498.sd.mp4?s=a93f4587a90551d713bc04abe5bca7af5f251082&profile_id=164&oauth2_token_id=57447761"
          >
            <source src="https://player.vimeo.com/external/373839498.sd.mp4?s=a93f4587a90551d713bc04abe5bca7af5f251082&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          </video>
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                شاحنات مبردة عند الطلب
              </h1>
              <p className="text-xl mb-8 text-white/90">
                زكرت يربطك مع سائقي الشاحنات المبردة القريبين لجميع احتياجات النقل البارد.
              </p>
              <div className="flex flex-wrap gap-4">
                {!user && (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="bg-white text-moprd-blue hover:bg-gray-100">
                        ابدأ الآن
                        <ArrowRight className="mr-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        تسجيل الدخول
                      </Button>
                    </Link>
                  </>
                )}
                {user?.role === "customer" && (
                  <Link to="/find-trucks">
                    <Button size="lg" className="bg-white text-moprd-blue hover:bg-gray-100">
                      ابحث عن الشاحنات المتاحة
                      <ArrowRight className="mr-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
                {user?.role === "driver" && (
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-white text-moprd-blue hover:bg-gray-100">
                      الذهاب إلى لوحة التحكم
                      <ArrowRight className="mr-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-moprd-cyan rounded-full opacity-20"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-moprd-light rounded-full opacity-20"></div>
              <div className="relative bg-white p-4 rounded-lg shadow-xl transform rotate-2">
                <img 
                  src="/placeholder.svg" 
                  alt="شاحنة مبردة" 
                  className="rounded w-full h-64 object-cover"
                />
                <div className="absolute -bottom-3 -right-3 bg-moprd-cyan text-moprd-blue p-2 rounded-lg shadow-lg">
                  <Snowflake className="h-10 w-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">كيف تعمل زكرت</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-moprd-blue/10 rounded-full">
                  <Truck className="h-10 w-10 text-moprd-blue" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">ابحث عن الشاحنات القريبة</h3>
              <p className="text-gray-600">
                تصفح الشاحنات المبردة المتاحة في منطقتك واختر ما يناسب احتياجاتك.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-moprd-blue/10 rounded-full">
                  <MessageSquare className="h-10 w-10 text-moprd-blue" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">طلب عروض أسعار والدردشة</h3>
              <p className="text-gray-600">
                اطلب عرض سعر وتحدث مباشرة مع السائقين لمناقشة احتياجات النقل الخاصة بك.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-moprd-blue/10 rounded-full">
                  <Clock className="h-10 w-10 text-moprd-blue" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">احجز وتتبع</h3>
              <p className="text-gray-600">
                اقبل العرض، وجدول موعد الاستلام والتسليم، ثم تتبع شحنتك في الوقت الحقيقي.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">لماذا تختار زكرت</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start p-4">
              <div className="flex-shrink-0 ml-4">
                <div className="p-2 bg-moprd-teal/20 rounded-full">
                  <Snowflake className="h-6 w-6 text-moprd-teal" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">التحكم في درجة الحرارة</h3>
                <p className="text-gray-600">جميع الشاحنات مجهزة بأنظمة تبريد متطورة للنقل الآمن.</p>
              </div>
            </div>
            <div className="flex items-start p-4">
              <div className="flex-shrink-0 ml-4">
                <div className="p-2 bg-moprd-teal/20 rounded-full">
                  <Clock className="h-6 w-6 text-moprd-teal" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">خدمة عند الطلب</h3>
                <p className="text-gray-600">احجز شاحنات مبردة عندما تحتاجها، وأينما تحتاجها.</p>
              </div>
            </div>
            <div className="flex items-start p-4">
              <div className="flex-shrink-0 ml-4">
                <div className="p-2 bg-moprd-teal/20 rounded-full">
                  <ShieldCheck className="h-6 w-6 text-moprd-teal" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">سائقون موثوقون</h3>
                <p className="text-gray-600">جميع السائقين تم التحقق منهم ويتم فحص مركباتهم بانتظام.</p>
              </div>
            </div>
            <div className="flex items-start p-4">
              <div className="flex-shrink-0 ml-4">
                <div className="p-2 bg-moprd-teal/20 rounded-full">
                  <MessageSquare className="h-6 w-6 text-moprd-teal" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">تواصل مباشر</h3>
                <p className="text-gray-600">تحدث مباشرة مع السائقين للتأكد من تلبية احتياجاتك.</p>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link to={user ? (user.role === "customer" ? "/find-trucks" : "/dashboard") : "/register"}>
              <Button size="lg" className="bg-moprd-teal hover:bg-moprd-blue">
                {user ? (user.role === "customer" ? "ابحث عن شاحنة الآن" : "الوصول إلى لوحة تحكم السائق") : "انضم إلى زكرت اليوم"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-moprd-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              {!user && "انضم إلى شبكة زكرت اليوم"}
              {user?.role === "customer" && "هل تحتاج إلى نقل بضائع مبردة؟"}
              {user?.role === "driver" && "جاهز لتنمية أعمالك في مجال النقل المبرد؟"}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {!user && "سواء كنت بحاجة إلى نقل مبرد أو ترغب في تقديم خدمات شاحنتك، تربط زكرت الجميع في شبكة لوجستية للسلسلة الباردة."}
              {user?.role === "customer" && "ابحث عن الشاحنات المبردة المتاحة في منطقتك وانقل بضائعك بثقة مع التحكم في درجة الحرارة."}
              {user?.role === "driver" && "أكمل ملفك الشخصي، وحدد توفرك، وابدأ في تلقي طلبات الحجز من العملاء في منطقتك."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {!user && (
                <>
                  <Link to="/register?role=customer">
                    <Button size="lg" className="bg-white text-moprd-blue hover:bg-gray-100">
                      التسجيل كعميل
                    </Button>
                  </Link>
                  <Link to="/register?role=driver">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      التسجيل كسائق
                    </Button>
                  </Link>
                </>
              )}
              {user?.role === "customer" && (
                <Link to="/find-trucks">
                  <Button size="lg" className="bg-white text-moprd-blue hover:bg-gray-100">
                    البحث عن الشاحنات المتاحة
                  </Button>
                </Link>
              )}
              {user?.role === "driver" && (
                <Link to="/truck-details">
                  <Button size="lg" className="bg-white text-moprd-blue hover:bg-gray-100">
                    أكمل ملفك الشخصي
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
