document.addEventListener("deviceready", onDeviceReady, false);
//creates a listener that waits for the deviceready event and then fires onDevice ready function

function onDeviceReady() {
	startCompass();
	//runs the startCompass function
}

function startCompass() {

	var options = {
		frequency : 50 //sets the compass heading to be updated every 50 milliseconds
	};

	navigator.compass.watchHeading(onSuccess, onError, options);
	//gets the compass heading from device and passes heading to onSuccess function
}

function onSuccess(heading) {//device s magnetic heading is passed to heading variable

	$("#needle").rotate(-heading.magneticHeading);
	//jquery function that gets the #needle id and rotates it minus the current heading
}

function onError(compassError) {//if there is an error the error will be passed to onError in the compassError variable
	alert('Compass error: ' + compassError.code);
	//displays an alert with the error code
}