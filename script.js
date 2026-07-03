/* ============================================================
   AV Publications & Shiksha Planet – Landing Page Script
============================================================ */

(function () {
  'use strict';

  /* ── 1. Footer Year ── */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── 2. Navbar scroll behaviour ── */
  const navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    // Scroll-to-top visibility
    const scrollBtn = document.getElementById('scrollTop');
    if (scrollBtn) {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // call once on load

  /* ── 3. Mobile nav toggle ── */
  const hamburger = document.getElementById('hamburger');
  const overlay   = document.getElementById('mobileNavOverlay');
  const closeBtn  = document.getElementById('mobileNavClose');

  function openMenu() {
    hamburger.classList.add('open');
    overlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburger.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (overlay.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }
  if (closeBtn)  closeBtn.addEventListener('click', closeMenu);

  // Close on overlay link click
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeMenu();
  });

  /* ── 4. Smooth scroll for all anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── 5. Scroll-to-top button ── */
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 6. Hero particles ── */
  const particleContainer = document.getElementById('particles');
  if (particleContainer) {
    const COUNT = 30;
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        --dur: ${5 + Math.random() * 10}s;
        --delay: ${Math.random() * 8}s;
        width: ${1 + Math.random() * 3}px;
        height: ${1 + Math.random() * 3}px;
        opacity: ${0.2 + Math.random() * 0.6};
      `;
      particleContainer.appendChild(p);
    }
  }

  /* ── 7. Intersection Observer – Scroll Reveal ── */
  const revealElements = document.querySelectorAll(
    '.product-card, .feature-card, .social-card, .testi-card, .pillar, .trust-badge, .about-grid, .contact-grid'
  );

  // Add base reveal classes
  revealElements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  // Also reveal specific block sections
  document.querySelectorAll('.section-header, .about-visual, .about-text, .contact-form-wrap, .contact-sidebar').forEach(el => {
    el.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });

  /* ── 8. Enquiry form handler ── */
  const form        = document.getElementById('enquiryForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn   = document.getElementById('formSubmitBtn');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const name    = document.getElementById('formName').value.trim();
      const email   = document.getElementById('formEmail').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email || !message) {
        // Shake invalid fields
        [document.getElementById('formName'), document.getElementById('formEmail'), document.getElementById('formMessage')].forEach(field => {
          if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            field.style.boxShadow   = '0 0 0 3px rgba(239,68,68,.15)';
            setTimeout(() => {
              field.style.borderColor = '';
              field.style.boxShadow   = '';
            }, 2000);
          }
        });
        return;
      }

      // Get all form fields
      const phone   = document.getElementById('formPhone').value.trim();
      const subject = document.getElementById('formSubject').value;

      // Build WhatsApp message
      const waMessage = 
        `📩 *New Enquiry - Shiksha Planet*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone || 'Not provided'}\n` +
        `📧 *Email:* ${email}\n` +
        `📚 *Subject:* ${subject || 'General Enquiry'}\n` +
        `💬 *Message:*\n${message}`;

      // WhatsApp redirect
      const waNumber = '919005102878';
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

      // Show loading on button
      submitBtn.disabled = true;
      submitBtn.textContent = 'Opening WhatsApp…';

      setTimeout(() => {
        form.reset();
        formSuccess.hidden = false;
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Send Enquiry <svg class="btn-icon-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
        setTimeout(() => { formSuccess.hidden = true; }, 6000);
        // Open WhatsApp
        window.open(waUrl, '_blank');
      }, 800);
    });

    // Clear error styling on input
    form.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
        field.style.boxShadow   = '';
      });
    });
  }

  /* ── 9. Active nav link highlight on scroll ── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--white)'
            : '';
          link.style.background = link.getAttribute('href') === `#${id}`
            ? 'rgba(255,255,255,.12)'
            : '';
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ── 10. Product card tilt effect ── */
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      const tiltX = ((y - cy) / cy) * 5;
      const tiltY = ((x - cx) / cx) * -5;
      card.style.transform = `translateY(-8px) perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  /* ── 11. Social card hover glow ── */
  document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });

  /* ── 12. Link validation log (development helper) ── */
  const links = [
    { id: 'visitPortalBtn',  url: 'https://store.shikshaplanet.in' },
    { id: 'exploreBtn',      url: '#products' },
    { id: 'heroPortalBtn',   url: 'https://store.shikshaplanet.in' },
    { id: 'aboutPortalBtn',  url: 'https://store.shikshaplanet.in' },
    { id: 'youtubeCard',     url: 'https://www.youtube.com/@sangeetplanet' },
    { id: 'instagramCard',   url: 'https://www.instagram.com/shikshaplanet.in' },
    { id: 'websiteCard',     url: 'https://store.shikshaplanet.in' },
    { id: 'whatsappCtaBtn',  url: 'https://wa.me/919005102878' },
    { id: 'floatingWaBtn',   url: 'https://wa.me/919005102878' },
    { id: 'buyMusicBtn',     url: 'https://store.shikshaplanet.in' },
    { id: 'buyHistoryBtn',   url: 'https://store.shikshaplanet.in' },
    { id: 'buyGKBtn',        url: 'https://store.shikshaplanet.in' },
    { id: 'buyHindiBtn',     url: 'https://store.shikshaplanet.in' },
    { id: 'viewAllBooksBtn', url: 'https://store.shikshaplanet.in' },
    { id: 'footerWebBtn',    url: 'https://store.shikshaplanet.in' },
    { id: 'footerYtBtn',     url: 'https://www.youtube.com/@sangeetplanet' },
    { id: 'footerIgBtn',     url: 'https://www.instagram.com/shikshaplanet.in' },
    { id: 'footerWaBtn',     url: 'https://wa.me/919005102878' },
  ];

  let allOk = true;
  links.forEach(({ id, url }) => {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`[Shiksha Planet] Element not found: #${id}`);
      allOk = false;
    } else {
      const href = el.getAttribute('href') || '';
      if (!href.startsWith(url.substring(0, 20)) && !href.startsWith('#')) {
        console.warn(`[Shiksha Planet] Link mismatch on #${id}: expected "${url}", got "${href}"`);
        allOk = false;
      }
    }
  });

  if (allOk) {
    console.log('%c✅ Shiksha Planet – All links and elements validated successfully!', 'color:#25D366;font-weight:bold;font-size:13px;');
  }

  /* ── 13. Floating WA button entrance animation ── */
  setTimeout(() => {
    const floatWa = document.getElementById('floatingWaBtn');
    if (floatWa) {
      floatWa.style.transform = 'scale(1)';
      floatWa.style.opacity   = '1';
    }
  }, 1500);

  /* ── 14. Dropdown click outside listener ── */
  document.addEventListener('click', function (e) {
    const dropdownWrap = document.getElementById('buyMusicWrap');
    if (dropdownWrap && !dropdownWrap.contains(e.target)) {
      dropdownWrap.classList.remove('open');
    }
  });

  /* ── 15. Bottom Nav Active Tab on Scroll ── */
  const bottomNavItems = document.querySelectorAll('.bottom-nav-item[href^="#"]');
  function updateBottomNav() {
    const sections = ['books'];
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    bottomNavItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === '#' + current) item.classList.add('active');
    });
  }
  window.addEventListener('scroll', updateBottomNav, { passive: true });

  console.log('%c🎓 AV Publications & Shiksha Planet | Premium Landing Page Loaded', 'color:#3b82f6;font-weight:bold;font-size:12px;');

})();
