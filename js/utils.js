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
    var query = "https://www.googleapis.com/books/v1/volumes?q=" + name + "&callback=handleResponse";
    console.log(query);
    $.ajax({
      type: "GET",
      url: query,
      success: function(handleResponse) {
        callPending = false;
        console.log(handleResponse)
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
