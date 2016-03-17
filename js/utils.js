var callPending = false;

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

var getBooks = function(name) {
  if(!callPending) {
    callPending = true;
    $.ajax({
      type: "GET",
      url: "https://www.googleapis.com/books/v1/volumes?q=" + name + "&callback=handleResponse",
      success: function(data) {
        callPending = false;
          return data;
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
          callPending = false;
          console.log("Status: " + textStatus); alert("Error: " + errorThrown);
          return undefined;
      }
    });
  } else {
    return null;
  }
}
