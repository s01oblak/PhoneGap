// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
	$("#container").css("opacity","0");
	//var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	//db.transaction(queryDB, errorCB, successCB);

	//  $("#test").width($(document).width() - 15).height($(document).height() - 10);
	//  alert($(document).width() + "px  x  " + $(document).height() + "px");

	$("#test").click(function() {

		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    		destinationType: Camera.DestinationType.FILE_URI });


	});
	
	
	
	
	
	
}

function onSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;

	$("#myImage").jqPuzzle({
		window_width: $(window).height(),
		window_height: $(window).width()
	},{}, function(){ $("#container").css("opacity","1"); });
	
}


function onFail(message) {
	alert('Failed because: ' + message);
}
