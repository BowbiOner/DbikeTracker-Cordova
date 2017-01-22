    var url = "https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=ec447add626cfb0869dd4747a7e50e21d39d1850";

    $.getJSON(url, function(result) {
        //retrieves specific fields from json array being returned by script hosted on heroku and adds the to specific variables
        names = result.map(function(a) {
            return a.name;
        });
        number = result.map(function(a) {
            return a.number;
        });
        var points = [];
        // //adds each variable defined above to an array, points, this will be the access point for all of our data
        // $(names).each(function(index, val) {
        //     points.push([names[index]])
        // });

        $.each(names, function(index, val) {

            points.push('<option>' + names[index] + " " + number[index] +'</option>');

        });
        console.log(points);
        $('#anotherSelect').append(points.join(''));

    })
