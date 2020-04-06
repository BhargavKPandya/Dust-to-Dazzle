$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 76) {
            $(".navbar").addClass("fixed-top");
        } else {
            $(".navbar").removeClass("fixed-top");
        }
    });
    var pathname = window.location.pathname;
    var modifiedPath = pathname.substr(pathname.lastIndexOf('/') + 1);
    var urlLoadPath = pathname.substr(pathname.lastIndexOf('/'));
    console.log("test--" + pathname.substr(pathname.lastIndexOf('/') + 1));
        $('.navbar-nav > li > a[href="/'+modifiedPath+'"]').addClass('active');

    document.getElementById("year").innerHTML = new Date().getFullYear();

    // Call counter and set autostart to false
	$( '.stats' ).counter( {
		autoStart: false 
	});

	// Call horizon
	$( '.stats' ).horizon({
	 recurring:	true, 

	// Start counter once element is in view
	inView:	function(){ 
			$( '.stats' ).each( function(){
			var counter = $( this ).data( 'counter' );
				counter.startCounter();
			});
		},

	// Clear counter once element is out of view
	outOfView:	function(){ 
			$( '.stats' ).each( function(){
			var counter = $( this ).data( 'counter' );
				counter.clearCounter();
			});
		}
	});
});