$(document).ready(function() {
    var output = $('#output');

     $.ajax({

        url: 'http://dbiketrackerv2.herokuapp.com/view-locations-sql.php',
         dataType: 'jsonp',
         crossOrigin: true,
         jsonp: 'jsoncallback',
 success: function(data){
            // $.each(data, function(i,item){
            //     var station = '<h1>'+item.NAME+'</h1>'
            //     + '<p>'+item.LAT+'<br>'
            //     + item.LNG+'</p>';
            //     output.append(station);
            // });
              $('#output').text('We got you.');
        },
        error: function(){
    $('#output').text('There was an error loading the data.');
      alert('There was an error loading the data');

        }
    });
});
