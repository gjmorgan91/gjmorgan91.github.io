var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

/**INITIALIZES THE MAP, ADD MARKERS, ADD INFOWINDOWS **/
function initMap() { //the search function for getting an airport
	map = new google.maps.Map(document.getElementById('map'), {
	//center: {lat: 32.729, lng: -117.195},
	center: {lat: 33.9015, lng: -117.677},
	zoom: 7,
	mapTypeId: 'terrain',
	streetViewControl: false,
	fullscreenControl: false,
	mapTypeControl: false, //changing from sat to terrain
	zoomControl: false, //icons to zoom in or out
	scrollwheel: false, //zooming in/out with mousewheel
	panControl: false,
	gestureHandling: 'none'
	});

/** ADD MARKERS FOR UCSD AND PCC TO THE MAP **/
	var UCSD = new google.maps.LatLng( {lat: 32.879718, lng: -117.236985} );
	var PCC = new google.maps.LatLng( {lat: 34.144043, lng: -118.118793} );
	UCSDmarker = new google.maps.Marker({ //creates a marker for UCSD
	        position: UCSD,
	        map: map,
	      });
	PCCmarker = new google.maps.Marker({ //creates a marker for PCC
	        position: PCC,
	        map: map,
	      });
	UCSDmarker.setMap(map); //sets the markers on the map
	PCCmarker.setMap(map);
	UCSDinfowindow = new google.maps.InfoWindow({
            width: 270,
            maxWidth: 270
          });
	PCCinfowindow = new google.maps.InfoWindow({
            width: 270,
            maxWidth: 270
          });
	UCSDinfowindow.setContent('<h6 style="font-family: inherit; font-size: 0.75rem; line-height: 110%; margin: .5rem 0 .4rem 0; font-weight: 400; padding: 0px;">University of California, San Diego</h6>');
	PCCinfowindow.setContent('<h6 style="font-family: inherit; font-size: 0.75rem; line-height: 110%; margin: .5rem 0 .4rem 0; font-weight: 400; padding: 0px;">Pasadena City College</h6>');
	UCSDinfowindow.open(map,UCSDmarker);
	PCCinfowindow.open(map,PCCmarker);
};