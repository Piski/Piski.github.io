function init() {
  $('#search-field').on("input", function() {
    var input = this.value;
    if(input.length > 0 ) {
      $.mobile.loading( 'show' );
      delay(function() {
        getBooks(input, populateListView);
      }, 1000 );
    } else {
      clearListView();
    }
  });

  $( document ).on( "swipeleft", page, function() {
    $.mobile.changePage("#pagetwo", { transition: "slide" });
  });
  $( document ).on( "swiperight", page, function() {
    $.mobile.changePage("#pagetwo", { transition: "slide", direction: "reverse" });
  });
}

(function() {
  init();
}());
