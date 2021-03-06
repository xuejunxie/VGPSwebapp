// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
var track = null;

// var form = new FormData();
// var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "http://xuejun.asuscomm.com:8080",
//   "method": "POST",
//   "headers": {
//     "cache-control": "no-cache",
//     "Postman-Token": "a2eadc25-061d-47b1-b1bc-09ba2e838ef9"
//   },
//   "processData": false,
//   "contentType": false,
//   "mimeType": "multipart/form-data",
//   "data": form
// }

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");

    var data = new FormData();
    data.append("test", cameraOutput.src);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "https://xuejun.asuscomm.com:8080");
    xhr.setRequestHeader("cache-control", "no-cache");
    // xhr.setRequestHeader("Access-Control-Allow-Origin:", "<origin> | *");

    xhr.send(data);    

//     form.append("test", cameraOutput.src);
//     $.ajax(settings).done(function (response) {
//   console.log(response);
// });
    // track.stop();
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
