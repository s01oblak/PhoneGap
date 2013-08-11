var strWindowOrientation = "";
var strImageOrientation = "";
var odmik = {
		poVisini: 0.9,
		poSirini: 0.9,
		crop: 0.7
	}
var cropanaSlika = {
	x: 0,
	y: 0,
	x2: 0,
	y2: 0,
	w: 0,
	h: 0
}

var slika = {
	width: 0,
	height: 0
}

var zaslon = {
	width: 0,
	height: 0
}

var intMalaStran = 0;
var intVelikaStran = 0;

var strSlikaURL = "";
// Wait for device API libraries to load
//

var intWidthZaSestavljanko = 0;
var intHeightZaSestavljanko = 0;

var intLeftZaSestavljanko = 0;
var intTopZaSestavljanko = 0;

document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
	
	document.addEventListener("menubutton", onMenuButtonPress, false);
	
	$("#btnOKCrop").click(function(){
		izbral2();
	});
	
	
	
	//$("#container").css("opacity", "0");

	$(window).on("orientationchange", function(event) {
		//$("#stage").width($(document).width()).height($(document).height());
	});
	
	$("#navigacija").bPopup();

	// FOTOAPARAT
	$("#btnOpenCamera").click(function() {
		$("#container").html('');
		navigator.camera.getPicture(onSuccess, onFail, {
			quality : 100,
			correctOrientation: true,
			destinationType : Camera.DestinationType.FILE_URI,
			targetWidth: 800,
  			targetHeight: 800
		});

	});

	// GALERIJA
	$("#btnOpenGalery").click(function() {
		$("#container").html('');
		navigator.camera.getPicture(onSuccess, onFail, {
			quality : 100,
			correctOrientation: true,
			destinationType : navigator.camera.DestinationType.FILE_URI,
			sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
			targetWidth: 800,
  			targetHeight: 800
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
	strSlikaURL = imageURI;
	$("#container").append('<img onload="slikaNalozena();" id="myImage" src="' + strSlikaURL + '" />');
	
	//$("#container").append('<img width="200" height="200" onload="cropSliko();" id="myImage" src="' + imageURI + '" />');
	
	//$("#stage").width($(document).width()).height($(document).height());

	
}

function cropSliko(){
	
	$("#myImage").Jcrop();
	
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
	
	
	var intPaddingContainerja = Math.floor(intNewImgWidth * (1 - odmik.poSirini) / 4);
	$("#container").css("padding", intPaddingContainerja + "px").css("top", Math.floor(intPaddingContainerja));
	$("#container").css("left", Math.floor(  ($(document).width() / 2) - ($("#container").outerWidth() / 2) ));
	
	intNewImgWidth = intNewImgWidth - odmik.poSirini - intPaddingContainerja * 4;
	intNewImgHeight = intNewImgHeight - odmik.poVisini - intPaddingContainerja * 4;
	
	
	
	if (intNewImgWidth < intNewImgHeight){
		intMalaStran = intNewImgWidth;
		intVelikaStran = intNewImgHeight;
	}else{
		intMalaStran = intNewImgHeight;
		intVelikaStran = intNewImgWidth;
	}
	
	$("#myImage").width(intNewImgWidth).height(intNewImgHeight).Jcrop({
			allowSelect: false,
			onSelect:	 function(){ $("#btnOKCrop").show(); },
			onChange:	 spremeniCrop,
			bgColor:     'black',
            bgOpacity:   .4,
            setSelect:   [ 	Math.floor( (intNewImgWidth/2) - ((intMalaStran/2) * odmik.crop )), Math.floor( (intNewImgHeight/2) - ((intMalaStran/2) * odmik.crop)),
            				Math.floor( (intNewImgWidth/2) + ((intMalaStran/2) * odmik.crop)), Math.floor( (intNewImgHeight/2) + ((intMalaStran/2) * odmik.crop)) ],
            aspectRatio: 1
		
	}, function(){
		$("#btnOKCrop").show();
	});
	
	
	slika.width = intNewImgWidth;
	slika.height = intNewImgHeight;
	
	
	
	
}

function spremeniCrop(c){
	
	cropanaSlika = c;
	$("#btnOKCrop").hide();
	//alert(cropanaSlika.w);
	//c.x, c.y, c.x2, c.y2, c.w, c.h
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

function izbral(){
	
}

function izbral2(){
		//alert(cropanaSlika.w);
		var intRazmerje = cropanaSlika.w / intMalaStran;
		var intRazmerje2 = intMalaStran / cropanaSlika.w;
		
		//var intRazmerjeHeight = cropanaSlika.h / intMalaStran;
		
		//alert(intRazmerje);
		
		intWidthZaSestavljanko = Math.floor(slika.width * intRazmerje2);
		intHeightZaSestavljanko = Math.floor(slika.height * intRazmerje2);
		
		intLeftZaSestavljanko = Math.floor(cropanaSlika.x * intRazmerje2);
		intTopZaSestavljanko = Math.floor(cropanaSlika.y * intRazmerje2);

		var $cropanDiv = $('<div/>')
					//.addClass('jqp-wrapper')
					.css({	
						width: intMalaStran,
						height: intMalaStran,
						backgroundImage: 'url("' + $("#myImage").attr("src") + '")',
						backgroundSize: intWidthZaSestavljanko + 'px ' + intHeightZaSestavljanko + 'px',
						backgroundPosition: '-' + intLeftZaSestavljanko + 'px -' + intTopZaSestavljanko + 'px',
						backgroundRepeat: 'no-repeat'
						//border: '1px solid black'
					});
		
		$("#container").html($cropanDiv).append('<div id="btnSestavljanka_zacni" style="cursor: pointer; position: absolute; top: 10px; right: 10px; z-index: 999999; background-color: green;">Začni</div>');
	$("#btnSestavljanka_zacni").click(function(){
		zacni_puzle();
	});
	
	
}

function zacni_puzle(){
	//alert("a dela?");
	/*$("#myImage").jqPuzzle({
		/*window_width : parseInt(intNewImgWidth),
		window_height : parseInt(intNewImgHeight)
		window_width : 100,
		window_height : 100
	}, {}, function() {
		
		
		
		//$("#container").css("opacity", "1");
		
		//window.navigator.screenOrientation.set('landscape');
		////alert("orientation");
		
	});*/
	$("#container").html('<img onload="slikaNalozena2_zacniSestavjanko();" id="myImage2" src="' + strSlikaURL + '" />');
	//alert($("#myImage").width());
	
}

function slikaNalozena2_zacniSestavjanko(){
	$("#myImage2").jqPuzzle({
		vidni_width : Math.floor(intMalaStran * odmik.poSirini),
		vidni_height : Math.floor(intMalaStran * odmik.poVisini),
		width_celotne_slike_po_cropanju: Math.floor(intWidthZaSestavljanko * odmik.poSirini),
		height_celotne_slike_po_cropanju: Math.floor(intHeightZaSestavljanko * odmik.poVisini),
		odmik_levo: intLeftZaSestavljanko,
		odmik_zgoraj: intTopZaSestavljanko
	});
	
}
