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
		//alert("This device is in " + event.orientation + " mode!");
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

	// OBRNI
	$("#btnObrni").click(function() {

		//navigator.screenOrientation.set('landscape');
		//$(body).rotate(90);

	});

}

function onSuccess(imageURI) {
	$("#navigacija").hide();
	//var image = document.getElementById('myImage');
	//image.src = imageURI;
	$("#container").append('<img onload="slikaNalozena();" id="myImage" src="' + imageURI + '" />');
	
	

	
}

function slikaNalozena(){
	
	var strWindowOrientation = dobiOrintacijoOkna();
	var strImageOrientation = dobiOrintacijoSlike();

	var intWindowRazmerje = 0;
	//alert(typeof intWindowRazmerje);
	if ($(window).width() > $(window).height()) {
		intWindowRazmerje = $(window).height() / $(window).width();
	} else {
		intWindowRazmerje = $(window).width() / $(window).height();
	}
	
	var intHeightSlike = $("#myImage").height();
	var intWidthSlike = $("#myImage").width();
	
	var intImgRazmerje = 0;
	//alert(typeof intWindowRazmerje);
	//alert(image.Height + " " + image.height + " " + $("#myImage").height());
	if (intWidthSlike > intHeightSlike) {
		//alert("1");
		intImgRazmerje = intHeightSlike / intWidthSlike;
		//alert("1: " + intImgRazmerje + "   " + intHeightSlike + " x " + intWidthSlike);
	} else {
		//alert("2");
		intImgRazmerje = intWidthSlike / intHeightSlike;
		//alert("2: " + intImgRazmerje + "   " + intHeightSlike + " x " + image.width);
	}
	//alert("r: " + intImgRazmerje);
	var intWidth = $(window).width();
	var intHeight = $(window).height();

	var intWindowLong = 0;
	var intWindowShort = 0;
	if (intWidth > intHeight) {
		intWindowLong = intWidth;
		intWindowShort = intHeight;
	} else {
		intWindowLong = intHeight;
		intWindowShort = intWidth;
	}

	
	var intNewImgWidth = 0;
	var intNewImgHeight = 0;
	if (strImageOrientation == "landscape") {

		if (intImgRazmerje < intWindowRazmerje) {
			// zelo podolgovati - prilagaja se daljsa stranica
			intNewImgWidth = intWindowLong;
			intNewImgHeight = Math.floor(intNewImgWidth * intImgRazmerje);
		} else {
			intNewImgHeight = intWindowShort;
			intNewImgWidth = Math.floor(intNewImgHeight * (intWidthSlike / intHeightSlike));
		}

	} else {
		if (intImgRazmerje < intWindowRazmerje) {
			// zelo podolgovati - prilagaja se daljsa stranica
			intNewImgHeight = intWindowLong;
			intNewImgWidth = Math.floor(intNewImgHeight * intImgRazmerje);

		} else {
			intNewImgWidth = intWindowShort;
			intNewImgHeight = Math.floor(intNewImgWidth * (intHeightSlike / intWidthSlike));
		}

	}

	//alert(intNewImgWidth + " x " + intNewImgHeight);
	//alert(intWindowRazmerje + " x " + intImgRazmerje);

	$("#myImage").jqPuzzle({
		window_width : parseInt(intNewImgWidth),
		window_height : parseInt(intNewImgHeight)
	}, {}, function() {
		$("#container").css("opacity", "1");
	});
	
	
}


function onFail(message) {
	alert('Failed because: ' + message);
}

function dobiOrintacijoOkna() {
	//alert($(document).width());
	if ($(document).width() > $(document).height()) {
		return "landscape";
	} else {
		return "portrait";
	}
}

function dobiOrintacijoSlike() {
	if ($("#myImage").width() > $("#myImage").height()) {
		return "landscape";
	} else {
		return "portrait";
	}
}
