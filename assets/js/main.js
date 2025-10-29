"use strict";


var theme = {
  init: function () {
    theme.preLoader();
    theme.smoothScroll();
    theme.scrollToTop();
    theme.imageReveal();
    theme.scrollCue();
    theme.niceSelect();
    theme.splitting();
    theme.autoPopup();
    theme.odometerCount();
    theme.progressBar();
    theme.magnificPopup();
    theme.headerMain();
    theme.heroSlider();
    theme.servicesSwiper();
    theme.servicesSwiper03();
    theme.testimonialsSwiper01();
    theme.testimonialsSwiper02();
    theme.testimonialsSwiper03();
    theme.pricingPlan();
    theme.slidingContent();
    theme.cursorFollower();
    theme.masonryGrid();
    theme.scaleHeroSlider();
    theme.blogSwiper01();
    theme.movingParticle();
    theme.bsTooltip();
  },

  /* -------------------------- Preloader -------------------------- */
  preLoader: () => {
    $(window).on("load", function () {
      $("body").addClass("no-scroll");
      $("#preloader").fadeOut(500, function () {
        $("body").removeClass("no-scroll");
      });
    });
  },

  /* -------------------------- smoothScroll -------------------------- */
  smoothScroll: () => {
    SmoothScroll({
      stepSize: 50,
      animationTime: 500,
    });
  },

  /* -------------------------- Scroll To Top -------------------------- */
  scrollToTop: () => {
    var progressPath = document.querySelector(".progress-wrap path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";
    var updateProgress = function () {
      var scroll = $(window).scrollTop();
      var height = $(document).height() - $(window).height();
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop()> offset) {
        jQuery(".progress-wrap").addClass("active-progress");
      } else {
        jQuery(".progress-wrap").removeClass("active-progress");
      }
    });
    jQuery(".progress-wrap").on("click", function (event) {
      event.preventDefault();
      jQuery("html, body").animate({ scrollTop: 0 }, duration);
      return false;
    });
  },

  /* -------------------------- imageReveal -------------------------- */
  imageReveal: () => {
    if ($(".image-reveal-effect").length) {
      gsap.registerPlugin(ScrollTrigger);
      let imageRevealContainer = document.querySelectorAll(".image-reveal-effect");
      imageRevealContainer.forEach((container) => {
        let image = container.querySelector(".image-reveal");
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            toggleActions: "play none none none",
          },
        });
        tl.set(container, {
          autoAlpha: 1,
        });
        tl.from(container, 1, {
          xPercent: -100,
          ease: Power2.out,
        });
        tl.from(image, 1, {
          xPercent: 100,
          scale: 1,
          delay: -1,
          ease: Power2.out,
        });
      });
    }
  },

  /* -------------------------- scrollCue -------------------------- */
  scrollCue: () => {
    scrollCue.init({
      percentage: 0.8,
      // enable: true,
      // docSlider: false,
      // interval: 0.7,
      // duration: 600,
      // pageChangeReset: true,
    });
  },

  /* -------------------------- niceSelect -------------------------- */
  niceSelect: () => {
    $("select").niceSelect();
  },

  /* -------------------------- Splitting -------------------------- */
  splitting: () => {
    const splitElements = document.querySelectorAll("[data-splitting]");
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          Splitting({ target: entry.target });
          observer.unobserve(entry.target);
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });
    splitElements.forEach((element) => {
      observer.observe(element);
    });
  },

  /* -------------------------- autoPopup -------------------------- */
  autoPopup: () => {
    if ($(".auto-popup").length> 0) {
      let showPopup = sessionStorage.getItem("showPopup");

      if (!JSON.parse(showPopup)) {
        setTimeout(function () {
          $(".auto-popup").modal("show");
        }, 5000);
      }

      $("#checkHidePopup").on("change", function () {
        if ($(this).is(":checked")) {
          sessionStorage.setItem("showPopup", true);
          $(".auto-popup").modal("hide");
        }
      });
    }
  },

  /* --------------------------  Counters [Odometers] -------------------------- */
  odometerCount: () => {
    function initializeOdometers() {
      $(".odometer").each(function () {
        var $this = $(this);
        var countTo = $this.data("count-to");
        if (!$this.hasClass("odometer-activated") && isElementInView($this)) {
          $this.html(countTo);
          $this.addClass("odometer-activated");
        }
      });
    }

    function isElementInView($element) {
      var elementOffset = $element.offset().top;
      var windowScrollTop = $(window).scrollTop();
      var windowHeight = $(window).height();
      return elementOffset < windowScrollTop + windowHeight - 0;
    }

    // Initial check
    initializeOdometers();

    // On scroll, check again
    $(window).on("scroll", function () {
      initializeOdometers();
    });
  },

