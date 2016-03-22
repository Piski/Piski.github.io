function init() {
  $(document).on("pagebeforeshow","#editpage", function() {
    console.log(editableBook)
    if(typeof editableBook === "undefined"
      || editableBook === null
      || $.isEmptyObject(editableBook)) {
      $.mobile.changePage("#pagetwo");
    } else {
      populateEditableView();
      imageInputListener();
      setUpdateListeners();
    }
  });
}

(function() {
  init();
}());
