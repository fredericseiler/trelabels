var button = `
<a href="#" class="header-btn trelabels-btn js-open-trelabels-menu" title="Change labels style">
  <span class="header-btn-icon icon-lg icon-label light"></span>
</a>
`;

var font = '<link href="//fonts.googleapis.com/css?family=Roboto:700" rel="stylesheet" type="text/css">';

var popOverWrapper = `
<div class="pop-over-wrapper">
  <div class="pop-over-header js-pop-over-header">
    <span class="pop-over-header-title">Trelabels</span>
    <a href="#" class="pop-over-header-close-btn icon-sm icon-close js-close-trelabels-popover"></a>
  </div>
  <div class="pop-over-content js-pop-over-content u-fancy-scrollbar js-tab-parent">
    <div class="js-detach-trelabels-menu">
      <ul class="pop-over-list">
        <li>
          <a class="js-change-trelabels-style" data-style="default" href="#">
            Default
            <span class="sub-name">
              The default Trello style without label names.
            </span>
          </a>
        </li>
        <li>
          <a class="js-change-trelabels-style" data-style="tag" href="#">
            Tags
            <span class="sub-name">
              Similar to the Trello style but with label names.
            </span>
          </a>
        </li>
        <li>
          <a class="js-change-trelabels-style" data-style="line" href="#">
            Lines
            <span class="sub-name">
              Full width lines with label names.
            </span>
          </a>
        </li>
        <li>
          <a class="js-change-trelabels-style" data-style="sticker" href="#">
            Stickers
            <span class="sub-name">
              'Small circles without label names.
            </span>
          </a>
        </li>
        <li>
          <a class="js-change-trelabels-style" data-style="tab" href="#">
            Tabs
            <span class="sub-name">
              Very small tabs without label names.
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>
`;

var style = 'default';

function addTrelabelsButton() {
  if ($('.trelabels-btn').length) {
    return;
  }

  $('#header').find('input').parent().prepend(button);

  setStyle(getStyle());
}

function keepTrelabelsButton() {
  new MutationObserver(addTrelabelsButton)
    .observe(document.querySelector('#header'), {
      childList: true
    });
}

function init() {
  if ($('#header').length === 0) {
    setTimeout(init, 1000);

    return;
  }

  $('head').append(font);

  addTrelabelsButton();

  keepTrelabelsButton();

  listenForClick();

  listenForResize();
}

function listenForClick() {
  $(document).on('click', function (e) {
    // Click on Trelabels button (icon)
    if ($(e.target).parent().hasClass('trelabels-btn')) {
      return togglePopOver();
    }

    // Click on popover close button
    if ($(e.target).hasClass('js-close-trelabels-popover')) {
      return hidePopOver();
    }

    // Click on popover link
    if ($(e.target).closest('.js-detach-trelabels-menu').length) {
      setStyle($(e.target).closest('.js-change-trelabels-style').data('style'));

      return hidePopOver();
    }

    // Click on popover - do nothing
    if ($(e.target).closest('.pop-over-trelabels.is-shown').length) {
      return true;
    }

    // Click anywhere else
    return hidePopOver();
  });
}

function listenForResize() {
  $(window).on('resize', movePopOver);
}

function hidePopOver() {
  if ($('.pop-over-trelabels.is-shown').length === 0) {
    return;
  }

  $('.pop-over-wrapper').remove();
  $('.pop-over:eq(0)').removeClass('pop-over-trelabels is-shown');
}

function movePopOver() {
  if ($('.pop-over-trelabels.is-shown').length === 0) {
    return;
  }

  var buttonHeight = $('.trelabels-btn').height();
  var buttonTop = $('.trelabels-btn').offset().top;
  var buttonLeft = $('.trelabels-btn').offset().left;

  $('.pop-over-trelabels.is-shown').css({
    top: buttonTop + buttonHeight + 6,
    left: buttonLeft,
    width: 300
  });
}

function showPopOver() {
  if ($('.pop-over-trelabels.is-shown').length) {
    return;
  }

  $('.pop-over:eq(0)').addClass('pop-over-trelabels');

  $('.pop-over-trelabels').append(popOverWrapper);

  $('.pop-over-trelabels .js-change-trelabels-style')
    .removeClass('active');

  $('.pop-over-trelabels .js-change-trelabels-style[data-style="' + style + '"]')
    .addClass('active');

  $('.pop-over-trelabels').addClass('is-shown');

  movePopOver();
}

function togglePopOver() {
  if ($('.pop-over-trelabels.is-shown').length) {
    return hidePopOver();
  }

  return showPopOver();
}

function getStyle() {
  if (typeof localStorage === 'undefined') {
    return style;
  }

  if (localStorage.getItem('trelabels.style') === null) {
    return style;
  }

  return localStorage.getItem('trelabels.style');
}

function setStyle(newStyle) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('trelabels.style', newStyle);
  }

  $('body').removeClass('trelabels-line trelabels-sticker trelabels-tab trelabels-tag');

  if (newStyle === 'default') {
    $('.trelabels-btn').removeClass('active');
  } else {
    $('.trelabels-btn').addClass('active');

    $('body').addClass('trelabels-' + newStyle);
  }

  style = newStyle;
}

$(function () {
  init();
});
