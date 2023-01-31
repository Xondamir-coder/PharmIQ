
document.body.scrollTop = document.documentElement.scrollTop = 0;

// This function gives all sections their classes. first "show-me" from second till last "go-down"
function put_sections() {
	var secs = document.querySelectorAll("section");
	for (var i = 0; i < secs.length; i++) {
		secs[i].id = "el" + (i + 1);
		if (i === 0) {
			secs[i].classList.add("show-me");
		} else {
			secs[i].classList.add("go-down");
		}
		secs[i].classList.add("el" + (i + 1));
	}
}

put_sections();

// Adding event listener wheel event
var accept = 0;
document.addEventListener("wheel", function (e) {
	if (accept === 0) {
		if (e.deltaY > 0) {
			slide_sections(100) // move up
		} else if (e.deltaY < 0) {
			slide_sections(-100) //move down
		}

		// Block the slider while it is moving for 500ms
		accept = 1;
		setTimeout(function () {
			accept = 0;
		}, 500);
		return false;
	}
}, true);


var start; // var for keeping start point of touch event
var end; // var for keeping end point of touch event
function start_f(event) {
	start = event.touches[0].clientY;
	console.log("start")
}
function end_f(event) {
	end = event.changedTouches[0].clientY;
	if (start - end > 400 || start - end < -400) {
		slide_sections(start - end);
	}
}

// Main function to make slideing effect changing classes of sections
function slide_sections(e) {
	var showing = document.querySelector(".show-me");
	if (e > 0) {
		if (document.getElementById("el" + document.querySelectorAll("section").length) === showing) {
			// console.log("no way down");
		} else {
			showing.classList.remove("show-me");
			showing.classList.add("go-up");
			showing.nextElementSibling.classList.add("show-me");
			showing.nextElementSibling.classList.remove("go-down");
		}
	} else if (e < 0) {
		if (document.getElementById("el1") === showing) {
			// console.log("no way up");
		} else {
			showing.classList.remove("show-me");
			showing.classList.add("go-down");
			showing.previousElementSibling.classList.add("show-me");
			showing.previousElementSibling.classList.remove("go-up");
		}
	}
}
document.body.ontouchstart = start_f;
document.body.ontouchend = end_f;