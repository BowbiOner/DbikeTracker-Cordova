$(document).ready(function(){
    var output = $('#output');

  //  $.ajax({
    //     url: 'http://dbiketrackerv2.herokuapp.com/',
    //     dataType: 'jsonp',
    //     jsonp: 'jsoncallback',
    //     timeout: 5000,
    //     success: function(data, status){
    //         $.each(data, function(i,item){
    //             var station = '<h1>'+item.NAME+'</h1>'
    //             + '<p>'+item.LAT+'<br>'
    //             + item.LNG+'</p>';
    //             output.append(station);
    //         });
    //     },
    //     error: function(){
             output.text('There was an error loading the data.');
    //     }
    // });
});
