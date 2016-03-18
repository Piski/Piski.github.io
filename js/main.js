function init() {
  setSwipe();
  setInputListener();
  $("#suggestion-list").on("click", ".save-book", function() {
    console.log(this)
  })
}

(function() {
  init();
}());
