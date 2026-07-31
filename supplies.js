/* ==========================================================================
   CARE - Compassionate Animal Rescue Effort
   Complete E-Commerce Donation Catalog Dataset & Unique Image Engine
   ========================================================================== */

const state = {
  filters: {
    animal: 'all',
    category: 'all',
    priority: 'all',
    price: 'all',
    age: 'all',
    env: 'all',
    search: '',
    sort: 'priority'
  },
  wishlist: {},
  donationBag: {} // productId -> quantity
};

// --- COMPLETE COMPREHENSIVE PRODUCTS DATASET (35 Unique Products with Dedicated Photography) ---
const catalogProducts = [
  // 🐾 1. FOOD & NUTRITION
  {
    id: 'purina-cat-chow-15',
    catId: 'food',
    name: 'Purina Cat Chow Complete Dry Cat Food',
    brand: 'Purina',
    size: '15 lb Bag',
    weight: '15.2 lbs',
    animal: 'cat',
    ageGroup: 'adult',
    env: 'indoor',
    purpose: 'High Protein Nutrition',
    desc: 'Formulated with high-quality protein, essential fatty acids, and 25 vitamins & minerals.',
    price: 22.99,
    priority: 'Critical',
    needed: 15,
    rating: 4.8,
    reviews: 1420,
    img: 'assets/products/cat_food_bag.jpg'
  },
  {
    id: 'purina-one-cat-16',
    catId: 'food',
    name: 'Purina ONE High Protein Dry Cat Food',
    brand: 'Purina ONE',
    size: '16 lb Bag',
    weight: '16.1 lbs',
    animal: 'cat',
    ageGroup: 'adult',
    env: 'indoor',
    purpose: 'Premium Immune Support',
    desc: 'Real chicken first ingredient promoting lean muscle and healthy heart for shelter cats.',
    price: 31.99,
    priority: 'High',
    needed: 12,
    rating: 4.9,
    reviews: 980,
    img: 'assets/products/cat_food_bag.jpg'
  },
  {
    id: 'purina-one-dog-31',
    catId: 'food',
    name: 'Purina ONE SmartBlend Dry Dog Food',
    brand: 'Purina ONE',
    size: '31.1 lb Bag',
    weight: '31.3 lbs',
    animal: 'dog',
    ageGroup: 'adult',
    env: 'indoor',
    purpose: 'Canine Joint & Muscle Kibble',
    desc: 'Digestible formula with glucosamine for joint health and radiant coat.',
    price: 44.99,
    priority: 'Critical',
    needed: 10,
    rating: 4.8,
    reviews: 2150,
    img: 'assets/products/dog_food_bag.jpg'
  },
  {
    id: 'fancy-feast-24',
    catId: 'food',
    name: 'Fancy Feast Classic Paté Wet Cat Food',
    brand: 'Fancy Feast',
    size: 'Case of 24 (3 oz Cans)',
    weight: '5.1 lbs',
    animal: 'cat',
    ageGroup: 'adult',
    env: 'indoor',
    purpose: 'Essential Hydration & Recovery',
    desc: 'Gourmet poultry paté providing vital hydration for malnourished rescued cats.',
    price: 24.99,
    priority: 'Critical',
    needed: 20,
    rating: 4.9,
    reviews: 3120,
    img: 'assets/products/cat_food_wet.jpg'
  },
  {
    id: 'friskies-wet-40',
    catId: 'food',
    name: 'Purina Friskies Variety Pack Wet Cat Food',
    brand: 'Friskies',
    size: 'Variety Box of 40 (5.5 oz Cans)',
    weight: '14.8 lbs',
    animal: 'cat',
    ageGroup: 'adult',
    env: 'indoor',
    purpose: 'Bulk Feeding Supply',
    desc: 'Savory meat and fish gravies in easy-open cans for daily shelter feeding.',
    price: 32.49,
    priority: 'High',
    needed: 15,
    rating: 4.7,
    reviews: 1840,
    img: 'assets/products/cat_food_wet.jpg'
  },
  {
    id: 'pedigree-wet-12',
    catId: 'food',
    name: 'Pedigree Choice Cuts Wet Dog Food',
    brand: 'Pedigree',
    size: 'Case of 12 (13.2 oz Cans)',
    weight: '11.5 lbs',
    animal: 'dog',
    ageGroup: 'adult',
    env: 'indoor',
    purpose: 'Soft Canine Recovery Diet',
    desc: 'Nutritious beef and vegetable gravy stew for dogs recovering from trauma.',
    price: 19.99,
    priority: 'High',
    needed: 15,
    rating: 4.6,
    reviews: 1120,
    img: 'assets/products/dog_food_bag.jpg'
  },
  {
    id: 'kmr-formula',
    catId: 'food',
    name: 'KMR Kitten Milk Replacer Powder',
    brand: 'PetAg',
    size: '12 oz Canister',
    weight: '0.8 lbs',
    animal: 'cat',
    ageGroup: 'kitten-puppy',
    env: 'indoor',
    purpose: 'Orphan Kitten Nursery Care',
    desc: 'Matches mother cat milk with taurine, prebiotics, and essential vitamins.',
    price: 21.99,
    priority: 'Critical',
    needed: 12,
    rating: 4.9,
    reviews: 950,
    img: 'assets/products/kitten_formula.jpg'
  },
  {
    id: 'baby-food-meat',
    catId: 'food',
    name: 'Gerber Pureed Meat Baby Food (Pure Meat)',
    brand: 'Gerber',
    size: 'Case of 12 (2.5 oz Jars)',
    weight: '2.4 lbs',
    animal: 'cat',
    ageGroup: 'kitten-puppy',
    env: 'indoor',
    purpose: 'Sick Animal Appetite Triage',
    desc: 'Pure chicken and beef puree with no onion/garlic, used to entice sick animals to eat.',
    price: 18.00,
    priority: 'High',
    needed: 20,
    rating: 4.9,
    reviews: 620,
    img: 'assets/products/kitten_formula.jpg'
  },
  {
    id: 'dog-treats-large',
    catId: 'food',
    name: 'Milk-Bone Original Large Dog Biscuits',
    brand: 'Milk-Bone',
    size: '10 lb Box',
    weight: '10.2 lbs',
    animal: 'dog',
    ageGroup: 'adult',
    env: 'indoor',
    purpose: 'Canine Rehabilitation & Reward',
    desc: 'Crunchy treats that clean teeth and aid in behavioral training for rescued dogs.',
    price: 14.99,
    priority: 'Standard',
    needed: 20,
    rating: 4.8,
    reviews: 2850,
    img: 'assets/products/dog_food_bag.jpg'
  },
  {
    id: 'cat-treats-temptations',
    catId: 'food',
    name: 'Temptations Crunchy & Soft Cat Treats',
    brand: 'Temptations',
    size: '16 oz Tub',
    weight: '1.2 lbs',
    animal: 'cat',
    ageGroup: 'adult',
    env: 'indoor',
    purpose: 'Feline Socialization Reward',
    desc: 'Calorie-dense salmon treats used for underweight cat rehab and stress relief.',
    price: 8.49,
    priority: 'Standard',
    needed: 25,
    rating: 4.8,
    reviews: 4100,
    img: 'assets/products/cat_food_bag.jpg'
  },

  // 💊 2. MEDICAL SUPPLIES
  {
    id: 'bayer-dewormer-cat',
    catId: 'medical',
    name: 'Bayer Tapeworm Dewormer for Cats',
    brand: 'Bayer',
    size: '3 Tablets Box',
    weight: '0.1 lbs',
    animal: 'cat',
    ageGroup: 'adult',
    env: 'indoor',
    purpose: 'Intestinal Parasite Intake',
    desc: 'Broad-spectrum oral dewormer essential for all incoming shelter intake cats.',
    price: 16.49,
    priority: 'Critical',
    needed: 30,
    rating: 4.8,
    reviews: 740,
    img: 'assets/products/cat_dewormer_box.jpg'
  },
  {
    id: 'frontline-cat',
    catId: 'medical',
    name: 'Frontline Plus Flea & Tick Treatment',
    brand: 'Frontline',
    size: '3 Dose Pack',
    weight: '0.2 lbs',
    animal: 'cat',
    ageGroup: 'adult',
    env: 'outdoor',
    purpose: 'Topical Parasite Control',
    desc: 'Fast-acting topical dose killing fleas, ticks, and chewing lice on contact.',
    price: 38.99,
    priority: 'Critical',
    needed: 25,
    rating: 4.7,
    reviews: 1650,
    img: 'assets/products/cat_dewormer_box.jpg'
  },
  {
    id: 'flea-comb',
    catId: 'medical',
    name: 'Safari Fine-Tooth Stainless Steel Flea Comb',
    brand: 'Safari',
    size: 'Standard Comb',
    weight: '0.15 lbs',
    animal: 'shared',
    ageGroup: 'all',
    env: 'indoor',
    purpose: 'Physical Parasite Triage',
    desc: 'Fine stainless steel teeth for removing flea eggs, debris, and matted hair.',
    price: 7.49,
    priority: 'High',
    needed: 15,
    rating: 4.7,
    reviews: 890,
    img: 'assets/products/medical_first_aid.jpg'
  },

  // 🛏 3. BEDDING & COMFORT
  {
    id: 'soft-pet-bed',
    catId: 'bedding',
    name: 'Bedsure Washable Plush Round Pet Bed',
    brand: 'Bedsure',
    size: '23" Round Bed',
    weight: '2.1 lbs',
    animal: 'cat',
    ageGroup: 'all',
    env: 'indoor',
    purpose: 'Calming Shelter Bedding',
    desc: 'Ultra-soft plush donut bed designed to soothe anxiety in rescued animals.',
    price: 24.99,
    priority: 'High',
    needed: 20,
    rating: 4.9,
    reviews: 3500,
    img: 'assets/products/cat_bed_plush.jpg'
  },
  {
    id: 'dog-bed-ortho',
    catId: 'bedding',
    name: 'Furhaven Orthopedic Memory Foam Dog Bed',
    brand: 'Furhaven',
    size: 'Large (36" x 27")',
    weight: '4.5 lbs',
    animal: 'dog',
    ageGroup: 'senior',
    env: 'indoor',
    purpose: 'Canine Joint Recovery Support',
    desc: 'Egg-crate orthopedic foam base relieving pressure points for recovering dogs.',
    price: 46.99,
    priority: 'Critical',
    needed: 8,
    rating: 4.8,
    reviews: 2600,
    img: 'assets/products/cat_bed_plush.jpg'
  },
  {
    id: 'fleece-blankets',
    catId: 'bedding',
    name: 'Washable Fleece Pet Blanket Throws',
    brand: 'Frisco',
    size: 'Pack of 3 (30" x 40")',
    weight: '1.2 lbs',
    animal: 'shared',
    ageGroup: 'all',
    env: 'indoor',
    purpose: 'Warm Crate Bedding',
    desc: 'Warm machine-washable fleece blankets for cat and dog transport crates.',
    price: 14.99,
    priority: 'Standard',
    needed: 30,
    rating: 4.8,
    reviews: 1950,
    img: 'assets/products/fleece_pet_blanket.jpg'
  },
  {
    id: 'scratching-post',
    catId: 'bedding',
    name: 'SmartCat Ultimate Sisal Cat Scratching Post',
    brand: 'SmartCat',
    size: '32" Tall Post',
    weight: '7.5 lbs',
    animal: 'cat',
    ageGroup: 'adult',
    env: 'indoor',
    purpose: 'Feline Stress Relief & Claw Health',
    desc: 'Durable fibrous sisal post allowing cats to stretch and release tension.',
    price: 29.99,
    priority: 'High',
    needed: 12,
    rating: 4.9,
    reviews: 1480,
    img: 'assets/products/cat_bed_plush.jpg'
  },
  {
    id: 'neonatal-heating-pad',
    catId: 'bedding',
    name: 'K&H Safe Heated Pad for Neonatal Animals',
    brand: 'K&H Pet Products',
    size: '12" x 18" Thermostat Pad',
    weight: '1.4 lbs',
    animal: 'shared',
    ageGroup: 'kitten-puppy',
    env: 'indoor',
    purpose: 'Hypothermia Prevention for Newborns',
    desc: 'Preset internal thermostat keeping newborn puppies and kittens at safe body temp.',
    price: 32.99,
    priority: 'Critical',
    needed: 10,
    rating: 4.9,
    reviews: 820,
    img: 'assets/products/cat_bed_plush.jpg'
  },
  {
    id: 'new-towels',
    catId: 'bedding',
    name: 'Absorbent Cotton Bath Towels for Animal Care',
    brand: 'Utopia',
    size: 'Pack of 4 (24" x 48")',
    weight: '3.0 lbs',
    animal: 'shared',
    ageGroup: 'all',
    env: 'indoor',
    purpose: 'Drying & Medical Triage Wrapping',
    desc: 'Heavyweight cotton towels used for bathing, drying, and surgical recovery.',
    price: 12.99,
    priority: 'High',
    needed: 25,
    rating: 4.7,
    reviews: 2100,
    img: 'assets/products/cat_bed_plush.jpg'
  },

  // 🧹 4. CLEANING & HYGIENE (Shared)
  {
    id: 'rescue-disinfectant',
    catId: 'cleaning',
    name: 'Rescue Veterinary Disinfectant Cleaner',
    brand: 'Rescue Vet',
    size: '32 oz Spray Bottle',
    weight: '2.4 lbs',
    animal: 'shared',
    ageGroup: 'all',
    env: 'outdoor',
    purpose: 'Hospital-Grade Pathogen Control',
    desc: 'Kills parvo, ringworm, and respiratory viruses in 1 minute on hard surfaces.',
    price: 11.99,
    priority: 'Critical',
    needed: 25,
    rating: 4.9,
    reviews: 1350,
    img: 'assets/products/disinfectant_bottle.jpg'
  },
  {
    id: 'paper-towels-12',
    catId: 'cleaning',
    name: 'Bounty Quick-Size Paper Towels',
    brand: 'Bounty',
    size: '12 Double Rolls',
    weight: '5.8 lbs',
    animal: 'shared',
    ageGroup: 'all',
    env: 'indoor',
    purpose: 'Daily Cage Sanitation',
    desc: '2x absorbent paper towels essential for cleaning feeding stations and cages.',
    price: 22.99,
    priority: 'Critical',
    needed: 20,
    rating: 4.9,
    reviews: 4500,
    img: 'assets/products/paper_towels_pack.jpg'
  },
  {
    id: 'laundry-detergent-large',
    catId: 'cleaning',
    name: 'Tide Liquid Laundry Detergent Free & Gentle',
    brand: 'Tide',
    size: '154 oz Bottle (107 Loads)',
    weight: '11.2 lbs',
    animal: 'shared',
    ageGroup: 'all',
    env: 'indoor',
    purpose: 'Hypoallergenic Bedding Washing',
    desc: 'Dermatologist tested hypoallergenic detergent for washing animal towels and fleece.',
    price: 16.99,
    priority: 'High',
    needed: 15,
    rating: 4.8,
    reviews: 3800,
    img: 'assets/products/disinfectant_bottle.jpg'
  },
  {
    id: 'nitrile-gloves-box',
    catId: 'cleaning',
    name: 'Medical-Grade Nitrile Exam Gloves',
    brand: 'Medline',
    size: 'Box of 100 Gloves',
    weight: '1.1 lbs',
    animal: 'shared',
    ageGroup: 'all',
    env: 'outdoor',
    purpose: 'Contagion Protection & Triage',
    desc: 'Powder-free latex-free nitrile gloves for medical exams and cage cleaning.',
    price: 14.99,
    priority: 'High',
    needed: 30,
    rating: 4.8,
    reviews: 1720,
    img: 'assets/products/disinfectant_bottle.jpg'
  },
  {
    id: 'heavy-trash-bags',
    catId: 'cleaning',
    name: 'Hefty Strong Heavy-Duty Trash Bags',
    brand: 'Hefty',
    size: '33 Gallon (50 Count)',
    weight: '4.2 lbs',
    animal: 'shared',
    ageGroup: 'all',
    env: 'outdoor',
    purpose: 'Waste Disposal',
    desc: 'Puncture-resistant drawstring trash bags for daily shelter waste management.',
    price: 18.99,
    priority: 'High',
    needed: 20,
    rating: 4.7,
    reviews: 2900,
    img: 'assets/products/disinfectant_bottle.jpg'
  },
  {
    id: 'unscented-baby-wipes',
    catId: 'cleaning',
    name: 'Huggies Simply Clean Unscented Wipes',
    brand: 'Huggies',
    size: 'Pack of 3 (192 Wipes)',
    weight: '2.5 lbs',
    animal: 'shared',
    ageGroup: 'all',
    env: 'indoor',
    purpose: 'Gentle Paws & Eye Wiping',
    desc: 'Hypoallergenic 99% purified water wipes for cleaning sick kittens and puppies.',
    price: 6.49,
    priority: 'High',
    needed: 30,
    rating: 4.8,
    reviews: 5100,
    img: 'assets/products/disinfectant_bottle.jpg'
  },

  // 🍽 5. FEEDING EQUIPMENT
  {
    id: 'stainless-food-bowls',
    catId: 'feeding',
    name: 'Heavy-Duty Non-Tip Stainless Steel Bowls',
    brand: 'Frisco',
    size: 'Set of 2 Bowls',
    weight: '1.1 lbs',
    animal: 'shared',
    ageGroup: 'all',
    env: 'indoor',
    purpose: 'Hygienic Feeding',
    desc: 'Dishwasher safe stainless steel bowls with non-skid rubber base.',
    price: 11.99,
    priority: 'High',
    needed: 20,
    rating: 4.8,
    reviews: 1450,
    img: 'assets/products/stainless_pet_bowls.jpg'
  },

  // 🧸 6. TOYS & ENRICHMENT
  {
    id: 'cat-toys-assortment',
    catId: 'enrichment',
    name: 'Frisco Interactive Cat Track & Toy Set',
    brand: 'Frisco',
    size: '5 Piece Assortment',
    weight: '0.9 lbs',
    animal: 'cat',
    ageGroup: 'adult',
    env: 'indoor',
    purpose: 'Feline Mental Stimulation',
    desc: 'Feather wand, catnip mice, and ball track keeping isolated cats active and happy.',
    price: 8.99,
    priority: 'Standard',
    needed: 25,
    rating: 4.7,
    reviews: 1890,
    img: 'assets/products/cat_food_bag.jpg'
  },
  {
    id: 'kong-dog-toy-large',
    catId: 'enrichment',
    name: 'KONG Classic Durable Rubber Dog Toy',
    brand: 'KONG',
    size: 'Large Size',
    weight: '0.7 lbs',
    animal: 'dog',
    ageGroup: 'adult',
    env: 'indoor',
    purpose: 'Canine Anxiety Relief',
    desc: 'Natural red rubber formula for stuffing treats to soothe kennel stress.',
    price: 14.99,
    priority: 'Standard',
    needed: 20,
    rating: 4.9,
    reviews: 6200,
    img: 'assets/products/dog_food_bag.jpg'
  },

  // 🚑 7. RESCUE EQUIPMENT (Shared)
  {
    id: 'plastic-cat-carrier',
    catId: 'rescue',
    name: 'Petmate Two-Door Top-Load Cat Carrier',
    brand: 'Petmate',
    size: '24" Hard Carrier',
    weight: '5.2 lbs',
    animal: 'cat',
    ageGroup: 'all',
    env: 'outdoor',
    purpose: 'Safe Feline Transport',
    desc: 'Steel wire top loading door for easy stress-free entry of rescued cats.',
    price: 34.99,
    priority: 'Critical',
    needed: 15,
    rating: 4.8,
    reviews: 2100,
    img: 'assets/products/hard_cat_carrier.jpg'
  },
  {
    id: 'slip-lead-leashes',
    catId: 'rescue',
    name: 'Reflective Nylon Kennel Slip Lead Leashes',
    brand: 'LupinePet',
    size: '6 Pack (6 Feet)',
    weight: '0.9 lbs',
    animal: 'shared',
    ageGroup: 'all',
    env: 'outdoor',
    purpose: 'Emergency Field Capture',
    desc: 'High-strength nylon slip leads for quick safe handling of stray dogs.',
    price: 12.99,
    priority: 'High',
    needed: 25,
    rating: 4.9,
    reviews: 1350,
    img: 'assets/products/transport_crate.jpg'
  },
  {
    id: 'crate-aluminum-36',
    catId: 'rescue',
    name: 'MidWest iCrate Heavy-Duty Transport Crate',
    brand: 'MidWest',
    size: '36" Medium/Large Crate',
    weight: '21.5 lbs',
    animal: 'shared',
    ageGroup: 'all',
    env: 'outdoor',
    purpose: 'Safe Canine Transport & Housing',
    desc: 'Heavy-duty steel wire crate with leak-proof plastic pan and secure latch.',
    price: 58.99,
    priority: 'Critical',
    needed: 10,
    rating: 4.8,
    reviews: 4800,
    img: 'assets/products/transport_crate.jpg'
  },

  // 🏥 8. VETERINARY EQUIPMENT (Shared)
  {
    id: 'syringes-feeding-kit',
    catId: 'vet',
    name: 'PetAg Nursing Bottle & Calibration Syringe Kit',
    brand: 'PetAg',
    size: 'Bottle + 3 Syringes',
    weight: '0.4 lbs',
    animal: 'shared',
    ageGroup: 'kitten-puppy',
    env: 'indoor',
    purpose: 'Neonatal & Oral Med Dosing',
    desc: 'Calibrated syringes and silicone nipples for feeding orphaned kittens and administering liquid meds.',
    price: 11.49,
    priority: 'Critical',
    needed: 15,
    rating: 4.8,
    reviews: 790,
    img: 'assets/products/medical_first_aid.jpg'
  },
  {
    id: 'triage-first-aid-bag',
    catId: 'vet',
    name: 'Curicyn Rescue Triage First Aid Kit Bag',
    brand: 'Curicyn',
    size: 'Trauma Bag (25 Items)',
    weight: '3.2 lbs',
    animal: 'shared',
    ageGroup: 'all',
    env: 'outdoor',
    purpose: 'Field Emergency Triage',
    desc: 'Fully loaded emergency trauma kit with bandages, blood stop powder, and shears.',
    price: 64.50,
    priority: 'Critical',
    needed: 5,
    rating: 4.9,
    reviews: 350,
    img: 'assets/products/medical_first_aid.jpg'
  },

  // 🚽 9. LITTER & WASTE MANAGEMENT
  {
    id: 'fresh-step-litter-40',
    catId: 'litter',
    name: 'Fresh Step Multi-Cat Clumping Cat Litter',
    brand: 'Fresh Step',
    size: '40 lb Bag',
    weight: '40.2 lbs',
    animal: 'cat',
    ageGroup: 'adult',
    env: 'indoor',
    purpose: 'Bulk Feline Sanitation',
    desc: 'Low-dust 10-day odor control clumping litter for multi-cat shelter cages.',
    price: 23.99,
    priority: 'Critical',
    needed: 25,
    rating: 4.8,
    reviews: 3900,
    img: 'assets/products/cat_litter_bag.jpg'
  },
  {
    id: 'puppy-pee-pads-100',
    catId: 'litter',
    name: 'Glad For Pets Leak-Proof Puppy Training Pads',
    brand: 'Glad',
    size: '100 Count Box',
    weight: '8.5 lbs',
    animal: 'dog',
    ageGroup: 'kitten-puppy',
    env: 'indoor',
    purpose: 'Kennel Lining & House Training',
    desc: '5-layer leak-proof pads converting liquid into gel for clean kennel floors.',
    price: 29.99,
    priority: 'High',
    needed: 20,
    rating: 4.8,
    reviews: 2400,
    img: 'assets/products/dog_food_bag.jpg'
  }
];

