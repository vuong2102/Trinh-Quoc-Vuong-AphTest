export const categories = [
  {
    id: 1,
    thumb: "/images/website/market_1.png",
    categoryName: "Consumer Goods",
    link: "consumer-goods",
    shortDesc: "Eco-friendly consumer products for everyday use.",
    description:
      "Discover our range of sustainable consumer goods designed for modern lifestyles.",
    parentId: 0,
    children: [
      {
        id: 11,
        thumb: "/images/website/consummer_1.png",
        categoryName: "Cutlery/Straws",
        link: "cutlery-straws",
        shortDesc: "Compostable cutlery and drinking straws.",
        description: "Sustainable alternatives to single-use plastic utensils.",
        parentId: 1,
        children: [],
      },
      {
        id: 12,
        thumb: "/images/website/consummer_2.png",
        categoryName: "Cups/Lids",
        link: "cups-lids",
        shortDesc: "Biodegradable cups and lids.",
        description: "Food-safe cups and lids for beverages and meals.",
        parentId: 1,
        children: [],
      },
      {
        id: 13,
        thumb: "/images/website/consummer_3.png",
        categoryName: "Food Containers",
        link: "food-containers",
        shortDesc: "Containers for food storage and serving.",
        description: "Durable, compostable food containers.",
        parentId: 1,
        children: [],
      },
      {
        id: 14,
        thumb: "/images/website/consummer_4.png",
        categoryName: "Gloves",
        link: "gloves",
        shortDesc: "Disposable and reusable gloves.",
        description: "Protective gloves for food handling and industrial use.",
        parentId: 1,
        children: [],
      },
    ],
  },
  {
    id: 2,
    thumb: "/images/website/market_3.png",
    categoryName: "Packaging",
    link: "packaging",
    shortDesc: "Innovative packaging solutions for diverse industries.",
    description:
      "All our products are under absolute supervision, from raw materials to finished products. We apply an international quality management system.",
    parentId: 0,
    children: [
      {
        id: 21,
        thumb: "/images/website/Packaging_1.png",
        categoryName: "Consumer Packaging",
        link: "consumer-packaging",
        shortDesc: "Packaging for consumer products.",
        description: "Retail-ready packaging for food and consumer goods.",
        parentId: 2,
        children: [
          {
            id: 211,
            categoryName: "Food Storage",
            link: "food-storage",
            parentId: 21,
            children: [],
          },
          {
            id: 212,
            categoryName: "Trash Bags",
            link: "trash-bags",
            parentId: 21,
            children: [],
          },
        ],
      },
      {
        id: 22,
        thumb: "/images/website/Packaging_2.png",
        categoryName: "Industrial Packaging",
        link: "industrial-packaging",
        shortDesc: "Heavy-duty industrial packaging.",
        description: "Industrial-grade packaging for logistics and manufacturing.",
        parentId: 2,
        children: [],
      },
    ],
  },
  {
    id: 3,
    thumb: "/images/website/market_4.png",
    categoryName: "Engineering Plastics",
    link: "engineering-plastics",
    shortDesc: "High-performance engineering plastic components.",
    description: "Precision-engineered plastic parts for automotive and electronics.",
    parentId: 0,
    children: [
      {
        id: 31,
        thumb: "/images/website/Engineering_1.png",
        categoryName: "Automotive/Motorbike Parts",
        link: "automotive-parts",
        shortDesc: "Parts for vehicles.",
        description: "Durable components for automotive applications.",
        parentId: 3,
        children: [],
      },
      {
        id: 32,
        thumb: "/images/website/Engineering_2.png",
        categoryName: "Molds",
        link: "molds",
        shortDesc: "Custom molds.",
        description: "Injection molds for plastic manufacturing.",
        parentId: 3,
        children: [],
      },
      {
        id: 33,
        thumb: "/images/website/Engineering_3.png",
        categoryName: "Household Appliances Parts",
        link: "household-appliances-parts",
        shortDesc: "Components for home appliances.",
        description: "Precision parts for household appliance manufacturing.",
        parentId: 3,
        children: [],
      },
    ],
  },
  {
    id: 4,
    thumb: "/images/website/market_5.png",
    categoryName: "Building Materials",
    link: "building-materials",
    shortDesc: "Sustainable building materials.",
    description: "Eco-friendly materials for construction projects.",
    parentId: 0,
    children: [
      {
        id: 41,
        thumb: "/images/website/Building_1.png",
        categoryName: "Interior",
        link: "interior",
        shortDesc: "Interior building solutions.",
        description: "Materials for interior finishing.",
        parentId: 4,
        children: [],
      },
      {
        id: 42,
        thumb: "/images/website/Building_2.png",
        categoryName: "Exterior",
        link: "exterior",
        shortDesc: "Exterior building solutions.",
        description: "Weather-resistant exterior materials.",
        parentId: 4,
        children: [],
      },
    ],
  },
  {
    id: 6,
    thumb: "/images/website/market_2.png",
    categoryName: "Sustainable Products",
    link: "sustainable-products",
    shortDesc: "Compostable and eco-friendly product lines.",
    description: "Leading compostable solutions certified for home composting.",
    parentId: 0,
    children: [
      {
        id: 61,
        thumb: "/images/website/image_discover_1.png",
        categoryName: "Compostable Products",
        link: "compostable-products",
        shortDesc: "Fully compostable consumer products.",
        description: "Products that decompose within 6-12 months.",
        parentId: 6,
        children: [],
      },
      {
        id: 62,
        thumb: "/images/website/image_discover_2.png",
        categoryName: "Compostable Materials",
        link: "compostable-materials",
        shortDesc: "Raw compostable materials.",
        description: "PBAT and other compostable material grades.",
        parentId: 6,
        children: [],
      },
    ],
  },
];

