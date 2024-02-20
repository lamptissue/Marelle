const siteName = document.querySelector(".siteName");
const siteLoader = document.querySelector(".intro-load");
const titleBox = document.querySelector(".site-branding");
const availability = document.querySelector(".availability");
const availabilityClose = document.querySelector(".availability-close-box");

const header = document.querySelector(".header-nav");

const footer = document.querySelector("footer");
const footerBackgroundColor = getComputedStyle(footer).backgroundColor;

const slideshow = document.querySelector(".slideshow-container");

const cursorContainer = document.querySelector(".custom-cursor");
const imageContainer = document.querySelector(".cursor-image-container");
const cursorImage = document.createElement("img");
const imageTitleDisplay = document.querySelector(".cursor-image-title");

document.addEventListener("DOMContentLoaded", function () {
	if (sessionStorage.getItem("animationPlayed") !== "true") {
		document.body.style.overflow = "hidden";

		const timeline = gsap.timeline();
		timeline
			.fromTo(titleBox, { opacity: 0, top: "50%" }, { opacity: 1, duration: 3, delay: 1.5 })
			.to(titleBox, { top: "78%", duration: 3, ease: "back.inOut(1.2)" })
			.to(".intro-load", {
				opacity: 0,
				onComplete: () => ((document.body.style.overflow = "auto"), siteLoader.remove()),
			});

		sessionStorage.setItem("animationPlayed", "true");
	} else {
		titleBox.style.opacity = "1";
		titleBox.style.top = "78%";
		document.body.style.overflow = "auto";
		siteLoader.remove();
	}
});

siteName.addEventListener("mouseenter", function () {
	this.dataset.originalText = this.textContent;
	this.textContent = "Bonjour";
});

siteName.addEventListener("mouseleave", function () {
	this.textContent = this.dataset.originalText;
});

//Header scroll animation
gsap.registerPlugin(ScrollTrigger);

const title = document.querySelector(".site-branding h1");

const timeline = gsap.timeline({
	scrollTrigger: {
		pin: true,
		start: "top top",
		end: "+=500",
		scrub: 1,
	},
});

let mm = gsap.matchMedia();

mm.add("(min-width: 801px)", () => {
	timeline.fromTo(titleBox, { top: "80%" }, { top: "5%" }).fromTo(title, { fontSize: 200 }, { fontSize: 30 }, 0);
});

mm.add("(max-width: 800px)", () => {
	timeline.fromTo(titleBox, { top: "80%" }, { top: "5%" }).fromTo(title, { fontSize: 150 }, { fontSize: 30 }, 0);
});

mm.add("(max-width: 549px)", () => {
	timeline.fromTo(titleBox, { top: "90%" }, { top: "5%" }).fromTo(title, { fontSize: 75 }, { fontSize: 25 }, 0);
});
document.addEventListener("DOMContentLoaded", () => {
	const elements = document.querySelectorAll("section");

	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					gsap.to(entry.target, {
						opacity: 1,
						duration: 2,
						ease: "power2.out",
					});

					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.1,
		}
	);

	elements.forEach((el) => {
		observer.observe(el);
	});
});

//Menu change animation and pop up for rates

function setActiveLink(id) {
	document.querySelectorAll(".main-navigation a").forEach((link) => {
		link.classList.remove("active");
	});

	const currentLink = document.querySelector(`.main-navigation a[href="#${id}"]`);
	let poppedUp = false;
	if (currentLink) {
		currentLink.classList.add("active");
	}
	if (id === "ratePackages" && poppedUp === false) {
		header.classList.add("animation");
		availability.classList.add("animation");

		availabilityClose.addEventListener("click", () => {
			header.classList.remove("animation");
			availability.classList.remove("animation");
			header.classList.add("animation-reverse");
			availability.classList.add("animation-reverse");
			poppedUp = true;
		});
	}
}

window.addEventListener("scroll", () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	if (scrollTop + clientHeight >= scrollHeight - 5) {
		setActiveLink("contact");
	}
});
const sections = gsap.utils.toArray("section");
sections.forEach((section, index) => {
	ScrollTrigger.create({
		trigger: section,
		start: "top center",
		end: () => {
			const isLastSection = index === sections.length - 1;
			return isLastSection ? "bottom bottom" : "bottom center";
		},
		onEnter: () => setActiveLink(section.id),
		onEnterBack: () => setActiveLink(section.id),
	});
});

// if the screen is mobile then a slide show appears, if not a custom slideshow cursor appears
if (window.innerWidth < 1050) {
	let currentIndex = 0;
	slideshow.style.display = "block";
	cursorContainer.style.display = "none";
	const slides = document.querySelectorAll(".slide");
	const totalSlides = slides.length;

	function startSlides() {
		slides.forEach((slide, index) => {
			slide.style.opacity = "0";
		});
		slides[0].style.opacity = "1";
	}

	function changeSlide() {
		slides[currentIndex].style.opacity = "0";
		currentIndex = (currentIndex + 1) % totalSlides;
		slides[currentIndex].style.opacity = "1";
	}

	startSlides();

	setInterval(changeSlide, 6000);
} else {
	slideshow.style.display = "none";
	cursorContainer.style.display = "block";

	imageContainer.appendChild(cursorImage);

	const images = slideshowImages.data;

	let aimX = 0;
	let aimY = 0;
	let currentX = 0;
	let currentY = 0;

	document.addEventListener("mousemove", function (event) {
		const section = document.querySelector("section");
		const rect = section.getBoundingClientRect();
		if (
			event.clientX >= rect.left &&
			event.clientX <= rect.right &&
			event.clientY >= rect.top &&
			event.clientY <= rect.bottom
		) {
			aimX = event.clientX;
			aimY = event.clientY;
			cursorContainer.style.opacity = 1;
		} else {
			cursorContainer.style.opacity = 0;
		}
	});

	const animate = () => {
		currentX += aimX - currentX;
		currentY += aimY - currentY;

		cursorContainer.style.left = currentX + "px";
		cursorContainer.style.top = currentY + "px";
		const index = Math.floor(currentX / 100) % images.length;
		cursorImage.src = images[index].url;
		imageTitleDisplay.textContent = images[index].title;

		requestAnimationFrame(animate);
	};

	animate();
}

// Header colour change when it reaches the footer

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				header.style.backgroundColor = footerBackgroundColor;
				header.style.boxShadow = `0 -3px 5px ${footerBackgroundColor}`;
			} else {
				header.style.backgroundColor = "#fcfdf8";
				header.style.boxShadow = "0 -3px 5px #fcfdf8";
			}
		});
	},
	{
		root: null,
	}
);

observer.observe(footer);
