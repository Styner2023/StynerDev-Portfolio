// js Document

// Created on   : 06/10/2026.
// Theme Name   : Grafty - Creative Agency & Portfolio HTML5 Template
// Version      : 1.0.
// Developed by : heloshape18@gmail.com


(function ($) {
  "use strict";

  //-------------- Click event to scroll to top
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 200) {
      $('.scroll-top').fadeIn();
    } else {
      $('.scroll-top').fadeOut();
    }
  });

  $('.scroll-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 });
    return false;
  });

  // ------------------------ Service Accordion
  if ($(".service-accordion").length !== 0) {
    $('.accordion-item').on('click', function () {
      if (!$(this).hasClass('active')) {
        $('.accordion-item').removeClass('active');
        $(this).addClass('active');
      }
    });
  }

  // ----------------------------- Counter Function
  const timer = $('.counter');
  if (timer.length !== 0) {
    timer.counterUp({
      delay: 10,
      time: 1200,
    });
  }

  // ------------------------ Navigation Scroll
  $(window).on('scroll', function () {
    const sticky = $('.sticky-menu');
    const scroll = $(window).scrollTop();
    if (scroll >= 180) {
      sticky.addClass('fixed');
    } else {
      sticky.removeClass('fixed');
    }
  });

  // -------------------- Remove Placeholder When Focus Or Click
  $("input,textarea").each(function () {
    $(this).data('holder', $(this).attr('placeholder'));
    $(this).on('focusin', function () {
      $(this).attr('placeholder', '');
    });
    $(this).on('focusout', function () {
      $(this).attr('placeholder', $(this).data('holder'));
    });
  });

  // ------------------------ Banner Slider One
  if ($(".hero-slider-one").length !== 0) {
    $('.hero-slider-one').slick({
      dots: false,
      arrows: true,
      prevArrow: $('.prev_a'),
      nextArrow: $('.next_a'),
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      fade: true,
      autoplay: true,
      autoplaySpeed: 9000,
      focusOnSelect: true,
      pauseOnHover: false,
    }).slickAnimation();
  }

  // ------------------------ Banner Slider Two
  if ($(".hero-slider-two").length !== 0) {
    $('.hero-slider-two').slick({
      dots: false,
      arrows: true,
      prevArrow: $('.prev_a'),
      nextArrow: $('.next_a'),
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      fade: true,
      autoplay: false,
      autoplaySpeed: 5000,
      focusOnSelect: true,
      pauseOnHover: false,
    }).slickAnimation();
  }

  // ------------------------ Partner Slider One
  if ($(".partner-slider-one").length !== 0) {
    $('.partner-slider-one').slick({
      dots: false,
      arrows: false,
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 8,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 10000,
      cssEase: 'linear',
      responsive: [
        { breakpoint: 1500, settings: { slidesToShow: 7 } },
        { breakpoint: 1400, settings: { slidesToShow: 6 } },
        { breakpoint: 767, settings: { slidesToShow: 4 } }
      ]
    });
  }

  // ------------------------ Partner Slider Two
  if ($(".partner-slider-two").length !== 0) {
    $('.partner-slider-two').slick({
      dots: false,
      arrows: false,
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 10000,
      cssEase: 'linear',
      responsive: [
        { breakpoint: 1400, settings: { slidesToShow: 4 } },
        { breakpoint: 992, settings: { slidesToShow: 3 } },
        { breakpoint: 576, settings: { slidesToShow: 2 } }
      ]
    });
  }

  // ------------------------ Partner Slider Three
  if ($(".partner-slider-three").length !== 0) {
    $('.partner-slider-three').slick({
      dots: false,
      arrows: false,
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 10000,
      cssEase: 'linear',
      responsive: [
        { breakpoint: 1400, settings: { slidesToShow: 4 } },
        { breakpoint: 767, settings: { slidesToShow: 4 } },
        { breakpoint: 576, settings: { slidesToShow: 2 } }
      ]
    });
  }

  // ------------------------ Feedback Slider One
  if ($(".feedback-slider-one").length !== 0) {
    $('.feedback-slider-one').slick({
      dots: false,
      arrows: true,
      prevArrow: $('.prev_b'),
      nextArrow: $('.next_b'),
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
    });
  }

  // ------------------------ Feedback Slider Two
  if ($(".feedback-slider-two").length !== 0) {
    $('.feedback-slider-two').slick({
      dots: true,
      arrows: false,
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      autoplay: true,
      autoplaySpeed: 4000,
    });
  }

  // ------------------------ Feedback Slider Three
  if ($(".feedback-slider-three").length !== 0) {
    $('.feedback-slider-three').slick({
      dots: false,
      arrows: true,
      prevArrow: $('.prev_e'),
      nextArrow: $('.next_e'),
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [{ breakpoint: 992, settings: { slidesToShow: 1 } }]
    });
  }

  // ------------------------ Feedback Slider Four
  if ($(".feedback-slider-four").length !== 0) {
    $('.feedback-slider-four').slick({
      dots: true,
      arrows: false,
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      fade: true,
    });
  }

  // ------------------------ Feedback Slider Five
  if ($(".feedback-slider-five").length !== 0) {
    $('.feedback-slider-five').slick({
      dots: false,
      arrows: true,
      prevArrow: $('.prev_f'),
      nextArrow: $('.next_f'),
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
    });
  }

  // ------------------------ Feedback Slider Six
  if ($(".feedback-slider-six").length !== 0) {
    $('.feedback-slider-six').slick({
      dots: false,
      arrows: false,
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 2 } },
        { breakpoint: 768, settings: { slidesToShow: 1 } }
      ]
    });
  }

  // ------------------------ Feedback Slider Seven
  if ($(".feedback-slider-seven").length !== 0) {
    $('.feedback-slider-seven').slick({
      dots: false,
      arrows: true,
      prevArrow: $('.prev_g'),
      nextArrow: $('.next_g'),
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }

  // ------------------------ Blog Slider One
  if ($(".blog-slider-one").length !== 0) {
    $('.blog-slider-one').slick({
      dots: false,
      arrows: false,
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [
        { breakpoint: 992, settings: { slidesToShow: 2 } },
        { breakpoint: 576, settings: { slidesToShow: 1 } }
      ]
    });
  }

  // ------------------------ Project Slider One
  if ($(".project-slider-one").length !== 0) {
    $('.project-slider-one').slick({
      dots: false,
      arrows: true,
      prevArrow: $('.prev_c'),
      nextArrow: $('.next_c'),
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }


  // ------------------------ Project Slider Two
  if ($(".project-two-slider-text").length !== 0) {
    $('.project-two-slider-text').slick({
      dots: false,
      arrows: false,
      asNavFor: '.project-slider-two',
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1
    });
  }

  if ($(".project-slider-two").length !== 0) {
    $('.project-slider-two').slick({
      dots: false,
      arrows: true,
      asNavFor: '.project-two-slider-text',
      prevArrow: $('.prev_e'),
      nextArrow: $('.next_e'),
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    });
  }

  // ------------------------ Team Slider One
  if ($(".team-slider-one").length !== 0) {
    $('.team-slider-one').slick({
      dots: false,
      arrows: true,
      prevArrow: $('.prev_d'),
      nextArrow: $('.next_d'),
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 4,
      slidesToScroll: 1,
      centerMode: true,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }

  // ------------------------ Photography Slider
  if ($(".photography-slider").length !== 0) {
    $('.photography-slider').slick({
      dots: false,
      arrows: false,
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 5,
      slidesToScroll: 1,
      centerMode: true,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3
          }
        }
      ]
    });
  }

  // ------------------------ Insta Text Slider
  if ($(".insta-text-slider").length !== 0) {
    $('.insta-text-slider').slick({
      dots: false,
      arrows: false,
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      variableWidth: true,
      autoplaySpeed: 0,
      speed: 5000,
      cssEase: 'linear',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3
          }
        },
      ]
    });
  }

  // ------------------------ Contact Form
  if ($("#contact-form").length !== 0) {
    $('#contact-form').validator();
    $('#contact-form').on('submit', function (e) {
      if (!e.isDefaultPrevented()) {
        const url = "inc/contact.php";
        $.ajax({
          type: "POST",
          url,
          data: $(this).serialize(),
          success: function (data) {
            const messageAlert = 'alert-' + data.type;
            const messageText = data.message;
            const alertBox =
              '<div class="alert ' +
              messageAlert +
              ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
              messageText +
              '</div>';
            if (messageAlert !== '' && messageText !== '') {
              $('#contact-form').find('.messages').html(alertBox);
              $('#contact-form')[0].reset();
            }
          }
        });
        return false;
      }
    });
  }

  // ------------------------------- Scroll Animation
  const sall = $("[data-sal]");
  if (sall.length !== 0) {
    sal({ threshold: 0.01 });
  }

  $(window).on('load', function () {
    $('#ctn-preloader').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350).css({ 'overflow': 'visible' });

    // ------------------------------------- Fancybox
    const fancy = $("[data-fancybox]");
    if (fancy.length !== 0) {
      Fancybox.bind("[data-fancybox]", {});
    }

    // ----------------------------- Isotope Gallery
    if ($("#isotop-gallery-wrapper").length !== 0) {
      const $grid = $('#isotop-gallery-wrapper').isotope({
        itemSelector: '.isotop-item',
        percentPosition: true,
        masonry: { columnWidth: '.grid-sizer' }
      });

      $('.isotop-menu-wrapper').on('click', 'li', function () {
        const filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
      });

      $('.isotop-menu-wrapper').each(function (i, buttonGroup) {
        const $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'li', function () {
          $buttonGroup.find('.is-checked').removeClass('is-checked');
          $(this).addClass('is-checked');
        });
      });
    }
  });

})(jQuery);