const thumbs = [
  "/images/website/product-list_1.png",
  "/images/website/product-list_2.png",
  "/images/website/product-list_3.png",
  "/images/website/product-list_4.png",
  "/images/website/product-list_5.png",
  "/images/website/product-list_6.png",
  "/images/website/product-list_7.png",
  "/images/website/product-list_8.png",
  "/images/website/product-list_9.png",
];

function buildProduct(id, name, slug, sku, categoryIds, thumbIndex = 0) {
  const thumb = thumbs[thumbIndex % thumbs.length];
  return {
    id,
    categoryIds,
    thumb,
    prodName: name,
    slug,
    sku,
    shortDesc: `${name} — high-quality eco-friendly solution from An Phat Holdings.`,
    description: `<ul><li>${name} is engineered for performance and sustainability.</li><li>Suitable for commercial and retail applications.</li><li>FDA Compliant</li></ul>`,
    specification: `<table class="product-info-spec"><tr><td>Alternative Reference</td><td>${String(id).padStart(10, "0")}</td></tr><tr><td>Material</td><td>Compostable polymer</td></tr><tr><td>Certification</td><td>OK compost HOME</td></tr><tr><td>Recycle</td><td>Yes</td></tr></table>`,
    dataSheet: "",
    media: [thumb, "/images/website/product_1.png", "/images/website/product_2.png"],
  };
}

