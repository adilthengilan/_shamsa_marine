// Enhanced Mobile Menu Toggle with improved accessibility
function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu")
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const overlay = document.querySelector(".mobile-menu-overlay") || createOverlay()
  
    const isActive = mobileMenu.classList.contains("active")
  
    if (isActive) {
      closeMobileMenu()
    } else {
      openMobileMenu()
    }
  
    function openMobileMenu() {
      mobileMenu.classList.add("active")
      mobileMenuBtn.classList.add("active")
      overlay.classList.add("active")
      document.body.style.overflow = "hidden"
  
      // Update ARIA attributes
      mobileMenuBtn.setAttribute("aria-expanded", "true")
      mobileMenu.setAttribute("aria-hidden", "false")
  
      // Focus first menu item
      const firstMenuItem = mobileMenu.querySelector(".mobile-nav-link")
      if (firstMenuItem) {
        setTimeout(() => firstMenuItem.focus(), 100)
      }
    }
  
    function closeMobileMenu() {
      mobileMenu.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
      overlay.classList.remove("active")
      document.body.style.overflow = ""
  
      // Update ARIA attributes
      mobileMenuBtn.setAttribute("aria-expanded", "false")
      mobileMenu.setAttribute("aria-hidden", "true")
  
      // Return focus to menu button
      mobileMenuBtn.focus()
    }
  
    function createOverlay() {
      const overlay = document.createElement("div")
      overlay.className = "mobile-menu-overlay"
      overlay.addEventListener("click", closeMobileMenu)
      document.body.appendChild(overlay)
      return overlay
    }
  }
  
  // Enhanced navigation scroll effect
  function initNavbarScroll() {
    const navbar = document.querySelector(".navbar")
    let lastScrollY = window.scrollY
  
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY
  
      if (currentScrollY > 100) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
  
      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        navbar.style.transform = "translateY(-100%)"
      } else {
        navbar.style.transform = "translateY(0)"
      }
  
      lastScrollY = currentScrollY
    })
  }
  
  // Close mobile menu when clicking outside or on nav links
  document.addEventListener("click", (event) => {
    const mobileMenu = document.getElementById("mobileMenu")
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const overlay = document.querySelector(".mobile-menu-overlay")
  
    if (overlay && overlay.contains(event.target)) {
      toggleMobileMenu()
    }
  
    if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
      if (mobileMenu.classList.contains("active")) {
        toggleMobileMenu()
      }
    }
  })
  
  // Close mobile menu when clicking on nav links
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (document.getElementById("mobileMenu").classList.contains("active")) {
        toggleMobileMenu()
      }
    })
  })
  
  // Enhanced Contact Form Handling with better validation
  document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      // Form validation functions
      function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
      }
  
      function validatePhone(phone) {
        const re = /^\+?[\d\s\-$$$$]{10,}$/
        return re.test(phone)
      }
  
      function validateRequired(value) {
        return value.trim().length > 0
      }
  
      function showError(fieldId, message) {
        const field = document.getElementById(fieldId)
        const errorElement = document.getElementById(fieldId + "-error")
  
        if (field && errorElement) {
          field.classList.add("error")
          field.parentElement.classList.add("error")
          errorElement.textContent = message
          errorElement.classList.add("show")
          errorElement.style.display = "block"
  
          // Announce error to screen readers
          errorElement.setAttribute("aria-live", "polite")
        }
      }
  
      function clearError(fieldId) {
        const field = document.getElementById(fieldId)
        const errorElement = document.getElementById(fieldId + "-error")
  
        if (field && errorElement) {
          field.classList.remove("error")
          field.parentElement.classList.remove("error")
          errorElement.classList.remove("show")
          errorElement.style.display = "none"
        }
      }
  
      function showSuccess(fieldId) {
        const field = document.getElementById(fieldId)
  
        if (field) {
          field.classList.add("success")
          field.parentElement.classList.add("success")
        }
      }
  
      // Real-time validation
      const nameField = document.getElementById("name")
      const emailField = document.getElementById("email")
      const phoneField = document.getElementById("phone")
      const messageField = document.getElementById("message")
      const privacyField = document.getElementById("privacy")
  
      if (nameField) {
        nameField.addEventListener("blur", function () {
          if (!validateRequired(this.value)) {
            showError("name", "Full name is required")
          } else {
            clearError("name")
            showSuccess("name")
          }
        })
  
        nameField.addEventListener("input", function () {
          if (this.classList.contains("error") && validateRequired(this.value)) {
            clearError("name")
            showSuccess("name")
          }
        })
      }
  
      if (emailField) {
        emailField.addEventListener("blur", function () {
          if (!validateRequired(this.value)) {
            showError("email", "Email address is required")
          } else if (!validateEmail(this.value)) {
            showError("email", "Please enter a valid email address")
          } else {
            clearError("email")
            showSuccess("email")
          }
        })
  
        emailField.addEventListener("input", function () {
          if (this.classList.contains("error") && validateRequired(this.value) && validateEmail(this.value)) {
            clearError("email")
            showSuccess("email")
          }
        })
      }
  
      if (phoneField) {
        phoneField.addEventListener("blur", function () {
          if (this.value && !validatePhone(this.value)) {
            showError("phone", "Please enter a valid phone number")
          } else {
            clearError("phone")
            if (this.value) showSuccess("phone")
          }
        })
  
        phoneField.addEventListener("input", function () {
          // Auto-format phone number
          formatPhoneNumber(this)
  
          if (this.classList.contains("error") && (!this.value || validatePhone(this.value))) {
            clearError("phone")
            if (this.value) showSuccess("phone")
          }
        })
      }
  
      if (messageField) {
        messageField.addEventListener("blur", function () {
          if (!validateRequired(this.value)) {
            showError("message", "Message is required")
          } else if (this.value.trim().length < 10) {
            showError("message", "Message must be at least 10 characters long")
          } else {
            clearError("message")
            showSuccess("message")
          }
        })
  
        messageField.addEventListener("input", function () {
          if (this.classList.contains("error") && validateRequired(this.value) && this.value.trim().length >= 10) {
            clearError("message")
            showSuccess("message")
          }
        })
      }
  
      // Form submission with enhanced error handling
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Clear previous messages
        const successMsg = document.getElementById("form-success")
        const errorMsg = document.getElementById("form-error")
  
        if (successMsg) successMsg.style.display = "none"
        if (errorMsg) errorMsg.style.display = "none"
  
        // Validate all fields
        let isValid = true
        const errors = []
  
        // Name validation
        if (!validateRequired(nameField.value)) {
          showError("name", "Full name is required")
          errors.push("name")
          isValid = false
        } else {
          clearError("name")
          showSuccess("name")
        }
  
        // Email validation
        if (!validateRequired(emailField.value)) {
          showError("email", "Email address is required")
          errors.push("email")
          isValid = false
        } else if (!validateEmail(emailField.value)) {
          showError("email", "Please enter a valid email address")
          errors.push("email")
          isValid = false
        } else {
          clearError("email")
          showSuccess("email")
        }
  
        // Phone validation (optional)
        if (phoneField.value && !validatePhone(phoneField.value)) {
          showError("phone", "Please enter a valid phone number")
          errors.push("phone")
          isValid = false
        } else {
          clearError("phone")
          if (phoneField.value) showSuccess("phone")
        }
  
        // Message validation
        if (!validateRequired(messageField.value)) {
          showError("message", "Message is required")
          errors.push("message")
          isValid = false
        } else if (messageField.value.trim().length < 10) {
          showError("message", "Message must be at least 10 characters long")
          errors.push("message")
          isValid = false
        } else {
          clearError("message")
          showSuccess("message")
        }
  
        // Privacy policy validation
        if (privacyField && !privacyField.checked) {
          showError("privacy", "You must agree to the Privacy Policy and Terms of Service")
          errors.push("privacy")
          isValid = false
        } else if (privacyField) {
          clearError("privacy")
        }
  
        if (!isValid) {
          // Focus on first error field
          const firstErrorField = document.getElementById(errors[0])
          if (firstErrorField) {
            firstErrorField.focus()
            firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" })
          }
          return
        }
  
        // Get form data
        const formData = new FormData(contactForm)
        const data = Object.fromEntries(formData)
  
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]')
        const originalText = submitBtn.innerHTML
  
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
        submitBtn.disabled = true
        submitBtn.classList.add("loading")
  
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
          // Simulate success/error randomly for demo
          const isSuccess = Math.random() > 0.1 // 90% success rate
  
          if (isSuccess && successMsg) {
            successMsg.style.display = "block"
            contactForm.reset()
  
            // Clear all validation states
            contactForm.querySelectorAll(".error, .success").forEach((el) => {
              el.classList.remove("error", "success")
            })
            contactForm.querySelectorAll(".error-message").forEach((el) => {
              el.style.display = "none"
            })
  
            // Scroll to success message
            successMsg.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          } else if (errorMsg) {
            errorMsg.style.display = "block"
            errorMsg.scrollIntoView({
              behavior: "smooth",
              block: "center",
            })
          }
  
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
          submitBtn.classList.remove("loading")
        }, 2000)
      })
    }
  })
  
  // Phone number formatting
  function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, "")
  
    // Add country code if not present
    if (value.length > 0 && !value.startsWith("971")) {
      if (value.startsWith("0")) {
        value = "971" + value.substring(1)
      } else if (value.length === 9) {
        value = "971" + value
      }
    }
  
    // Format the number
    if (value.length >= 3) {
      if (value.startsWith("971")) {
        const formatted = "+971 " + value.substring(3).replace(/(\d{2})(\d{3})(\d{4})/, "$1 $2 $3")
        input.value = formatted
      } else {
        input.value = "+" + value
      }
    } else {
      input.value = value ? "+" + value : ""
    }
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight
        const targetPosition = target.offsetTop - navbarHeight - 20
  
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
  
  // Add active class to current page navigation
  document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop() || "index.html"
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")
  
    navLinks.forEach((link) => {
      const href = link.getAttribute("href")
      if (href === currentPage || (currentPage === "" && href === "index.html")) {
        link.classList.add("active")
        link.setAttribute("aria-current", "page")
      }
    })
  })
  
  // Intersection Observer for animations with improved performance
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
  
        // Add staggered animation delay for multiple elements
        const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100
        entry.target.style.transitionDelay = `${delay}ms`
      }
    })
  }, observerOptions)
  
  // Observe elements for animation with better performance
  document.addEventListener("DOMContentLoaded", () => {
    // Use requestIdleCallback for better performance
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        initAnimationObserver()
      })
    } else {
      setTimeout(initAnimationObserver, 100)
    }
  
    function initAnimationObserver() {
      const animatedElements = document.querySelectorAll(
        ".service-card, .feature-item, .value-card, .stat-item, .faq-item, .team-member",
      )
  
      animatedElements.forEach((el) => {
        el.style.opacity = "0"
        el.style.transform = "translateY(20px)"
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
        observer.observe(el)
      })
    }
  })
  
  // Enhanced back to top button with scroll progress
  function createBackToTopButton() {
    const button = document.createElement("button")
    button.innerHTML = '<i class="fas fa-chevron-up"></i>'
    button.className = "back-to-top"
    button.setAttribute("aria-label", "Back to top")
  
    // Add scroll progress indicator
    const progress = document.createElement("div")
    progress.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: conic-gradient(#1e40af 0deg, transparent 0deg);
          opacity: 0.3;
      `
    button.appendChild(progress)
  
    button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    document.body.appendChild(button)
  
    // Show/hide button and update progress based on scroll position
    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
  
      if (scrollTop > 300) {
        button.classList.add("show")
      } else {
        button.classList.remove("show")
      }
  
      // Update progress indicator
      progress.style.background = `conic-gradient(#1e40af ${scrollPercent * 3.6}deg, transparent 0deg)`
    })
  }
  
  // Loading animation for buttons with better UX
  function addLoadingToButtons() {
    const buttons = document.querySelectorAll('.btn:not([type="submit"])')
  
    buttons.forEach((button) => {
      if (button.getAttribute("href") && !button.getAttribute("href").startsWith("#")) {
        button.addEventListener("click", function (e) {
          if (!this.classList.contains("btn-outline") && !this.classList.contains("btn-outline-white")) {
            const originalText = this.innerHTML
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...'
            this.classList.add("loading")
  
            // Restore original text if navigation is cancelled
            setTimeout(() => {
              if (this.classList.contains("loading")) {
                this.innerHTML = originalText
                this.classList.remove("loading")
              }
            }, 3000)
          }
        })
      }
    })
  }
  
  // Lazy loading for images with intersection observer
  function lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]")
  
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.src = img.dataset.src
            img.classList.remove("lazy")
            img.classList.add("loaded")
            imageObserver.unobserve(img)
          }
        })
      },
      {
        rootMargin: "50px 0px",
      },
    )
  
    images.forEach((img) => {
      img.classList.add("lazy")
      imageObserver.observe(img)
    })
  }
  
  // Enhanced keyboard navigation
  document.addEventListener("DOMContentLoaded", () => {
    // Skip to main content link
    const skipLink = document.createElement("a")
    skipLink.href = "#main-content"
    skipLink.textContent = "Skip to main content"
    skipLink.className = "sr-only"
    skipLink.style.cssText = `
          position: absolute;
          top: -40px;
          left: 6px;
          background: #1e40af;
          color: white;
          padding: 8px;
          text-decoration: none;
          border-radius: 4px;
          z-index: 1000;
          transition: top 0.3s ease;
      `
  
    skipLink.addEventListener("focus", function () {
      this.style.top = "6px"
    })
  
    skipLink.addEventListener("blur", function () {
      this.style.top = "-40px"
    })
  
    document.body.insertBefore(skipLink, document.body.firstChild)
  
    // Enhanced keyboard navigation for mobile menu
    document.addEventListener("keydown", (e) => {
      const mobileMenu = document.getElementById("mobileMenu")
      const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  
      // Escape key to close mobile menu
      if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
        toggleMobileMenu()
      }
  
      // Tab trapping in mobile menu
      if (mobileMenu.classList.contains("active") && e.key === "Tab") {
        const focusableElements = mobileMenu.querySelectorAll(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]
  
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    })
  })
  
  // Initialize all functionality
  document.addEventListener("DOMContentLoaded", () => {
    initNavbarScroll()
    createBackToTopButton()
    addLoadingToButtons()
    lazyLoadImages()
  
    // Update current year in footer
    const currentYearElement = document.getElementById("current-year")
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear()
    }
  
    // Initialize tooltips for better UX
    initTooltips()
  
    // Performance monitoring
    if ("performance" in window) {
      window.addEventListener("load", () => {
        const loadTime = performance.now()
        console.log(`Page loaded in ${Math.round(loadTime)}ms`)
  
        // Report Core Web Vitals
        if ("web-vitals" in window) {
          window.webVitals.getCLS(console.log)
          window.webVitals.getFID(console.log)
          window.webVitals.getFCP(console.log)
          window.webVitals.getLCP(console.log)
          window.webVitals.getTTFB(console.log)
        }
      })
    }
  })
  
  // Initialize tooltips for interactive elements
  function initTooltips() {
    const tooltipElements = document.querySelectorAll("[data-tooltip]")
  
    tooltipElements.forEach((element) => {
      element.addEventListener("mouseenter", showTooltip)
      element.addEventListener("mouseleave", hideTooltip)
      element.addEventListener("focus", showTooltip)
      element.addEventListener("blur", hideTooltip)
    })
  
    function showTooltip(e) {
      const tooltip = document.createElement("div")
      tooltip.className = "tooltip"
      tooltip.textContent = e.target.dataset.tooltip
      tooltip.style.cssText = `
              position: absolute;
              background: #333;
              color: white;
              padding: 0.5rem;
              border-radius: 0.25rem;
              font-size: 0.875rem;
              z-index: 1000;
              pointer-events: none;
              opacity: 0;
              transition: opacity 0.3s ease;
          `
  
      document.body.appendChild(tooltip)
  
      const rect = e.target.getBoundingClientRect()
      tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px"
      tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + "px"
  
      setTimeout(() => (tooltip.style.opacity = "1"), 10)
  
      e.target._tooltip = tooltip
    }
  
    function hideTooltip(e) {
      if (e.target._tooltip) {
        e.target._tooltip.remove()
        delete e.target._tooltip
      }
    }
  }
  
  // Error handling for external resources
  window.addEventListener("error", (e) => {
    if (e.target.tagName === "IMG") {
      console.warn("Image failed to load:", e.target.src)
      // Add fallback image or placeholder
      e.target.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+"
      e.target.alt = "Image not available"
    }
  })
  
  // Service Worker registration for better performance (optional)
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("ServiceWorker registration successful")
        })
        .catch((err) => {
          console.log("ServiceWorker registration failed")
        })
    })
  }
  
  // Console welcome message with better branding
  console.log("%c🚢 Dubai Yacht Registration", "color: #1e40af; font-size: 24px; font-weight: bold;")
  console.log("%cWelcome to Dubai's premier marine services website!", "color: #666; font-size: 14px;")
  console.log("%cWebsite optimized for SEO, accessibility, and performance", "color: #16a34a; font-size: 12px;")
  
  // Expose useful functions globally for debugging
  window.DubaiYachtRegistration = {
    toggleMobileMenu,
    formatPhoneNumber,
    version: "2.0.0",
  }
  