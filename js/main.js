function init() {
  setSwipe();
  setInputListener();
  $(".save-book").on("click", function() {
    alert(this)
  })
}

(function() {
  init();
}());