export const products = [
  buildProduct(101, "Food Wrap", "food-wrap", "036897488221-2", [21, 211, 2], 0),
  buildProduct(102, "Overlock Jumbo Bag", "overlock-jumbo-bag", "036897488221-3", [21, 212, 2], 1),
  buildProduct(103, "Compostable Spoon Set", "compostable-spoon-set", "SPN-001-2024", [11, 1], 2),
  buildProduct(104, "Biodegradable Cup 12oz", "biodegradable-cup-12oz", "CUP-12-001", [12, 1], 3),
  buildProduct(105, "Industrial Stretch Film", "industrial-stretch-film", "ISF-500-001", [22, 2], 4),
  buildProduct(106, "AnEco Cling Film Roll", "aneco-cling-film-roll", "ACF-200-001", [61, 6], 5),
  buildProduct(107, "Food Storage Bag", "food-storage-bag", "FSB-100-001", [21, 211, 2], 6),
  buildProduct(108, "Compostable Trash Bag 30L", "compostable-trash-bag-30l", "CTB-30-001", [21, 212, 2], 7),
  buildProduct(109, "Meal Prep Container", "meal-prep-container", "MPC-750-001", [13, 1], 8),
  buildProduct(110, "Dashboard Trim Panel", "dashboard-trim-panel", "DTP-ABS-001", [31, 3], 0),
  buildProduct(111, "Compostable Straw Pack", "compostable-straw-pack", "STR-100-001", [11, 1], 1),
  buildProduct(112, "PLA Fork Set", "pla-fork-set", "FRK-050-001", [11, 1], 2),
  buildProduct(113, "Compostable Knife Set", "compostable-knife-set", "KNF-050-001", [11, 1], 3),
  buildProduct(114, "Hot Cup 16oz", "hot-cup-16oz", "CUP-16-002", [12, 1], 4),
  buildProduct(115, "Dome Lid 12oz", "dome-lid-12oz", "LID-12-001", [12, 1], 5),
  buildProduct(116, "Salad Container 750ml", "salad-container-750ml", "SAL-750-001", [13, 1], 6),
  buildProduct(117, "Microwave Container 1L", "microwave-container-1l", "MCO-1L-001", [13, 1], 7),
  buildProduct(118, "Nitrile Gloves Box", "nitrile-gloves-box", "GLV-NIT-001", [14, 1], 8),
  buildProduct(119, "PE Gloves Roll", "pe-gloves-roll", "GLV-PE-001", [14, 1], 0),
  buildProduct(120, "Vacuum Sealer Bag", "vacuum-sealer-bag", "VSB-001-2024", [21, 211, 2], 1),
  buildProduct(121, "Freezer Storage Bag", "freezer-storage-bag", "FSB-200-001", [21, 211, 2], 2),
  buildProduct(122, "Drawstring Trash Bag 50L", "drawstring-trash-bag-50l", "DTB-50-001", [21, 212, 2], 3),
  buildProduct(123, "Biodegradable Bin Liner", "biodegradable-bin-liner", "BBL-30-001", [21, 212, 2], 4),
  buildProduct(124, "Pallet Wrap Film", "pallet-wrap-film", "PWF-500-001", [22, 2], 5),
  buildProduct(125, "Shrink Wrap Roll", "shrink-wrap-roll", "SWR-300-001", [22, 2], 6),
  buildProduct(126, "Bumper Bracket", "bumper-bracket", "BBK-ABS-001", [31, 3], 7),
  buildProduct(127, "Air Intake Duct", "air-intake-duct", "AID-PP-001", [31, 3], 8),
  buildProduct(128, "Injection Mold 500ml", "injection-mold-500ml", "IMD-500-001", [32, 3], 0),
  buildProduct(129, "Blow Mold 1L", "blow-mold-1l", "BMD-1L-001", [32, 3], 1),
  buildProduct(130, "Washing Machine Drum", "washing-machine-drum", "WMD-PP-001", [33, 3], 2),
  buildProduct(131, "Refrigerator Shelf", "refrigerator-shelf", "RFS-ABS-001", [33, 3], 3),
  buildProduct(132, "Wall Panel Cladding", "wall-panel-cladding", "WPC-001-2024", [41, 4], 4),
  buildProduct(133, "Ceiling Panel", "ceiling-panel", "CEP-001-2024", [41, 4], 5),
  buildProduct(134, "Exterior Siding Panel", "exterior-siding-panel", "ESP-001-2024", [42, 4], 6),
  buildProduct(135, "Roofing Sheet", "roofing-sheet", "ROS-001-2024", [42, 4], 7),
  buildProduct(136, "PBAT Resin Grade A", "pbat-resin-grade-a", "PBAT-A-001", [62, 6], 8),
  buildProduct(137, "Compostable Pellets", "compostable-pellets", "CPL-001-2024", [62, 6], 0),
  buildProduct(138, "AnBio Shopping Bag", "anbio-shopping-bag", "ASB-001-2024", [61, 6], 1),
  buildProduct(139, "Compostable Mailer", "compostable-mailer", "CML-001-2024", [61, 6], 2),
  buildProduct(140, "Eco Produce Bag", "eco-produce-bag", "EPB-001-2024", [61, 6], 3),
  buildProduct(141, "Zip Lock Compost Bag", "zip-lock-compost-bag", "ZLB-001-2024", [61, 6], 4),
  buildProduct(142, "Grocery T-Shirt Bag", "grocery-t-shirt-bag", "GTB-001-2024", [61, 6], 5),
  buildProduct(143, "Sandwich Wrap Sheet", "sandwich-wrap-sheet", "SWS-001-2024", [61, 6], 6),
  buildProduct(144, "Bakery Bag", "bakery-bag", "BKB-001-2024", [61, 6], 7),
  buildProduct(145, "Compostable Cutlery Kit", "compostable-cutlery-kit", "CCK-001-2024", [11, 61, 6], 8),
  buildProduct(146, "Food Wrap XL Roll", "food-wrap-xl-roll", "FWX-001-2024", [21, 211, 2], 0),
  buildProduct(147, "Stretch Wrap Hand Roll", "stretch-wrap-hand-roll", "SWR-H-001", [22, 2], 1),
  buildProduct(148, "Motorcycle Fairing", "motorcycle-fairing", "MCF-ABS-001", [31, 3], 2),
  buildProduct(149, "Interior Trim Clip", "interior-trim-clip", "ITC-001-2024", [31, 3], 3),
  buildProduct(150, "Floor Decking Panel", "floor-decking-panel", "FDP-001-2024", [41, 4], 4),
];

