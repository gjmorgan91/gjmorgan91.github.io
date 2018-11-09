/*RELLAX PARALLAXING INITIALIZATION*/

//initializes the parallax effect used by objects given the class 'rellax'
var rellax = new Rellax('.rellax');


/*GOOGLE MAPS INITIALIZATION*/

//map initialization that I am toying with on the about page
var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8
	});
}


/*NAVBAR TOGGLE FOR MOBILE*/

function toggleNav() {
	console.log(document.getElementById('mobileNav').classList);
	document.getElementById('mobileNav').classList.toggle("show");
	console.log(document.getElementById('mobileNav').classList);
}

/*FADE IN EFFECT ON THE HOME SCREEN LINKS*/

//Sets the duration for the animation on the nav links for the cascading effect
let navLinks = document.querySelectorAll('.header nav a');
console.log(navLinks);
for (let i=0; i<navLinks.length; i++) {
	navLinks[i].setAttribute('style','animation-duration: '+ (i*0.15 + 2) +'s');
}

/*SMOOTH SCROLL FUNCTION COURTESY OF W3SCHOOLS*/

$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "" && this.id != 'back') {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 666, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});