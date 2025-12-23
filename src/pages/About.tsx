import { Heart, Award, Users, Building, Target, Eye } from "lucide-react";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const stats = [
    { value: "50+", label: "Years of Excellence" },
    { value: "500+", label: "Medical Professionals" },
    { value: "100K+", label: "Patients Served" },
    { value: "50+", label: "Specializations" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We treat every patient with empathy, dignity, and respect, understanding that healing goes beyond medical treatment.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest standards in healthcare delivery, continuously improving our services and outcomes.",
    },
    {
      icon: Users,
      title: "Patient-Centered",
      description: "Our patients are at the heart of everything we do. We listen, understand, and personalize care for each individual.",
    },
    {
      icon: Building,
      title: "Innovation",
      description: "We embrace cutting-edge medical technologies and treatments to provide the best possible care for our community.",
    },
  ];

  const team = [
    { name: "Dr. Sarah Johnson", role: "Chief Medical Officer", specialty: "Internal Medicine" },
    { name: "Dr. Michael Chen", role: "Head of Surgery", specialty: "Cardiac Surgery" },
    { name: "Dr. Emily Williams", role: "Director of Emergency", specialty: "Emergency Medicine" },
    { name: "Dr. James Wilson", role: "Head of Pediatrics", specialty: "Pediatric Care" },
  ];

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />

      <main className="container py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">About MedCare Hospital</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            For over 50 years, MedCare Hospital has been a beacon of hope and healing in our community, 
            providing exceptional healthcare services with compassion and expertise.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label} 
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="animate-fade-in border-l-4 border-l-primary" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full medical-gradient flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary-foreground" />
                </div>
                <CardTitle>Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To provide accessible, high-quality healthcare to all members of our community, 
                combining advanced medical technology with compassionate human care. We are committed 
                to healing, education, and the advancement of medical science.
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in border-l-4 border-l-secondary" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Eye className="w-5 h-5 text-secondary-foreground" />
                </div>
                <CardTitle>Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To be the leading healthcare institution known for exceptional patient outcomes, 
                innovative treatments, and a culture of continuous improvement. We envision a 
                healthier community where everyone has access to world-class medical care.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={value.title} 
                className="animate-fade-in hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg medical-gradient flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leadership Team */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Our Leadership Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card 
                key={member.name} 
                className="text-center animate-fade-in hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="w-20 h-20 rounded-full medical-gradient mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-primary text-sm">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.specialty}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
