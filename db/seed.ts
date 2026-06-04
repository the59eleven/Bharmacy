import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL ?? "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const products = [
  { sku: "P001", name: "BPC-157", cas_number: "137525-51-0", type: "Research Peptide", supplier: "EV", stock: 45, unit_cost: 28.5, markup: 85, our_price: 52.73, status: "In Stock" },
  { sku: "P002", name: "TB-500", cas_number: "885340-08-9", type: "Research Peptide", supplier: "SC", stock: 32, unit_cost: 35.0, markup: 72, our_price: 60.2, status: "In Stock" },
  { sku: "P003", name: "CJC-1295 No DAC", cas_number: "863288-34-0", type: "Growth Factor", supplier: "EV", stock: 18, unit_cost: 42.0, markup: 65, our_price: 69.3, status: "Low Stock" },
  { sku: "P004", name: "Ipamorelin", cas_number: "170851-70-4", type: "Growth Factor", supplier: "DE", stock: 8, unit_cost: 38.0, markup: 78, our_price: 67.64, status: "Low Stock" },
  { sku: "P005", name: "Melanotan II", cas_number: "121062-08-6", type: "Research Peptide", supplier: "SC", stock: 56, unit_cost: 22.0, markup: 95, our_price: 42.9, status: "In Stock" },
  { sku: "P006", name: "GHRP-6", cas_number: "87616-84-0", type: "Growth Factor", supplier: "EV", stock: 0, unit_cost: 30.0, markup: 60, our_price: 48.0, status: "Out of Stock" },
  { sku: "P007", name: "Sermorelin", cas_number: "86168-78-7", type: "Growth Factor", supplier: "DE", stock: 22, unit_cost: 55.0, markup: 55, our_price: 85.25, status: "In Stock" },
  { sku: "P008", name: "AOD-9604", cas_number: "221231-10-3", type: "Research Peptide", supplier: "SC", stock: 14, unit_cost: 48.0, markup: 70, our_price: 81.6, status: "Low Stock" },
  { sku: "P009", name: "Epithalon", cas_number: "307297-39-8", type: "Nootropic", supplier: "EV", stock: 67, unit_cost: 65.0, markup: 50, our_price: 97.5, status: "In Stock" },
  { sku: "P010", name: "DSIP", cas_number: "62568-57-4", type: "Nootropic", supplier: "DE", stock: 3, unit_cost: 72.0, markup: 45, our_price: 104.4, status: "Out of Stock" },
  { sku: "P011", name: "Selank", cas_number: "129954-34-3", type: "Nootropic", supplier: "SC", stock: 29, unit_cost: 58.0, markup: 62, our_price: 93.96, status: "In Stock" },
  { sku: "P012", name: "Semax", cas_number: "80714-61-0", type: "Nootropic", supplier: "EV", stock: 11, unit_cost: 62.0, markup: 58, our_price: 97.96, status: "Low Stock" },
  { sku: "P013", name: "LL-37", cas_number: "154939-52-1", type: "Research Peptide", supplier: "DE", stock: 0, unit_cost: 85.0, markup: 40, our_price: 119.0, status: "Out of Stock" },
  { sku: "P014", name: "Thymosin Alpha-1", cas_number: "62304-98-7", type: "Research Peptide", supplier: "SC", stock: 38, unit_cost: 95.0, markup: 35, our_price: 128.25, status: "In Stock" },
  { sku: "P015", name: "MGF", cas_number: "62087-72-7", type: "Growth Factor", supplier: "EV", stock: 5, unit_cost: 40.0, markup: 68, our_price: 67.2, status: "Out of Stock" },
  { sku: "P016", name: "IGF-1 LR3", cas_number: "946870-92-4", type: "Growth Factor", supplier: "DE", stock: 19, unit_cost: 110.0, markup: 42, our_price: 156.2, status: "Low Stock" },
  { sku: "P017", name: "PT-141", cas_number: "189691-06-3", type: "Research Peptide", supplier: "SC", stock: 41, unit_cost: 32.0, markup: 88, our_price: 60.16, status: "In Stock" },
  { sku: "P018", name: "Hexarelin", cas_number: "140703-51-1", type: "Growth Factor", supplier: "EV", stock: 27, unit_cost: 45.0, markup: 60, our_price: 72.0, status: "In Stock" },
  { sku: "P019", name: "Tesamorelin", cas_number: "218949-48-5", type: "Growth Factor", supplier: "DE", stock: 6, unit_cost: 150.0, markup: 30, our_price: 195.0, status: "Out of Stock" },
  { sku: "P020", name: "HGH Fragment 176-191", cas_number: "66004-57-7", type: "Research Peptide", supplier: "SC", stock: 33, unit_cost: 36.0, markup: 75, our_price: 63.0, status: "In Stock" },
];

