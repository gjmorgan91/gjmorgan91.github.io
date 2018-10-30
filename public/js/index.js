//initializes the parallax effect used by objects given the class 'rellax'
var rellax = new Rellax('.rellax');


//map initialization that I am toying with on the about page
var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8
	});
}

// let hideObjects = document.querySelectorAll('.hide');

// function hide(className) {
// 	let elemClass = '.'+className+' .hide';
// 	let element = document.querySelector(elemClass);
// 	if (element.style.height == '100px') {
// 		element.style.height = '0px';
// 	} else {
// 		element.style.height = '100px';
// 	}
// }


//Sets the duration for the animation on the nav links for the cascading effect
let navLinks = document.querySelectorAll('.header nav a');
console.log(navLinks);
for (let i=0; i<navLinks.length; i++) {
	navLinks[i].setAttribute('style','animation-duration: '+ (i*0.15 + 2) +'s');
}

//attempt at working on the card system for the projects section
/*let projects = document.querySelectorAll('figure');
console.log(projects);
for (let elem of projects) {
	elem.addEventListener('click', function() {
		
		let img = this.children[0];
		let caption = this.children[1];

		console.log(this);
		console.log(img);
		console.log(caption);

		if (this.style.overflow == 'hidden') {
			this.style.overflow = 'none';
			caption.style.display = 'block';
			caption.style.transform = 'translateY(0%)';
		} else {
			this.style.overflow = 'hidden';
			caption.style.display = 'absolute';
			caption.style.transform = 'translateY(-100%)';
		}
	});
}

function showContent(index) {
	console.log('clicked');
	let img = projects[index].children[0];
	let caption = projects[index].children[1];

	/*console.log('elem: '+elem);
	console.log('img: '+img);
	console.log('caption: '+ caption);

	if (projects[index].style.overflow == 'hidden') {
		projects[index].style.overflow = 'none';
		caption.style.display = 'block';
		caption.style.transform = 'translateX(0%)';
	} else {
		projects[index].style.overflow = 'hidden';
		caption.style.display = 'absolute';
		caption.style.transform = 'translateX(100%)';
	}
}*/