document.body.scrollTop = document.documentElement.scrollTop = 0;

// This function gives all sections their classes. first "show-me" from second till last "go-down"
function put_sections() {
	var secs = document.querySelectorAll('section');
	for (var i = 0; i < secs.length; i++) {
		secs[i].id = 'el' + (i + 1);
		if (i === 0) {
			secs[i].classList.add('show-me');
		} else {
			secs[i].classList.add('go-down');
		}
		secs[i].classList.add('el' + (i + 1));
	}
}

put_sections();

// Adding event listener wheel event
var accept = 0;
document.addEventListener(
	'wheel',
	function (e) {
		if (accept === 0) {
			if (e.deltaY > 0) {
				slide_sections(100); // move up
			} else if (e.deltaY < 0) {
				slide_sections(-100); //move down
			}

			// Block the slider while it is moving for 500ms
			accept = 1;
			setTimeout(function () {
				accept = 0;
			}, 500);
			return false;
		}
	},
	true
);

var start; // var for keeping start point of touch event
var end; // var for keeping end point of touch event
function start_f(event) {
	start = event.touches[0].clientY;
	console.log('start');
}
function end_f(event) {
	end = event.changedTouches[0].clientY;
	if (start - end > 50 || start - end < -50) {
		slide_sections(start - end);
	}
}

// Main function to make slideing effect changing classes of sections
function slide_sections(e) {
	var showing = document.querySelector('.show-me');
	if (e > 0) {
		if (document.getElementById('el' + document.querySelectorAll('section').length) === showing) {
			// console.log("no way down");
		} else {
			showing.classList.remove('show-me');
			showing.classList.add('go-up');
			showing.nextElementSibling.classList.add('show-me');
			showing.nextElementSibling.classList.remove('go-down');
		}
	} else if (e < 0) {
		if (document.getElementById('el1') === showing) {
			// console.log("no way up");
		} else {
			showing.classList.remove('show-me');
			showing.classList.add('go-down');
			showing.previousElementSibling.classList.add('show-me');
			showing.previousElementSibling.classList.remove('go-up');
		}
	}
}

document.addEventListener('keydown', (event) => {
	if (event.isComposing || event.keyCode === 38) {
		slide_sections(-100); // top
	} else if (event.isComposing || event.keyCode === 40) {
		slide_sections(100); // bottom
	}
});

document.body.ontouchstart = start_f;
document.body.ontouchend = end_f;
``;

var x = window.matchMedia('(max-width: 630px)');
const slider = function (name, dot) {
	if (x.matches) {
		const dotContainer = document.querySelector(`.${dot}`);
		const slides = document.querySelectorAll(`.${name}`);
		let currentSlide = 0;
		const maxSlide = slides.length - 1;

		/* Functions */
		const createDots = function () {
			slides.forEach((_, i) => {
				if (dot === 'dots') {
					dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
				} else {
					dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot dots-1__dot" data-slide="${i}"></button>`);
				}
			});
		};
		createDots();

		const goToSlide = function (slide) {
			slides.forEach((s) => {
				s.style.opacity = '0';
			});
			document.querySelector(`.${name}--${slide}`).style.opacity = '1';
		};
		goToSlide(0);

		const nextSlide = function () {
			if (currentSlide === maxSlide) currentSlide = 0;
			else currentSlide++;
			goToSlide(currentSlide);
		};

		const prevSlide = function () {
			if (currentSlide === 0) currentSlide = maxSlide;
			else currentSlide--;
			goToSlide(currentSlide);
		};

		const activateDots = function (i) {
			const dots = document.querySelectorAll(`.${dot}__dot`);
			dots.forEach((d) => d.classList.remove(`${dot}__dot--active`));
			document.querySelector(`.${dot}__dot[data-slide="${i}"]`).classList.add(`${dot}__dot--active`);
		};
		activateDots(0);

		/* Event handlers */
		document.addEventListener('keydown', (event) => {
			if (event.key === 'ArrowRight') {
				console.log(currentSlide);
				nextSlide(currentSlide);
				activateDots(currentSlide);
			} else if (event.key === 'ArrowLeft') {
				console.log(currentSlide);
				prevSlide(currentSlide);
				activateDots(currentSlide);
			}
		});
		dotContainer.addEventListener('click', (event) => {
			if (event.target.classList.contains('dots__dot')) {
				const { slide } = event.target.dataset;
				goToSlide(slide);
				activateDots(slide);
			}
		});
	}
};
slider('section--5__wrap', 'dots');
slider('section--7__box', 'dots-1');
