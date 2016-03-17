var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

var getBooks = function(name, callback) {
  const query = "https://www.googleapis.com/books/v1/volumes?q=" + name;
  $.ajax({
    type: "GET",
    url: query,
    success: function(data) {
      callback(data);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("Status: " + textStatus); alert("Error: " + errorThrown);
        return undefined;
    }
  });
}

var parseResult = function(data) {
  var books = [];
  var book = {};
  data.items.forEach(item) {
    if(item.language === "en") {
      book.rating = item.averageRating;
      book.authors = [];
      item.authors.forEach(author) {
        book.authors.push(author);
      }
      book.published = item.publishedDate;
      if(item.imageLinks) {
          book.thumbnail = item.imageLinks.thumbnail;
      }
      books.push(book);
    }
  }
  return books;
}
