'use strict';
var x = window.matchMedia('(max-width: 650px)');
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
slider('courses__box', 'dots');
slider('reasons__box', 'dots-1');
