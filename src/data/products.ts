export interface Product {
  id: string;
  name: string;
  cas: string;
  type: string;
  supplier: string;
  stock: number;
  unitCost: number;
  markup: number;
  ourPrice: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

export const products: Product[] = [
  { id: "P001", name: "BPC-157", cas: "137525-51-0", type: "Research Peptide", supplier: "EV", stock: 45, unitCost: 28.5, markup: 85, ourPrice: 52.73, status: "In Stock" },
  { id: "P002", name: "TB-500", cas: "885340-08-9", type: "Research Peptide", supplier: "SC", stock: 32, unitCost: 35.0, markup: 72, ourPrice: 60.2, status: "In Stock" },
  { id: "P003", name: "CJC-1295 No DAC", cas: "863288-34-0", type: "Growth Factor", supplier: "EV", stock: 18, unitCost: 42.0, markup: 65, ourPrice: 69.3, status: "Low Stock" },
  { id: "P004", name: "Ipamorelin", cas: "170851-70-4", type: "Growth Factor", supplier: "DE", stock: 8, unitCost: 38.0, markup: 78, ourPrice: 67.64, status: "Low Stock" },
  { id: "P005", name: "Melanotan II", cas: "121062-08-6", type: "Research Peptide", supplier: "SC", stock: 56, unitCost: 22.0, markup: 95, ourPrice: 42.9, status: "In Stock" },
  { id: "P006", name: "GHRP-6", cas: "87616-84-0", type: "Growth Factor", supplier: "EV", stock: 0, unitCost: 30.0, markup: 60, ourPrice: 48.0, status: "Out of Stock" },
  { id: "P007", name: " sermorelin", cas: "86168-78-7", type: "Growth Factor", supplier: "DE", stock: 22, unitCost: 55.0, markup: 55, ourPrice: 85.25, status: "In Stock" },
  { id: "P008", name: "AOD-9604", cas: "221231-10-3", type: "Research Peptide", supplier: "SC", stock: 14, unitCost: 48.0, markup: 70, ourPrice: 81.6, status: "Low Stock" },
  { id: "P009", name: "Epithalon", cas: "307297-39-8", type: "Nootropic", supplier: "EV", stock: 67, unitCost: 65.0, markup: 50, ourPrice: 97.5, status: "In Stock" },
  { id: "P010", name: "DSIP", cas: "62568-57-4", type: "Nootropic", supplier: "DE", stock: 3, unitCost: 72.0, markup: 45, ourPrice: 104.4, status: "Out of Stock" },
  { id: "P011", name: "Selank", cas: "129954-34-3", type: "Nootropic", supplier: "SC", stock: 29, unitCost: 58.0, markup: 62, ourPrice: 93.96, status: "In Stock" },
  { id: "P012", name: "Semax", cas: "80714-61-0", type: "Nootropic", supplier: "EV", stock: 11, unitCost: 62.0, markup: 58, ourPrice: 97.96, status: "Low Stock" },
  { id: "P013", name: "LL-37", cas: "154939-52-1", type: "Research Peptide", supplier: "DE", stock: 0, unitCost: 85.0, markup: 40, ourPrice: 119.0, status: "Out of Stock" },
  { id: "P014", name: "Thymosin Alpha-1", cas: "62304-98-7", type: "Research Peptide", supplier: "SC", stock: 38, unitCost: 95.0, markup: 35, ourPrice: 128.25, status: "In Stock" },
  { id: "P015", name: "MGF", cas: "62087-72-7", type: "Growth Factor", supplier: "EV", stock: 5, unitCost: 40.0, markup: 68, ourPrice: 67.2, status: "Out of Stock" },
  { id: "P016", name: "IGF-1 LR3", cas: "946870-92-4", type: "Growth Factor", supplier: "DE", stock: 19, unitCost: 110.0, markup: 42, ourPrice: 156.2, status: "Low Stock" },
  { id: "P017", name: "PT-141", cas: "189691-06-3", type: "Research Peptide", supplier: "SC", stock: 41, unitCost: 32.0, markup: 88, ourPrice: 60.16, status: "In Stock" },
  { id: "P018", name: "Hexarelin", cas: "140703-51-1", type: "Growth Factor", supplier: "EV", stock: 27, unitCost: 45.0, markup: 60, ourPrice: 72.0, status: "In Stock" },
  { id: "P019", name: "Tesamorelin", cas: "218949-48-5", type: "Growth Factor", supplier: "DE", stock: 6, unitCost: 150.0, markup: 30, ourPrice: 195.0, status: "Out of Stock" },
  { id: "P020", name: "HGH Fragment 176-191", cas: "66004-57-7", type: "Research Peptide", supplier: "SC", stock: 33, unitCost: 36.0, markup: 75, ourPrice: 63.0, status: "In Stock" },
];

export const productTypes = ["All", "Research Peptide", "Growth Factor", "Nootropic"];
