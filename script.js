document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-theme');
  const body = document.body;
  const themeIcon = toggleBtn.querySelector('i');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.replace('ph-moon', 'ph-sun');
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    
    // Update icon
    if (isDark) {
      themeIcon.classList.replace('ph-moon', 'ph-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.classList.replace('ph-sun', 'ph-moon');
      localStorage.setItem('theme', 'light');
    }
  });

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (sidebar.classList.contains('active')) {
      icon.classList.replace('ph-list', 'ph-x');
    } else {
      icon.classList.replace('ph-x', 'ph-list');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.replace('ph-x', 'ph-list');
      }
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        if (entry.target.classList.contains('skill-card')) {
          const progressFill = entry.target.querySelector('.progress-fill');
          const percent = progressFill.getAttribute('data-percent');
          setTimeout(() => {
            progressFill.style.width = percent + '%';
          }, 300);
        }
      } else {
        entry.target.classList.remove('show');
        
        if (entry.target.classList.contains('skill-card')) {
          const progressFill = entry.target.querySelector('.progress-fill');
          progressFill.style.width = '0%';
        }
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (document.getElementById('typed-text')) {
    new Typed('#typed-text', {
      strings: ['Web Developer', 'IoT Enthusiast', 'UI/UX Designer', 'Tech Explorer'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true
    });
  }

    if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".skill-card, .project-card, .service-card, .cert-card"), {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.1,
      scale: 1.02
    });
  }

  // Modal logic
  window.openModal = function(imgSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.classList.add('show');
    
    // First try the actual image
    modalImg.src = imgSrc;
    
    // If actual image fails to load, fallback to a placeholder
    modalImg.onerror = function() {
      this.src = imgSrc.replace('img/', 'https://placehold.co/800x600/ff5400/ffffff?text=').replace('.jpg', '').replace(/-/g, '+');
      this.onerror = null; // Prevent infinite loop if fallback also fails
    };
  };

  window.closeModal = function() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');
  };

  const modal = document.getElementById('imageModal');
  if(modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        closeModal();
      }
    });
  }

  // Contact Form AJAX Logic using formsubmit.co
  const contactForm = document.getElementById('contactForm');
  if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Mengirim...';
      submitBtn.disabled = true;

      const formData = new FormData(this);
      
      fetch('https://formsubmit.co/ajax/hengkykurniawan219@gmail.com', {
        method: 'POST',
        headers: { 
            'Accept': 'application/json'
        },
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        alert('Pesan berhasil terkirim! Terima kasih.');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      })
      .catch(error => {
        alert('Maaf, terjadi kesalahan saat mengirim pesan. Pastikan Anda terhubung ke internet.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
    });
  }
});
