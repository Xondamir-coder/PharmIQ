'use strict';
var x = window.matchMedia('(max-width: 885px)');
const slider = function () {
	if (x.matches) {
		const dotContainer = document.querySelector('.dots');
		const slides = document.querySelectorAll('.partners__box');

		/* Functions */
		const createDots = function () {
			slides.forEach((_, i) => {
				dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide='${i}'></button>`);
			});
		};
		const activateDots = (dot) => {
			const dots = document.querySelectorAll('.dots__dot');
			dots.forEach((d) => d.classList.remove('dots__dot--active'));
			document.querySelector(`.dots__dot[data-slide="${dot}"]`).classList.add('dots__dot--active');
		};
		const goToSlide = function (slide) {
			slides.forEach((s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`));
		};
		const init = function () {
			createDots();
			activateDots(0);
			goToSlide(0);
		};
		init();

		/* Event Handlers */
		dotContainer.addEventListener('click', function (event) {
			if (event.target.classList.contains('dots__dot')) {
				const { slide } = event.target.dataset;
				goToSlide(slide);
				activateDots(slide);
			}
		});
	}
};
slider();
