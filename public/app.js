//mql('all and (max-width: 480px)', reLayout);
//mql('all and (max-width: 768px)', reLayout);
//mql('all and (min-width: 980px)', reLayout);
//mql('all and (min-width: 1200px)', reLayout);

require(["dermis"], function (dermis) {
  dermis.route('/');
  dermis.route('/tweets');
  dermis.route('/about');
  dermis.route('/contact');
  dermis.init();
});