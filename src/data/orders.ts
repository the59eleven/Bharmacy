export interface Order {
  id: string;
  customer: string;
  products: number;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  date: string;
  items: string[];
}

export const orders: Order[] = [
  { id: "ORD-2841", customer: "BioLab Res...", products: 3, total: 284.56, status: "Pending", date: "2025-04-08", items: ["BPC-157", "TB-500", "CJC-1295"] },
  { id: "ORD-2842", customer: "PeptideWor...", products: 1, total: 52.73, status: "Pending", date: "2025-04-08", items: ["BPC-157"] },
  { id: "ORD-2843", customer: "ResearchCo...", products: 5, total: 621.4, status: "Pending", date: "2025-04-07", items: ["Epithalon", "Selank", "Semax", "DSIP", "LL-37"] },
  { id: "ORD-2844", customer: "GenSci Ins...", products: 2, total: 117.2, status: "Processing", date: "2025-04-07", items: ["Melanotan II", "PT-141"] },
  { id: "ORD-2845", customer: "VitaSource...", products: 4, total: 398.82, status: "Processing", date: "2025-04-06", items: ["IGF-1 LR3", "MGF", "CJC-1295", " sermorelin"] },
  { id: "ORD-2846", customer: "NeuroResea...", products: 2, total: 191.92, status: "Processing", date: "2025-04-06", items: ["Selank", "Semax"] },
  { id: "ORD-2847", customer: "PrimePept...", products: 1, total: 97.5, status: "Processing", date: "2025-04-05", items: ["Epithalon"] },
  { id: "ORD-2848", customer: "ClinTrial ...", products: 6, total: 745.3, status: "Shipped", date: "2025-04-04", items: ["Thymosin Alpha-1", "LL-37", " sermorelin", "AOD-9604", "Hexarelin", "BPC-157"] },
  { id: "ORD-2849", customer: "MedSupply ...", products: 3, total: 190.93, status: "Shipped", date: "2025-04-03", items: ["PT-141", "Melanotan II", "BPC-157"] },
  { id: "ORD-2850", customer: "LabCentral...", products: 2, total: 132.6, status: "Shipped", date: "2025-04-02", items: ["TB-500", " sermorelin"] },
  { id: "ORD-2851", customer: "BioSynth R...", products: 1, total: 156.2, status: "Shipped", date: "2025-04-01", items: ["IGF-1 LR3"] },
  { id: "ORD-2852", customer: "PeptideXpr...", products: 4, total: 264.8, status: "Delivered", date: "2025-03-28", items: ["HGH Fragment", "BPC-157", "Melanotan II", "TB-500"] },
  { id: "ORD-2853", customer: "CoreLabs S...", products: 2, total: 185.46, status: "Delivered", date: "2025-03-25", items: [" sermorelin", "Hexarelin"] },
  { id: "ORD-2854", customer: "ApexResear...", products: 3, total: 412.9, status: "Delivered", date: "2025-03-22", items: ["Epithalon", "Thymosin Alpha-1", "DSIP"] },
  { id: "ORD-2855", customer: "SynthGen B...", products: 5, total: 538.2, status: "Delivered", date: "2025-03-20", items: ["CJC-1295", "Ipamorelin", "GHRP-6", "AOD-9604", "Selank"] },
];
