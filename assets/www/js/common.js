var strWindowOrientation = "";
var strImageOrientation = "";
var odmik = {
		poVisini: 0,
		poSirini: 0
	}
	
// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
	
	document.addEventListener("menubutton", onMenuButtonPress, false);

	
	$("#container").css("opacity", "0");

	$(window).on("orientationchange", function(event) {
		//$("#stage").width($(document).width()).height($(document).height());
	});
	
	$("#navigacija").bPopup();

	// FOTOAPARAT
	$("#btnOpenCamera").click(function() {

		navigator.camera.getPicture(onSuccess, onFail, {
			quality : 100,
			destinationType : Camera.DestinationType.FILE_URI
		});

	});

	// GALERIJA
	$("#btnOpenGalery").click(function() {

		navigator.camera.getPicture(onSuccess, onFail, {
			quality : 100,
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


function onMenuButtonPress(){
	
	$("#navigacija").bPopup();
	
}

function onSuccess(imageURI) {
	$("#navigacija").bPopup().close();
	//var image = document.getElementById('myImage');
	//image.src = imageURI;
	$("#container").append('<img onload="slikaNalozena();" id="myImage" src="' + imageURI + '" />');
	
	//$("#stage").width($(document).width()).height($(document).height());

	
}

function slikaNalozena(){
	
	var strWindowOrientation = dobiOrintacijoOkna();
	var strImageOrientation = dobiOrintacijoSlike();
	
	//odmik.poSirini = Math.floor($(window).width() / 20);
	//odmik.poVisini = Math.floor($(window).height() / 20);
	
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
	
	if (intWidthSlike > intHeightSlike) {
		intImgRazmerje = intHeightSlike / intWidthSlike;
	} else {
		intImgRazmerje = intWidthSlike / intHeightSlike;
	}
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
		
		
		
		//$("#container").css("top", Math.floor(intWindowShort - intNewImgHeight) / 2).css("left", Math.floor(intWindowLong - intNewImgWidth) / 2);
		
		
		

	} else {
		if (intImgRazmerje < intWindowRazmerje) {
			// zelo podolgovati - prilagaja se daljsa stranica
			intNewImgHeight = intWindowLong;
			intNewImgWidth = Math.floor(intNewImgHeight * intImgRazmerje);

		} else {
			intNewImgWidth = intWindowShort;
			intNewImgHeight = Math.floor(intNewImgWidth * (intHeightSlike / intWidthSlike));
		}
		//$("#container").css("top", Math.floor(intWindowLong - intNewImgHeight) / 2).css("left", Math.floor(intWindowShort - intNewImgWidth) / 2);
	}
	
	intNewImgWidth = intNewImgWidth - odmik.poVisini;
	intNewImgHeight = intNewImgHeight - odmik.poSirini;
	
	$("#myImage").jqPuzzle({
		window_width : parseInt(intNewImgWidth),
		window_height : parseInt(intNewImgHeight)
	}, {}, function() {
		
		
		
		$("#container").css("opacity", "1");
		
		//window.navigator.screenOrientation.set('landscape');
		//alert("orientation");
		
	});
	
	
}


function onFail(message) {
	alert('Failed because: ' + message);
}

function dobiOrintacijoOkna() {
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
