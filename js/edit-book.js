function init() {
  $(document).on("pagebeforeshow","#editpage", function() {
    if(typeof editableBook === "undefined"
      || editableBook === null
      || $.isEmptyObject(editableBook)) {
      $.mobile.changePage("#pagetwo");
    } else {
      $(".pageone").removeClass("color-active");
      $(".pagetwo").removeClass("color-active");
      populateEditableView();
      imageInputListener();
      setUpdateListeners();
      $("#edit-page").show();
    }
  });
}

(function() {
  init();
}());
