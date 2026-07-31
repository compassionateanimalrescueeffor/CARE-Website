/* ==========================================================================
   CARE - Compassionate Animal Rescue Effort
   Complete Production Logic & Purpose-Based Donation Catalog Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Configurable Direct Payment Checkout Gateway URL
  const PAYMENT_URL = 'https://donate.care-animal-rescue.org';

  // Campaign State
  const state = {
    raisedUSD: 750,
    goalUSD: 3500,
    supporterCount: 9,
    phase: 1,
    phaseGoal: 3500,
    frequency: 'one-time',
    selectedAmount: 50,
    calculatorAmount: 50,
    activeCategory: 'food',
    donationBag: {} // productId -> quantity
  };

  // --- CATALOG DATA (Organized by Purpose, ~60% Cat / 40% Dog distribution) ---
  const catalogProducts = [
    // 🐾 Food & Nutrition
    { id: 'p1', catId: 'food', name: 'Cat Dry Food (15 lb bag)', desc: 'High-protein grain-free nutrition for rescued cats.', price: 28, animal: 'cat', priority: 'Critical', needed: 15 },
    { id: 'p2', catId: 'food', name: 'Cat Wet Food Cans (Case of 24)', desc: 'Hydrating savory poultry paté for vulnerable felines.', price: 32, animal: 'cat', priority: 'Critical', needed: 20 },
    { id: 'p3', catId: 'food', name: 'Kitten Nursery Formula', desc: 'Essential replacement formula for orphaned kittens.', price: 18, animal: 'cat', priority: 'High', needed: 12 },
    { id: 'p4', catId: 'food', name: 'Cat Calorie-Dense Treats', desc: 'Nutritional salmon treat toppers for underweight cats.', price: 12, animal: 'cat', priority: 'Standard', needed: 25 },
    { id: 'p5', catId: 'food', name: 'Dog Dry Food (30 lb bag)', desc: 'Wholesome balanced kibble for rescued dogs.', price: 42, animal: 'dog', priority: 'Critical', needed: 10 },
    { id: 'p6', catId: 'food', name: 'Dog Wet Food Cans (Case of 12)', desc: 'Nutritious beef and vegetable stew for recovery.', price: 26, animal: 'dog', priority: 'High', needed: 15 },
    { id: 'p7', catId: 'food', name: 'Puppy Nursing Formula', desc: 'Enriched formula for nursing mother dogs and pups.', price: 22, animal: 'dog', priority: 'High', needed: 8 },

    // 💊 Medical Supplies
    { id: 'p8', catId: 'medical', name: 'Cat Dewormer Oral Suspension', desc: 'Broad-spectrum deworming treatment for cats.', price: 16, animal: 'cat', priority: 'Critical', needed: 30 },
    { id: 'p9', catId: 'medical', name: 'Cat Topical Flea & Tick Doses', desc: 'Fast-acting monthly parasite preventive treatments.', price: 35, animal: 'cat', priority: 'Critical', needed: 25 },
    { id: 'p10', catId: 'medical', name: 'Cat Recovery Formula & Electrolytes', desc: 'Rehydration & appetite stimulant for sick felines.', price: 20, animal: 'cat', priority: 'High', needed: 18 },
    { id: 'p11', catId: 'medical', name: 'Cat Antibacterial Eye Drops', desc: 'Soothing treatment for conjunctivitis & eye trauma.', price: 14, animal: 'cat', priority: 'Standard', needed: 15 },
    { id: 'p12', catId: 'medical', name: 'Dog Dewormer Chewables', desc: 'Effective intestinal parasite defense for rescued dogs.', price: 22, animal: 'dog', priority: 'Critical', needed: 20 },
    { id: 'p13', catId: 'medical', name: 'Dog Flea & Tick Collars', desc: 'Long-lasting protection collars for rescued canines.', price: 29, animal: 'dog', priority: 'High', needed: 15 },
    { id: 'p14', catId: 'medical', name: 'Dog Ear Cleaner Solution', desc: 'Antiseptic ear cleansing solution for shelter dogs.', price: 15, animal: 'dog', priority: 'Standard', needed: 12 },

    // 🛏 Bedding & Comfort
    { id: 'p15', catId: 'bedding', name: 'Cozy Washable Cat Bed', desc: 'Soft plush donut bed for anxious shelter cats.', price: 19, animal: 'cat', priority: 'High', needed: 20 },
    { id: 'p16', catId: 'bedding', name: 'Thermal Fleece Cat Blanket Set', desc: 'Warm machine-washable blankets for cat crates.', price: 15, animal: 'cat', priority: 'Standard', needed: 30 },
    { id: 'p17', catId: 'bedding', name: 'Heated Heating Pad for Newborns', desc: 'Safe temperature heating pad for newborn kittens.', price: 27, animal: 'cat', priority: 'Critical', needed: 10 },
    { id: 'p18', catId: 'bedding', name: 'Cat Scratching Lounge Bed', desc: 'Dual-purpose cardboard lounge and scratcher.', price: 16, animal: 'cat', priority: 'Standard', needed: 15 },
    { id: 'p19', catId: 'bedding', name: 'Orthopedic Memory Foam Dog Bed', desc: 'Pressure-relieving bed for recovering large dogs.', price: 48, animal: 'dog', priority: 'Critical', needed: 8 },
    { id: 'p20', catId: 'bedding', name: 'Heavy-Duty Dog Blanket', desc: 'Durable warm fleece blanket for canine kennels.', price: 18, animal: 'dog', priority: 'High', needed: 25 },
    { id: 'p21', catId: 'bedding', name: 'Large Crate Mattress Pad', desc: 'Waterproof padded mattress for transport crates.', price: 34, animal: 'dog', priority: 'High', needed: 12 },

    // 🧹 Cleaning & Hygiene (Shared)
    { id: 'p22', catId: 'cleaning', name: 'Hospital-Grade Medical Disinfectant', desc: 'Concentrated sanitizing cleaner effective against parvo.', price: 45, animal: 'shared', priority: 'Critical', needed: 12 },
    { id: 'p23', catId: 'cleaning', name: 'Surface Disinfectant Wipes (Pack of 4)', desc: 'Quick sanitizing wipes for exam tables and crates.', price: 22, animal: 'shared', priority: 'High', needed: 20 },
    { id: 'p24', catId: 'cleaning', name: 'Enzyme Pet Odor & Stain Eliminator', desc: 'Natural bio-enzymatic spray for deep sanitization.', price: 19, animal: 'shared', priority: 'High', needed: 15 },
    { id: 'p25', catId: 'cleaning', name: 'Industrial Mop & Bucket System', desc: 'Commercial floor cleaning setup for shelter kennels.', price: 38, animal: 'shared', priority: 'Standard', needed: 6 },
    { id: 'p26', catId: 'cleaning', name: 'Heavy-Duty Rubber Gloves & Trash Bags', desc: 'Hygiene supply pack for daily cage sanitation.', price: 18, animal: 'shared', priority: 'High', needed: 30 },

    // 🚑 Rescue Equipment (Shared)
    { id: 'p27', catId: 'rescue', name: 'Heavy-Duty Transport Rescue Crate', desc: 'Impact-resistant aluminum crate for safe rescue transport.', price: 85, animal: 'shared', priority: 'Critical', needed: 8 },
    { id: 'p28', catId: 'rescue', name: 'Foldable Animal Carrier Set', desc: 'Soft-sided ventilated carriers for quick rescue response.', price: 32, animal: 'shared', priority: 'Critical', needed: 15 },
    { id: 'p29', catId: 'rescue', name: 'Reflective Safety Slip Leashes (10 Pack)', desc: 'High-visibility emergency slip leashes for dogs.', price: 20, animal: 'shared', priority: 'High', needed: 25 },
    { id: 'p30', catId: 'rescue', name: 'First Responder Animal Triage Kit', desc: 'Portable trauma kit for field rescue operations.', price: 65, animal: 'shared', priority: 'Critical', needed: 5 },

    // 🍽 Feeding Equipment
    { id: 'p31', catId: 'feeding', name: 'Stainless Steel Cat Dishes (Set of 6)', desc: 'Hygienic non-tip food and water bowls for felines.', price: 16, animal: 'cat', priority: 'High', needed: 20 },
    { id: 'p32', catId: 'feeding', name: 'Whiskers-Friendly Shallow Cat Bowls', desc: 'Ergonomic wide ceramic bowls for stress-free feeding.', price: 14, animal: 'cat', priority: 'Standard', needed: 15 },
    { id: 'p33', catId: 'feeding', name: 'Elevated Double Bowl Stand for Dogs', desc: 'Ergonomic feeding station for recovering canines.', price: 24, animal: 'dog', priority: 'High', needed: 10 },

    // 🧸 Toys & Enrichment
    { id: 'p34', catId: 'enrichment', name: 'Interactive Feather Wand & Ball Set', desc: 'Enrichment toys for mental stimulation and play.', price: 12, animal: 'cat', priority: 'Standard', needed: 25 },
    { id: 'p35', catId: 'enrichment', name: 'Durable Dog Chew Toy Set', desc: 'Non-toxic rubber chew toys for anxiety relief.', price: 15, animal: 'dog', priority: 'Standard', needed: 20 },

    // 🚽 Litter & Waste Management
    { id: 'p36', catId: 'litter', name: 'Non-Clumping Unscented Cat Litter (40 lb)', desc: 'Safe hypo-allergenic litter for post-surgery cats.', price: 22, animal: 'cat', priority: 'Critical', needed: 30 },
    { id: 'p37', catId: 'litter', name: 'High-Sided Cat Litter Box & Scooper', desc: 'Easy-to-clean sanitizable open litter box.', price: 15, animal: 'cat', priority: 'High', needed: 20 },

    // 🏥 Veterinary Equipment
    { id: 'p38', catId: 'vet', name: 'Digital Animal Thermometer & Probe Covers', desc: 'Fast-read clinical thermometer for vital sign checks.', price: 25, animal: 'shared', priority: 'Critical', needed: 8 },
    { id: 'p39', catId: 'vet', name: 'Pet Medical Stethoscope & Pulse Oximeter', desc: 'Diagnostic tools for emergency respiratory monitoring.', price: 55, animal: 'shared', priority: 'Critical', needed: 5 }
  ];

  // Calculator Details
  const calculatorImpacts = {
    10: { title: "$10 Contribution", desc: "Feeds rescued animals for one day with wholesome, nutritious meals.", detail: "Provides 3 nutritious meals for rescued dogs or cats recovering from malnutrition." },
    25: { title: "$25 Contribution", desc: "Vaccinates one rescued animal against core preventable diseases.", detail: "Covers rabies, DHPP, and FVRCP vaccinations + flea/tick preventive treatments." },
    50: { title: "$50 Contribution", desc: "Provides emergency medical treatment and triage care.", detail: "Funds immediate veterinary diagnostic checks, wound dressing, and antibiotics." },
    100: { title: "$100 Contribution", desc: "Supports a dedicated animal rescue mission.", detail: "Covers emergency vehicle transport, rescue nets, safety crates, and trauma team dispatch." },
    250: { title: "$250 Contribution", desc: "Provides full food, shelter, and medical care for multiple rescued animals.", detail: "Funds a complete month of comprehensive rehabilitation, medical care, and housing." }
  };

  // Global Redirect / Donate Function
  window.redirectToPayment = function(amount, freq) {
    const targetAmount = parseFloat(amount) || state.selectedAmount || 50;
    const targetFreq   = freq || 'one-time';

    if (!targetAmount || targetAmount <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    // Persist to localStorage so payment.html can read it
    localStorage.setItem('care_direct_donation', JSON.stringify({
      amount:   targetAmount,
      freq:     targetFreq
    }));

    window.location.href = 'payment.html';
  };

  // Global helper for inline handlers that need the current frequency
  window.donateAmount = function(amount) {
    redirectToPayment(amount, state.frequency);
  };

  // Custom donation modal for independent Donate Now buttons
  window.donateCustom = function() {
    const overlay = document.getElementById('donation-modal');
    const input = document.getElementById('modal-amount-input');
    const presets = overlay.querySelectorAll('.preset-btn');
    const donateBtn = document.getElementById('modal-donate-btn');
    const closeBtn = document.getElementById('modal-close');
    const cancelBtn = document.getElementById('modal-cancel-btn');

    let selectedAmount = 50;
    input.value = '';

    function setPreset(amt) {
      selectedAmount = amt;
      presets.forEach(p => p.classList.toggle('active', parseFloat(p.getAttribute('data-amt')) === amt));
      input.value = '';
    }

    presets.forEach(p => {
      p.onclick = () => setPreset(parseFloat(p.getAttribute('data-amt')));
    });

    input.oninput = function() {
      const val = parseFloat(this.value);
      if (val > 0) {
        selectedAmount = val;
        presets.forEach(p => p.classList.remove('active'));
      }
    };

    input.onkeydown = function(e) {
      if (e.key === 'Enter') submitAmount();
    };

    function submitAmount() {
      if (!selectedAmount || selectedAmount <= 0) {
        alert('Please enter a valid donation amount.');
        return;
      }
      close();
      redirectToPayment(selectedAmount, state.frequency);
    }

    function close() {
      overlay.classList.remove('show');
      document.body.style.overflow = '';
    }

    donateBtn.onclick = submitAmount;
    closeBtn.onclick = close;
    cancelBtn.onclick = close;
    overlay.onclick = function(e) { if (e.target === overlay) close(); };

    setPreset(50);
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  // Highlight the selected impact card and sync custom input
  function selectImpactCard(usdAmount) {
    state.selectedAmount = usdAmount;

    document.querySelectorAll('.impact-card[data-usd]').forEach(card => {
      const val = parseFloat(card.getAttribute('data-usd'));
      card.classList.toggle('selected-card', val === usdAmount);
    });

    const customInput = document.getElementById('custom-amount-input');
    if (customInput) customInput.value = '';
  }

  // Wire preset Donate buttons to also select their card
  document.querySelectorAll('.impact-card[data-usd]').forEach(card => {
    const usdAmount = parseFloat(card.getAttribute('data-usd'));
    card.addEventListener('click', (e) => {
      if (!e.target.closest('button')) selectImpactCard(usdAmount);
    });
    const btn = card.querySelector('button');
    if (btn) {
      btn.onclick = function() {
        selectImpactCard(usdAmount);
        redirectToPayment(usdAmount, state.frequency);
      };
    }
  });

  // Wire custom amount input
  const customInput = document.getElementById('custom-amount-input');
  const customDonateBtn = document.querySelector('.custom-impact-card button');
  if (customInput) {
    customInput.addEventListener('input', () => {
      const val = parseFloat(customInput.value);
      document.querySelectorAll('.impact-card[data-usd]').forEach(c => c.classList.remove('selected-card'));
      state.selectedAmount = val > 0 ? val : null;
    });
  }
  if (customDonateBtn) {
    customDonateBtn.onclick = function() {
      const val = parseFloat(customInput ? customInput.value : 0);
      if (!val || val <= 0) {
        alert('Please enter a valid custom donation amount (minimum $1).');
        return;
      }
      redirectToPayment(val, state.frequency);
    };
  }

  // --- 1. NAVIGATION & SCROLL HIGHLIGHT ---
  const navbar = document.querySelector('.navbar');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightNavOnScroll();
  });

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
  }

  function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="#${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  // --- 2. CURRENCY & CAMPAIGN PROGRESS ---
  const progressBarFill = document.getElementById('progress-bar-fill');
  const raisedDisplay = document.getElementById('raised-amount');
  const heroRaisedDisplay = document.getElementById('hero-raised-display');
  const goalDisplay = document.getElementById('goal-amount');
  const percentDisplay = document.getElementById('percent-complete');
  const supportersDisplay = document.getElementById('supporters-count');
  const freqBtns = document.querySelectorAll('.freq-btn');

  function updateProgressUI() {
    const percentage = state.goalUSD > 0 ? Math.min(100, Math.round((state.raisedUSD / state.goalUSD) * 100)) : 0;

    if (raisedDisplay) raisedDisplay.textContent = `$${state.raisedUSD.toLocaleString()}`;
    if (heroRaisedDisplay) heroRaisedDisplay.textContent = `$${state.raisedUSD.toLocaleString()}`;
    if (goalDisplay) goalDisplay.textContent = `$${state.goalUSD.toLocaleString()}`;
    if (percentDisplay) percentDisplay.textContent = `${percentage}%`;
    if (supportersDisplay) {
      supportersDisplay.textContent = state.supporterCount === 0 ? '0 (Be the first!)' : state.supporterCount.toLocaleString();
    }
    const heroSupporters = document.getElementById('hero-supporters-count');
    if (heroSupporters) heroSupporters.textContent = state.supporterCount.toLocaleString();
    if (progressBarFill) progressBarFill.style.width = `${percentage}%`;

    const heroFloatingGoal = document.getElementById('hero-floating-goal');
    if (heroFloatingGoal) {
      heroFloatingGoal.textContent = `${percentage}% of $${state.goalUSD.toLocaleString()}`;
    }

    const heroGoalLabel = document.getElementById('hero-goal-label');
    if (heroGoalLabel) heroGoalLabel.textContent = `Raised of $${state.goalUSD.toLocaleString()} Goal`;
  }

  function updatePhaseUI() {
    const phasePill = document.getElementById('phase-pill');
    if (phasePill) phasePill.textContent = `Phase ${state.phase} of 3`;

    const heroPhaseLabel = document.getElementById('hero-phase-label');
    if (heroPhaseLabel) heroPhaseLabel.textContent = `Phase ${state.phase} Official Fundraiser`;

    document.querySelectorAll('.roadmap-card[data-phase]').forEach(card => {
      const cardPhase = parseInt(card.getAttribute('data-phase'), 10);
      const badge = card.querySelector('.roadmap-badge');
      const isActive = cardPhase === state.phase;

      card.classList.toggle('active', isActive);

      if (badge) {
        if (cardPhase < state.phase) {
          badge.className = 'roadmap-badge completed';
          badge.textContent = `Phase ${cardPhase} • Completed`;
        } else if (isActive) {
          badge.className = 'roadmap-badge current';
          badge.textContent = `Phase ${cardPhase} • Active Now`;
        } else {
          badge.className = 'roadmap-badge upcoming';
          badge.textContent = `Phase ${cardPhase} • Upcoming`;
        }
      }
    });

    const roadmapGoals = { 1: '$3,500', 2: '$25,000', 3: '$100,000+' };
    document.querySelectorAll('.roadmap-card[data-phase]').forEach(card => {
      const cardPhase = parseInt(card.getAttribute('data-phase'), 10);
      const goalEl = card.querySelector('.roadmap-goal');
      if (goalEl && roadmapGoals[cardPhase]) {
        goalEl.textContent = `Goal ${roadmapGoals[cardPhase]}`;
      }
    });
  }

  async function loadCampaignFromServer() {
    try {
      const resp = await fetch('/api/campaign');
      if (!resp.ok) return;
      const data = await resp.json();
      if (typeof data.raisedUSD === 'number' && data.phaseGoal) {
        state.raisedUSD = data.raisedUSD;
        state.goalUSD = data.phaseGoal;
        state.supporterCount = data.supporters || state.supporterCount;
        state.phase = data.phase || 1;
        state.phaseGoal = data.phaseGoal;
        updateProgressUI();
        updatePhaseUI();
      }
    } catch (e) {}
  }

  function updateImpactCardsCurrency() {
    document.querySelectorAll('.impact-card[data-usd]').forEach(card => {
      const usdAmount = parseFloat(card.getAttribute('data-usd'));
      const amountEl = card.querySelector('.impact-amount');
      if (amountEl) {
        amountEl.innerHTML = `$${usdAmount}<span>/${state.frequency === 'monthly' ? 'mo' : ''}</span>`;
      }
    });
  }

  freqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      freqBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.frequency = btn.getAttribute('data-freq');
      updateImpactCardsCurrency();
    });
  });

  // --- 3. INTERACTIVE DONATION CALCULATOR ---
  const calcBtns = document.querySelectorAll('.calc-btn');
  const calcTitle = document.getElementById('calc-impact-title');
  const calcDesc = document.getElementById('calc-impact-desc');
  const calcDetail = document.getElementById('calc-impact-detail');
  const calcDonateBtn = document.getElementById('calc-donate-btn');

  calcBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      calcBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const amount = parseInt(btn.getAttribute('data-calc-amount'));
      state.calculatorAmount = amount;
      
      const impact = calculatorImpacts[amount];
      if (impact) {
        if (calcTitle) calcTitle.textContent = impact.title;
        if (calcDesc) calcDesc.textContent = impact.desc;
        if (calcDetail) calcDetail.textContent = impact.detail;
        if (calcDonateBtn) {
          calcDonateBtn.textContent = `Donate $${amount} Now`;
          calcDonateBtn.setAttribute('onclick', `donateAmount(${amount})`);
        }
      }
    });
  });

  // --- 4. ANIMATED IMPACT STATISTICS COUNTER ---
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    statNumbers.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          const progress = elapsedTime / duration;
          const currentVal = Math.floor(progress * target);
          counter.textContent = currentVal.toLocaleString() + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString() + suffix;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // --- 5. FUND ALLOCATION PROGRESS BARS ---
  const allocationBars = document.querySelectorAll('.allocation-bar-fill[data-percent]');
  let allocationAnimated = false;

  function animateAllocationBars() {
    if (allocationAnimated) return;
    allocationAnimated = true;

    allocationBars.forEach(bar => {
      const targetPercent = bar.getAttribute('data-percent');
      bar.style.width = targetPercent + '%';
    });
  }

  // --- 6. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ---
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('stats-section')) animateStats();
        if (entry.target.classList.contains('allocation-section')) animateAllocationBars();
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll, .stats-section, .allocation-section').forEach(el => {
    scrollObserver.observe(el);
  });

  // --- 7. LIGHTBOX GALLERY ---
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxOverlay = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.getAttribute('data-caption') || img.alt;
      
      if (lightboxImg) lightboxImg.src = img.src;
      if (lightboxCaption) lightboxCaption.textContent = caption;
      if (lightboxOverlay) {
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) closeLightbox();
    });
  }

  function closeLightbox() {
    if (lightboxOverlay) {
      lightboxOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // --- 8. TESTIMONIALS SLIDER ---
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let currentSlide = 0;

  function updateSlider() {
    if (!track || slides.length === 0) return;
    const slideWidth = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
    });
  }

  window.addEventListener('resize', updateSlider);
  setInterval(() => {
    if (slides.length > 0) {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    }
  }, 7000);

  // --- 9. ADOPTION ENQUIRY ---
  const showFormBtn = document.getElementById('show-adoption-form');
  const adoptionForm = document.getElementById('adoption-form');
  const adoptionSuccess = document.getElementById('adoption-success');

  if (showFormBtn && adoptionForm) {
    showFormBtn.addEventListener('click', () => {
      showFormBtn.style.display = 'none';
      adoptionForm.style.display = 'block';
      adoptionForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  if (adoptionForm) {
    const submitBtn = adoptionForm.querySelector('button[type="submit"]');

    adoptionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('adoption-name').value.trim();
      const email = document.getElementById('adoption-email').value.trim();
      const message = document.getElementById('adoption-message').value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
      }
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address (e.g. name@example.com).');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      try {
        const resp = await fetch('/api/adoption-enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) throw new Error(data.error || 'Server error');
      } catch (err) {
        alert('Failed to submit enquiry. Please try again or email us directly at compassionateanimalrescueeffor@gmail.com');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Enquiry';
        }
        return;
      }

      adoptionForm.style.display = 'none';
      if (adoptionSuccess) adoptionSuccess.style.display = 'block';
    });
  }

  // --- 10. PURPOSE-BASED CATALOG & RETAILER FLOW ---
  const catalogGrid = document.getElementById('catalog-grid');
  const categoryPills = document.querySelectorAll('.cat-pill');
  const bagBar = document.getElementById('donation-bag-bar');
  const bagCountEl = document.getElementById('bag-item-count');
  const bagTotalEl = document.getElementById('bag-total-val');

  function renderCatalog(categoryId = 'food') {
    if (!catalogGrid) return;
    state.activeCategory = categoryId;

    const filtered = catalogProducts.filter(p => p.catId === categoryId);

    catalogGrid.innerHTML = filtered.map(p => {
      const priceConverted = p.price;
      const qty = state.donationBag[p.id] || 0;
      const priorityClass = p.priority === 'Critical' ? 'priority-critical' : p.priority === 'High' ? 'priority-high' : 'priority-standard';
      const animalIcon = p.animal === 'cat' ? '🐱 Cat Supply' : p.animal === 'dog' ? '🐶 Dog Supply' : '🐾 Shared Essential';

      return `
        <div class="product-card animate-on-scroll visible">
          <div class="product-header">
            <span class="priority-badge ${priorityClass}">${p.priority} Priority</span>
            <span class="animal-tag">${animalIcon}</span>
          </div>
          <div class="product-body">
            <h3 class="product-name">${p.name}</h3>
            <p class="product-desc">${p.desc}</p>
            <div class="product-meta">
              <span class="product-price">$${priceConverted}</span>
              <span class="product-needed">Needed: <strong>${p.needed} units</strong></span>
            </div>
          </div>
          <div class="product-actions">
            <div class="qty-selector">
              <button class="qty-btn minus" onclick="updateQty('${p.id}', -1)" aria-label="Decrease quantity">-</button>
              <span class="qty-val">${qty}</span>
              <button class="qty-btn plus" onclick="updateQty('${p.id}', 1)" aria-label="Increase quantity">+</button>
            </div>
            <button class="btn btn-primary btn-sm" onclick="buySingleProduct('${p.id}')">
              Buy & Donate
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  }

  window.updateQty = function(productId, delta) {
    const current = state.donationBag[productId] || 0;
    const updated = Math.max(0, current + delta);
    if (updated > 0) {
      state.donationBag[productId] = updated;
    } else {
      delete state.donationBag[productId];
    }
    renderCatalog(state.activeCategory);
    updateBagBar();
  };

  window.buySingleProduct = function(productId) {
    const product = catalogProducts.find(p => p.id === productId);
    if (product) {
      state.donationBag[productId] = (state.donationBag[productId] || 0) + 1;
      updateBagBar();
      openLocationModal();
    }
  };

  function updateBagBar() {
    let totalItems = 0;
    let totalPriceUSD = 0;
    // eslint-disable-next-line no-unused-vars

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
        if (bagTotalEl) bagTotalEl.textContent = `$${totalPriceUSD}`;
      } else {
        bagBar.classList.remove('visible');
      }
    }
  }

  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-cat');
      renderCatalog(cat);
    });
  });

  // --- LOCATION & RETAILER MODAL (State + ZIP ONLY) ---
  const locationModal = document.getElementById('location-modal');
  const locationForm = document.getElementById('location-form');
  const retailerResults = document.getElementById('retailer-results');
  const locationStep1 = document.getElementById('location-step-1');
  const locationCloseBtn = document.getElementById('location-close');

  window.openLocationModal = function() {
    if (locationModal) {
      locationModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (locationStep1) locationStep1.style.display = 'block';
      if (retailerResults) retailerResults.style.display = 'none';
    }
  };

  function closeLocationModal() {
    if (locationModal) {
      locationModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (locationCloseBtn) locationCloseBtn.addEventListener('click', closeLocationModal);
  if (locationModal) {
    locationModal.addEventListener('click', (e) => {
      if (e.target === locationModal) closeLocationModal();
    });
  }

  if (locationForm) {
    locationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const stateVal = document.getElementById('loc-state').value || 'State';
      const zipVal = document.getElementById('loc-zip').value || 'ZIP';

      if (locationStep1) locationStep1.style.display = 'none';
      if (retailerResults) {
        retailerResults.style.display = 'block';
        retailerResults.innerHTML = `
          <h3 class="modal-title">Authorized Retailers for ${stateVal} (${zipVal})</h3>
          <p class="modal-subtitle">Your selected items will be fulfilled and delivered directly to the CARE Phase 1 Equipment Hub.</p>

          <div class="retailer-list">
            <div class="retailer-card">
              <div class="retailer-info">
                <h4>Chewy Shelter Registry</h4>
                <p>Direct bulk shipment • Free 1-day delivery to CARE Hub</p>
              </div>
              <button class="btn btn-primary" onclick="redirectToPayment(50)">Fulfill via Chewy</button>
            </div>

            <div class="retailer-card">
              <div class="retailer-info">
                <h4>Amazon Pet Registry</h4>
                <p>Automated fulfillment & tracking number issued</p>
              </div>
              <button class="btn btn-secondary" onclick="redirectToPayment(50)">Fulfill via Amazon</button>
            </div>

            <div class="retailer-card">
              <div class="retailer-info">
                <h4>Local Veterinary Supply Partner</h4>
                <p>Regional fulfillment partner serving ${stateVal}</p>
              </div>
              <button class="btn btn-secondary" onclick="redirectToPayment(50)">Fulfill via Local Partner</button>
            </div>
          </div>

          <p style="font-size: 0.8rem; color: var(--text-muted); text-align: center; margin-top: 1.5rem;">
            🔒 Privacy Guaranteed: We only request State & Postal Code to match regional supply distributors. No personal address required.
          </p>
        `;
      }
    });
  }

  // --- 11. FAQ ACCORDION ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- RESTORE DONATION STATE ---
  function restoreDonationState() {
    const directStr = localStorage.getItem('care_direct_donation');
    if (directStr) {
      try {
        const d = JSON.parse(directStr);
        if (d.amount) {
          selectImpactCard(d.amount);
          if (![10, 25, 50, 100].includes(d.amount)) {
            const customInput = document.getElementById('custom-amount-input');
            if (customInput) customInput.value = d.amount;
          }
        }
        if (d.freq) {
          const btn = Array.from(freqBtns).find(b => b.getAttribute('data-freq') === d.freq);
          if (btn) btn.click(); // Selects and updates UI
        }
      } catch (e) {}
    }
  }

  // Initial Renders & Triggers
  updateProgressUI();
  updatePhaseUI();
  renderCatalog('food');
  restoreDonationState();
  loadCampaignFromServer();

  // Trigger initial visible state for above-the-fold elements
  setTimeout(() => {
    document.querySelectorAll('#hero .animate-on-scroll, #campaign .animate-on-scroll').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
});
