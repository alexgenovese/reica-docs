(function () {
  const fontName = 'Zalando Sans SemiExpanded';

  function fail() {
    document.body.classList.add('reica-logo-font-failed');
  }

  function loaded() {
    document.body.classList.add('reica-logo-font-loaded');
  }

  if (document.fonts && document.fonts.load) {
    document.fonts
      .load(`1rem "${fontName}"`)
      .then((fonts) => {
        if (fonts.length > 0) {
          loaded();
        } else {
          fail();
        }
      })
      .catch(fail);

    // fallback if font loading is blocked / deferred
    setTimeout(() => {
      if (!document.body.classList.contains('reica-logo-font-loaded')) {
        fail();
      }
    }, 3000);
  } else {
    fail();
  }
})();