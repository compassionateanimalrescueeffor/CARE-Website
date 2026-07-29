/* ==========================================================================
   CARE – Compassionate Animal Rescue Effort
   Checkout Flow – Full Working Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------------------
  // DEMO ZIP DATA
  // -------------------------------------------------------------------------
  const DEMO_ZIPS = {
    'California':     ['90001', '90210', '92101', '94103'],
    'Texas':          ['73301', '75001', '77001', '78701'],
    'Florida':        ['32003', '33101', '32801', '33602'],
    'New York':       ['10001', '11201', '12207', '14604'],
    'Illinois':       ['60007', '60601', '62701', '61820'],
    'Washington':     ['98101', '98004', '99201', '98501'],
    'Colorado':       ['80014', '80202', '80903', '81611'],
    'Arizona':        ['85001', '85281', '85701', '86001'],
    'Georgia':        ['30301', '31401', '30030', '31901'],
    'North Carolina': ['27601', '28202', '27401', '28801']
  };

  // -------------------------------------------------------------------------
  // CATALOG (mirrors supplies.js)
  // -------------------------------------------------------------------------
  const catalogProducts = [
    { id: 'purina-cat-chow-15',       name: 'Purina Cat Chow Complete Dry Cat Food',          brand: 'Purina',          price: 22.99, img: 'assets/products/cat_food_bag.jpg',        animal: 'cat'    },
    { id: 'purina-one-cat-16',        name: 'Purina ONE High Protein Dry Cat Food',            brand: 'Purina ONE',      price: 31.99, img: 'assets/products/cat_food_bag.jpg',        animal: 'cat'    },
    { id: 'purina-one-dog-31',        name: 'Purina ONE SmartBlend Dry Dog Food',              brand: 'Purina ONE',      price: 44.99, img: 'assets/products/dog_food_bag.jpg',        animal: 'dog'    },
    { id: 'fancy-feast-24',           name: 'Fancy Feast Classic Paté Wet Cat Food',           brand: 'Fancy Feast',     price: 24.99, img: 'assets/products/cat_food_wet.jpg',        animal: 'cat'    },
    { id: 'friskies-wet-40',          name: 'Purina Friskies Variety Pack Wet Cat Food',       brand: 'Friskies',        price: 32.49, img: 'assets/products/cat_food_wet.jpg',        animal: 'cat'    },
    { id: 'pedigree-wet-12',          name: 'Pedigree Choice Cuts Wet Dog Food',               brand: 'Pedigree',        price: 19.99, img: 'assets/products/dog_food_bag.jpg',        animal: 'dog'    },
    { id: 'kmr-formula',              name: 'KMR Kitten Milk Replacer Powder',                 brand: 'PetAg',           price: 21.99, img: 'assets/products/kitten_formula.jpg',      animal: 'cat'    },
    { id: 'baby-food-meat',           name: 'Gerber Pureed Meat Baby Food (Pure Meat)',        brand: 'Gerber',          price: 18.00, img: 'assets/products/kitten_formula.jpg',      animal: 'cat'    },
    { id: 'dog-treats-large',         name: 'Milk-Bone Original Large Dog Biscuits',           brand: 'Milk-Bone',       price: 14.99, img: 'assets/products/dog_food_bag.jpg',        animal: 'dog'    },
    { id: 'cat-treats-temptations',   name: 'Temptations Crunchy & Soft Cat Treats',          brand: 'Temptations',     price:  8.49, img: 'assets/products/cat_food_bag.jpg',        animal: 'cat'    },
    { id: 'bayer-dewormer-cat',       name: 'Bayer Tapeworm Dewormer for Cats',               brand: 'Bayer',           price: 16.49, img: 'assets/products/cat_dewormer_box.jpg',    animal: 'cat'    },
    { id: 'frontline-cat',            name: 'Frontline Plus Flea & Tick Treatment',            brand: 'Frontline',       price: 38.99, img: 'assets/products/cat_dewormer_box.jpg',    animal: 'cat'    },
    { id: 'flea-comb',                name: 'Safari Fine-Tooth Stainless Steel Flea Comb',    brand: 'Safari',          price:  7.49, img: 'assets/products/medical_first_aid.jpg',   animal: 'shared' },
    { id: 'soft-pet-bed',             name: 'Bedsure Washable Plush Round Pet Bed',            brand: 'Bedsure',         price: 24.99, img: 'assets/products/cat_bed_plush.jpg',       animal: 'cat'    },
    { id: 'dog-bed-ortho',            name: 'Furhaven Orthopedic Memory Foam Dog Bed',         brand: 'Furhaven',        price: 46.99, img: 'assets/products/cat_bed_plush.jpg',       animal: 'dog'    },
    { id: 'fleece-blankets',          name: 'Washable Fleece Pet Blanket Throws',              brand: 'Frisco',          price: 14.99, img: 'assets/products/fleece_pet_blanket.jpg',  animal: 'shared' },
    { id: 'scratching-post',          name: 'SmartCat Ultimate Sisal Cat Scratching Post',     brand: 'SmartCat',        price: 29.99, img: 'assets/products/cat_bed_plush.jpg',       animal: 'cat'    },
    { id: 'neonatal-heating-pad',     name: 'K&H Safe Heated Pad for Neonatal Animals',       brand: 'K&H Pet Products',price: 32.99, img: 'assets/products/cat_bed_plush.jpg',       animal: 'shared' },
    { id: 'new-towels',               name: 'Absorbent Cotton Bath Towels for Animal Care',    brand: 'Utopia',          price: 12.99, img: 'assets/products/cat_bed_plush.jpg',       animal: 'shared' },
    { id: 'rescue-disinfectant',      name: 'Rescue Veterinary Disinfectant Cleaner',          brand: 'Rescue Vet',      price: 11.99, img: 'assets/products/disinfectant_bottle.jpg', animal: 'shared' },
    { id: 'paper-towels-12',          name: 'Bounty Quick-Size Paper Towels',                  brand: 'Bounty',          price: 22.99, img: 'assets/products/paper_towels_pack.jpg',   animal: 'shared' },
    { id: 'laundry-detergent-large',  name: 'Tide Liquid Laundry Detergent Free & Gentle',    brand: 'Tide',            price: 16.99, img: 'assets/products/disinfectant_bottle.jpg', animal: 'shared' },
    { id: 'nitrile-gloves-box',       name: 'Medical-Grade Nitrile Exam Gloves',              brand: 'Medline',         price: 14.99, img: 'assets/products/disinfectant_bottle.jpg', animal: 'shared' },
    { id: 'heavy-trash-bags',         name: 'Hefty Strong Heavy-Duty Trash Bags',              brand: 'Hefty',           price: 18.99, img: 'assets/products/disinfectant_bottle.jpg', animal: 'shared' },
    { id: 'unscented-baby-wipes',     name: 'Huggies Simply Clean Unscented Wipes',            brand: 'Huggies',         price:  6.49, img: 'assets/products/disinfectant_bottle.jpg', animal: 'shared' },
    { id: 'stainless-food-bowls',     name: 'Heavy-Duty Non-Tip Stainless Steel Bowls',        brand: 'Frisco',          price: 11.99, img: 'assets/products/stainless_pet_bowls.jpg', animal: 'shared' },
    { id: 'cat-toys-assortment',      name: 'Frisco Interactive Cat Track & Toy Set',          brand: 'Frisco',          price:  8.99, img: 'assets/products/cat_food_bag.jpg',        animal: 'cat'    },
    { id: 'kong-dog-toy-large',       name: 'KONG Classic Durable Rubber Dog Toy',             brand: 'KONG',            price: 14.99, img: 'assets/products/dog_food_bag.jpg',        animal: 'dog'    },
    { id: 'plastic-cat-carrier',      name: 'Petmate Two-Door Top-Load Cat Carrier',           brand: 'Petmate',         price: 34.99, img: 'assets/products/hard_cat_carrier.jpg',    animal: 'cat'    },
    { id: 'slip-lead-leashes',        name: 'Reflective Nylon Kennel Slip Lead Leashes',       brand: 'LupinePet',       price: 12.99, img: 'assets/products/transport_crate.jpg',     animal: 'shared' },
    { id: 'crate-aluminum-36',        name: 'MidWest iCrate Heavy-Duty Transport Crate',       brand: 'MidWest',         price: 58.99, img: 'assets/products/transport_crate.jpg',     animal: 'shared' },
    { id: 'syringes-feeding-kit',     name: 'PetAg Nursing Bottle & Calibration Syringe Kit', brand: 'PetAg',           price: 11.49, img: 'assets/products/medical_first_aid.jpg',   animal: 'shared' },
    { id: 'triage-first-aid-bag',     name: 'Curicyn Rescue Triage First Aid Kit Bag',         brand: 'Curicyn',         price: 64.50, img: 'assets/products/medical_first_aid.jpg',   animal: 'shared' },
    { id: 'fresh-step-litter-40',     name: 'Fresh Step Multi-Cat Clumping Cat Litter',        brand: 'Fresh Step',      price: 23.99, img: 'assets/products/cat_litter_bag.jpg',      animal: 'cat'    },
    { id: 'puppy-pee-pads-100',       name: 'Glad For Pets Leak-Proof Puppy Training Pads',   brand: 'Glad',            price: 29.99, img: 'assets/products/dog_food_bag.jpg',        animal: 'dog'    }
  ];

  // -------------------------------------------------------------------------
  // STATE
  // -------------------------------------------------------------------------
  const appState = {
    cart: {},
    currency: 'USD',
    currencySymbols: { USD: '$', EUR: '€', GBP: '£', CAD: 'CA$', AUD: 'A$' },
    exchangeRates:   { USD: 1.0, EUR: 0.92, GBP: 0.78, CAD: 1.35, AUD: 1.52 },
    donationType: 'one-time',
    shelterState: '',
    shelterZip: '',
    currentStep: 1
  };

  // -------------------------------------------------------------------------
  // HELPERS
  // -------------------------------------------------------------------------
  function fmt(amount) {
    const rate   = appState.exchangeRates[appState.currency] || 1;
    const symbol = appState.currencySymbols[appState.currency] || '$';
    return `${symbol}${(amount * rate).toFixed(2)}`;
  }

  function cartTotals() {
    let subtotal = 0;
    Object.keys(appState.cart).forEach(id => {
      const p = catalogProducts.find(x => x.id === id);
      if (p) subtotal += p.price * appState.cart[id];
    });
    const tax   = subtotal * 0.07;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }

  function getProduct(id) {
    return catalogProducts.find(p => p.id === id);
  }

  function persist() {
    localStorage.setItem('care_checkout', JSON.stringify({
      cart:         appState.cart,
      currency:     appState.currency,
      donationType: appState.donationType,
      shelterState: appState.shelterState,
      shelterZip:   appState.shelterZip
    }));
  }

  function load() {
    // Cart saved by supplies.js under 'care_donation_cart'
    const cartRaw = localStorage.getItem('care_donation_cart');
    if (cartRaw) {
      try {
        const d = JSON.parse(cartRaw);
        appState.cart     = d.items    || {};
        appState.currency = d.currency || 'USD';
      } catch(e) {}
    }
    // Checkout state saved by this file under 'care_checkout'
    const coRaw = localStorage.getItem('care_checkout');
    if (coRaw) {
      try {
        const d = JSON.parse(coRaw);
        appState.donationType = d.donationType || 'one-time';
        appState.shelterState = d.shelterState || '';
        appState.shelterZip   = d.shelterZip   || '';
        // currency from cart takes priority, but fallback:
        if (!cartRaw) appState.currency = d.currency || 'USD';
      } catch(e) {}
    }
  }

  // -------------------------------------------------------------------------
  // STEP NAVIGATION
  // -------------------------------------------------------------------------
  window.goToStep = function(step) {
    // Hide all steps
    document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'));

    // Update progress bar
    document.querySelectorAll('.progress-step').forEach(s => {
      s.classList.remove('active', 'completed');
    });
    for (let i = 1; i < step; i++) {
      const ps = document.querySelector(`.progress-step[data-step="${i}"]`);
      if (ps) ps.classList.add('completed');
    }
    const activePs = document.querySelector(`.progress-step[data-step="${step}"]`);
    if (activePs) activePs.classList.add('active');

    // Show target step
    const target = document.getElementById(`step-${step}`);
    if (target) target.classList.add('active');

    appState.currentStep = step;

    // Render review when entering step 4 or 5
    if (step >= 4) renderReview();

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.lucide) lucide.createIcons();
  };

  // -------------------------------------------------------------------------
  // STEP 1 – CART
  // -------------------------------------------------------------------------
  function renderCart() {
    const cartEl    = document.getElementById('cart-items');
    const emptyEl   = document.getElementById('cart-empty');
    const continueB = document.getElementById('continue-to-type');

    const ids = Object.keys(appState.cart);

    if (ids.length === 0) {
      if (cartEl)  cartEl.style.display  = 'none';
      if (emptyEl) emptyEl.style.display = 'block';
      if (continueB) continueB.disabled  = true;
      return;
    }

    if (cartEl)  cartEl.style.display  = 'block';
    if (emptyEl) emptyEl.style.display = 'none';
    if (continueB) continueB.disabled  = false;

    const { subtotal, tax, total } = cartTotals();

    cartEl.innerHTML = ids.map(id => {
      const p    = getProduct(id);
      if (!p) return '';
      const qty  = appState.cart[id];
      const tag  = p.animal === 'cat' ? '🐱 Cat' : p.animal === 'dog' ? '🐶 Dog' : '🐾 Shared';
      return `
        <div class="cart-item">
          <div class="cart-item-image"><img src="${p.img}" alt="${p.name}"></div>
          <div class="cart-item-details">
            <div class="cart-item-name">${p.name}</div>
            <div class="cart-item-brand">${p.brand} • ${tag}</div>
            <div class="cart-item-meta">
              <span class="cart-item-price">${fmt(p.price)}</span>
              <span class="cart-item-qty">Qty: ${qty}</span>
              <span class="cart-item-total">${fmt(p.price * qty)}</span>
            </div>
          </div>
        </div>`;
    }).join('');

    const elSub   = document.getElementById('summary-subtotal');
    const elTax   = document.getElementById('summary-tax');
    const elTotal = document.getElementById('summary-total');
    if (elSub)   elSub.textContent   = fmt(subtotal);
    if (elTax)   elTax.textContent   = fmt(tax);
    if (elTotal) elTotal.textContent = fmt(total);

    const totalItems = ids.reduce((s, id) => s + appState.cart[id], 0);
    const impactEl   = document.getElementById('impact-stats');
    if (impactEl) {
      impactEl.innerHTML = `
        <div class="impact-stat-item">
          <div class="impact-stat-number">${totalItems}</div>
          <div class="impact-stat-label">Items Selected</div>
        </div>
        <div class="impact-stat-item">
          <div class="impact-stat-number">${fmt(total)}</div>
          <div class="impact-stat-label">Total Value</div>
        </div>`;
    }
  }

  // -------------------------------------------------------------------------
  // STEP 2 – DONATION TYPE
  // -------------------------------------------------------------------------
  window.selectDonationType = function(type) {
    appState.donationType = type;
    persist();

    document.querySelectorAll('.donation-type-card').forEach(c => c.classList.remove('selected'));
    const card = document.querySelector(`.donation-type-card[data-type="${type}"]`);
    if (card) card.classList.add('selected');

    // Clicking the card button goes straight to step 3
    goToStep(3);
  };

  // Restore previously saved selection
  function restoreDonationType() {
    if (appState.donationType) {
      document.querySelectorAll('.donation-type-card').forEach(c => c.classList.remove('selected'));
      const card = document.querySelector(`.donation-type-card[data-type="${appState.donationType}"]`);
      if (card) card.classList.add('selected');
    }
    // The bottom Continue button on step 2 is always enabled (default = one-time)
    const btn = document.getElementById('continue-to-location');
    if (btn) btn.disabled = false;
  }

  // -------------------------------------------------------------------------
  // STEP 3 – SHELTER LOCATION
  // -------------------------------------------------------------------------
  function setupLocationForm() {
    const stateEl    = document.getElementById('shelter-state');
    const zipEl      = document.getElementById('shelter-zip');
    const continueB  = document.getElementById('continue-to-review');

    function populateZips(state) {
      zipEl.innerHTML = '<option value="">Select a ZIP code</option>';
      const zips = DEMO_ZIPS[state] || [];
      zips.forEach(z => {
        const o = document.createElement('option');
        o.value = z;
        o.textContent = z;
        zipEl.appendChild(o);
      });
      zipEl.disabled = zips.length === 0;
      appState.shelterZip = '';
      if (continueB) continueB.disabled = true;
    }

    function validate() {
      const ok = appState.shelterState !== '' && appState.shelterZip !== '';
      if (continueB) continueB.disabled = !ok;
      persist();
    }

    if (stateEl) {
      stateEl.addEventListener('change', () => {
        appState.shelterState = stateEl.value;
        populateZips(stateEl.value);
      });
    }

    if (zipEl) {
      zipEl.addEventListener('change', () => {
        appState.shelterZip = zipEl.value;
        validate();
      });
    }

    // Restore saved values
    if (appState.shelterState && stateEl) {
      stateEl.value = appState.shelterState;
      populateZips(appState.shelterState);
      if (appState.shelterZip && zipEl) {
        zipEl.value = appState.shelterZip;
        appState.shelterZip = zipEl.value; // confirm it matched
      }
    }
    validate();
  }

  // -------------------------------------------------------------------------
  // STEP 4 – REVIEW
  // -------------------------------------------------------------------------
  function renderReview() {
    const { subtotal, tax, total } = cartTotals();

    // Items
    const reviewItemsEl = document.getElementById('review-items');
    if (reviewItemsEl) {
      reviewItemsEl.innerHTML = Object.keys(appState.cart).map(id => {
        const p   = getProduct(id);
        if (!p) return '';
        const qty = appState.cart[id];
        return `
          <div class="review-item">
            <div>
              <div class="review-item-name">${p.name}</div>
              <div class="review-item-meta">${p.brand} • Qty: ${qty} • ${fmt(p.price)} each</div>
            </div>
            <div class="review-item-total">${fmt(p.price * qty)}</div>
          </div>`;
      }).join('');
    }

    // Donation type
    const dtEl = document.getElementById('review-donation-type');
    if (dtEl) {
      dtEl.innerHTML = appState.donationType === 'monthly'
        ? 'Monthly Subscription <span class="recurring-info">↻ Recurring</span>'
        : 'One-Time Purchase';
    }

    // Location – read from appState (not from DOM, avoids stale values)
    const locEl = document.getElementById('review-location');
    if (locEl) {
      const zip = appState.shelterZip || '—';
      locEl.textContent = appState.shelterState
        ? `${appState.shelterState} (${zip})`
        : 'Not selected';
    }

    // Summary
    const rSub   = document.getElementById('review-subtotal');
    const rTax   = document.getElementById('review-tax');
    const rTotal = document.getElementById('review-total');
    if (rSub)   rSub.textContent   = fmt(subtotal);
    if (rTax)   rTax.textContent   = fmt(tax);
    if (rTotal) rTotal.textContent = fmt(total);

    // Recurring notice
    const rnEl = document.getElementById('recurring-notice');
    if (rnEl) rnEl.style.display = appState.donationType === 'monthly' ? 'flex' : 'none';

    // Payment step mirrors
    const pTotal = document.getElementById('payment-total');
    const pToday = document.getElementById('payment-charged-today');
    const pRecur = document.getElementById('payment-recurring');
    if (pTotal) pTotal.textContent = fmt(total);
    if (pToday) pToday.textContent = fmt(total);
    if (pRecur) pRecur.style.display = appState.donationType === 'monthly' ? 'flex' : 'none';

    if (window.lucide) lucide.createIcons();
  }

  // -------------------------------------------------------------------------
  // STEP 5 – PAYMENT OPTIONS
  // -------------------------------------------------------------------------
  function setupPaymentOptions() {
    const options  = document.querySelectorAll('.payment-option');
    const cardForm = document.getElementById('card-form');
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        if (cardForm) {
          cardForm.style.display = opt.getAttribute('data-method') === 'card' ? 'block' : 'none';
        }
      });
    });
    // Default: select first option
    if (options.length) options[0].classList.add('selected');
  }

  // -------------------------------------------------------------------------
  // PROCESS PAYMENT → payment.html
  // -------------------------------------------------------------------------
  window.processPayment = function() {
    const { total } = cartTotals();

    // Save donation data so payment.html can display it
    localStorage.setItem('care_direct_donation', JSON.stringify({
      amount:   parseFloat(total.toFixed(2)),
      freq:     appState.donationType,
      currency: appState.currency || 'USD'
    }));

    // Navigate to the payment page
    window.location.href = 'payment.html';
  };

  // -------------------------------------------------------------------------
  // NAVBAR DONATE BUTTON
  // -------------------------------------------------------------------------
  window.redirectToPayment = function(amount) {
    // Just go to step 1 of checkout
    goToStep(1);
  };

  // -------------------------------------------------------------------------
  // INIT
  // -------------------------------------------------------------------------
  load();
  renderCart();
  restoreDonationType();
  setupLocationForm();
  setupPaymentOptions();

});