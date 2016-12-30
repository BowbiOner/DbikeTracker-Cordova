var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // app.receivedEvent('deviceready');
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
    },

    onSuccess: function(position) {
        var url = "http://dbiketrackerv2.herokuapp.com/view-locations-sql.php";
        $.getJSON(url, function(result) {
            console.log(result.LAT);
            console.log(result);

            lats = result.map(function(a) {
                return a.LAT;
            });

            longs = result.map(function(a) {
                return a.LNG;
            });

            for (var i = 0; i < longs.length; i++) {
                longitude = longs[i];
                console.log("Longitude: " + longs[20]);
                latitude = lats[i];
                console.log("Latitude: " + lats[20]);
                latLong = new google.maps.LatLng(latitude, longitude);

                var marker = new google.maps.Marker({
                    position: latLong,
                    map: map,
                });
            }
            centrLatLong = new google.maps.LatLng("53.349562", "-6.278198");
            var mapOptions = {
                center: centrLatLong,
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        });
    },
    /*
	var line = new google.maps.Polyline({
    path: [new google.maps.LatLng(37.4519, -122.1519), new google.maps.LatLng(53.280121, -6.152963)],
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 10,
    geodesic: true,
    map: map
});*/

    onError: function(error) {
        alert("the code is " + error.code + ". \n" + "message: " + error.message);
    },
};
app.initialize();
