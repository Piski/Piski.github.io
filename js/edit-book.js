function init() {
  $(document).on("pagebeforeshow","#editpage", function() {
    populateEditableView();
    imageInputListener();
  });
}

(function() {
  init();
}());
