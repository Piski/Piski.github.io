function init() {
  Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream",
      target: document.querySelector('#pageone')    // Or '#yourElement' (optional)
    },
    decoder : {
      readers : ["upc_reader"]
    }
  }, function(err) {
      if (err) {
          console.log(err);
          return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
  });

  Quagga.onDetected(function(result) {
      console.log(result);
    });
}

$(function() {
    init();
});
