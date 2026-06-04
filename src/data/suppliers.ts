export interface Supplier {
  id: string;
  name: string;
  code: string;
  reliability: number;
  grade: string;
  productCount: number;
  totalVolume: number;
  avgMargin: number;
  status: "Active" | "Review" | "Hold";
}

export const suppliers: Supplier[] = [
  { id: "S001", name: "EuroVial Labs", code: "EV", reliability: 4, grade: "A+", productCount: 7, totalVolume: 142500, avgMargin: 62, status: "Active" },
  { id: "S002", name: "SciCore Biotech", code: "SC", reliability: 5, grade: "A", productCount: 5, totalVolume: 187300, avgMargin: 72, status: "Active" },
  { id: "S003", name: "DeutscheSynth GmbH", code: "DE", reliability: 3, grade: "B+", productCount: 6, totalVolume: 98400, avgMargin: 55, status: "Review" },
];

export const monthlyRevenue = [
  { month: "Jan", revenue: 12400 },
  { month: "Feb", revenue: 15200 },
  { month: "Mar", revenue: 18700 },
  { month: "Apr", revenue: 22100 },
  { month: "May", revenue: 19800 },
  { month: "Jun", revenue: 25400 },
  { month: "Jul", revenue: 31200 },
  { month: "Aug", revenue: 28900 },
  { month: "Sep", revenue: 34500 },
  { month: "Oct", revenue: 37800 },
  { month: "Nov", revenue: 42100 },
  { month: "Dec", revenue: 38900 },
];

export const topProducts = [
  { name: "Melanotan II", revenue: 89400, margin: 95 },
  { name: "BPC-157", revenue: 72300, margin: 85 },
  { name: "PT-141", revenue: 61200, margin: 88 },
  { name: "Epithalon", revenue: 58700, margin: 50 },
  { name: "Selank", revenue: 44500, margin: 62 },
];
