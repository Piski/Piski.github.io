function init() {
  $(document).on("pagebeforeshow","#pageone", function() {
    //$(".pagetwo").removeClass("ui-state-persist");
    //$(".pageone").addClass("ui-state-persist");
  });
  setHeader();
  setSwipe();
  setInputListener();
  setSaveListener();
  $(document).bind("mobileinit", function(){
    $.mobile.pushStateEnabled = false;
    $.mobile.defaultPageTransition = 'none'; 
  });
}

(function() {
  init();
}());
