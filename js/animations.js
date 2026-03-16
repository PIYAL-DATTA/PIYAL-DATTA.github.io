/* ================================================
   PIYAL DATTA — Premium Portfolio Animations
   Scroll progress · Cursor glow · Nav highlight
   Counter animation · Tilt effect · Typed init
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Scroll Progress Bar ─────────────────────── */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ── Custom Cursor ───────────────────────────── */
  const cursorGlow = document.getElementById('cursor-glow');
  const cursorRing = document.getElementById('cursor-ring');
  if (cursorGlow && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorGlow.style.left = mouseX + 'px';
      cursorGlow.style.top = mouseY + 'px';
    }, { passive: true });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    /* Grow on interactive elements */
    document.querySelectorAll('a, button, .pj_card, .skill-badge, .timeline-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorGlow.style.width = '32px';
        cursorGlow.style.height = '32px';
        cursorRing.style.width = '60px';
        cursorRing.style.height = '60px';
        cursorRing.style.borderColor = 'rgba(6,182,212,0.6)';
      });
      el.addEventListener('mouseleave', () => {
        cursorGlow.style.width = '18px';
        cursorGlow.style.height = '18px';
        cursorRing.style.width = '40px';
        cursorRing.style.height = '40px';
        cursorRing.style.borderColor = 'rgba(124,58,237,0.5)';
      });
    });
  }

  /* ── Navbar: Scroll shrink + glass effect ────── */
  const navbar = document.getElementById('mainNav');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Active Nav Link on Scroll ───────────────── */
  const sections = document.querySelectorAll('section[id], canvas[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-link-custom[href^="#"]');

  function setActiveLink() {
    let current = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ── Animated Counter ────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target || el.textContent, 10);
    if (isNaN(target)) return;
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      const value = Math.round(eased * target);
      el.textContent = value + (el.dataset.suffix || '+');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    counterObserver.observe(el);
  });

  /* ── 3D Tilt on Project Cards ────────────────── */
  document.querySelectorAll('.pj_card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateY = ((x - cx) / cx) * 6;
      const rotateX = -((y - cy) / cy) * 6;
      card.style.transform = `translateY(-8px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.15s ease, box-shadow 0.4s ease, border-color 0.4s ease';
    });
  });

  /* ── Typed.js Hero Subtitle ──────────────────── */
  const heroTyped = document.getElementById('typed-output');
  if (heroTyped && typeof Typed !== 'undefined') {
    new Typed('#typed-output', {
      strings: [
        'Web Developer',
        'Software Engineer',
        'UI/UX Enthusiast',
        'Problem Solver'
      ],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 1800,
      startDelay: 1200,
      loop: true,
      smartBackspace: true
    });
  }

  /* ── Smooth scroll for all anchor links ──────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Timeline card entrance on scroll ───────── */
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.timeline-item').forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `opacity 0.6s ${i * 0.1}s ease, transform 0.6s ${i * 0.1}s ease`;
    timelineObserver.observe(item);
  });

});
