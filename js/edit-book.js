function init() {
  $(document).on("pagebeforeshow","#editpage", function() {
    populateEditableView();
    imageInputListener();
    if(typeof editableBook === "undefined" || editableBook === null) {
      $.mobile.changePage("#pagetwo");
    }
  });
}

(function() {
  init();
}());
