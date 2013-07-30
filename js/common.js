// Wait for device API libraries to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    

    // Query the database
    //
    function queryDB(tx) {
        tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
    }

    // Query the success callback
    //
    function querySuccess(tx, results) {
        var len = results.rows.length;
        var strIzpis = "";
        strIzpis = "DEMO table: " + len + " rows found.\n";
        for (var i=0; i<len; i++){
            strIzpis = strIzpis + "Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data + "\n";
        }
        alert(strIzpis);
    }

    // Transaction error callback
    //
    function errorCB(err) {
        console.log("Error processing SQL: "+err.code);
    }

    // Transaction success callback
    //
    function successCB() {
        var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        db.transaction(queryDB, errorCB);
    }

    // device APIs are available
    //
    function onDeviceReady() {
        //var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
        //db.transaction(queryDB, errorCB, successCB);
        alert($(document).width() + "px  x  " + $(document).height() + "px");
    }
