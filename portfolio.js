var smoothScrollProgress = true;

/* Smooth scrolling
   Changes links that link to other parts of this page to scroll
   smoothly to those links rather than jump to them directly, which
   can be a little disorienting.
   
   sil, http://www.kryogenix.org/
   
   v1.0 2003-11-11
   v1.1 2005-06-16 wrap it up in an object
*/

var ss = {
  fixAllLinks: function() {
    // Get a list of all links in the page
    var allLinks = document.getElementsByTagName('a');
    // Walk through the list
    for (var i=0;i<allLinks.length;i++) {
      var lnk = allLinks[i];
      if ((lnk.href && lnk.href.indexOf('#') != -1) && 
          ( (lnk.pathname == location.pathname) ||
	    ('/'+lnk.pathname == location.pathname) ) && 
          (lnk.search == location.search)) {
        // If the link is internal to the page (begins in #)
        // then attach the smoothScroll function as an onclick
        // event handler
        ss.addEvent(lnk,'click',ss.smoothScroll);
      }
    }
  },

  smoothScroll: function(e) {
    smoothScrollProgress = false;
    console.log('set progress to false');
    // This is an event handler; get the clicked on element,
    // in a cross-browser fashion
    if (window.event) {
      target = window.event.srcElement;
    } else if (e) {
      target = e.target;
    } else return;

    // Make sure that the target is an element, not a text node
    // within an element
    if (target.nodeName.toLowerCase() != 'a') {
      target = target.parentNode;
    }
  
    // Paranoia; check this is an A tag
    if (target.nodeName.toLowerCase() != 'a') return;
  
    // Find the <a name> tag corresponding to this href
    // First strip off the hash (first character)
    anchor = target.hash.substr(1);
    // Now loop all A tags until we find one with that name
    var allLinks = document.getElementsByTagName('a');
    var destinationLink = null;
    for (var i=0;i<allLinks.length;i++) {
      var lnk = allLinks[i];
      if (lnk.name && (lnk.name == anchor)) {
        destinationLink = lnk;
        break;
      }
    }
    if (!destinationLink) destinationLink = document.getElementById(anchor);

    // If we didn't find a destination, give up and let the browser do
    // its thing
    if (!destinationLink) return true;
  
    // Find the destination's position
    var destx = destinationLink.offsetLeft; 
    var desty = destinationLink.offsetTop;
    var thisNode = destinationLink;
    while (thisNode.offsetParent && 
          (thisNode.offsetParent != document.body)) {
      thisNode = thisNode.offsetParent;
      destx += thisNode.offsetLeft;
      desty += thisNode.offsetTop;
    }
  
    // Stop any current scrolling
    clearInterval(ss.INTERVAL);
  
    cypos = ss.getCurrentYPos();
  
    ss_stepsize = parseInt((desty-cypos)/ss.STEPS);
    ss.INTERVAL = setInterval('ss.scrollWindow('+ss_stepsize+','+desty+',"'+anchor+'")',10);
  
    // And stop the actual click happening
    if (window.event) {
      window.event.cancelBubble = true;
      window.event.returnValue = false;
    }
    if (e && e.preventDefault && e.stopPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }
  },

  scrollWindow: function(scramount,dest,anchor) {
    wascypos = ss.getCurrentYPos();
    isAbove = (wascypos < dest);
    window.scrollTo(0,wascypos + scramount);
    iscypos = ss.getCurrentYPos();
    isAboveNow = (iscypos < dest);
    if ((isAbove != isAboveNow) || (wascypos == iscypos)) {
      // if we've just scrolled past the destination, or
      // we haven't moved from the last scroll (i.e., we're at the
      // bottom of the page) then scroll exactly to the link
      window.scrollTo(0,dest);
      // cancel the repeating timer
      clearInterval(ss.INTERVAL);
      // and jump to the link directly so the URL's right
      location.hash = anchor;
    }
  },

  getCurrentYPos: function() {
    if (document.body && document.body.scrollTop)
      return document.body.scrollTop;
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    if (window.pageYOffset)
      return window.pageYOffset;
    return 0;
  },

  addEvent: function(elm, evType, fn, useCapture) {
    // addEvent and removeEvent
    // cross-browser event handling for IE5+,  NS6 and Mozilla
    // By Scott Andrew
    if (elm.addEventListener){
      elm.addEventListener(evType, fn, useCapture);
      return true;
    } else if (elm.attachEvent){
      var r = elm.attachEvent("on"+evType, fn);
      return r;
    } else {
      alert("Handler could not be removed");
    }
  } 
}

ss.STEPS = 25;

ss.addEvent(window,"load",ss.fixAllLinks);



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

  $(".mail").hover(function(){
        $(".fa-envelope").css("color", "rgb(199,22,16)");
        }, function(){
        $(".fa-envelope").css("color", "rgb(80,80,80)");
    });

  $(".fa-github").hover(function(){
        $(this).css("color", "#4078c0");
        }, function(){
        $(this).css("color", "rgb(80,80,80)");
    });

  $(".fa-linkedin-square").hover(function(){
        $(this).css("color", "rgb(0,119,181)");
        }, function(){
        $(this).css("color", "rgb(80,80,80)");
    });

  $(".fa-facebook-square").hover(function(){
        $(this).css("color", "rgb(59,89,152)");
        }, function(){
        $(this).css("color", "rgb(80,80,80)");
    });

  $(".fa-instagram").hover(function(){
        $(this).css("color", "rgb(138,58,185)");
        }, function(){
        $(this).css("color", "rgb(80,80,80)");
    });

  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('.links').outerHeight();

  $(window).scroll(function(event){
      didScroll = true;
  });

  setInterval(function() {
      if (didScroll) {
          hasScrolled();
          didScroll = false;
      }
  }, 250);

  function hasScrolled() {
      var st = $(this).scrollTop();
      console.log('scroll happening1');
      
      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - st) <= delta) {
        lastScrollTop = st;
        smoothScrollProgress = true;
        return;
      }
      
      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (smoothScrollProgress) {
        if (st <= 700) {
          $('.links').addClass('top');
        }
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('.links').removeClass('nav-down').addClass('nav-up');
            if (st > 700) {
              $('.links').removeClass('top');
            }
            console.log('scroll happening down');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('.links').removeClass('nav-up').addClass('nav-down');
            }
            if (st > 700) {
              $('.links').removeClass('top');
            }
            console.log('scroll happening up');
        }
      }
      lastScrollTop = st;
  }

  /**HANDLES THE TYPING EFFECT**/
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
	UCSDinfowindow.setContent('<h6 style="font-size: 0.75rem; line-height: 110%; margin: 0; font-weight: 400; padding: 0px; overflow: hidden;"><b>University of California, San Diego</b></h6>');
	PCCinfowindow.setContent('<h6 style="font-size: 0.75rem; line-height: 110%; margin: 0; font-weight: 400; padding: 0px; overflow: hidden;"><b>Pasadena City College</b></h6>');
	UCSDinfowindow.open(map,UCSDmarker);
	PCCinfowindow.open(map,PCCmarker);
};

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}