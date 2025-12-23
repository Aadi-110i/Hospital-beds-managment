import { useState } from "react";
import { Bed, Filter, Grid, List, Search } from "lucide-react";
import Header from "@/components/Header";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type BedStatus = "available" | "occupied" | "reserved" | "maintenance";

interface BedInfo {
  id: string;
  bedNumber: string;
  ward: string;
  status: BedStatus;
  patientName?: string;
  admissionTime?: string;
  expectedDischarge?: string;
}

const BedAllocation = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BedStatus | "all">("all");
  const [wardFilter, setWardFilter] = useState<string>("all");

  // Generate 30 beds across different wards
  const beds: BedInfo[] = [
    // ICU - 6 beds
    { id: "icu-1", bedNumber: "ICU-001", ward: "ICU", status: "occupied", patientName: "John Doe", admissionTime: "2h ago", expectedDischarge: "3 days" },
    { id: "icu-2", bedNumber: "ICU-002", ward: "ICU", status: "occupied", patientName: "Jane Smith", admissionTime: "5h ago", expectedDischarge: "5 days" },
    { id: "icu-3", bedNumber: "ICU-003", ward: "ICU", status: "available" },
    { id: "icu-4", bedNumber: "ICU-004", ward: "ICU", status: "occupied", patientName: "Bob Wilson", admissionTime: "1d ago", expectedDischarge: "2 days" },
    { id: "icu-5", bedNumber: "ICU-005", ward: "ICU", status: "reserved" },
    { id: "icu-6", bedNumber: "ICU-006", ward: "ICU", status: "maintenance" },
    // General Ward - 10 beds
    { id: "gen-1", bedNumber: "GEN-001", ward: "General", status: "occupied", patientName: "Alice Brown", admissionTime: "3h ago" },
    { id: "gen-2", bedNumber: "GEN-002", ward: "General", status: "available" },
    { id: "gen-3", bedNumber: "GEN-003", ward: "General", status: "available" },
    { id: "gen-4", bedNumber: "GEN-004", ward: "General", status: "occupied", patientName: "Charlie Davis", admissionTime: "6h ago" },
    { id: "gen-5", bedNumber: "GEN-005", ward: "General", status: "maintenance" },
    { id: "gen-6", bedNumber: "GEN-006", ward: "General", status: "reserved" },
    { id: "gen-7", bedNumber: "GEN-007", ward: "General", status: "available" },
    { id: "gen-8", bedNumber: "GEN-008", ward: "General", status: "occupied", patientName: "Diana Evans", admissionTime: "1d ago" },
    { id: "gen-9", bedNumber: "GEN-009", ward: "General", status: "available" },
    { id: "gen-10", bedNumber: "GEN-010", ward: "General", status: "occupied", patientName: "Frank Garcia", admissionTime: "4h ago" },
    // Emergency - 6 beds
    { id: "er-1", bedNumber: "ER-001", ward: "Emergency", status: "occupied", patientName: "Emergency Patient 1", admissionTime: "30m ago" },
    { id: "er-2", bedNumber: "ER-002", ward: "Emergency", status: "available" },
    { id: "er-3", bedNumber: "ER-003", ward: "Emergency", status: "occupied", patientName: "Emergency Patient 2", admissionTime: "1h ago" },
    { id: "er-4", bedNumber: "ER-004", ward: "Emergency", status: "available" },
    { id: "er-5", bedNumber: "ER-005", ward: "Emergency", status: "reserved" },
    { id: "er-6", bedNumber: "ER-006", ward: "Emergency", status: "available" },
    // Pediatric - 4 beds
    { id: "ped-1", bedNumber: "PED-001", ward: "Pediatric", status: "occupied", patientName: "Child Patient 1", admissionTime: "4h ago" },
    { id: "ped-2", bedNumber: "PED-002", ward: "Pediatric", status: "available" },
    { id: "ped-3", bedNumber: "PED-003", ward: "Pediatric", status: "occupied", patientName: "Child Patient 2", admissionTime: "2h ago" },
    { id: "ped-4", bedNumber: "PED-004", ward: "Pediatric", status: "available" },
    // Maternity - 4 beds
    { id: "mat-1", bedNumber: "MAT-001", ward: "Maternity", status: "occupied", patientName: "Mother Patient 1", admissionTime: "8h ago" },
    { id: "mat-2", bedNumber: "MAT-002", ward: "Maternity", status: "available" },
    { id: "mat-3", bedNumber: "MAT-003", ward: "Maternity", status: "reserved" },
    { id: "mat-4", bedNumber: "MAT-004", ward: "Maternity", status: "occupied", patientName: "Mother Patient 2", admissionTime: "12h ago" },
  ];

  const wards = [...new Set(beds.map((b) => b.ward))];

  const filteredBeds = beds.filter((bed) => {
    const matchesSearch =
      bed.bedNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bed.patientName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || bed.status === statusFilter;
    const matchesWard = wardFilter === "all" || bed.ward === wardFilter;
    return matchesSearch && matchesStatus && matchesWard;
  });

  const stats = {
    total: beds.length,
    available: beds.filter((b) => b.status === "available").length,
    occupied: beds.filter((b) => b.status === "occupied").length,
    reserved: beds.filter((b) => b.status === "reserved").length,
    maintenance: beds.filter((b) => b.status === "maintenance").length,
  };

  const getStatusColor = (status: BedStatus) => {
    switch (status) {
      case "available":
        return "bg-success/20 border-success text-success";
      case "occupied":
        return "bg-destructive/20 border-destructive text-destructive";
      case "reserved":
        return "bg-warning/20 border-warning text-warning";
      case "maintenance":
        return "bg-muted border-muted-foreground text-muted-foreground";
    }
  };

  const getStatusBadge = (status: BedStatus) => {
    switch (status) {
      case "available":
        return <Badge className="bg-success">Available</Badge>;
      case "occupied":
        return <Badge variant="destructive">Occupied</Badge>;
      case "reserved":
        return <Badge className="bg-warning text-warning-foreground">Reserved</Badge>;
      case "maintenance":
        return <Badge variant="secondary">Maintenance</Badge>;
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Header />

      <main className="container py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Bed Allocation System</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time overview of all hospital beds. Click on a bed to view details or manage allocation.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          <Card className="animate-fade-in">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Beds</p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in border-success" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-success">{stats.available}</p>
              <p className="text-sm text-muted-foreground">Available</p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in border-destructive" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-destructive">{stats.occupied}</p>
              <p className="text-sm text-muted-foreground">Occupied</p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in border-warning" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-warning">{stats.reserved}</p>
              <p className="text-sm text-muted-foreground">Reserved</p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-bold text-muted-foreground">{stats.maintenance}</p>
              <p className="text-sm text-muted-foreground">Maintenance</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 animate-fade-in">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by bed number or patient name..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <Select value={wardFilter} onValueChange={setWardFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Ward" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Wards</SelectItem>
                    {wards.map((ward) => (
                      <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as BedStatus | "all")}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bed Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredBeds.map((bed, index) => (
              <Card
                key={bed.id}
                className={cn(
                  "animate-fade-in cursor-pointer hover:shadow-lg transition-all border-2",
                  getStatusColor(bed.status)
                )}
                style={{ animationDelay: `${index * 0.02}s` }}
              >
                <CardContent className="p-4 text-center">
                  <Bed className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-semibold text-sm">{bed.bedNumber}</p>
                  <p className="text-xs text-muted-foreground mb-2">{bed.ward}</p>
                  {bed.patientName && (
                    <p className="text-xs truncate">{bed.patientName}</p>
                  )}
                  <div className="mt-2">
                    {getStatusBadge(bed.status)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredBeds.map((bed, index) => (
              <Card
                key={bed.id}
                className="animate-fade-in hover:shadow-md transition-all"
                style={{ animationDelay: `${index * 0.02}s` }}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", getStatusColor(bed.status))}>
                      <Bed className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">{bed.bedNumber}</p>
                      <p className="text-sm text-muted-foreground">{bed.ward} Ward</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {bed.patientName && (
                      <p className="text-sm">{bed.patientName}</p>
                    )}
                    {bed.admissionTime && (
                      <p className="text-xs text-muted-foreground">Admitted: {bed.admissionTime}</p>
                    )}
                  </div>
                  <div>
                    {getStatusBadge(bed.status)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredBeds.length === 0 && (
          <div className="text-center py-12">
            <Bed className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No beds found matching your criteria.</p>
          </div>
        )}

        {/* Legend */}
        <Card className="mt-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-success" />
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-destructive" />
                <span className="text-sm">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-warning" />
                <span className="text-sm">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-muted-foreground" />
                <span className="text-sm">Maintenance</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BedAllocation;
