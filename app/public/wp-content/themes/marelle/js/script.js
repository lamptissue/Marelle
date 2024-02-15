const siteName = document.querySelector(".siteName");
const siteLoader = document.querySelector(".intro-load");
const titleBox = document.querySelector(".site-branding");

document.addEventListener("DOMContentLoaded", function () {
	if (window.scrollY < 0) {
		window.scrollTo(0, 0);
	}

	document.body.style.overflow = "hidden";

	const timeline = gsap.timeline();
	timeline
		.fromTo(titleBox, { opacity: 0, top: "50%" }, { opacity: 1, duration: 3, delay: 1.5 })
		.to(titleBox, { top: "78%", duration: 3, ease: "back.inOut(1.2)" })
		.to(".intro-load", {
			opacity: 0,
			onComplete: () => ((document.body.style.overflow = "auto"), siteLoader.remove()),
		});
	timeline.restart();
});

document.addEventListener("DOMContentLoaded", () => {
	const elements = document.querySelectorAll("section");

	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					gsap.to(entry.target, {
						opacity: 1,
						duration: 3,
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
		markers: true,
	},
});

timeline.fromTo(titleBox, { top: "80%" }, { top: "8%" }).fromTo(title, { fontSize: 200 }, { fontSize: 30 }, 0);

//Menu change animation and pop up for rates
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

function setActiveLink(id) {
	document.querySelectorAll(".main-navigation a").forEach((link) => {
		link.classList.remove("active");
	});

	const currentLink = document.querySelector(`.main-navigation a[href="#${id}"]`);
	if (currentLink) {
		currentLink.classList.add("active");
	}
	if (id === "ratePackages") {
		console.log("rates and packages");
	}
}

window.addEventListener("scroll", () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	if (scrollTop + clientHeight >= scrollHeight - 5) {
		setActiveLink("contact");
	}
});

// if the screen is mobile then a slide show appears, if not a custom slideshow cursor appears
if (window.innerWidth < 1000) {
	let currentIndex = 0;
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
	const cursorContainer = document.querySelector(".custom-cursor");

	const imageContainer = document.querySelector(".cursor-image-container");
	const cursorImage = document.createElement("img");

	imageContainer.appendChild(cursorImage);

	const imageTitleDisplay = document.querySelector(".cursor-image-title");

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
const header = document.querySelector(".header-nav");
const footer = document.querySelector("footer");
const footerBackgroundColor = getComputedStyle(footer).backgroundColor;

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

// const availability = document.querySelector("availability");
// const close = document.querySelector("availability-close");

// document.addEventListener("click", function () {});
