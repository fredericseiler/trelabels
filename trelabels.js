$(function() {
  var font = '<link href="//fonts.googleapis.com/css?family=Roboto:700" rel="stylesheet" type="text/css">';

  var button = '<a href="#" class="header-btn js-open-trelabels-menu" title="Change labels style">' +
                  '<span class="header-btn-icon icon-lg icon-label light"></span>' +
                '</a>';

  var menu = '<div><ul class="pop-over-list">' +
                '<li><a class="js-trelabels-change" data-style="default" href="#">' +
                  'Default' +
                  '<span class="sub-name">' +
                    'The default Trello style without label names.' +
                  '</span>' +
                '</a></li>' +
                '<li><a class="js-trelabels-change" data-style="tag" href="#">' +
                  'Tags' +
                  '<span class="sub-name">' +
                    'Similar to the Trello style but with label names.' +
                  '</span>' +
                '</a></li>' +
                '<li><a class="js-trelabels-change" data-style="line" href="#">' +
                  'Lines' +
                  '<span class="sub-name">' +
                    'Full width lines with label names.' +
                  '</span>' +
                '</a></li>' +
                '<li><a class="js-trelabels-change" data-style="sticker" href="#">' +
                  'Stickers' +
                  '<span class="sub-name">' +
                    'Small circles without label names.' +
                  '</span>' +
                '</a></li>' +
                '<li><a class="js-trelabels-change" data-style="tab" href="#">' +
                  'Tabs' +
                  '<span class="sub-name">' +
                    'Very small tabs without label names.' +
                  '</span>' +
                '</a></li>' +
              '</ul></div>';

  var currentStyle = 'default';

  $('head').append(font);

  function changeStyle(newStyle) {
    currentStyle = newStyle;

    rememberStyle(newStyle);

    $('body').removeClass(function(index, css) {
      return (css.match (/(^|\s)trelabels-\S+/g) || []).join(' ');
    });

    if (newStyle === 'default') {
      $('.js-open-trelabels-menu').removeClass('active');

      return true;
    }

    $('body').addClass('trelabels-' + newStyle);

    $('.js-open-trelabels-menu').addClass('active');
  }

  function rememberStyle(newStyle) {
    if (typeof localStorage === 'undefined')
      return true;

    if (newStyle === 'default') {
      localStorage.removeItem('trelabels-style');

      return true;
    }

    localStorage.setItem('trelabels-style', newStyle);
  }

  function getRememberedStyle() {
    if (typeof localStorage === 'undefined')
      return 'default';

    previousStyle = localStorage.getItem('trelabels-style');

    if ( ! previousStyle)
      previousStyle = 'default';

    return previousStyle;
  }

  function rebuild() {
    if ($('.js-open-trelabels-menu').length !== 0) return;

    $('.header-search').before(button);

    previousStyle = getRememberedStyle();

    changeStyle(previousStyle);
  }

  function replacePopOver() {
    var buttonOffset = $('.js-open-trelabels-menu').offset();
    var buttonHeight = $('.js-open-trelabels-menu').height();

    $('.pop-over').css({
      top: buttonOffset.top + buttonHeight + 6,
      left: buttonOffset.left,
      width: 300
    });
  }

  function showPopOver() {
    replacePopOver();

    $('.pop-over-header-title').text('Labels style');

    $('.pop-over-content').html(menu);

    // $('.js-trelabels-change').removeClass('active');

    $('.js-trelabels-change[data-style="' + currentStyle + '"]').addClass('active');

    $('.pop-over').addClass('pop-over-trelabels is-shown');
  }

  function hidePopOver() {
    $('.pop-over-content').html('');

    $('.pop-over').removeClass('pop-over-trelabels is-shown');
  }

  var observer = new MutationObserver(function(mutations) {rebuild();});
  var target = document.querySelector('body');
  var config = {attributes: true};
  observer.observe(target, config);

  rebuild();

  $(window).on('resize', function() {
    if ($('.pop-over-trelabels.is-shown').length)
      replacePopOver();
  });

  $('body').on('click', '.js-open-trelabels-menu', function(e) {
    e.stopPropagation();

    showPopOver();

    return true;
  });

  $('body').on('click', function() {
    $('.pop-over-trelabels.is-shown').removeClass('pop-over-trelabels is-shown');
  });

  $('body').on('click', '.pop-over-trelabels.is-shown', function(e) {
      e.stopPropagation();
  });

  $('body').on('click', '.js-trelabels-change', function() {
    newStyle = $(this).data('style');

    changeStyle(newStyle);

    hidePopOver();
  });
});
