import { useState } from "react";
import { Search, Pill, AlertTriangle, Info, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: string;
  dosage: string;
  price: number;
  inStock: boolean;
  description: string;
  sideEffects: string[];
  usage: string;
}

const Medicines = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const medicines: Medicine[] = [
    {
      id: "1",
      name: "Paracetamol",
      genericName: "Acetaminophen",
      category: "Pain Relief",
      dosage: "500mg",
      price: 5.99,
      inStock: true,
      description: "Used to treat mild to moderate pain and reduce fever.",
      sideEffects: ["Nausea", "Allergic reactions (rare)", "Liver damage (overdose)"],
      usage: "Adults: 1-2 tablets every 4-6 hours. Maximum 8 tablets in 24 hours.",
    },
    {
      id: "2",
      name: "Amoxicillin",
      genericName: "Amoxicillin Trihydrate",
      category: "Antibiotics",
      dosage: "250mg",
      price: 12.99,
      inStock: true,
      description: "Broad-spectrum antibiotic used to treat bacterial infections.",
      sideEffects: ["Diarrhea", "Nausea", "Skin rash", "Allergic reactions"],
      usage: "As prescribed by physician. Complete full course even if symptoms improve.",
    },
    {
      id: "3",
      name: "Omeprazole",
      genericName: "Omeprazole",
      category: "Gastrointestinal",
      dosage: "20mg",
      price: 8.99,
      inStock: true,
      description: "Reduces stomach acid production for heartburn and GERD treatment.",
      sideEffects: ["Headache", "Nausea", "Diarrhea", "Stomach pain"],
      usage: "Take once daily before a meal, preferably in the morning.",
    },
    {
      id: "4",
      name: "Metformin",
      genericName: "Metformin HCl",
      category: "Diabetes",
      dosage: "500mg",
      price: 7.99,
      inStock: true,
      description: "First-line medication for Type 2 diabetes management.",
      sideEffects: ["Nausea", "Diarrhea", "Stomach upset", "Metallic taste"],
      usage: "Take with meals. Dosage as prescribed by your physician.",
    },
    {
      id: "5",
      name: "Lisinopril",
      genericName: "Lisinopril",
      category: "Cardiovascular",
      dosage: "10mg",
      price: 9.99,
      inStock: false,
      description: "ACE inhibitor for high blood pressure and heart failure.",
      sideEffects: ["Dry cough", "Dizziness", "Headache", "Fatigue"],
      usage: "Take once daily. Do not stop suddenly without consulting doctor.",
    },
    {
      id: "6",
      name: "Cetirizine",
      genericName: "Cetirizine HCl",
      category: "Allergy",
      dosage: "10mg",
      price: 6.99,
      inStock: true,
      description: "Antihistamine for allergy symptoms and hay fever.",
      sideEffects: ["Drowsiness", "Dry mouth", "Headache"],
      usage: "Take once daily. May be taken with or without food.",
    },
    {
      id: "7",
      name: "Ibuprofen",
      genericName: "Ibuprofen",
      category: "Pain Relief",
      dosage: "400mg",
      price: 6.49,
      inStock: true,
      description: "NSAID for pain, inflammation, and fever reduction.",
      sideEffects: ["Stomach upset", "Nausea", "Dizziness", "Heartburn"],
      usage: "Take with food or milk. Do not exceed recommended dose.",
    },
    {
      id: "8",
      name: "Atorvastatin",
      genericName: "Atorvastatin Calcium",
      category: "Cardiovascular",
      dosage: "20mg",
      price: 15.99,
      inStock: true,
      description: "Statin medication to lower cholesterol levels.",
      sideEffects: ["Muscle pain", "Headache", "Nausea", "Joint pain"],
      usage: "Take once daily, at any time, with or without food.",
    },
  ];

  const categories = [...new Set(medicines.map((m) => m.category))];

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.genericName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />

      <main className="container py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Pharmacy & Medicines</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our comprehensive medicine catalog. Always consult a healthcare professional before taking any medication.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search medicines..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Medicine Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedicines.map((medicine, index) => (
            <Card
              key={medicine.id}
              className="animate-fade-in hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-lg medical-gradient flex items-center justify-center">
                    <Pill className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <Badge variant={medicine.inStock ? "default" : "destructive"}>
                    {medicine.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                <CardTitle className="text-lg mt-3">{medicine.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{medicine.genericName}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Category:</span>
                    <span>{medicine.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Dosage:</span>
                    <span>{medicine.dosage}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-semibold text-primary">${medicine.price.toFixed(2)}</span>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full" size="sm">
                      <Info className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>{medicine.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">{medicine.description}</p>
                      
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-warning" />
                          Side Effects
                        </h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {medicine.sideEffects.map((effect) => (
                            <li key={effect}>{effect}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Usage Instructions</h4>
                        <p className="text-sm text-muted-foreground">{medicine.usage}</p>
                      </div>

                      <div className="bg-warning/10 p-3 rounded-lg">
                        <p className="text-sm text-warning font-medium">
                          ⚠️ Always consult a healthcare professional before taking any medication.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <Pill className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No medicines found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Medicines;
