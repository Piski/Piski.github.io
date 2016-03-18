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

var parseResult = function(data, ratingExists) {
  var books = [];
  data.items.forEach(function(volume) {
    var book = {};
    var item = volume.volumeInfo;
    if(item.language === "en" && !ratingExists && item.imageLinks) {
      book.rating = item.averageRating;
      book.authors = [];
      if(item.authors) {
        item.authors.forEach(function(author) {
          book.authors.push(author);
        });
      }
      book.published = item.publishedDate;
      book.thumbnail = item.imageLinks.thumbnail
        ? item.imageLinks.thumbnail : item.imageLinks.smallThumbnail;
      book.title = item.title;
      books.push(book);
    }
  });
  return books;
}

var populateListView = function(data) {
  $.mobile.loading( 'hide' );
  data = parseResult(data);
  var $list = $("#suggestion-list");
  clearListView();
  data.forEach(function(book) {
    var book = '<li data-icon="plus">' +
      '<a href="#">' +
        '<img src="' + book.thumbnail + '">' +
        '<h2>' + book.title + '</h2>' +
        '<p>' + book.authors[0] + '</p>' +
      '</a>' +
    '</li>';
    $list.append(book);
    $list.listview("refresh");
  })
}

var clearListView = function() {
  $("#suggestion-list").html("");
  $.mobile.loading( 'hide' );
}
