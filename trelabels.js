$(function()
{
  var button = '<a href="#" id="trelabels" class="header-btn"><span class="header-btn-icon icon-lg icon-label light"></span></a>';
  $('head').append('<link href="//fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">');

  function showLabels()
  {
    $('body:not(.trelabels)').addClass('trelabels');
    $('#trelabels:not(.active)').addClass('active').attr('title', 'Hide label names');
    if (typeof localStorage !== 'undefined') localStorage.setItem('trelabels', "1");
  }

  function hideLabels()
  {
    $('body.trelabels').removeClass('trelabels');
    $('#trelabels.active').removeClass('active').attr('title', 'Show label names');
    if (typeof localStorage !== 'undefined') localStorage.setItem('trelabels', "0");
  }

  function rebuild()
  {
    if ($('#trelabels').length !== 0) return;

    $('.header-search').after(button);

    var trelabels = $('body').hasClass('trelabels');
    if (typeof localStorage !== 'undefined') trelabels = localStorage.getItem('trelabels');
    if (trelabels === "1") trelabels = true;

    if (trelabels === true)
      showLabels();
    else
      hideLabels();
  }

  var target = document.querySelector('body');
  var observer = new MutationObserver(function(mutations) {rebuild();});
  var config = {attributes: true};
  observer.observe(target, config);
  rebuild();

  $('body').on('click', '#trelabels', function()
  {
    if ($('#trelabels').hasClass('active'))
      hideLabels();
    else
      showLabels();

    return true;
  });
});
