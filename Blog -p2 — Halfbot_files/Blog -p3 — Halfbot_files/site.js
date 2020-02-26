Y.use( 'node', function( Y ) {
  Y.on('domready', function() {

    var banner = Y.one('#page-thumb img');
    if (banner) {
      Y.one(window).on('resize', function() {
        ImageLoader.load(banner);
      });
    }

    // mobile navigation
    var nav = Y.one('#mobile-navigation');
    if (nav) {
      Y.on('click', function(e) {
        nav.toggleClass('sqs-mobile-nav-open');
        Y.one('body').toggleClass('sqs-mobile-nav-open');
      }, '#mobile-navigation');
    }

    // position shopping cart
    if (Y.one('body.top-navigation-alignment-right')) {
      Y.later(500, this, function() {
        var shoppingCart = Y.one('.absolute-cart-box'),
            topNavHeight = Y.one('#navigation-top').height();
        if (shoppingCart && topNavHeight) {
          shoppingCart.setStyle('top', topNavHeight + 'px');
        }
      });
    }

    // ensure body is at least as long as the sidebar
    function setPageHeight() {
      if (Y.one('body').get('winWidth') <= 768) {
        Y.one('#content-wrapper').setStyle('minHeight', null);
      } else {
        var sidebarHeights = [];
        if (Y.one('#sidebar-one-wrapper')) {
          sidebarHeights.push(parseInt(Y.one('#sidebar-one-wrapper').getComputedStyle('height')));
        }
        if (Y.one('#sidebar-two-wrapper')) {
          sidebarHeights.push(parseInt(Y.one('#sidebar-two-wrapper').getComputedStyle('height')));
        }
        if (sidebarHeights.length) {
          Y.one('#content-wrapper').setStyle('minHeight', Math.max(sidebarHeights[0], sidebarHeights[1]));
        }
      }

    }
    setPageHeight();

    // set page height on resize as well
    Y.one('window').on('resize', function() {
      setPageHeight();
    });

    // make taps work like clicks
    var move;
    Y.all('.subnav a').each(function(a) {
      a.on('touchstart', function() {
        move = false;
      });
      a.on('touchmove', function() {
        move = true;
      });
      a.on('touchend', function() {
        if (move === false) {
          window.location = a.getAttribute('href');
        }
      });
    });

  });
});