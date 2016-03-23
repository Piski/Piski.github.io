function init() {
  $(document).on("pagebeforeshow","#pageone", function() {
    $(".pagetwo").removeClass("color-active");
    $(".pageone").addClass("color-active");
  });
  setHeader();
  setSwipe();
  setInputListener();
  setSaveListener();
}

(function() {
  init();
}());
