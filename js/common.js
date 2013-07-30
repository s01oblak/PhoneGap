var strWindowOrientation = "";
var strImageOrientation = "";


// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
	$("#container").css("opacity", "0");
	
	


	$(window).on("orientationchange", function(event) {
		alert("This device is in " + event.orientation + " mode!");
	});

	// FOTOAPARAT
	$("#btnOpenCamera").click(function() {

		navigator.camera.getPicture(onSuccess, onFail, {
			quality : 50,
			destinationType : Camera.DestinationType.FILE_URI
		});

	});

	// GALERIJA
	$("#btnOpenGalery").click(function() {

		navigator.camera.getPicture(onSuccess, onFail, {
			quality : 50,
			destinationType : navigator.camera.DestinationType.FILE_URI,
			sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY
		});

	});

}



function onSuccess(imageURI) {
	$("#navigacija").hide();
	var image = document.getElementById('myImage');
	image.src = imageURI;

	if ($(document).width() > $(document).height()) {
		strWindowOrientation = "landscape";
	} else {
		strWindowOrientation = "portrait";
	}

	if (image.width > image.height) {
		strImageOrientation = "landscape";
	} else {
		strImageOrientation = "portrait";
	}

	var intWidth = $(window).width();
	var intHeight = $(window).height();

	if (strWindowOrientation != strImageOrientation) {
		intWidth = $(window).height();
		intHeight = $(window).width();
	}

	$("#myImage").jqPuzzle({
		window_width : intWidth,
		window_height : intHeight
	}, {}, function() {
		$("#container").css("opacity", "1");
	});

}

function onFail(message) {
	alert('Failed because: ' + message);
}
