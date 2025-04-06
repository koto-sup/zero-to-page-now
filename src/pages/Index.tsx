
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-moprd-blue to-moprd-teal text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Refrigerated Truck Rentals on Demand
              </h1>
              <p className="text-xl mb-8 text-white/90">
                MOPRD connects you with nearby refrigerated truck drivers for all your cold transportation needs.
              </p>
              <div className="flex flex-wrap gap-4">
                {!user && (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="bg-white text-moprd-blue hover:bg-gray-100">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        Login
                      </Button>
                    </Link>
                  </>
                )}
                {user?.role === "customer" && (
                  <Link to="/find-trucks">
                    <Button size="lg" className="bg-white text-moprd-blue hover:bg-gray-100">
                      Find Available Trucks
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
                {user?.role === "driver" && (
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-white text-moprd-blue hover:bg-gray-100">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
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
                  alt="Refrigerated truck" 
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
          <h2 className="text-3xl font-bold text-center mb-12">How MOPRD Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-moprd-blue/10 rounded-full">
                  <Truck className="h-10 w-10 text-moprd-blue" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Nearby Trucks</h3>
              <p className="text-gray-600">
                Browse available refrigerated trucks in your area and choose one that meets your needs.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-moprd-blue/10 rounded-full">
                  <MessageSquare className="h-10 w-10 text-moprd-blue" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Request & Chat</h3>
              <p className="text-gray-600">
                Request a quote and chat directly with drivers to discuss your transportation needs.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-moprd-blue/10 rounded-full">
                  <Clock className="h-10 w-10 text-moprd-blue" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Book & Track</h3>
              <p className="text-gray-600">
                Accept a quote, schedule pickup and delivery, then track your shipment in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose MOPRD</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start p-4">
              <div className="flex-shrink-0 mr-4">
                <div className="p-2 bg-moprd-teal/20 rounded-full">
                  <Snowflake className="h-6 w-6 text-moprd-teal" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Temperature Controlled</h3>
                <p className="text-gray-600">All trucks are equipped with advanced refrigeration systems for safe transport.</p>
              </div>
            </div>
            <div className="flex items-start p-4">
              <div className="flex-shrink-0 mr-4">
                <div className="p-2 bg-moprd-teal/20 rounded-full">
                  <Clock className="h-6 w-6 text-moprd-teal" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">On-Demand Service</h3>
                <p className="text-gray-600">Book refrigerated trucks when you need them, where you need them.</p>
              </div>
            </div>
            <div className="flex items-start p-4">
              <div className="flex-shrink-0 mr-4">
                <div className="p-2 bg-moprd-teal/20 rounded-full">
                  <ShieldCheck className="h-6 w-6 text-moprd-teal" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Vetted Drivers</h3>
                <p className="text-gray-600">All drivers are verified and their vehicles regularly inspected for quality.</p>
              </div>
            </div>
            <div className="flex items-start p-4">
              <div className="flex-shrink-0 mr-4">
                <div className="p-2 bg-moprd-teal/20 rounded-full">
                  <MessageSquare className="h-6 w-6 text-moprd-teal" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Direct Communication</h3>
                <p className="text-gray-600">Chat directly with drivers to ensure your specific needs are met.</p>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link to={user ? (user.role === "customer" ? "/find-trucks" : "/dashboard") : "/register"}>
              <Button size="lg" className="bg-moprd-teal hover:bg-moprd-blue">
                {user ? (user.role === "customer" ? "Find a Truck Now" : "Access Driver Dashboard") : "Join MOPRD Today"}
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
              {!user && "Join the MOPRD Network Today"}
              {user?.role === "customer" && "Need to transport refrigerated goods?"}
              {user?.role === "driver" && "Ready to grow your refrigerated transport business?"}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {!user && "Whether you need refrigerated transport or want to offer your truck services, MOPRD connects everyone in the cold chain logistics network."}
              {user?.role === "customer" && "Find available refrigerated trucks in your area and get your goods moving with temperature-controlled confidence."}
              {user?.role === "driver" && "Complete your profile, set your availability, and start receiving booking requests from customers in your area."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {!user && (
                <>
                  <Link to="/register?role=customer">
                    <Button size="lg" className="bg-white text-moprd-blue hover:bg-gray-100">
                      Register as Customer
                    </Button>
                  </Link>
                  <Link to="/register?role=driver">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Register as Driver
                    </Button>
                  </Link>
                </>
              )}
              {user?.role === "customer" && (
                <Link to="/find-trucks">
                  <Button size="lg" className="bg-white text-moprd-blue hover:bg-gray-100">
                    Find Available Trucks
                  </Button>
                </Link>
              )}
              {user?.role === "driver" && (
                <Link to="/truck-details">
                  <Button size="lg" className="bg-white text-moprd-blue hover:bg-gray-100">
                    Complete Your Profile
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