function initCatalogEngine() {
  const gridEl = document.getElementById('ecommerce-products-grid');
  const resultsCountEl = document.getElementById('results-count');
  const noProductsEl = document.getElementById('no-products-msg');
  const searchInput = document.getElementById('catalog-search');
  const searchClearBtn = document.getElementById('search-clear');
  const filterCategory = document.getElementById('filter-category');
  const filterPrice = document.getElementById('filter-price');
  const filterAge = document.getElementById('filter-age');
  const filterEnv = document.getElementById('filter-env');
  const sortSelect = document.getElementById('sort-select');

  function renderProducts() {
    if (!gridEl) return;

    let filtered = catalogProducts.filter(p => {
      const matchAnimal = state.filters.animal === 'all' || p.animal === state.filters.animal;
      const matchCategory = state.filters.category === 'all' || p.catId === state.filters.category;
      const matchPriority = state.filters.priority === 'all' || p.priority === state.filters.priority;
      const matchAge = state.filters.age === 'all' || p.ageGroup === state.filters.age || p.ageGroup === 'all';
      const matchEnv = state.filters.env === 'all' || p.env === state.filters.env || p.env === 'all';
      
      let matchPrice = true;
      if (state.filters.price === 'under15') matchPrice = p.price < 15;
      else if (state.filters.price === '15to30') matchPrice = p.price >= 15 && p.price <= 30;
      else if (state.filters.price === '30to50') matchPrice = p.price > 30 && p.price <= 50;
      else if (state.filters.price === 'over50') matchPrice = p.price > 50;

      const q = state.filters.search.toLowerCase().trim();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);

      return matchAnimal && matchCategory && matchPriority && matchAge && matchEnv && matchPrice && matchSearch;
    });

    if (state.filters.sort === 'priority') {
      const priorityOrder = { 'Critical': 1, 'High': 2, 'Standard': 3 };
      filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (state.filters.sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.filters.sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (state.filters.sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    if (resultsCountEl) {
      resultsCountEl.textContent = `Showing ${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
    }

    if (filtered.length === 0) {
      gridEl.style.display = 'none';
      if (noProductsEl) noProductsEl.style.display = 'block';
      return;
    } else {
      gridEl.style.display = 'grid';
      if (noProductsEl) noProductsEl.style.display = 'none';
    }

    gridEl.innerHTML = filtered.map(p => {
      const convertedPrice = p.price.toFixed(2);
      const qty = state.donationBag[p.id] || 0;
      const isWished = state.wishlist[p.id];
      const priorityClass = p.priority === 'Critical' ? 'priority-critical' : p.priority === 'High' ? 'priority-high' : 'priority-standard';
      const animalTag = p.animal === 'cat' ? '🐱 Cat' : p.animal === 'dog' ? '🐶 Dog' : '🐾 Shared';

      return `
        <div class="ecom-product-card">
          <div class="card-image-wrap" onclick="openProductGallery('${p.id}')">
            <img src="${p.img}" alt="${p.name} packaging photography" loading="lazy">
            <span class="card-priority-badge ${priorityClass}">${p.priority}</span>
            <div class="card-top-actions" onclick="event.stopPropagation()">
              <button class="icon-action-btn ${isWished ? 'active' : ''}" onclick="toggleWishlist('${p.id}')" aria-label="Add to Wishlist">
                <i data-lucide="heart"></i>
              </button>
              <button class="icon-action-btn" onclick="shareProduct('${p.name}')" aria-label="Share Product">
                <i data-lucide="share-2"></i>
              </button>
            </div>
          </div>

          <div class="card-body">
            <div class="card-brand-row">
              <span class="card-brand">${p.brand}</span>
              <span class="card-animal-tag">${animalTag}</span>
            </div>

            <h3 class="card-title" onclick="openProductGallery('${p.id}')">${p.name}</h3>

            <div class="card-rating">
              <span class="stars">★★★★★</span>
              <span class="rating-val">${p.rating}</span>
              <span class="reviews-count">(${p.reviews.toLocaleString()} reviews)</span>
            </div>

            <p class="card-desc">${p.desc}</p>

            <div class="card-specs">
              <span class="spec-pill">Size: ${p.size}</span>
              <span class="spec-pill">Weight: ${p.weight}</span>
              <span class="spec-pill">${p.purpose}</span>
            </div>

            <div class="card-price-row">
              <div>
                <span class="price-label">Estimated Retail Price (USD)</span>
                <span class="card-price">$${convertedPrice}</span>
              </div>
              <div class="needed-box">
                <span class="stock-status">In Stock</span>
                <span class="needed-val">Needed: <strong>${p.needed} units</strong></span>
              </div>
            </div>

            <div class="card-actions-row">
              <div class="qty-selector">
                <button class="qty-btn minus" onclick="updateQty('${p.id}', -1)" aria-label="Decrease quantity">-</button>
                <span class="qty-val">${qty}</span>
                <button class="qty-btn plus" onclick="updateQty('${p.id}', 1)" aria-label="Increase quantity">+</button>
              </div>
              <button class="btn btn-primary btn-sm flex-grow" onclick="buySingleProduct('${p.id}')">
                Buy & Donate
              </button>
            </div>

          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  }

  // Filter Chips Handlers
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const filterType = chip.getAttribute('data-filter');
      const val = chip.getAttribute('data-value');
      
      document.querySelectorAll(`.filter-chip[data-filter="${filterType}"]`).forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      
      state.filters[filterType] = val;
      renderProducts();
    });
  });

  if (filterCategory) filterCategory.addEventListener('change', (e) => { state.filters.category = e.target.value; renderProducts(); });
  if (filterPrice) filterPrice.addEventListener('change', (e) => { state.filters.price = e.target.value; renderProducts(); });
  if (filterAge) filterAge.addEventListener('change', (e) => { state.filters.age = e.target.value; renderProducts(); });
  if (filterEnv) filterEnv.addEventListener('change', (e) => { state.filters.env = e.target.value; renderProducts(); });
  if (sortSelect) sortSelect.addEventListener('change', (e) => { state.filters.sort = e.target.value; renderProducts(); });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.filters.search = e.target.value;
      if (searchClearBtn) searchClearBtn.style.display = state.filters.search ? 'block' : 'none';
      renderProducts();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.filters.search = '';
      searchClearBtn.style.display = 'none';
      renderProducts();
    });
  }

  window.resetAllFilters = function() {
    state.filters = { animal: 'all', category: 'all', priority: 'all', price: 'all', age: 'all', env: 'all', search: '', sort: 'priority' };
    if (searchInput) searchInput.value = '';
    if (filterCategory) filterCategory.value = 'all';
    if (filterPrice) filterPrice.value = 'all';
    if (filterAge) filterAge.value = 'all';
    if (filterEnv) filterEnv.value = 'all';
    if (sortSelect) sortSelect.value = 'priority';

    document.querySelectorAll('.filter-chip').forEach(c => {
      if (c.getAttribute('data-value') === 'all') c.classList.add('active');
      else c.classList.remove('active');
    });

    renderProducts();
  };

  const resetAllBtn = document.getElementById('reset-all-filters');
  if (resetAllBtn) resetAllBtn.addEventListener('click', window.resetAllFilters);

  window.toggleWishlist = function(pId) {
    state.wishlist[pId] = !state.wishlist[pId];
    renderProducts();
  };

  window.shareProduct = function(pName) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert(`Product link for "${pName}" copied to clipboard!`);
    } else {
      alert(`Sharing CARE Campaign Product: ${pName}`);
    }
  };

  // --- PRODUCT GALLERY LIGHTBOX MODAL ---
  const galleryModal = document.getElementById('product-lightbox-modal');
  const galleryImg = document.getElementById('product-lightbox-img');
  const galleryTitle = document.getElementById('product-lightbox-title');
  const gallerySpecs = document.getElementById('product-lightbox-specs');
  const galleryPrice = document.getElementById('product-lightbox-price');
  const galleryClose = document.getElementById('product-lightbox-close');

  window.openProductGallery = function(pId) {
    const p = catalogProducts.find(prod => prod.id === pId);
    if (!p) return;

    if (galleryImg) galleryImg.src = p.img;
    if (galleryTitle) galleryTitle.textContent = `${p.brand} ${p.name}`;
    if (gallerySpecs) gallerySpecs.textContent = `${p.size} • ${p.weight} • ${p.purpose} • Rating: ${p.rating} ★ (${p.reviews} reviews)`;
    if (galleryPrice) galleryPrice.textContent = `$${p.price.toFixed(2)}`;

    if (galleryModal) {
      galleryModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  function closeGallery() {
    if (galleryModal) {
      galleryModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (galleryClose) galleryClose.addEventListener('click', closeGallery);
  if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) closeGallery();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeGallery();
  });

  // --- QUANTITY & CART HANDLERS ---
  window.updateQty = function(productId, delta) {
    const current = state.donationBag[productId] || 0;
    const updated = Math.max(0, current + delta);
    if (updated > 0) {
      state.donationBag[productId] = updated;
    } else {
      delete state.donationBag[productId];
    }
    renderProducts();
    updateBagBar();
  };

  window.buySingleProduct = function(productId) {
    state.donationBag[productId] = (state.donationBag[productId] || 0) + 1;
    renderProducts();
    updateBagBar();
  };

  window.proceedToCheckout = function() {
    saveCartToLocalStorage();
    window.location.href = 'checkout.html';
  };

  function saveCartToLocalStorage() {
    const cartData = { items: state.donationBag };
    localStorage.setItem('care_donation_cart', JSON.stringify(cartData));
  }

  const bagBar = document.getElementById('donation-bag-bar');
  const bagCountEl = document.getElementById('bag-item-count');
  const bagTotalEl = document.getElementById('bag-total-val');

  function updateBagBar() {
    let totalItems = 0;
    let totalPriceUSD = 0;

    Object.keys(state.donationBag).forEach(pId => {
      const q = state.donationBag[pId];
      const p = catalogProducts.find(prod => prod.id === pId);
      if (p) {
        totalItems += q;
        totalPriceUSD += p.price * q;
      }
    });

    if (bagBar) {
      if (totalItems > 0) {
        bagBar.classList.add('visible');
        if (bagCountEl) bagCountEl.textContent = `${totalItems} Item${totalItems > 1 ? 's' : ''} Selected`;
        if (bagTotalEl) bagTotalEl.textContent = `$${totalPriceUSD.toFixed(2)}`;
      } else {
        bagBar.classList.remove('visible');
      }
    }
  }

  // Initial Render
  renderProducts();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCatalogEngine);
} else {
  initCatalogEngine();
}
