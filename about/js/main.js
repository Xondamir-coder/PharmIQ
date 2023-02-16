'use strict';
var x = window.matchMedia('(max-width: 900px)');
var y = window.matchMedia('(max-width: 600px)');
const slider = function () {
	if (x.matches) {
		const dotContainer = document.querySelector('.dots');
		const slides = document.querySelectorAll('.partners__wrap');
		let currentSlide = 0;
		const maxSlide = slides.length - 1;

		/* Functions */
		const createDots = function () {
			slides.forEach((_, i) => {
				dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
			});
		};
		createDots();

		const goToSlide = function (slide) {
			slides.forEach((s) => {
				s.style.opacity = '0';
			});
			document.querySelector(`.partners__wrap--${slide}`).style.opacity = '1';
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
			const dots = document.querySelectorAll('.dots__dot');
			dots.forEach((d) => d.classList.remove('dots__dot--active'));
			document.querySelector(`.dots__dot[data-slide="${i}"]`).classList.add('dots__dot--active');
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
const slider1 = function () {
	if (y.matches) {
		const dotContainer = document.querySelector('.dots-1');
		const slides = document.querySelectorAll('.staff__box');
		let currentSlide = 0;
		const maxSlide = slides.length - 1;

		/* Functions */
		const createDots = function () {
			slides.forEach((_, i) => {
				dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot dots__dot1" data-slide="${i}"></button>`);
			});
		};
		createDots();

		const goToSlide = function (slide) {
			slides.forEach((s) => {
				s.style.opacity = '0';
			});
			document.querySelector(`.staff__box--${slide}`).style.opacity = '1';
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
			const dots = document.querySelectorAll('.dots__dot1');
			dots.forEach((d) => d.classList.remove('dots__dot1--active'));
			document.querySelector(`.dots__dot1[data-slide="${i}"]`).classList.add('dots__dot1--active');
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
slider1();
slider();
