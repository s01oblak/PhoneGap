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
	var image = document.getElementById('myImage');
	image.src = imageURI;
alert("1");
	var strWindowOrientation = dobiOrintacijoOkna();
	var strImageOrientation = dobiOrintacijoSlike(image);
	
	var intWindowRazmerje = 0;
	//alert(typeof intWindowRazmerje);
	if ($(window).width() > $(window).height()){
		intWindowRazmerje = $(window).height() / $(window).width();
	}else{
		intWindowRazmerje = $(window).width() / $(window).height();
	}
	
	var intImgRazmerje = 0;
	//alert(typeof intWindowRazmerje);
	if (image.width > image.height){
		intImgRazmerje = image.height / image.width;
	}else{
		intImgRazmerje = image.width / image.height;
	}
	alert("2");
	
	var intWidth = $(window).width();
	var intHeight = $(window).height();
		
	var intWindowLong = 0;
	var intWindowShort = 0;
	if (intWidth > intHeight){
		intWindowLong = intWidth;
		intWindowShort = intHeight;
	}else{
		intWindowLong = intHeight;
		intWindowShort = intWidth;
	}
	
	alert("3");
	
	
	
	var intNewImgWidth = 0; 
	var intNewImgHeight = 0;
	if (strImageOrientation == "landscape"){
		
		if (intImgRazmerje < intWindowRazmerje){
			alert("a");
			// zelo podolgovati - prilagaja se daljsa stranica
			intNewImgWidth = intWindowLong;
			intNewImgHeight = Math.floor(intNewImgWidth * intImgRazmerje);
		}else{
			alert("b");
			intNewImgHeight = intWindowShort;
			intNewImgWidth = Math.floor(intNewImgHeight * (image.width / image.height));
		}
		
		
		
	}else{
		if (intImgRazmerje < intWindowRazmerje){
			alert("c");
			// zelo podolgovati - prilagaja se daljsa stranica
			intNewImgHeight = intWindowLong;
			intNewImgWidth = Math.floor(intNewImgHeight * intImgRazmerje);
			
		}else{
			alert("d");
			intNewImgWidth = intWindowShort;
			intNewImgHeight = Math.floor(intNewImgWidth * (image.height / image.width));
		}
			
		
		
	}
	
	alert("4");
	
	
	
	

	$("#myImage").jqPuzzle({
		window_width : intNewImgWidth,
		window_height : intNewImgHeight
	}, {}, function() {
		alert("5");
		$("#container").css("opacity", "1");
	});

}












function onFail(message) {
	alert('Failed because: ' + message);
}


function dobiOrintacijoOkna(){
	//alert($(document).width());
	if ($(document).width() > $(document).height()) {
		return "landscape";
	} else {
		return "portrait";
	}
}

function dobiOrintacijoSlike(image){
	if (image.width > image.height) {
		return "landscape";
	} else {
		return "portrait";
	}
}
