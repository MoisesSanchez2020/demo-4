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
    // theme.cursorFollower(); // ❌ disabled to remove hover tracking
    theme.masonryGrid();
    theme.scaleHeroSlider();
    theme.blogSwiper01();
    theme.movingParticle();
    theme.bsTooltip();

    // 🔒 Added global override to remove hover and animation effects
    document.addEventListener("DOMContentLoaded", () => {
      const style = document.createElement("style");
      style.innerHTML = `
        *:hover {
          transform: none !important;
          transition: none !important;
          animation: none !important;
          cursor: default !important;
        }
      `;
      document.head.appendChild(style);

      // Hide any leftover cursor follower if it exists
      const follower = document.getElementById("cursor-follower");
      if (follower) follower.style.display = "none";
    });
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
      if (jQuery(this).scrollTop() > offset) {
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
    if ($(".auto-popup").length > 0) {
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

  /* -------------------------- odometerCount -------------------------- */
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
      return elementOffset < windowScrollTop + windowHeight;
    }

    initializeOdometers();

    $(window).on("scroll", function () {
      initializeOdometers();
    });
  },

  /* -------------------------- progressBar -------------------------- */
  progressBar: () => {
    $(window).on("load", function () {
      $(".circle-progress-bar").each(function () {
        $(this).css({
          width: "180px",
          height: "180px",
          "border-radius": "50%",
          border: "6px solid #0078ff",
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
      var $header = $("#wc_sticky_header");
      var $logoWrapper = $(".wc-main-logo");
      var $logoImg = $logoWrapper.find("img");

      var lightLogo = "./assets/images/logo/" + $logoWrapper.data("logo-light");
      var darkLogo = "./assets/images/logo/" + $logoWrapper.data("logo-dark");

      var initiallyTransparent = $header.hasClass("is-transparent");

      if (initiallyTransparent) {
        $logoImg.attr("src", lightLogo);
      } else {
        $logoImg.attr("src", darkLogo);
      }

      $(window).on("scroll", function () {
        var scrollTop = $(this).scrollTop();

        if (scrollTop >= 150) {
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
  },
};

theme.init();
