$(function() {
  $('head').append('<link href="//fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css">');
  
  var button = '<a href="#" id="trelabels" class="board-header-btn" title="Show label names">'
              +'<span class="board-header-btn-icon icon-sm icon-label"></span></a>';
  
  function rebuild() {
    if ($('body').hasClass('body-board-view') && ! $('#trelabels').hasClass('board-header-btn'))
    {
      $('.board-header-btns.left').append(button);
      
      if ($('body').hasClass('trelabels'))
      {
        $('#trelabels').addClass('board-header-btn-enabled');
        $('#trelabels').attr('title', 'Hide label names');
      }
    }
  }
  
  var target = document.querySelector('body');
  
  var observer = new MutationObserver(function(mutations) {
    rebuild();
  });
  
  var config = {attributes: true};
  observer.observe(target, config);
  
  rebuild();
  
  $('body').on('click', '#trelabels', function() {
    if ($('body').hasClass('trelabels'))
      $('#trelabels').attr('title', 'Show label names');

    else
      $('#trelabels').attr('title', 'Hide label names');
    
    $('body').toggleClass('trelabels');
    $('#trelabels').toggleClass('board-header-btn-enabled');
    
    return true;
  });
});