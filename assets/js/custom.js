/* ============================================
   QUARTO COURSE TEMPLATE - CUSTOM JAVASCRIPT
   Interactive features and UX enhancements
   ============================================ */

(function() {
  'use strict';

  /* ===================================
     READING TIME ESTIMATOR
     =================================== */
  
  function calculateReadingTime() {
    const article = document.querySelector('main');
    if (!article) return;
    
    const text = article.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words/min
    
    // Find or create reading time element
    let readingTimeEl = document.querySelector('.reading-time');
    if (!readingTimeEl && wordCount > 100) {
      readingTimeEl = document.createElement('div');
      readingTimeEl.className = 'reading-time';
      readingTimeEl.textContent = `${readingTime} min read`;
      
      // Insert after title if exists
      const title = document.querySelector('h1');
      if (title && title.parentNode) {
        title.parentNode.insertBefore(readingTimeEl, title.nextSibling);
      }
    }
  }

  /* ===================================
     PROGRESS BAR SCROLL INDICATOR
     =================================== */
  
  function createProgressBar() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 4px;
      background: linear-gradient(90deg, #5E81AC, #88C0D0);
      z-index: 10000;
      transition: width 0.1s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    `;
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      progressBar.style.width = progress + '%';
    });
  }

  /* ===================================
     SMOOTH SCROLL WITH OFFSET
     =================================== */
  
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 80; // Offset for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ===================================
     ACCORDION FUNCTIONALITY
     =================================== */
  
  function initAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', function() {
        const item = this.parentElement;
        const body = item.querySelector('.accordion-body');
        const isActive = this.classList.contains('active');
        
        // Close all accordions (optional: remove this block for multi-open)
        document.querySelectorAll('.accordion-header').forEach(h => {
          h.classList.remove('active');
          h.parentElement.querySelector('.accordion-body').classList.remove('show');
        });
        
        // Toggle current accordion
        if (!isActive) {
          this.classList.add('active');
          body.classList.add('show');
        }
      });
    });
  }

  /* ===================================
     COPY CODE BUTTON ENHANCEMENT
     =================================== */
  
  function enhanceCodeCopy() {
    document.querySelectorAll('.code-copy-button').forEach(button => {
      button.addEventListener('click', function() {
        // Create temporary success message
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        this.style.backgroundColor = '#A3BE8C';
        
        setTimeout(() => {
          this.innerHTML = originalText;
          this.style.backgroundColor = '';
        }, 2000);
      });
    });
  }

  /* ===================================
     TABLE OF CONTENTS HIGHLIGHT
     =================================== */
  
  function highlightTOC() {
    const tocLinks = document.querySelectorAll('.sidebar nav[role="doc-toc"] a');
    const sections = document.querySelectorAll('h2[id], h3[id]');
    
    if (tocLinks.length === 0 || sections.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-100px 0px -66%',
      threshold: 0
    });
    
    sections.forEach(section => observer.observe(section));
  }

  /* ===================================
     ANIMATE ELEMENTS ON SCROLL
     =================================== */
  
  function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .feature-box, .callout');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeIn 0.5s ease-out forwards';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    elements.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  /* ===================================
     EXTERNAL LINKS - OPEN IN NEW TAB
     =================================== */
  
  function handleExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach(link => {
      // Skip if it's linking to the same domain
      if (link.hostname === window.location.hostname) return;
      
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }

  /* ===================================
     LAZY LOAD IMAGES
     =================================== */
  
  function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  /* ===================================
     KEYBOARD NAVIGATION
     =================================== */
  
  function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // Left arrow - previous page
      if (e.key === 'ArrowLeft' && e.ctrlKey) {
        const prevLink = document.querySelector('.chapter-nav-prev');
        if (prevLink) prevLink.click();
      }
      
      // Right arrow - next page
      if (e.key === 'ArrowRight' && e.ctrlKey) {
        const nextLink = document.querySelector('.chapter-nav-next');
        if (nextLink) nextLink.click();
      }
      
      // Escape - close modals/overlays
      if (e.key === 'Escape') {
        // Close any open accordions
        document.querySelectorAll('.accordion-header.active').forEach(header => {
          header.click();
        });
      }
    });
  }

  /* ===================================
     DARK MODE TOGGLE ENHANCEMENT
     =================================== */
  
  function enhanceDarkModeToggle() {
    const toggle = document.querySelector('[data-bs-toggle="dropdown"]');
    if (!toggle) return;
    
    // Save preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute('data-theme');
      if (theme) {
        localStorage.setItem('theme', theme);
      }
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  /* ===================================
     CODE LANGUAGE BADGES
     =================================== */
  
  function addCodeLanguageBadges() {
    document.querySelectorAll('pre[class*="language-"]').forEach(pre => {
      const match = pre.className.match(/language-(\w+)/);
      if (match) {
        const language = match[1];
        const badge = document.createElement('span');
        badge.className = 'badge badge-info';
        badge.textContent = language.toUpperCase();
        badge.style.cssText = `
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          font-size: 0.7rem;
          padding: 0.25rem 0.5rem;
        `;
        
        pre.style.position = 'relative';
        pre.appendChild(badge);
      }
    });
  }

  /* ===================================
     PRINT FRIENDLY BUTTON
     =================================== */
  
  function addPrintButton() {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline';
    btn.innerHTML = '<i class="fas fa-print"></i> Print';
    btn.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 1000;
      box-shadow: var(--shadow-lg);
    `;
    
    btn.addEventListener('click', () => window.print());
    
    // Only show on desktop
    if (window.innerWidth > 768) {
      document.body.appendChild(btn);
    }
  }

  /* ===================================
     SEARCH ENHANCEMENT
     =================================== */
  
  function enhanceSearch() {
    const searchInput = document.querySelector('#quarto-search-query, .aa-Input');
    if (!searchInput) return;
    
    // Add keyboard shortcut (Ctrl+K or Cmd+K)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
    });
    
    // Add hint
    const hint = document.createElement('span');
    hint.textContent = '(Ctrl+K)';
    hint.style.cssText = `
      font-size: 0.75rem;
      color: var(--color-info);
      margin-left: 0.5rem;
      opacity: 0.7;
    `;
    
    const searchContainer = searchInput.parentElement;
    if (searchContainer) {
      searchContainer.appendChild(hint);
    }
  }

  /* ===================================
     TABBED CONTENT NAVIGATION
     =================================== */
  
  function initTabbedContent() {
    document.querySelectorAll('.panel-tabset .nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all tabs
        this.parentElement.querySelectorAll('.nav-link').forEach(l => {
          l.classList.remove('active');
        });
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Show corresponding content
        const target = this.getAttribute('data-bs-target');
        if (target) {
          const content = document.querySelector(target);
          if (content) {
            content.parentElement.querySelectorAll('.tab-pane').forEach(pane => {
              pane.classList.remove('active', 'show');
            });
            content.classList.add('active', 'show');
          }
        }
      });
    });
  }

  /* ===================================
     INITIALIZE ALL FEATURES
     =================================== */
  
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    console.log('🚀 Initializing Quarto Course Template features...');
    
    // Initialize all features
    calculateReadingTime();
    createProgressBar();
    initSmoothScroll();
    initAccordions();
    enhanceCodeCopy();
    highlightTOC();
    animateOnScroll();
    handleExternalLinks();
    lazyLoadImages();
    initKeyboardNav();
    enhanceDarkModeToggle();
    addCodeLanguageBadges();
    addPrintButton();
    enhanceSearch();
    initTabbedContent();
    
    console.log('✅ All features initialized successfully!');
  }
  
  // Start initialization
  init();

})();

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".copy-prompt-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const container = button.closest(".prompt-container");
      const blockquote = container ? container.querySelector("blockquote") : null;
      if (!blockquote) return;

      const text = blockquote.innerText.trim();
      navigator.clipboard.writeText(text);

      const original = button.textContent;
      button.textContent = "Copiado ✓";
      setTimeout(() => (button.textContent = original), 1500);
    });
  });
});
