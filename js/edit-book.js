function init() {
  $(document).on("pagebeforeshow","#editpage", function() {
    populateEditableView();
  });
}

(function() {
  init();
}());
