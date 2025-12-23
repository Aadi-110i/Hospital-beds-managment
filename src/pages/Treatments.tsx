import { useState } from "react";
import { 
  Heart, Brain, Bone, Eye, Baby, Stethoscope, 
  Activity, Microscope, Syringe, ChevronRight 
} from "lucide-react";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Treatment {
  id: string;
  name: string;
  department: string;
  icon: typeof Heart;
  description: string;
  procedures: string[];
  duration: string;
  availability: "Available" | "Limited" | "By Appointment";
}

const Treatments = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const treatments: Treatment[] = [
    {
      id: "cardiology",
      name: "Cardiology",
      department: "Heart & Vascular",
      icon: Heart,
      description: "Comprehensive cardiac care including diagnosis, treatment, and prevention of heart diseases.",
      procedures: [
        "Echocardiography",
        "Cardiac Catheterization",
        "Coronary Angioplasty",
        "Pacemaker Implantation",
        "Heart Failure Management",
        "Arrhythmia Treatment",
      ],
      duration: "Varies by procedure",
      availability: "Available",
    },
    {
      id: "neurology",
      name: "Neurology",
      department: "Brain & Spine",
      icon: Brain,
      description: "Expert care for disorders of the nervous system including brain, spinal cord, and nerves.",
      procedures: [
        "EEG (Electroencephalogram)",
        "MRI Brain Scans",
        "Stroke Treatment",
        "Epilepsy Management",
        "Movement Disorder Treatment",
        "Nerve Conduction Studies",
      ],
      duration: "30 mins - 4 hours",
      availability: "Available",
    },
    {
      id: "orthopedics",
      name: "Orthopedics",
      department: "Bones & Joints",
      icon: Bone,
      description: "Treatment of musculoskeletal conditions affecting bones, joints, muscles, and ligaments.",
      procedures: [
        "Joint Replacement Surgery",
        "Arthroscopic Surgery",
        "Fracture Treatment",
        "Sports Medicine",
        "Spine Surgery",
        "Physical Therapy",
      ],
      duration: "1-4 hours surgery",
      availability: "By Appointment",
    },
    {
      id: "ophthalmology",
      name: "Ophthalmology",
      department: "Eye Care",
      icon: Eye,
      description: "Complete eye care services from routine exams to complex surgical procedures.",
      procedures: [
        "Cataract Surgery",
        "LASIK Surgery",
        "Glaucoma Treatment",
        "Retinal Procedures",
        "Corneal Transplant",
        "Pediatric Eye Care",
      ],
      duration: "15 mins - 2 hours",
      availability: "Available",
    },
    {
      id: "pediatrics",
      name: "Pediatrics",
      department: "Child Health",
      icon: Baby,
      description: "Specialized healthcare for infants, children, and adolescents.",
      procedures: [
        "Well-Child Checkups",
        "Vaccinations",
        "Growth Monitoring",
        "Developmental Screening",
        "Pediatric Emergency Care",
        "Neonatal Care",
      ],
      duration: "20-60 mins",
      availability: "Available",
    },
    {
      id: "internal-medicine",
      name: "Internal Medicine",
      department: "General Health",
      icon: Stethoscope,
      description: "Primary care for adult patients focusing on prevention, diagnosis, and treatment.",
      procedures: [
        "Annual Health Checkups",
        "Chronic Disease Management",
        "Preventive Care",
        "Health Screenings",
        "Diabetes Management",
        "Hypertension Treatment",
      ],
      duration: "30-60 mins",
      availability: "Available",
    },
    {
      id: "emergency",
      name: "Emergency Medicine",
      department: "Critical Care",
      icon: Activity,
      description: "24/7 emergency services for acute illnesses, injuries, and life-threatening conditions.",
      procedures: [
        "Trauma Care",
        "Cardiac Emergency",
        "Stroke Response",
        "Accident Care",
        "Poison Treatment",
        "Critical Stabilization",
      ],
      duration: "Immediate",
      availability: "Available",
    },
    {
      id: "diagnostics",
      name: "Diagnostics",
      department: "Laboratory",
      icon: Microscope,
      description: "Advanced diagnostic services including imaging and laboratory tests.",
      procedures: [
        "Blood Tests",
        "MRI/CT Scans",
        "X-Ray & Ultrasound",
        "Biopsy Services",
        "Pathology",
        "Genetic Testing",
      ],
      duration: "15 mins - 2 hours",
      availability: "Available",
    },
    {
      id: "vaccination",
      name: "Vaccination Center",
      department: "Preventive Care",
      icon: Syringe,
      description: "Comprehensive vaccination services for all age groups.",
      procedures: [
        "COVID-19 Vaccines",
        "Flu Shots",
        "Travel Vaccines",
        "Childhood Immunizations",
        "HPV Vaccine",
        "Hepatitis Vaccines",
      ],
      duration: "15-30 mins",
      availability: "Limited",
    },
  ];

  const departments = [...new Set(treatments.map((t) => t.department))];

  const filteredTreatments = selectedDepartment
    ? treatments.filter((t) => t.department === selectedDepartment)
    : treatments;

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-success text-success-foreground";
      case "Limited":
        return "bg-warning text-warning-foreground";
      case "By Appointment":
        return "bg-primary text-primary-foreground";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />

      <main className="container py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Treatments & Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive range of medical treatments and specialized services 
            provided by our expert healthcare professionals.
          </p>
        </div>

        {/* Department Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={selectedDepartment === null ? "default" : "outline"}
            onClick={() => setSelectedDepartment(null)}
          >
            All Departments
          </Button>
          {departments.map((dept) => (
            <Button
              key={dept}
              variant={selectedDepartment === dept ? "default" : "outline"}
              onClick={() => setSelectedDepartment(dept)}
            >
              {dept}
            </Button>
          ))}
        </div>

        {/* Treatment Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((treatment, index) => (
            <Card
              key={treatment.id}
              className="animate-fade-in hover:shadow-lg transition-all group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-xl medical-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
                    <treatment.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <Badge className={getAvailabilityColor(treatment.availability)}>
                    {treatment.availability}
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-4">{treatment.name}</CardTitle>
                <p className="text-sm text-primary">{treatment.department}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">{treatment.description}</p>
                
                <Accordion type="single" collapsible>
                  <AccordionItem value="procedures" className="border-none">
                    <AccordionTrigger className="text-sm py-2">
                      View Procedures
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1">
                        {treatment.procedures.map((procedure) => (
                          <li key={procedure} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <ChevronRight className="w-4 h-4 text-primary" />
                            {procedure}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    Duration: {treatment.duration}
                  </span>
                  <Button size="sm" variant="outline">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Banner */}
        <Card className="mt-12 bg-destructive/10 border-destructive/20 animate-fade-in">
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-destructive flex items-center justify-center animate-pulse">
                <Activity className="w-6 h-6 text-destructive-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">24/7 Emergency Services</h3>
                <p className="text-sm text-muted-foreground">
                  For medical emergencies, call our emergency hotline immediately
                </p>
              </div>
            </div>
            <Button variant="destructive" size="lg">
              Call Emergency: 911
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Treatments;
