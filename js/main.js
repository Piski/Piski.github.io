function init() {
  setSwipe();
  setInputListener();
  $("#suggestion-list").on("click li", function() {
    alert(this)
  })
}

(function() {
  init();
}());
