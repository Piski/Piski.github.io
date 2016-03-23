function init() {
  $(document).on("pagebeforeshow","#pageone", function() {
    $(".pagetwo").removeClass("ui-btn-active ui-state-persist");
    $(".pageone").addClass("ui-btn-active ui-state-persist");
  });
  setHeader();
  setSwipe();
  setInputListener();
  setSaveListener();

}

(function() {
  init();
}());
