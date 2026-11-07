/*
Theme Name: Beeberry HTML5 Template
Theme URI: https://themeforest.net/item/beeberry-beekeeping-and-honey-online-shop-html5-template/43618342
Design by: techsometimes
Developed by: A N Abdullah Al Numan
Version: 1.1.1
License: 
Tags: 
*/

(($) => {
  ("use strict");

  menuBar();

  bgImg();

  venoBox();

  ourProductsSlider();

  testimonialSlider();

  ourSweetClientsSlider();
  
  teamSlider();

  animeCounterUp();

  bottomToTop();

  wow();

  mySelect();

  shuffle();

  myRangeSlider();

  productDislpaySlider();

  quantityCount();

  blogPostSlider();

  htmlFatchFrom();
  newsletterSignup();

  preloderOption();

  /*====== Active Plugins ======

        1 Menu Bar

        2 BG Img

        3 VenoBox

        4 Our Products Slider

        5 Testimonial Slider

        6 Our Sweet Clients Slider

        7 Team Slider

        8 Anime Counter Up

        9 Bottom To Top

        10 Wow

        11 My Select

        12 Shuffle

        13 My Range Slider

        14 Product Dislpay Slider

        15 Quantity Count

        16 Blog Post Slider

        17 HTML Fatch From 

        18 Preloder Option

    =============================*/

  /*=====================
      1 Menu Bar
  =======================*/
  function menuBar() {
    let copyMenuLogo = $(".menu-bar.v1 .menu-logo, .menu-bar.v2 .menu-logo").html();
    let copyMenuList = $(".menu-bar.v1 .main-menu, .menu-bar.v2 .main-menu").html();
    let copyFooterSocial = $(".info-footer.v1 .socials-links-box, .info-footer.v2 .socials-links-box").html();

    $(".menu-bar.v1 .top-bar-search, .menu-bar.v2 .top-bar-search").append(`<div class="search-overlay"></div>`);

    $(".menu-bar.v1 .mobile-menu-btn, .menu-bar.v2 .mobile-menu-btn").parent().append(`
      <div class="mobile-menu-bar">
            <div class="mobile-menu-header">
              <div class="mobile-logo">${copyMenuLogo}</div>
              <button class="close-mobile-btn"><span class="my-icon icon-angle-left"></span></button>
            </div>
            <div class="mobile-overflow">
              <nav class="mobile-main-manu">
                  ${copyMenuList}
              </nav>
              <ul class="social-link">
                ${copyFooterSocial}
              </ul>
              
            </div>
          </div>
          <div class="mobile-menu-overlay"></div>
        </div>
      `);
    $(".menu-bar.v1 .search-open-btn, .menu-bar.v2 .search-open-btn").on("click",function () {
      $(this).parent().find(".top-bar-search").addClass("active");
    });
    $(".menu-bar.v1 .search-close, .menu-bar.v2 .search-close").on("click", function () {
      $(this).parents(".top-bar-search").removeClass("active");
    });
    $(".menu-bar.v1 .search-overlay, .menu-bar.v2 .search-overlay").on("click", function () {
      $(this).parents(".top-bar-search").removeClass("active");
    });
    $(".menu-bar.v1 .mobile-menu-btn, .menu-bar.v2 .mobile-menu-btn").on("click", function () {
      $(this).addClass("active");
      $(this).parents(".menu-right").find(".mobile-menu-bar, .mobile-menu-overlay").addClass("active");
    });
    $(".menu-bar.v1 .mobile-menu-header .close-mobile-btn, .menu-bar.v2 .mobile-menu-header .close-mobile-btn").on("click",function () {
      $(this).parents(".menu-right").find(".mobile-menu-bar, .mobile-menu-btn, .mobile-menu-overlay").removeClass("active");
    });
    $(".menu-bar.v1 .mobile-menu-overlay, .menu-bar.v2 .mobile-menu-overlay").on("click", function () {
      $(this).removeClass("active");
      $(this).parents(".menu-right").find(".mobile-menu-btn, .mobile-menu-bar").removeClass("active");
    });
    $(".menu-bar.v1 .mobile-main-manu, .menu-bar.v2 .mobile-main-manu").on("click", "li a", function (e) {  
      const { target } = e;
      const href = target.getAttribute("href");
      if (href === "#") {
        e.preventDefault();
        const $parent = $(target).parent("li");
        const $siblings = $parent.siblings("li");
        const isActive = $parent.hasClass("active");
        if (isActive) {
          $parent.removeClass("active");
          $(target).siblings("ul").slideUp();
        } else {
          $parent.addClass("active");
          $siblings.removeClass("active")
          $siblings.find("ul:visible").slideUp();
          $(target).siblings("ul").slideDown();
        }
      }
    });
    $(".menu-bar.v1 .mobile-main-manu .has-dropdown, .menu-bar.v2 .mobile-main-manu .has-dropdown").find(".active").parent().slideDown();
    let headerHeight = $(".menu-bar").outerHeight();

    $(window).scroll(() => {
      if ($(window).scrollTop() > headerHeight) {
        $(".menu-bar").addClass("sticky-header");
      } else {
        $(".menu-bar").removeClass("sticky-header");
      }
    });
  }
  
  /*=====================
      2 BG Img
  =======================*/
  function bgImg() {
    document.querySelectorAll("[data-background]").forEach((element) => {
      element.style.backgroundImage = `url("${element.getAttribute(
        "data-background"
      )}")`;
    });
  }

  /*=====================
      3 VenoBox
  =======================*/
  function venoBox() {
    new VenoBox();
  }

  /*============================
      4 Our Products Slider
  =============================*/
  function ourProductsSlider() {
    let servicesSlider = new Swiper(".our-services.v3 .services-slider", {
      slidesPerView: 3,
      spaceBetween: 24,
      loop: false,
      speed: 700,
      grabCursor: true,
      navigation: {
        nextEl: ".our-services.v3 .next-btn",
        prevEl: ".our-services.v3 .prev-btn",
      },
      pagination: {
        el: ".our-services.v3 .swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<button type="button" class="' + className + '" aria-label="Go to page ' + (index + 1) + '">' + (index + 1) + '</button>';
        },
      },
      breakpoints: {
        300: { slidesPerView: 1 },
        767: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      },
    });
    let asfTeamSlider = new Swiper(".asf-team .asf-team-slider", {
      slidesPerView: 4,
      spaceBetween: 24,
      loop: false,
      speed: 700,
      grabCursor: true,
      navigation: {
        nextEl: ".asf-team .asf-team-pager .next-btn",
        prevEl: ".asf-team .asf-team-pager .prev-btn",
      },
      pagination: {
        el: ".asf-team .asf-team-pager .swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<button type="button" class="' + className + '" aria-label="Go to page ' + (index + 1) + '">' + (index + 1) + '</button>';
        },
      },
      breakpoints: {
        300: { slidesPerView: 1 },
        767: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      },
    });
    let ourProductsSlider1 = new Swiper(".our-products.v1 .slider", {
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".prev-btn",
        prevEl: ".next-btn",
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        767: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
    let ourProductsSlider2 = new Swiper(".our-products.v2 .slider", {
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".prev-btn",
        prevEl: ".next-btn",
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        767: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
  }

  /*============================
      5 Testimonial Slider
  =============================*/
  function testimonialSlider() {
    let testimonialSlider = new Swiper(".testimonial.v1 .slider", {
      slidesPerView: 2,
      spaceBetween: 50,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".prev-btn",
        prevEl: ".next-btn",
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 2,
        },
      },
    });

    let testimonialSlider2 = new Swiper(".testimonial.v2 .slider", {
      slidesPerView: 2,
      spaceBetween: 50,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".prev-btn",
        prevEl: ".next-btn",
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
      },
    });
    let testimonialSlider3 = new Swiper(".testimonial.v3 .slider", {
      slidesPerView: 2,
      spaceBetween: 50,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".prev-btn",
        prevEl: ".next-btn",
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
      },
    });
  }

  /*=================================
      6 Our Sweet Clients Slider
  ==================================*/
  function ourSweetClientsSlider() {
    let ourSweetClientsSlider = new Swiper(".our-sweet-clients.v1 .slider", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".prev-btn",
        prevEl: ".next-btn",
      },
      breakpoints: {
        300: {
          slidesPerView: 3,
        },
        575: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 6,
        },
        1200: {
          slidesPerView: 8,
        },
      },
    });
  }

  /*============================
      7 Team Slider
  =============================*/
  function teamSlider() {
    let teamSlider = new Swiper(".team.v1 .slider", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".prev-btn",
        prevEl: ".next-btn",
      },
      breakpoints: {
        300: {
          slidesPerView: 1,
        },
        767: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      },
    });
  }

  /*========================
      8 Anime Counter Up
  =======================*/
  function animeCounterUp() {
    const $counterElements = $(".counter");

    function animateElement() {
      $counterElements.each(function () {
        anime({
          targets: this,
          innerHTML: [
            parseInt(this.dataset.countMin) || 0,
            parseInt(this.dataset.countMax),
          ],
          round: 1,
          easing: "linear",
          duration: parseInt(this.dataset.countDuration) || 1000,
          delay: parseInt(this.dataset.countDelay) || 500,
        });
      });
    }

    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    const handleScroll = () => {
      $counterElements.each(function () {
        if (isElementInViewport(this)) {
          animateElement();
          $(window).off("scroll", handleScroll);
        }
      });
    };

    $(window).on("scroll", handleScroll);
  }

  /*============================
      9 Bottom To Top
  =============================*/

  function bottomToTop() {
    $("body footer").append(
      `<button class="scroll-bottom-Top"><span class="my-icon icon-angle-up"></span></button>`
    );

    let scrollTop = $(".scroll-bottom-Top");

    let sectionScrollHight = $("main").find("section").first().outerHeight();

    $(window).scroll(function () {
      if ($(window).scrollTop() > sectionScrollHight) {
        scrollTop.addClass("show");
      } else {
        scrollTop.removeClass("show");
      }
    });

    scrollTop.on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "300");
    });
  }

  /*=====================
      10 Wow
  =======================*/
  function wow() {
      wow = new WOW({
        animateClass: "animate__animated",
        offset: 0,
      });
      wow.init();
  }
    
  /*=====================
      11 My Select
  =======================*/
  function mySelect() {
    const $mySelectElements = $("select");

    $mySelectElements.each((index, selectElement) => {
      const $mySelectContainer = $("<div>").addClass("my-select");

      const $selectedOption = $("<button>")
        .addClass("current")
        .attr("type", "button")
        .html(selectElement.options[selectElement.selectedIndex].innerHTML);

      const $optionsList = $("<ul>").addClass("list");

      for (const option of selectElement.options) {
        const $myOption = $("<li>").html(option.innerHTML);
        $myOption.on("click", () => {
          $selectedOption.html(option.innerHTML);
          $optionsList.removeClass("open");
          $selectedOption.removeClass("open");
        });
        $optionsList.append($myOption);
      }

      $selectedOption.on("click", () => {
        $optionsList.toggleClass("open");
        $selectedOption.toggleClass("open");
      });

      $mySelectContainer.append($selectedOption);
      $mySelectContainer.append($optionsList);
      $(selectElement).before($mySelectContainer).hide();

      // Hide options when user clicks outside of select
      $(document).on("click", (event) => {
        if (
          !$mySelectContainer.is(event.target) &&
          $mySelectContainer.has(event.target).length === 0
        ) {
          $optionsList.removeClass("open");
          $selectedOption.removeClass("open");
        }
      });
    });
  }

  /*============================
        12 Shuffle
  =============================*/
  function shuffle() {
    if($(".gallery-display.v1").length){
      window.onload = function () {
        let Shuffle = window.Shuffle;
        let element = document.querySelector(".gallery-items");

        // Tag each card with its index so the pagination filter knows order
        $(element).children().each(function(i){
          this.setAttribute('data-index', i);
        });

        let shuffleInstance = new Shuffle(element, {
          itemSelector: '.gallery-items > div',
          speed: 600,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          staggerAmount: 80,
          staggerAmountMax: 240
        });

        let currentFilter = 'gallery-item';
        let currentPage = 1;

        const PER_PAGE = 2;
        function applyFilter() {
          shuffleInstance.filter(function(el) {
            let groups = [];
            try { groups = JSON.parse(el.getAttribute('data-groups') || '[]'); } catch(e){}
            const matchesFilter = groups.indexOf(currentFilter) !== -1;
            if (!matchesFilter) return false;
            if (currentFilter !== 'gallery-item') return true;
            const idx = parseInt(el.getAttribute('data-index'), 10);
            const startIdx = (currentPage - 1) * PER_PAGE;
            return idx >= startIdx && idx < startIdx + PER_PAGE;
          });
        }

        // Initial render: page 1 of "Show All"
        applyFilter();

        $(".gallery-display .gallery-btns button").on('click', function(e){
          e.preventDefault();
          $(".gallery-display .gallery-btns button").removeClass('active');
          $(this).addClass('active');
          currentFilter = $(this).attr('data-target');
          if (currentFilter === 'gallery-item') {
            $(".gallery-pagination").show();
            currentPage = 1;
            $(".gallery-dot").removeClass('active');
            $(".gallery-dot[data-page='1']").addClass('active');
          } else {
            $(".gallery-pagination").hide();
          }
          applyFilter();
        });

        $(".gallery-display .gallery-dot").on('click', function(e){
          e.preventDefault();
          currentPage = parseInt($(this).attr('data-page'), 10);
          $(".gallery-dot").removeClass('active');
          $(this).addClass('active');
          applyFilter();
        });
      }
    }
  }

  /*=====================
      13 My Range Slider
  =======================*/
  function myRangeSlider() {
    const sliders = document.querySelectorAll('.my-range-slider');

    function createHandle() {
      const handle = document.createElement('div');
      handle.className = 'slider-handle';
      return handle;
    }

    function createBar() {
      const bar = document.createElement('div');
      bar.className = 'slider-bar';
      return bar;
    }

    function updateHandles(sliderData) {
      sliderData.handles.forEach((handle, index) => {
        const percentage = ((sliderData.values[index] - sliderData.minValue) / (sliderData.maxValue - sliderData.minValue)) * 100;
        handle.style.left = `${percentage}%`;
        handle.setAttribute('data-value', Math.floor(sliderData.values[index]));
      });

      const rangeMinValueElement = sliderData.sliderElement.querySelector('.range-min-value');
      const rangeMaxValueElement = sliderData.sliderElement.querySelector('.range-max-value');

      if (rangeMinValueElement && rangeMaxValueElement) {
        rangeMinValueElement.textContent = Math.floor(sliderData.values[0]);
        rangeMaxValueElement.textContent = Math.floor(sliderData.values[1]);
      } else if (rangeMinValueElement) {
        rangeMinValueElement.textContent = Math.floor(sliderData.values[0]);
      }

      if (sliderData.isDoubleSlider) {
        updateDoubleSliderBar(sliderData);
      } else {
        updateSingleSliderBar(sliderData);
      }
    }

    function updateDoubleSliderBar(sliderData) {
      const bar = sliderData.sliderElement.querySelector('.slider-bar');
      const startPercentage = ((sliderData.values[0] - sliderData.minValue) / (sliderData.maxValue - sliderData.minValue)) * 100;
      const endPercentage = ((sliderData.values[1] - sliderData.minValue) / (sliderData.maxValue - sliderData.minValue)) * 100;
      const barWidth = Math.abs(endPercentage - startPercentage);
      const barLeft = Math.min(startPercentage, endPercentage);
      bar.style.left = `${barLeft}%`;
      bar.style.width = `${barWidth}%`;
    }

    function updateSingleSliderBar(sliderData) {
      const bar = sliderData.sliderElement.querySelector('.slider-bar');
      const startPercentage = ((sliderData.values[0] - sliderData.minValue) / (sliderData.maxValue - sliderData.minValue)) * 100;
      bar.style.left = `${startPercentage}%`;
      bar.style.width = `${100 - startPercentage}%`;
    }
    
    function onMouseMove(event, sliderData) {
      if (!sliderData.isDragging || sliderData.activeHandleIndex === null) return;

      const sliderRect = sliderData.sliderElement.getBoundingClientRect();

      // Calculate the actual offset within the slider track considering the padding
      const offsetX =
        event.clientX -
        sliderRect.left -
        sliderData.startX -
        parseFloat(getComputedStyle(sliderData.sliderElement).paddingLeft);

      // Calculate the total width of the slider track excluding padding
      const totalWidth =
        sliderRect.width -
        parseFloat(getComputedStyle(sliderData.sliderElement).paddingLeft) -
        parseFloat(getComputedStyle(sliderData.sliderElement).paddingRight);

      let handlePercentage = offsetX / totalWidth;

      if (sliderData.isDoubleSlider) {
        // Add a 4-pixel gap (2 pixels for each handle)
        handlePercentage += sliderData.activeHandleIndex === 0 ? -0.02 : 0.02;
      }

      // Adjust handlePercentage to ensure it's within valid bounds
      handlePercentage = Math.max(0, Math.min(1, handlePercentage));

      let handleValue =
        sliderData.minValue +
        handlePercentage * (sliderData.maxValue - sliderData.minValue);

      if (sliderData.isDoubleSlider) {
        // Ensure that the handles don't overlap
        if (sliderData.activeHandleIndex === 0) {
          handleValue = Math.min(handleValue, sliderData.values[1]);
        } else {
          handleValue = Math.max(handleValue, sliderData.values[0]);
        }
      }

      sliderData.values[sliderData.activeHandleIndex] = handleValue;
      updateHandles(sliderData);
    }
    function onHandleMouseDown(event, index, sliderData) {
      sliderData.isDragging = true;
      sliderData.activeHandleIndex = index;
      sliderData.startX = event.clientX - sliderData.handles[index].getBoundingClientRect().left;
    }

    function onMouseUp(sliderData) {
      sliderData.isDragging = false;
      sliderData.activeHandleIndex = null;
    }

    sliders.forEach((sliderElement) => {
      const handles = [];
      const track = sliderElement.querySelector('.slider-track');
      const rangeMinValueElement = sliderElement.querySelector('.range-min-value');
      const rangeMaxValueElement = sliderElement.querySelector('.range-max-value');
      const minValue = parseFloat(sliderElement.getAttribute('data-min-p')) || 0;
      const maxValue = parseFloat(sliderElement.getAttribute('data-max-p')) || 100;
      const isDoubleSlider = sliderElement.getAttribute('data-slider-double') === 'true';
      let values = isDoubleSlider ? initializeValues() : [initializeValues()[0]];

      function initializeValues() {
        if (isDoubleSlider) {
          return [
            Math.max(minValue, parseFloat(sliderElement.getAttribute('data-min-value'))),
            Math.min(maxValue, parseFloat(sliderElement.getAttribute('data-max-value')))
          ];
        } else {
          return [
            Math.max(minValue, parseFloat(sliderElement.getAttribute('data-min-value')))
          ];
        }
      }

      if (isDoubleSlider) {
        handles.push(createHandle());
        handles.push(createHandle());
      } else {
        handles.push(createHandle());
      }

      handles.forEach((handle, index) => {
        track.appendChild(handle);
        handle.addEventListener('mousedown', (event) => onHandleMouseDown(event, index, sliderData));
      });

      const bar = createBar();
      track.appendChild(bar);

      const sliderData = {
        sliderElement,
        handles,
        activeHandleIndex: null,
        isDragging: false,
        startX: 0,
        values,
        minValue,
        maxValue,
        rangeMinValueElement,
        rangeMaxValueElement,
        isDoubleSlider,
        updateHandles: () => updateHandles(sliderData),
        updateDoubleSliderBar: () => updateDoubleSliderBar(sliderData),
        updateSingleSliderBar: () => updateSingleSliderBar(sliderData),
        onMouseMove: (event) => onMouseMove(event, sliderData),
        onMouseUp: () => onMouseUp(sliderData),
      };

      sliderData.updateHandles = () => updateHandles(sliderData);
      sliderData.onMouseMove = (event) => onMouseMove(event, sliderData);
      sliderData.onMouseUp = () => onMouseUp(sliderData);

      document.addEventListener('mousemove', sliderData.onMouseMove);
      document.addEventListener('mouseup', sliderData.onMouseUp);

      sliderData.updateHandles();
  
    });
  }
  
  /*=================================
      14 Product Dislpay Slider
  ==================================*/
  function productDislpaySlider() {
    let smallBoxImgSlider = new Swiper(".shop-details.v1 .small-box-img .slider", {
      slidesPerView: 3,
      spaceBetween: 30,
      speed: 1000,
    });

    let bigBoxImgSlider = new Swiper(".shop-details.v1 .big-box-img .slider", {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 1000,
      mousewheel: false,
      keyboard: false,
      cssMode: true,
      thumbs: {
        swiper: smallBoxImgSlider,
      },
    });
  }

  /*============================
      15 Quantity Count
  =============================*/

  function quantityCount() {
    let buttonPlus = $(".quantity-count .count-plus-btn");
    let buttonMinus = $(".quantity-count .count-down-btn");

    let incrementPlus = buttonPlus.click(function () {
      let $n = $(this).parent(".quantity-count").find(".count-numbber");
      $n.val(Number($n.val()) + 1);
    });

    let incrementMinus = buttonMinus.click(function () {
      let $n = $(this).parent(".quantity-count").find(".count-numbber");
      let amount = Number($n.val());
      if (amount >= 1) {
        $n.val(Number($n.val()) - 1);
      } else {
        $n.val(0);
      }
    });
  }

  /*=================================
      16 Blog Post Slider
  ==================================*/

  function blogPostSlider() {
    let blogPostSlider = new Swiper(".blog.v1 .big-post .slider", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".prev-btn",
        prevEl: ".next-btn",
      },
    });
    
    let blogDetailsSlider2 = new Swiper(".blog-details.v1 .big-post-details .slider", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".prev-btn",
        prevEl: ".next-btn",
      },
    });
  }

  /*=====================
      Newsletter sign-up (footer) — sends the e-mail to the network inbox
  =======================*/
  function newsletterSignup() {
    const NEWSLETTER_ENDPOINT =
      "https://formsubmit.co/ajax/contact@abejassinfronteras.org";

    document.querySelectorAll(".subscribe-bar form").forEach((form) => {
      const input = form.querySelector('input[type="email"]');
      const button = form.querySelector('button[type="submit"]');
      let note = form.parentElement.querySelector(".subscribe-response");
      if (!note) {
        note = document.createElement("p");
        note.className = "subscribe-response";
        note.setAttribute("role", "status");
        form.insertAdjacentElement("afterend", note);
      }

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!input || !input.value) return;

        const data = new FormData();
        data.append("email", input.value);
        data.append("_subject", "Nueva suscripción al boletín · Abejas Sin Fronteras");
        data.append("_template", "table");

        button.disabled = true;
        fetch(NEWSLETTER_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then((response) =>
            response.json().then((json) => {
              if (!response.ok || String(json.success) !== "true") throw new Error();
            })
          )
          .then(() => {
            note.textContent = "¡Gracias por suscribirte! · Thanks for subscribing!";
            note.classList.remove("error");
            form.reset();
          })
          .catch(() => {
            note.textContent =
              "No pudimos registrar tu correo. Inténtalo de nuevo · We couldn't sign you up — please try again.";
            note.classList.add("error");
          })
          .finally(() => {
            button.disabled = false;
          });
      });
    });
  }

  /*=====================
      17 HTML Fatch From 
  =======================*/
  function htmlFatchFrom() {
    if ($("form").hasClass("message-form")) {
      // Get the form.
      const form = document.querySelector(".message-form");

      // Get the messages div.
      const formMessages = $(".response");

      // Set up an event listener for the contact form.
      form.addEventListener("submit", (event) => {
        // Stop the browser from submitting the form.
        event.preventDefault();

        // Serialize the form data.
        const formData = new FormData(form);

        // Submit the form using Fetch.
        fetch(form.action, {
          method: "POST",
          body: formData,
        })
          // FormSubmit answers with JSON: { success: "true" | "false", message }
          .then((response) =>
            response.json().then((data) => {
              if (!response.ok || String(data.success) !== "true") {
                throw new Error(data.message || "");
              }
              return data;
            })
          )
          .then(() => {
            // Make sure that the formMessages div has the 'success' class.
            formMessages.removeClass("error");
            formMessages.addClass("success");

            // Set the message text.
            formMessages.text(
              "¡Gracias! Tu mensaje fue enviado. · Thank you! Your message was sent."
            );
            form.reset();

            const timeline = anime.timeline();
            timeline
              .add({
                targets: formMessages[0],
                opacity: [0, 1],
                translateY: [50, 0],
                easing: "easeInOutQuad",
                duration: 400,
              })
              .add({
                targets: formMessages[0],
                opacity: [1, 0],
                translateY: [0, -50],
                easing: "easeInOutQuad",
                duration: 400,
                delay: 6000,
                complete: () => {
                  formMessages.empty();
                  formMessages.removeClass("success");
                },
              });
          })
          .catch((error) => {
            const timeline = anime.timeline();
            timeline.add({
              targets: formMessages[0],
              opacity: [0, 1],
              translateY: [50, 0],
              easing: "easeInOutQuad",
              duration: 400,
            });

            // Make sure that the formMessages div has the 'error' class.
            formMessages.removeClass("success");
            formMessages.addClass("error");

            formMessages.text(
              "No pudimos enviar tu mensaje. Escríbenos a contact@abejassinfronteras.org · We couldn't send your message — please email us directly."
            );
          });
      });
    }
  }

  /*=====================
      18 Preloder Option
  =======================*/
  function preloderOption() {
    $("body .preloder").prepend(`
        <div class="sotcox-spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>`);
    $(window).on("load", function () {
      $("body .preloder")
        .delay(300)
        .fadeOut(500, function () {
          $(this).remove();
        });
    });
  }
  
})(jQuery);