/* -------------------------- Progress Bar -------------------------- */
/* -------------------------- Progress Bar (Static Version) -------------------------- */
progressBar: () => {
  $(window).on("load", function () {
    $(".circle-progress-bar").each(function () {
      $(this).css({
        width: "180px",
        height: "180px",
        "border-radius": "50%",
        "border": "6px solid #0078ff",
        "background-color": "#fff",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        margin: "0 auto",
        "box-shadow": "0 8px 16px rgba(0,0,0,0.1)",
      });
      $(this).find("strong").css({
        "font-size": "28px",
        "font-weight": "700",
        color: "#0078ff",
      });
    });
  });
},



  /* -------------------------- magnificPopup -------------------------- */
  magnificPopup: () => {
    $(".video-popup").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: true,
      fixedContentPos: false,
    });
  },

  /* -------------------------- headerMain -------------------------- */
  headerMain: () => {
    $(document).ready(function () {
      // Sticky header with logo swap
      $(document).ready(function () {
        var $header = $("#wc_sticky_header");
        var $logoWrapper = $(".wc-main-logo");
        var $logoImg = $logoWrapper.find("img");

        var lightLogo = "./assets/images/logo/" + $logoWrapper.data("logo-light");
        var darkLogo = "./assets/images/logo/" + $logoWrapper.data("logo-dark");

        // Save original transparent state
        var initiallyTransparent = $header.hasClass("is-transparent");

        // Initial logo setup
        if (initiallyTransparent) {
          $logoImg.attr("src", lightLogo);
        } else {
          $logoImg.attr("src", darkLogo);
        }

        $(window).on("scroll", function () {
          var scrollTop = $(this).scrollTop();

          if (scrollTop>= 150) {
            $header.addClass("sticky");

            if (initiallyTransparent) {
              $header.removeClass("is-transparent");
              $logoImg.attr("src", darkLogo);
            }
          } else {
            $header.removeClass("sticky");

            if (initiallyTransparent) {
              $header.addClass("is-transparent");
              $logoImg.attr("src", lightLogo);
            }
          }
        });
      });

      // Toggle menu
      if ($(window).width() <= 991.98) {
        $(".wc-header-menu-toggler a").on("click", function () {
          $(".wc-main-menu-wrapper").toggleClass("open");
          
          if ($(window).width() <= 991.98) {
            $(".wc-backdrop").fadeToggle(300);

            if ($(".wc-main-menu-wrapper").hasClass("open")) {
              $("body").addClass("no-scroll");
            } else {
              $("body").removeClass("no-scroll");
            }
          }
        });

        // Toggle submenus - one at a time with slide
        $(".wc-main-menu .has-dropdown> a").on("click", function (e) {
          e.preventDefault();

          var $parent = $(this).parent();
          var $submenu = $parent.find(".sub-menu").first();
          var isMobile = $(window).width() <= 991.98;

          if (isMobile) {
            // Close siblings only (not ancestors)
            $parent.siblings(".has-dropdown").removeClass("active").find(".sub-menu").slideUp(300);

            // Toggle current
            $parent.toggleClass("active");
            $submenu.stop(true, true).slideToggle(300);

            // Ensure ancestors stay active
            $parent.parents(".has-dropdown").addClass("active").children(".sub-menu").show();
          } else {
            // Desktop simple hover-like toggle
            $parent.toggleClass("active");
            $submenu.stop(true, true).slideToggle(300);

            // Ensure ancestors stay active
            $parent.parents(".has-dropdown").addClass("active").children(".sub-menu").show();
          }
        });
      }

      // Highlight current URL and keep parents open      
      if ($(window).width()>= 992) {
        let currentUrl = window.location.pathname;
        let currentFile = currentUrl.split("/").pop();

        $(".wc-main-menu li a").each(function () {
          let linkHref = $(this).attr("href").replace("./", "");

          if (currentFile === linkHref || currentUrl.endsWith(linkHref)) {
            
            $(this).addClass("active");

            // Open parents and keep them active
            $(this)
              .parents("li.has-dropdown")
              .addClass("active")
              .children(".sub-menu")
              .show();
          }
        });
      };

      // Backdrop click closes menu and submenus
      $(document).on("click", ".wc-backdrop", function () {
        $(".wc-main-menu-wrapper").removeClass("open");
        $(".wc-backdrop").fadeOut();
        $("body").removeClass("no-scroll");
        $(".wc-main-menu .has-dropdown").removeClass("active").find(".sub-menu").slideUp(300);
      });

      // Backdrop element
      var $backdrop = $('<div class="wc-backdrop"></div>');

      function handleBackdrop() {
        if ($(window).width() <= 991.98) {
          if (!$(".wc-backdrop").length) {
            $(".wc-header-main").prepend($backdrop);
          }
        } else {
          $(".wc-backdrop").remove();
          $(".wc-main-menu-wrapper").removeClass("open");
        }
      }

      // Initial backdrop check
      handleBackdrop();
    });
  },

  /* -------------------------- Hero Slider -------------------------- */
  heroSlider: () => {
    const $slider = $("#wc-hero-slick-slider");
    const $current = $("#wc-current");
    const $total = $("#wc-total");
    const $progressBar = $(".wc-slider-progress-bar");

    const autoplaySpeed = 4000;
    let totalSlides = $slider.find(".wc-slide-item").length;
    $total.text(totalSlides.toString().padStart(2, "0"));

    $slider.on("init", function () {
      $current.text("01");
      startProgress();
    });

    $slider.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      $current.text((nextSlide + 1).toString().padStart(2, "0"));
      resetProgress();
    });

    $slider.on("afterChange", function () {
      startProgress();
    });

    $slider.slick({
      fade: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: autoplaySpeed,
      arrows: true,
      dots: false,
      prevArrow: `<button type="button" class="slick-prev">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="matrix(1.36,0,0,1.36,-4.32,-4.32)"><g fill="#ffffffff"><path d="M3.25 11.25h17.5v1.5H3.25z"/><path d="M4 12.75c3.527 0 6.41-3.102 6.41-6.41v-.75h-1.5v.75c0 2.512-2.243 4.91-4.91 4.91h-.75v1.5z"/><path d="M4 11.25c3.527 0 6.41 3.102 6.41 6.41v.75h-1.5v-.75c0-2.511-2.243-4.91-4.91-4.91h-.75v-1.5z"/></g></g></svg>
                  </button>`,
      nextArrow: `<button type="button" class="slick-next">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="matrix(-1.36,0,0,-1.36,28.32,28.32)"><g fill="#ffffffff"><path d="M3.25 11.25h17.5v1.5H3.25z"/><path d="M4 12.75c3.527 0 6.41-3.102 6.41-6.41v-.75h-1.5v.75c0 2.512-2.243 4.91-4.91 4.91h-.75v1.5z"/><path d="M4 11.25c3.527 0 6.41 3.102 6.41 6.41v.75h-1.5v-.75c0-2.511-2.243-4.91-4.91-4.91h-.75v-1.5z"/></g></g></svg>
                  </button>`,
    });

    function startProgress() {
      $progressBar.css({ width: "0%", transition: "none" }).offset();
      $progressBar.css({
        width: "100%",
        transition: `width ${autoplaySpeed}ms linear`,
      });
    }

    function resetProgress() {
      $progressBar.css({ width: "0%", transition: "none" });
    }
  },

  /* -------------------------- Services Swiper -------------------------- */
  servicesSwiper: () => {
    var swiper = new Swiper(".wc-services-swiper", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        576: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 2,
        },
        1400: {
          slidesPerView: 3,
        },
      },
    });
  },

  servicesSwiper03: () => {
    var swiper = new Swiper(".wc-services-swiper-03", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        576: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 2,
        },
        1400: {
          slidesPerView: 3,
        },
      },
    });
  },

  /* -------------------------- Testimonials Swiper 01 -------------------------- */
  testimonialsSwiper01: () => {
    var swiper = new Swiper(".wc-testimonials-swiper-01", {
      loop: true,
      dots: true,
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        // dynamicBullets: true,
        clickable: true,
      },
      breakpoints: {
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      },
    });
  },

  /* -------------------------- Testimonials Swiper 02 -------------------------- */
  testimonialsSwiper02: () => {
    var swiper = new Swiper(".wc-testimonials-swiper-02", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 2,
        },
        1400: {
          slidesPerView: 3,
        },
      },
    });
  },

  /* -------------------------- Testimonials Swiper 03 -------------------------- */
  testimonialsSwiper03: () => {
    var swiper = new Swiper(".wc-testimonials-swiper-03", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        // dynamicBullets: true,
        clickable: true,
      },
      breakpoints: {
        576: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 2,
        },
      },
    });
  },

  /* -------------------------- Pricing -------------------------- */
  pricingPlan: () => {
    $(function () {
      $(".wc-pricing-switch").each(function () {
        const $switch = $(this);
        const $monthlyBtn = $switch.find(".btn-monthly");
        const $annualBtn = $switch.find(".btn-annual");

        const updatePrices = (type) => {
          $(".wc-pricing-figure").each(function () {
            const price = $(this).data(type);
            if (price !== undefined) {
              $(this).text(`$${price}`);
            }
          });

          $(".wc-pricing-period").text(type === "monthly" ? "/monthly billed" : "/annually billed");
        };

        $monthlyBtn.on("click", function () {
          updatePrices("monthly");
          $monthlyBtn.addClass("active");
          $annualBtn.removeClass("active");
        });

        $annualBtn.on("click", function () {
          updatePrices("annual");
          $annualBtn.addClass("active");
          $monthlyBtn.removeClass("active");
        });
      });
    });
  },

  /* -------------------------- slidingContent -------------------------- */
  slidingContent: () => {
    $(".sliding-content-list").each(function () {
      const $slidingBox = $(this);
      $slidingBox.on("click", ".sliding-item", function () {
        const $currentItem = $(this);
        $currentItem.siblings().removeClass("active");
        $currentItem.addClass("active");
      });
    });
  },

  /* -------------------------- cursorFollower -------------------------- */
  cursorFollower: () => {
    const section = document.querySelector(".wc-contact-text-area");
    const follower = document.getElementById("cursor-follower");

    if (!section || !follower) return;

    const container = section.querySelector(".container"); // Ensure correct container
    const updatePosition = (x, y) => {
      follower.style.left = `${x}px`;
      follower.style.top = `${y}px`;
    };

    const centerFollower = () => {
      const containerRect = container.getBoundingClientRect();
      const followerRect = follower.getBoundingClientRect();

      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;

      updatePosition(centerX, centerY);
    };

    // Initial center
    window.addEventListener("load", centerFollower);

    // Recenter on mouse leave
    section.addEventListener("mouseleave", centerFollower);

    // Follow mouse inside the section
    section.addEventListener("mousemove", (e) => {
      const containerRect = container.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;
      updatePosition(x, y);
    });
  },

  /* -------------------------- masonryGrid -------------------------- */
  masonryGrid: () => {
    const masonryGrid = document.querySelector("#wc-masonry-grid");
    if (masonryGrid) {
      new Masonry(masonryGrid, {
        itemSelector: ".masonry-item",
        percentPosition: true,
        gutter: 0,
      });
    }
  },

  /* -------------------------- Blog Swiper 01 -------------------------- */
  blogSwiper01: () => {
    var swiper = new Swiper(".wc-blog-swiper-01", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 2,
        },
        1400: {
          slidesPerView: 2,
        },
      },
    });
  },

  /* -------------------------- Scale Hreo Slider -------------------------- */
  scaleHeroSlider: () => {
    $(document).ready(function () {
      const $slides = $(".scale-slider figure");
      const $dots = $(".slider-indicators .dot");
      let current = 0;
      let interval;

      function goToSlide(index) {
        $slides.removeClass("active").eq(index).addClass("active");
        $dots.removeClass("active").eq(index).addClass("active");
        current = index;
      }

      function startSlider() {
        interval = setInterval(() => {
          let next = (current + 1) % $slides.length;
          goToSlide(next);
        }, 5000);
      }

      // Dot click support
      $dots.on("click", function () {
        clearInterval(interval); // Pause slider when user clicks
        goToSlide($(this).data("slide"));
        startSlider(); // Restart after click
      });

      // Initialize
      goToSlide(current);
      startSlider();
    });
  },

  /* -------------------------- movingParticle  -------------------------- */
  movingParticle: () => {
    $(function () {
      Dots.generate({
        size: 7,
        speed: 20000,
        accurancy: 7,
        color: "#eceb41",
        randomSize: true,
        randomColor: false,
        randomOpacity: false,
      });
    });
  },

  /* -------------------------- bsTooltip -------------------------- */
  bsTooltip: () => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
  },
};
theme.init();

