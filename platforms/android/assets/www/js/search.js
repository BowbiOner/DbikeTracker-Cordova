function test() {
    var url = "http://dbiketrackerv2.herokuapp.com/view-locations-sql.php";

    $.getJSON(url, function(result) {
        //retrieves specific fields from json array being returned by script hosted on heroku and adds the to specific variables
        names = result.map(function(a) {
            return a.NAME;
        });
        number = result.map(function(a) {
            return a.NUMBER;
        });
        var points = [];
        //adds each variable defined above to an array, points, this will be the access point for all of our data
        $(names).each(function(index, val) {
            points.push([names[index]])
        });
        console.log(points);
    })
}
test();
