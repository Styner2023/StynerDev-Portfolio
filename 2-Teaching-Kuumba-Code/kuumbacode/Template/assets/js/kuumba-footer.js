/*
  Collapsible footer sections on mobile.

  The footer stacks four link lists on top of each other, which makes for a very
  long scroll on a phone. Below 768px each titled section collapses to just its
  heading; tapping a heading opens it.

  Progressive enhancement: with JavaScript off, or on tablet and desktop, the
  footer renders exactly as before. The collapsing is applied by this script,
  never by CSS alone, so nothing is hidden from a visitor who can't open it.
*/
(function () {
  'use strict';

  var MOBILE = window.matchMedia('(max-width: 767px)');
  var widgets = [];

  function panelOf(title) {
    // Everything after the heading inside the same widget is the panel.
    var nodes = [];
    var el = title.nextElementSibling;
    while (el) { nodes.push(el); el = el.nextElementSibling; }
    return nodes;
  }

  function setOpen(w, open) {
    w.title.setAttribute('aria-expanded', open ? 'true' : 'false');
    w.widget.classList.toggle('is_open', open);
    w.panel.forEach(function (n) { n.hidden = !open; });
  }

  function enable() {
    widgets.forEach(function (w) {
      w.title.setAttribute('role', 'button');
      w.title.setAttribute('tabindex', '0');
      w.widget.classList.add('kc_collapsible');
      setOpen(w, false);
    });
  }

  function disable() {
    widgets.forEach(function (w) {
      w.title.removeAttribute('role');
      w.title.removeAttribute('tabindex');
      w.title.removeAttribute('aria-expanded');
      w.widget.classList.remove('kc_collapsible', 'is_open');
      w.panel.forEach(function (n) { n.hidden = false; });
    });
  }

  function sync() { MOBILE.matches ? enable() : disable(); }

  document.addEventListener('DOMContentLoaded', function () {
    var titles = document.querySelectorAll('.site_footer .footer_widget_title');
    if (!titles.length) return;

    Array.prototype.forEach.call(titles, function (title) {
      var widget = title.closest('.footer_widget');
      if (!widget) return;
      var panel = panelOf(title);
      if (!panel.length) return;

      var w = { title: title, widget: widget, panel: panel };
      widgets.push(w);

      function toggle() {
        if (!MOBILE.matches) return;
        setOpen(w, w.title.getAttribute('aria-expanded') !== 'true');
      }

      title.addEventListener('click', toggle);
      title.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          toggle();
        }
      });
    });

    sync();
    if (MOBILE.addEventListener) MOBILE.addEventListener('change', sync);
    else if (MOBILE.addListener) MOBILE.addListener(sync); // older Safari
  });
})();
