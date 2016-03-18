function init() {
  setSwipe();
  setInputListener();
  $("#suggestion-list li").on("click", ".save-book", function() {
    console.log($(this).index())
  })
}

(function() {
  init();
}());
