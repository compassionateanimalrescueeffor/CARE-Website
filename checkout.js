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
    { id: 'purina-cat-chow-15',       name: 'Purina Cat Chow Complete Dry Cat Food',          brand: 'Purina',          price: 22.99, img: 'assets/products/purina-cat-chow.jpg',              animal: 'cat'    },
    { id: 'purina-one-cat-16',        name: 'Purina ONE High Protein Dry Cat Food',            brand: 'Purina ONE',      price: 31.99, img: 'assets/products/purina-one-cat-food.jpg',        animal: 'cat'    },
    { id: 'purina-one-dog-31',        name: 'Purina ONE High Protein Dog Food',                brand: 'Purina ONE',      price: 31.99, img: 'assets/products/purina-one-dog-food.jpg',        animal: 'dog'    },
    { id: 'fancy-feast-24',           name: 'Fancy Feast Classic Paté Wet Cat Food',           brand: 'Fancy Feast',     price: 24.99, img: 'assets/products/fancy-feast-wet-cat-food.jpg',   animal: 'cat'    },
    { id: 'friskies-wet-40',          name: 'Purina Friskies Variety Pack Wet Cat Food',       brand: 'Friskies',        price: 32.49, img: 'assets/products/purina-friskies.jpg',             animal: 'cat'    },
    { id: 'pedigree-wet-12',          name: 'Pedigree Choice Cuts Wet Dog Food',               brand: 'Pedigree',        price: 19.99, img: 'assets/products/pedigree-wet-dog-food.jpg',       animal: 'dog'    },
    { id: 'kmr-formula',              name: 'KMR Kitten Milk Replacer Powder',                 brand: 'PetAg',           price: 21.99, img: 'assets/products/kmr-kitten-formula.jpg',          animal: 'cat'    },
    { id: 'baby-food-meat',           name: 'Gerber Pureed Meat Baby Food (Pure Meat)',        brand: 'Gerber',          price: 18.00, img: 'assets/products/gerber-baby-food.jpg',            animal: 'cat'    },
    { id: 'dog-treats-large',         name: 'Milk-Bone Original Large Dog Biscuits',           brand: 'Milk-Bone',       price: 14.99, img: 'assets/products/milkbone-dog-biscuits.jpg',       animal: 'dog'    },
    { id: 'cat-treats-temptations',   name: 'Temptations Crunchy & Soft Cat Treats',          brand: 'Temptations',     price:  8.49, img: 'assets/products/temptations-cat-treats.jpg',       animal: 'cat'    },
    { id: 'bayer-dewormer-cat',       name: 'Bayer Tapeworm Dewormer for Cats',               brand: 'Bayer',           price: 16.49, img: 'assets/products/bayer-tapeworm-dewormer.jpg',     animal: 'cat'    },
    { id: 'frontline-cat',            name: 'Frontline Plus Flea & Tick Treatment (Cats)',     brand: 'Frontline',       price: 38.90, img: 'assets/products/frontline-plus-cat.jpg',          animal: 'cat'    },
    { id: 'frontline-dog',            name: 'Frontline Plus Flea & Tick Treatment (Dogs)',     brand: 'Frontline',       price: 38.99, img: 'assets/products/frontline-plus-dog.jpg',          animal: 'dog'    },
    { id: 'flea-comb',                name: 'Safari Fine-Tooth Stainless Steel Flea Comb',    brand: 'Safari',          price:  7.49, img: 'assets/products/safari-flea-comb.jpg',            animal: 'shared' },
    { id: 'soft-pet-bed',             name: 'Bedsure Washable Plush Round Pet Bed',            brand: 'Bedsure',         price: 24.99, img: 'assets/products/bedsure-plush-pet-bed.jpg',       animal: 'shared' },
    { id: 'dog-bed-ortho',            name: 'Furhaven Orthopedic Memory Foam Dog Bed',         brand: 'Furhaven',        price: 46.99, img: 'assets/products/furhaven-dog-bed.jpg',            animal: 'dog'    },
    { id: 'fleece-blankets',          name: 'Washable Fleece Pet Blanket Throws (3 pk)',      brand: 'Frisco',          price: 14.99, img: 'assets/products/fleece-pet-blankets.jpg',         animal: 'shared' },
    { id: 'scratching-post',          name: 'SmartCat Ultimate Sisal Cat Scratching Post',     brand: 'SmartCat',        price: 29.99, img: 'assets/products/smartcat-scratching-post.jpg',    animal: 'cat'    },
    { id: 'neonatal-heating-pad',     name: 'K&H Safe Heated Pad for Neonatal Animals',       brand: 'K&H Pet Products',price: 32.99, img: 'assets/products/kh-heated-pad.jpg',               animal: 'shared' },
    { id: 'new-towels',               name: 'Absorbent Cotton Bath Towels for Animal Care',    brand: 'Utopia',          price: 12.99, img: 'assets/products/absorbent-cotton-towels.jpg',     animal: 'shared' },
    { id: 'rescue-disinfectant',      name: 'Rescue Veterinary Disinfectant Cleaner',          brand: 'Rescue Vet',      price: 11.99, img: 'assets/products/rescue-disinfectant.jpg',         animal: 'shared' },
    { id: 'paper-towels-12',          name: 'Bounty Quick-Size Paper Towels (12 Double Rolls)',brand: 'Bounty',          price: 22.99, img: 'assets/products/bounty-paper-towels.jpg',         animal: 'shared' },
    { id: 'laundry-detergent-large',  name: 'Tide Liquid Laundry Detergent Free & Gentle',    brand: 'Tide',            price: 16.99, img: 'assets/products/tide-laundry-detergent.jpg',      animal: 'shared' },
    { id: 'heavy-trash-bags',         name: 'Hefty Strong Heavy-Duty Trash Bags',              brand: 'Hefty',           price: 18.99, img: 'assets/products/hefty-trash-bags.jpg',            animal: 'shared' },
    { id: 'unscented-baby-wipes',     name: 'Huggies Simply Clean Unscented Wipes',            brand: 'Huggies',         price:  6.49, img: 'assets/products/huggies-wipes.jpg',               animal: 'shared' },
    { id: 'nitrile-gloves-box',       name: 'Medical-Grade Nitrile Exam Gloves',              brand: 'Medline',         price: 14.99, img: 'assets/products/nitrile-exam-gloves.jpg',         animal: 'shared' },
    { id: 'heavy-duty-bowls',         name: 'Heavy-Duty Non-Tip Stainless Steel Bowls',        brand: 'Frisco',          price: 11.99, img: 'assets/products/heavy-duty-bowls.jpg',            animal: 'shared' },
    { id: 'feeding-equipment-kit',    name: 'Feeding Equipment Care Kit',                      brand: 'Frisco',          price: 10.49, img: 'assets/products/feeding-equipment.jpg',           animal: 'shared' },
    { id: 'cat-toys-assortment',      name: 'Frisco Interactive Cat Track & Toy Set',          brand: 'Frisco',          price:  8.99, img: 'assets/products/frisco-cat-track-toy.jpg',        animal: 'cat'    },
    { id: 'kong-dog-toy-large',       name: 'KONG Classic Durable Rubber Dog Toy',             brand: 'KONG',            price: 14.99, img: 'assets/products/kong-dog-toy.jpg',                animal: 'dog'    },
    { id: 'plastic-cat-carrier',      name: 'Petmate Two-Door Top-Load Cat Carrier',           brand: 'Petmate',         price: 34.99, img: 'assets/products/petmate-cat-carrier.jpg',         animal: 'cat'    },
    { id: 'slip-lead-leashes',        name: 'Reflective Nylon Kennel Slip Lead Leashes',       brand: 'LupinePet',       price: 12.99, img: 'assets/products/reflective-slip-leashes.jpg',      animal: 'shared' },
    { id: 'crate-aluminum-36',        name: 'MidWest iCrate Heavy-Duty Transport Crate',       brand: 'MidWest',         price: 58.99, img: 'assets/products/midwest-crate.jpg',               animal: 'dog'    },
    { id: 'syringes-feeding-kit',     name: 'PetAg Nursing Bottle & Calibration Syringe Kit', brand: 'PetAg',           price: 11.49, img: 'assets/products/petag-nursing-bottle-kit.jpg',    animal: 'shared' },
    { id: 'triage-first-aid-bag',     name: 'Curicyn Rescue Triage First Aid Kit Bag',         brand: 'Curicyn',         price: 64.50, img: 'assets/products/curicyn-first-aid-kit.jpg',        animal: 'shared' },
    { id: 'fresh-step-litter-40',     name: 'Fresh Step Multi-Cat Clumping Cat Litter',        brand: 'Fresh Step',      price: 23.99, img: 'assets/products/fresh-step-cat-litter.jpg',        animal: 'cat'    },
    { id: 'puppy-pee-pads-100',       name: 'Glad For Pets Leak-Proof Puppy Training Pads',   brand: 'Glad',            price: 29.99, img: 'assets/products/glad-puppy-pads.jpg',              animal: 'dog'    }
  ];

  // -------------------------------------------------------------------------
  // STATE
  // -------------------------------------------------------------------------
  const appState = {
    cart: {},
    donationType: 'one-time',
    shelterState: '',
    shelterZip: '',
    currentStep: 1
  };

  // -------------------------------------------------------------------------
  // HELPERS
  // -------------------------------------------------------------------------
  function fmt(amount) {
    return `$${amount.toFixed(2)}`;
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
      donationType: appState.donationType,
      shelterState: appState.shelterState,
      shelterZip:   appState.shelterZip
    }));
  }

  function load() {
    const cartRaw = localStorage.getItem('care_donation_cart');
    if (cartRaw) {
      try {
        const d = JSON.parse(cartRaw);
        appState.cart = d.items || {};
      } catch(e) {}
    }
    const coRaw = localStorage.getItem('care_checkout');
    if (coRaw) {
      try {
        const d = JSON.parse(coRaw);
        appState.donationType = d.donationType || 'one-time';
        appState.shelterState = d.shelterState || '';
        appState.shelterZip   = d.shelterZip   || '';
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
    // Init PayPal buttons when entering step 5
    if (step === 5) {
      setTimeout(initCheckoutPayPal, 100);
    }

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

    // Step 5 summary mirrors
    const csFreq = document.getElementById('checkout-summary-freq');
    const csItems = document.getElementById('checkout-summary-items');
    const csTotal = document.getElementById('checkout-summary-total');
    const csRecur = document.getElementById('checkout-summary-recurring');
    if (csFreq) csFreq.textContent = appState.donationType === 'monthly' ? 'Monthly Giving' : 'One-Time';
    if (csItems) {
      const totalItems = Object.keys(appState.cart).reduce((s, id) => s + appState.cart[id], 0);
      csItems.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
    }
    if (csTotal) csTotal.textContent = fmt(total);
    if (csRecur) csRecur.style.display = appState.donationType === 'monthly' ? 'flex' : 'none';

    if (window.lucide) lucide.createIcons();
  }

  // -------------------------------------------------------------------------
  // STEP 5 – PAYPAL PAYMENT (inline)
  // -------------------------------------------------------------------------
  const PAYPAL_CLIENT_ID = 'AUmL6AGZU0xLTFKk5PEK2pMef2dFiEZzMeHAIy3Pmf075_ZBP1wKzDxEGFnGx7-xp8dL9nNkHSlG-jHo';
  let checkoutPaypalRendered = false;

  function initCheckoutPayPal() {
    if (checkoutPaypalRendered) return;
    if (!document.getElementById('checkout-paypal-container')) return;

    if (window.checkout_paypal || window.paypal) { renderCheckoutButtons(); return; }

    const script = document.createElement('script');
    let sdkSrc = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&enable-funding=card`;
    if (appState.donationType === 'monthly') sdkSrc += '&vault=true&intent=subscription';
    script.src = sdkSrc;
    script.setAttribute('data-namespace', 'checkout_paypal');
    script.onload = renderCheckoutButtons;
    script.onerror = () => {
      document.getElementById('checkout-paypal-container').innerHTML =
        '<p style="color:red;text-align:center;">Failed to load PayPal. Please try again later.</p>';
      document.getElementById('checkout-card-container').innerHTML = '';
    };
    document.head.appendChild(script);
  }

  function parsePayPalResponse(resp) {
    return resp.text().then(function(text) {
      if (!resp.ok) {
        throw new Error('Server error ' + resp.status + (text ? ': ' + text : ' (empty response)'));
      }
      const ct = resp.headers.get('content-type') || '';
      if (!ct.includes('application/json')) {
        throw new Error('Unexpected response from server (' + resp.status + '): ' + (text || 'empty response'));
      }
      try {
        return JSON.parse(text);
      } catch (e) {
        throw new Error('Invalid JSON from server: ' + text);
      }
    });
  }

  function renderCheckoutButtons() {
    const sdk = window.checkout_paypal || window.paypal;
    if (!sdk || checkoutPaypalRendered) return;

    const { total } = cartTotals();
    const isMonthly = appState.donationType === 'monthly';
    const amt = parseFloat(total.toFixed(2));

    const btnOpts = isMonthly ? {
      createSubscription: function() {
        return fetch('/api/paypal/create-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: amt, currency: 'USD' })
        }).then(parsePayPalResponse).then(d => { if (d.error) throw new Error(d.error); return d.id; });
      },
      onApprove: handleCheckoutSuccess,
      onError: function(err) { alert('Payment failed: ' + (err.message || 'Please try again.')); }
    } : {
      createOrder: function() {
        return fetch('/api/paypal/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: amt, currency: 'USD' })
        }).then(parsePayPalResponse).then(d => { if (d.error) throw new Error(d.error); return d.id; });
      },
      onApprove: function(data) {
        return fetch('/api/paypal/capture-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: data.orderID })
        }).then(parsePayPalResponse).then(d => {
          if (d.error) throw new Error(d.error);
          handleCheckoutSuccess();
        });
      },
      onError: function(err) { alert('Payment failed: ' + (err.message || 'Please try again.')); }
    };

    sdk.Buttons({ ...btnOpts, fundingSource: sdk.FUNDING.PAYPAL }).render('#checkout-paypal-container');
    sdk.Buttons({ ...btnOpts, fundingSource: sdk.FUNDING.CARD }).render('#checkout-card-container');
    checkoutPaypalRendered = true;
  }

  function handleCheckoutSuccess() {
    localStorage.removeItem('care_donation_cart');
    localStorage.removeItem('care_checkout');

    const { total } = cartTotals();
    document.getElementById('confirmation-total').textContent = fmt(total);
    document.getElementById('confirmation-donation-type').textContent =
      appState.donationType === 'monthly' ? 'Monthly Subscription' : 'One-Time Donation';
    document.getElementById('confirmation-order-id').textContent =
      'CARE-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const locEl = document.getElementById('confirmation-location');
    if (locEl) {
      locEl.textContent = appState.shelterState ? `${appState.shelterState} (${appState.shelterZip})` : 'Shelter Location';
    }
    const recEl = document.getElementById('confirmation-recurring');
    if (recEl) recEl.style.display = appState.donationType === 'monthly' ? 'flex' : 'none';

    goToStep(6);
  }

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

});