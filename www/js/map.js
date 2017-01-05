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
        //var myLng = position.coords.longitude;
        //var myLat = position.coords.latitude;
        var myLng = -6.260778899999991;
        var myLat = 53.35124159999999;
        var myLatLong = new google.maps.LatLng(myLat, myLng);

        //var liveUrl "http://dbiketrackerv2.herokuapp.com/php-scripts/live-data.php";
        var url = "http://dbiketrackerv2.herokuapp.com/view-locations-sql.php";

        $.getJSON(url, function(result) {

            lats = result.map(function(a) {
                return a.LAT;

            });

            longs = result.map(function(a) {
                return a.LNG;
            });

            names = result.map(function(a) {
                return a.NAME;
            });

            avail = result.map(function(a) {
                return a.AVAIL_BIKES;

            });

            availslts = result.map(function(a) {
                return a.AVAIL_SLOTS;

            });

            number = result.map(function(a) {
                return a.NUMBER;

            });

            var points = [];

            $(lats).each(function(index, val) {
                points.push([lats[index], longs[index], names[index], avail[index], availslts[index], number[index]]);
            })

            var mapOptions = {
                center: myLatLong,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map"), mapOptions);

            var myContentString = "<p>" + " This is your current location " + "<br />" + "Closest Station: Drive" + "</p>";

            var myMarker = new google.maps.Marker({
                icon: './img/current_location.png',
                position: myLatLong,
                map: map,
                myContentString: myContentString
            });
            var myInfoWindow = new google.maps.InfoWindow({});

            myMarker.addListener('click', function() {
                myInfoWindow.setContent(this.myContentString);
                myInfoWindow.open(map, this);
            });

            for (var i = 0; i < points.length; i++) {
                longitude = longs[i];
                latitude = lats[i];
                latLong = new google.maps.LatLng(points[i][0], points[i][1]);
                var contentString = "<p>" + points[i][2] + "<br />" + " Bikes Available:" + points[i][3] + "<br />" + " Slots Available:" + points[i][4] + "</p>";

                var marker = new google.maps.Marker({
                    position: latLong,
                    map: map,
                    contentString: contentString
                });

                var infowindow = new google.maps.InfoWindow({});

                marker.addListener('click', function() {
                    infowindow.setContent(this.contentString);
                    infowindow.open(map, this);
                });


            }
            // console.log("Station Lat: " + points[25][0], "Station Lng: " + points[25][1]);
            // console.log("My Lat: " + myLat + "My Lng: " + myLng);

            //creates latlng object from users current location (defined) at start of onSuccess function
            var mLocation = new google.maps.LatLng(myLat, myLng);

            var sLocations = [];

            for (var i = 0; i < points.length; i++) {
                //creates latlng objects from each lat/lng pair in the points array
                sLocation = new google.maps.LatLng(points[i][0], points[i][1]);
                //calculates striaght line distance from current loaction to all stations
                var distanceFromAllStations = google.maps.geometry.spherical.computeDistanceBetween(mLocation, sLocation);
                //adds number of each station and distnace from user to an array
                sLocations.push([points[i][5], distanceFromAllStations]);

            }
            //narorw down dataset based on hardcoded distance
            var nearMe = [];
            for (var i = 0; i < sLocations.length; i++) {
                if (sLocations[i][1] <= 750) {
                    nearMe.push(sLocations[i]);
                }
            }


            console.log(nearMe);

            var bounds = new google.maps.LatLngBounds;
            var geocoder = new google.maps.Geocoder;

            var service = new google.maps.DistanceMatrixService;
            service.getDistanceMatrix({
                origins: [mLocation],
                destinations: sLocations,
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
            }, function(response, status) {
                if (status !== 'OK') {
                    alert('Error was: ' + status);
                } else {
                    var originList = response.originAddresses;
                    var destinationList = response.destinationAddresses;
                    var outputDiv = document.getElementById('output');
                    outputDiv.innerHTML = '';
                    //deleteMarkers(markersArray);

                    for (var i = 0; i < originList.length; i++) {
                        var results = response.rows[i].elements;
                        geocoder.geocode({
                            'address': originList[i]
                        });
                        for (var j = 0; j < results.length; j++) {
                            geocoder.geocode({
                                'address': destinationList[j]
                            });
                            outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
                                ': ' + results[j].distance.text + ' in ' +
                                results[j].duration.text + '<br>';
                        }
                    }
                }
            });
        });
    },

    onError: function(error) {
        alert("the code is " + error.code + ". \n" + "message: " + error.message);
    },
};
app.initialize();
