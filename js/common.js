// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
	//var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	//db.transaction(queryDB, errorCB, successCB);

	//  $("#test").width($(document).width() - 15).height($(document).height() - 10);
	//  alert($(document).width() + "px  x  " + $(document).height() + "px");

	$("#test").click(function() {

		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    		destinationType: Camera.DestinationType.FILE_URI });


	});
	
	
	$("#ttt").jqPuzzle();
	
}

function onSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
}


function onFail(message) {
	alert('Failed because: ' + message);
}
