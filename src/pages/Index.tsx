import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Activity, Bed, Heart, Pill, Stethoscope, 
  ChevronRight, Phone, Clock, Shield, Users 
} from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: Bed,
      title: "Real-Time Bed Tracking",
      description: "Monitor bed availability across all departments instantly with our live tracking system.",
      href: "/beds",
    },
    {
      icon: Stethoscope,
      title: "Expert Treatments",
      description: "Access comprehensive treatment options from our specialized medical professionals.",
      href: "/treatments",
    },
    {
      icon: Pill,
      title: "Pharmacy Services",
      description: "Browse our complete medicine catalog with detailed information and availability.",
      href: "/medicines",
    },
    {
      icon: Heart,
      title: "AI Health Assistant",
      description: "Get instant medical advice and information from our AI-powered health assistant.",
      href: "/medicine-bot",
    },
  ];

  const stats = [
    { value: "500+", label: "Medical Staff" },
    { value: "24/7", label: "Emergency Care" },
    { value: "50+", label: "Specializations" },
    { value: "100K+", label: "Patients Served" },
  ];

  const services = [
    { icon: Shield, title: "Emergency Care", desc: "24/7 emergency services" },
    { icon: Users, title: "Family Medicine", desc: "Comprehensive family care" },
    { icon: Clock, title: "Quick Response", desc: "Fast diagnosis & treatment" },
    { icon: Phone, title: "Telemedicine", desc: "Virtual consultations" },
  ];

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />

      {/* Hero Section with Parallax */}
      <section 
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 medical-gradient opacity-10"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        
        <div className="container relative z-10 text-center py-20">
          <div 
            className="animate-fade-in"
            style={{ 
              opacity: Math.max(0, 1 - scrollY / 400),
              transform: `translateY(${scrollY * 0.2}px)` 
            }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Activity className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Advanced Healthcare Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Your Health, <br />
              <span className="text-primary">Our Priority</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Experience world-class healthcare with cutting-edge technology, 
              compassionate care, and a commitment to your well-being.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="gap-2">
                <Link to="/beds">
                  View Bed Availability
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover comprehensive healthcare services designed to meet all your medical needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={feature.title} to={feature.href}>
                <Card 
                  className={cn(
                    "h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in cursor-pointer group"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-xl medical-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Quality Healthcare at Your Fingertips
              </h2>
              <p className="text-muted-foreground mb-8">
                We provide comprehensive medical services with state-of-the-art facilities 
                and a team of experienced healthcare professionals dedicated to your care.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div 
                    key={service.title}
                    className="flex items-start gap-3 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{service.title}</h4>
                      <p className="text-sm text-muted-foreground">{service.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="mt-8" asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl medical-gradient opacity-20 absolute inset-4" />
              <Card className="relative">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-success/10 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center">
                        <Bed className="w-6 h-6 text-success-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold">Beds Available Now</p>
                        <p className="text-2xl font-bold text-success">45+</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold">Doctors On Duty</p>
                        <p className="text-2xl font-bold text-primary">50+</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-warning/10 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-warning flex items-center justify-center">
                        <Clock className="w-6 h-6 text-warning-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold">Avg. Wait Time</p>
                        <p className="text-2xl font-bold text-warning">15 min</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <Card className="medical-gradient overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Need Medical Assistance?
              </h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
                Our team is available 24/7 to help you with any medical emergencies or inquiries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/contact">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Us
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link to="/beds">View Available Beds</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t">
        <div className="container">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg medical-gradient">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">MedCare Hospital</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Providing quality healthcare services with compassion and expertise.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/beds" className="hover:text-primary">Bed Availability</Link></li>
                <li><Link to="/treatments" className="hover:text-primary">Treatments</Link></li>
                <li><Link to="/medicines" className="hover:text-primary">Pharmacy</Link></li>
                <li><Link to="/medicine-bot" className="hover:text-primary">AI Assistant</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
                <li><Link to="/auth" className="hover:text-primary">Sign In</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Emergency</h4>
              <p className="text-2xl font-bold text-primary mb-2">911</p>
              <p className="text-sm text-muted-foreground">24/7 Emergency Services</p>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 MedCare Hospital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
