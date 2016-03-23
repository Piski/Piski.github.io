function init() {
  $(document).on("pagebeforeshow","#pageone", function() {
    //$(".pagetwo").removeClass("ui-state-persist");
    $(".pageone").addClass("ui-state-persist");
  });
  setHeader();
  setSwipe();
  setInputListener();
  setSaveListener();

}

(function() {
  init();
}());
