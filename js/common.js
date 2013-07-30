var strWindowOrientation = "";
var strImageOrientation = "";

// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);
$.mobile.orientationChangeEnabled = false;
// device APIs are available
//
function onDeviceReady() {
	document.addEventListener("orientationchange", onOrientationChange, false);
	$("#container").css("opacity","0");
	//var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	//db.transaction(queryDB, errorCB, successCB);

	//  $("#test").width($(document).width() - 15).height($(document).height() - 10);
	//  alert($(document).width() + "px  x  " + $(document).height() + "px");

	$("#test").click(function() {

		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    		destinationType: Camera.DestinationType.FILE_URI, 
    		correctOrientation: true });


	});
	
	
	
	if ($(document).width() > $(document).height()){
		strWindowOrientation = "landscape";
	}else{
		strWindowOrientation = "portrait";		
	}
	
	//alert(strWindowOrientation);
	
}

function onSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
	
	if ($(document).width() > $(document).height()){
		strWindowOrientation = "landscape";
	}else{
		strWindowOrientation = "portrait";		
	}
	
	if (image.width > image.height){
		strImageOrientation = "landscape";
	}else{
		strImageOrientation = "portrait";		
	}
	
	var intWidth = $(window).width();
	var intHeight = $(window).height();
	
	if (strWindowOrientation != strImageOrientation){
		intWidth = $(window).height();
		intHeight = $(window).width();
	}
		
	$("#myImage").jqPuzzle({
		window_width: intWidth,
		window_height: intHeight
	},{}, function(){ $("#container").css("opacity","1"); });
	
}


function onFail(message) {
	alert('Failed because: ' + message);
}

function onOrientationChange(){
	alert("d");
	
}