const orders = [
  { order_id: "ORD-2841", customer: "BioLab Research", product_count: 3, total: 284.56, status: "Pending", date: "2025-04-08" },
  { order_id: "ORD-2842", customer: "PeptideWorks Inc", product_count: 1, total: 52.73, status: "Pending", date: "2025-04-08" },
  { order_id: "ORD-2843", customer: "ResearchCore LLC", product_count: 5, total: 621.4, status: "Pending", date: "2025-04-07" },
  { order_id: "ORD-2844", customer: "GenSci Institute", product_count: 2, total: 117.2, status: "Processing", date: "2025-04-07" },
  { order_id: "ORD-2845", customer: "VitaSource Labs", product_count: 4, total: 398.82, status: "Processing", date: "2025-04-06" },
  { order_id: "ORD-2846", customer: "NeuroResearch Co", product_count: 2, total: 191.92, status: "Processing", date: "2025-04-06" },
  { order_id: "ORD-2847", customer: "PrimePeptides", product_count: 1, total: 97.5, status: "Processing", date: "2025-04-05" },
  { order_id: "ORD-2848", customer: "ClinTrial Supply", product_count: 6, total: 745.3, status: "Shipped", date: "2025-04-04" },
  { order_id: "ORD-2849", customer: "MedSupply Direct", product_count: 3, total: 190.93, status: "Shipped", date: "2025-04-03" },
  { order_id: "ORD-2850", customer: "LabCentral Bio", product_count: 2, total: 132.6, status: "Shipped", date: "2025-04-02" },
  { order_id: "ORD-2851", customer: "BioSynth Research", product_count: 1, total: 156.2, status: "Shipped", date: "2025-04-01" },
  { order_id: "ORD-2852", customer: "PeptideXpress", product_count: 4, total: 264.8, status: "Delivered", date: "2025-03-28" },
  { order_id: "ORD-2853", customer: "CoreLabs Scientific", product_count: 2, total: 185.46, status: "Delivered", date: "2025-03-25" },
  { order_id: "ORD-2854", customer: "ApexResearch", product_count: 3, total: 412.9, status: "Delivered", date: "2025-03-22" },
  { order_id: "ORD-2855", customer: "SynthGen Bio", product_count: 5, total: 538.2, status: "Delivered", date: "2025-03-20" },
];

const orderItems = [
  { order_id: 1, product_name: "BPC-157" }, { order_id: 1, product_name: "TB-500" }, { order_id: 1, product_name: "CJC-1295 No DAC" },
  { order_id: 2, product_name: "BPC-157" },
  { order_id: 3, product_name: "Epithalon" }, { order_id: 3, product_name: "Selank" }, { order_id: 3, product_name: "Semax" }, { order_id: 3, product_name: "DSIP" }, { order_id: 3, product_name: "LL-37" },
  { order_id: 4, product_name: "Melanotan II" }, { order_id: 4, product_name: "PT-141" },
  { order_id: 5, product_name: "IGF-1 LR3" }, { order_id: 5, product_name: "MGF" }, { order_id: 5, product_name: "CJC-1295 No DAC" }, { order_id: 5, product_name: "Sermorelin" },
  { order_id: 6, product_name: "Selank" }, { order_id: 6, product_name: "Semax" },
  { order_id: 7, product_name: "Epithalon" },
  { order_id: 8, product_name: "Thymosin Alpha-1" }, { order_id: 8, product_name: "LL-37" }, { order_id: 8, product_name: "Sermorelin" }, { order_id: 8, product_name: "AOD-9604" }, { order_id: 8, product_name: "Hexarelin" }, { order_id: 8, product_name: "BPC-157" },
  { order_id: 9, product_name: "PT-141" }, { order_id: 9, product_name: "Melanotan II" }, { order_id: 9, product_name: "BPC-157" },
  { order_id: 10, product_name: "TB-500" }, { order_id: 10, product_name: "Sermorelin" },
  { order_id: 11, product_name: "IGF-1 LR3" },
  { order_id: 12, product_name: "HGH Fragment 176-191" }, { order_id: 12, product_name: "BPC-157" }, { order_id: 12, product_name: "Melanotan II" }, { order_id: 12, product_name: "TB-500" },
  { order_id: 13, product_name: "Sermorelin" }, { order_id: 13, product_name: "Hexarelin" },
  { order_id: 14, product_name: "Epithalon" }, { order_id: 14, product_name: "Thymosin Alpha-1" }, { order_id: 14, product_name: "DSIP" },
  { order_id: 15, product_name: "CJC-1295 No DAC" }, { order_id: 15, product_name: "Ipamorelin" }, { order_id: 15, product_name: "GHRP-6" }, { order_id: 15, product_name: "AOD-9604" }, { order_id: 15, product_name: "Selank" },
];

const suppliers = [
  { supplier_id: "S001", name: "EuroVial Labs", code: "EV", reliability: 4, grade: "A+", product_count: 7, total_volume: 142500, avg_margin: 62, status: "Active" },
  { supplier_id: "S002", name: "SciCore Biotech", code: "SC", reliability: 5, grade: "A", product_count: 5, total_volume: 187300, avg_margin: 72, status: "Active" },
  { supplier_id: "S003", name: "DeutscheSynth GmbH", code: "DE", reliability: 3, grade: "B+", product_count: 6, total_volume: 98400, avg_margin: 55, status: "Review" },
];

async function seed() {
  console.log("Seeding Supabase...");

  // Clear existing data
  await supabase.from("order_items").delete().neq("id", 0);
  await supabase.from("orders").delete().neq("id", 0);
  await supabase.from("products").delete().neq("id", 0);
  await supabase.from("suppliers").delete().neq("id", 0);

  // Insert products
  const { error: pErr } = await supabase.from("products").insert(products);
  if (pErr) console.error("Products error:", pErr);
  else console.log(`Inserted ${products.length} products`);

  // Insert suppliers
  const { error: sErr } = await supabase.from("suppliers").insert(suppliers);
  if (sErr) console.error("Suppliers error:", sErr);
  else console.log(`Inserted ${suppliers.length} suppliers`);

  // Insert orders
  const { error: oErr } = await supabase.from("orders").insert(orders);
  if (oErr) console.error("Orders error:", oErr);
  else console.log(`Inserted ${orders.length} orders`);

  // Insert order items
  const { error: oiErr } = await supabase.from("order_items").insert(orderItems);
  if (oiErr) console.error("Order items error:", oiErr);
  else console.log(`Inserted ${orderItems.length} order items`);

  console.log("Seeding complete!");
}

seed().catch(console.error);
