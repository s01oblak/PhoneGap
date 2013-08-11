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

strVir = "";

var strAcc = "0";

var slika = {
	width: 0,
	height: 0
}

var zaslon = {
	width: 0,
	height: 0,
	vecja: 0,
	manjsa: 0
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
	
	zaslon.width = $(window).width();
	zaslon.height = $(window).height();
	
	if (zaslon.width > zaslon.height){
		zaslon.vecja = zaslon.width;
		zaslon.manjsa = zaslon.height;
	}else{
		zaslon.manjsa = zaslon.width;
		zaslon.vecja = zaslon.height;
	}
	
	
	postaviGledeNaOrientacijo(dobiOrintacijoOkna());
	
	
	$("#btnOK").click(function(){
		if (strAcc == "1"){
			zacni_puzle();
			strAcc = "2";
			$(this).hide();
			$("#btnBack").hide();
			
		}
		
		if (strAcc == "0"){
			izbral2();
			strAcc = "1";
		}
		//alert(strAcc);
		//postaviGledeNaOrientacijo(dobiOrintacijoOkna());
		
	});
	
	$("#btnBack").click(function(){
		if (strAcc == "0"){
			strVir();
			//strAcc = "1";
		}
		
		if (strAcc == "1"){
			$("#container").html('<img onload="slikaNalozena();" id="myImage" src="' + strSlikaURL + '" />');
			strAcc = "0";
		}
		
		if (strAcc == "2"){
			$("#container").html('<img onload="slikaNalozena();" id="myImage" src="' + strSlikaURL + '" />');
			strAcc = "1";
		}
		
		
		
		
		
		
		
	});
	
	
	
	//$("#container").css("opacity", "0");

	$(window).on("orientationchange", function(event) {
		spremembaOrientacije(event);
	});
	
	$("#navigacija").bPopup();

	// FOTOAPARAT
	$("#btnOpenCamera").click(function() {
		strVir = zacniKamera;
		zacniKamera();
	});

	// GALERIJA
	$("#btnOpenGalery").click(function() {
		strVir = odpriGalerija;
		odpriGalerija();
	});

	// OBRNI
	$("#btnObrni").click(function() {

		//navigator.screenOrientation.set('landscape');
		//$(body).rotate(90);

	});

}

function zacniKamera(){
	navigator.camera.getPicture(onSuccess, onFail, {
		quality : 100,
		correctOrientation: true,
		destinationType : Camera.DestinationType.FILE_URI,
		targetWidth: 800,
		targetHeight: 800
	});	
}

function odpriGalerija(){
	navigator.camera.getPicture(onSuccess, onFail, {
		quality : 100,
		correctOrientation: true,
		destinationType : navigator.camera.DestinationType.FILE_URI,
		sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
		targetWidth: 800,
		targetHeight: 800
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
	$("#container").html('');
	$("#container").html('<img onload="slikaNalozena();" id="myImage" src="' + strSlikaURL + '" />');
	
	//$("#container").append('<img width="200" height="200" onload="cropSliko();" id="myImage" src="' + imageURI + '" />');
	
	//$("#stage").width($(document).width()).height($(document).height());

	
}

function cropSliko(){
	
	$("#myImage").Jcrop();
	
}


function slikaNalozena(){
	//
		
	$("#div_btnOK").show();
	$("#div_btnBack").show();
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
	
	
	var intPaddingContainerja = Math.floor(intNewImgWidth * (1 - odmik.poSirini) / 4);
	$("#container").css("padding", intPaddingContainerja + "px");
	
	//nacintrerajContainer();
	postaviGledeNaOrientacijo(dobiOrintacijoOkna());
	
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
			onSelect:	 function(){ $("#div_btnOK").show(); },
			onChange:	 spremeniCrop,
			bgColor:     'black',
            bgOpacity:   .4,
            setSelect:   [ 	Math.floor( (intNewImgWidth/2) - ((intMalaStran/2) * odmik.crop )), Math.floor( (intNewImgHeight/2) - ((intMalaStran/2) * odmik.crop)),
            				Math.floor( (intNewImgWidth/2) + ((intMalaStran/2) * odmik.crop)), Math.floor( (intNewImgHeight/2) + ((intMalaStran/2) * odmik.crop)) ],
            aspectRatio: 1
		
	}, function(){
		$("#div_btnOK").show();
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
	//alert($(document).width() + " x " + $(document).height());
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
	
		var intRazmerje = cropanaSlika.w / intMalaStran;
		var intRazmerje2 = intMalaStran / cropanaSlika.w;
		
		intWidthZaSestavljanko = Math.floor(slika.width * intRazmerje2);
		intHeightZaSestavljanko = Math.floor(slika.height * intRazmerje2);
		
		intLeftZaSestavljanko = Math.floor(cropanaSlika.x * intRazmerje2);
		intTopZaSestavljanko = Math.floor(cropanaSlika.y * intRazmerje2);

		var $cropanDiv = $('<div/>')
					.css({	
						width: intMalaStran,
						height: intMalaStran,
						backgroundImage: 'url("' + $("#myImage").attr("src") + '")',
						backgroundSize: intWidthZaSestavljanko + 'px ' + intHeightZaSestavljanko + 'px',
						backgroundPosition: '-' + intLeftZaSestavljanko + 'px -' + intTopZaSestavljanko + 'px',
						backgroundRepeat: 'no-repeat'
					});
		
		$("#container").html($cropanDiv);	
		postaviGledeNaOrientacijo(dobiOrintacijoOkna());
	
	
}

function zacni_puzle(){
	$("#container").html('<img onload="slikaNalozena2_zacniSestavjanko();" id="myImage2" src="' + strSlikaURL + '" />');
	
}

function slikaNalozena2_zacniSestavjanko(){
	$("#myImage2").jqPuzzle({
		vidni_width : Math.floor(intMalaStran),
		vidni_height : Math.floor(intMalaStran),
		width_celotne_slike_po_cropanju: Math.floor(intWidthZaSestavljanko),
		height_celotne_slike_po_cropanju: Math.floor(intHeightZaSestavljanko),
		odmik_levo: intLeftZaSestavljanko,
		odmik_zgoraj: intTopZaSestavljanko
	});
	
}

function spremembaOrientacije(event){
	postaviGledeNaOrientacijo(event.orientation);
}

function postaviGledeNaOrientacijo(strOrientacija){
	//zaslon.width = $(document).width();
	//zaslon.height = $(document).height();
	//nacintrerajContainer();
	
	if (strOrientacija == "landscape"){
		$("#div_btnOK").css("top", "10px").css("left","10px");
		$("#div_btnBack").css("top", "10px").css("right","10px");
		
		$("#container").css("left", Math.floor((zaslon.vecja - $("#container").outerWidth()) / 2) + "px");
		$("#container").css("top", Math.floor((zaslon.manjsa - $("#container").outerHeight()) / 2) + "px");
		
	}else{
		$("#div_btnOK").css("top", zaslon.vecja - $("#div_btnOK").outerHeight() - 10 + "px").css("left","10px");
		$("#div_btnBack").css("top", zaslon.vecja - $("#div_btnBack").outerHeight() - 10 + "px").css("right","10px");
		
		$("#container").css("left", Math.floor((zaslon.manjsa - $("#container").outerWidth()) / 2) + "px");
		$("#container").css("top", Math.floor((zaslon.vecja - $("#container").outerHeight()) / 2) + "px");
	}
}








