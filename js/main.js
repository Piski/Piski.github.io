function init() {
  setSwipe();
  setInputListener();
  $("#suggestion-list").on("click li .save-book", function() {
    alert(this)
  })
}

(function() {
  init();
}());