const foodWrap = products.find((p) => p.slug === "food-wrap");
if (foodWrap) {
  Object.assign(foodWrap, {
    shortDesc:
      "100% compostable: made from PBAT compostable material, AnEco food wrap is capable of completely decomposing within 6-12 months into humus, water, Co2.",
    description: `<ul>
<li>With outstanding features to other products on the market, AnEco compostable cling wrap is transparent, flexible with a sharp cutting bar, easy for consumers in food preservation.</li>
<li>Convenient thumb opening allows for a safe, easy grasp on the film</li>
<li>FDA Compliant</li>
<li>CFIA Compliant</li>
</ul>`,
    specification: `<table class="product-info-spec">
<tr><td>Alternative Reference</td><td>3061110050</td></tr>
<tr><td>Width</td><td>25cm</td></tr>
<tr><td>Length</td><td>100cm</td></tr>
<tr><td>Maximum Weight</td><td>1kg</td></tr>
<tr><td>Color(s)</td><td>Clear</td></tr>
<tr><td>Material</td><td>PVC</td></tr>
<tr><td>Recycle</td><td>No</td></tr>
</table>`,
  });
}

export const filterListTemplate = [
  {
    key: "typeOf",
    label: "Type of",
    options: [
      { value: 3, label: "Food Storage" },
      { value: 4, label: "Trash Bags" },
      { value: 5, label: "Knife – Case – Storage Box" },
      { value: 6, label: "Containers" },
      { value: 7, label: "Gloves" },
    ],
  },
  {
    key: "width",
    label: "Width (cm)",
    type: "range",
    min: 10,
    max: 60,
  },
  {
    key: "length",
    label: "Length (cm)",
    type: "range",
    min: 20,
    max: 120,
  },
  {
    key: "recycle",
    label: "Recycle",
    options: [
      { value: "Yes", label: "Yes" },
      { value: "No", label: "No" },
    ],
  },
];
