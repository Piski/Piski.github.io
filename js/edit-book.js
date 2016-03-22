function init() {
  $(document).on("pagebeforeshow","#editpage", function() {
    if(typeof editableBook === "undefined" || editableBook === null) {
      $.mobile.changePage("#pagetwo");
    } else {
      populateEditableView();
      imageInputListener();
    }
  });
}

(function() {
  init();
}());
