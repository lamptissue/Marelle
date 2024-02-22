const siteName = document.querySelector(".site-name");
const siteLoader = document.querySelector(".intro-load");
const titleBox = document.querySelector(".site-branding");
const availability = document.querySelector(".availability");
const availabilityClose = document.querySelector(".availability-close-box");
const header = document.querySelector(".header-nav");

const footer = document.querySelector("footer");
const footerBackgroundColor = getComputedStyle(footer).backgroundColor;

const slideshow = document.querySelector(".slideshow-container");

const siteNameAnimation = document.querySelector(".site-name-animation");

const siteNameAnimationBox = siteNameAnimation.getBoundingClientRect();

// Adjust the max width as necessary for your definition of mobile
const isMobileScreen = window.innerWidth <= 768;
const mobileAdjustmentValue = 30;
const desktopAdjustmentValue = 50;

const adjustmentValue = isMobileScreen ? mobileAdjustmentValue : desktopAdjustmentValue;

const titleBottomPagePosition = window.innerHeight - siteNameAnimationBox.height / 2 - adjustmentValue;

document.addEventListener("DOMContentLoaded", function () {
	if (sessionStorage.getItem("animationPlayed") !== "true") {
		document.body.style.overflow = "hidden";

		const introductionTimeline = gsap.timeline();
		introductionTimeline
			.fromTo(siteNameAnimation, { opacity: 0 }, { opacity: 1, duration: 3, delay: 1.5 })

			.to(siteNameAnimation, { top: titleBottomPagePosition, duration: 3, ease: "back.inOut(1.2)" })
			.to(siteLoader, {
				opacity: 0,
				onComplete: () => (
					(document.body.style.overflow = "auto"),
					setTimeout(() => {
						siteLoader.remove();
					}, 1000)
				),
			})
			.to(siteNameAnimation, { opacity: 0, duration: 0.2 })
			.fromTo(titleBox, { opacity: 0, top: titleBottomPagePosition + "px" }, { opacity: 1, duration: 0.1 }, "<");

		sessionStorage.setItem("animationPlayed", "true");
	} else {
		titleBox.style.opacity = "1";
		titleBox.style.top = titleBottomPagePosition + "px";
		document.body.style.overflow = "auto";
		siteLoader.style.opacity = 0;
		setTimeout(() => {
			siteLoader.remove();
		}, 1000);
	}
});
gsap.registerPlugin(ScrollTrigger);

const title = document.querySelector(".site-branding h1");

const scrollTimeline = gsap.timeline({
	scrollTrigger: {
		pin: true,
		start: "top top",
		endTrigger: header,
		scrub: true,
	},
});

let mm = gsap.matchMedia();

mm.add("(min-width: 801px)", () => {
	scrollTimeline
		.fromTo(titleBox, { top: titleBottomPagePosition + "px" }, { top: "40px" })

		.fromTo(title, { fontSize: 200 }, { fontSize: 30 }, "<");
});

mm.add("(max-width: 800px)", () => {
	scrollTimeline
		.fromTo(titleBox, { top: titleBottomPagePosition + "px" }, { top: "30px" })

		.fromTo(title, { fontSize: 75 }, { fontSize: 25 }, "<");
});

window.onload = function () {
	ScrollTrigger.refresh();
};

//site name switch to bonjour

siteName.addEventListener("mouseenter", function () {
	this.dataset.originalText = this.textContent;
	this.textContent = "Bonjour";
});

siteName.addEventListener("mouseleave", function () {
	this.textContent = this.dataset.originalText;
});

//fade in animation on scroll
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

//Menu nav highlighter and pop up for rates
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
	const images = slideshowImages.data;
	const picArea = document.querySelector(".image-hover-container");
	const placedImages = [];

	const picAreaRect = picArea.getBoundingClientRect();

	images.forEach((imageSrc) => {
		const img = document.createElement("img");
		img.src = imageSrc.url;
		img.style.opacity = 0;

		const imgWidth = 400;
		const imgHeight = 350;

		let positionFound = false;
		let attempts = 0;
		let x, y;

		while (!positionFound && attempts < 100) {
			x = Math.floor(Math.random() * (picAreaRect.width - imgWidth));
			y = Math.floor(Math.random() * (picAreaRect.height - imgHeight));

			let overlapping = placedImages.some((pos) => {
				return x < pos.x + imgWidth && x + imgWidth > pos.x && y < pos.y + imgHeight && y + imgHeight > pos.y;
			});

			if (!overlapping) {
				placedImages.push({ x, y });
				positionFound = true;
			}

			attempts++;
		}

		if (positionFound) {
			img.style.left = x + "px";
			img.style.top = y + "px";
			picArea.appendChild(img);
		}

		img.addEventListener("mouseenter", () => {
			img.style.opacity = 1;
		});

		img.addEventListener("mouseleave", () => {
			setTimeout(() => {
				img.style.opacity = 0;
			}, 1500);
		});
	});

	// OLD CURSOR

	// 	const cursorContainer = document.querySelector(".custom-cursor");
	// const imageContainer = document.querySelector(".cursor-image-container");
	// const cursorImage = document.createElement("img");
	// const imageTitleDisplay = document.querySelector(".cursor-image-title");
	// slideshow.style.display = "none";
	// cursorContainer.style.display = "block";

	// imageContainer.appendChild(cursorImage);

	// const images = slideshowImages.data;

	// let aimX = 0;
	// let aimY = 0;
	// let currentX = 0;
	// let currentY = 0;

	// document.addEventListener("mousemove", function (event) {
	// 	const section = document.querySelector("section");
	// 	const rect = section.getBoundingClientRect();
	// 	if (
	// 		event.clientX >= rect.left &&
	// 		event.clientX <= rect.right &&
	// 		event.clientY >= rect.top &&
	// 		event.clientY <= rect.bottom
	// 	) {
	// 		aimX = event.clientX;
	// 		aimY = event.clientY;
	// 		cursorContainer.style.opacity = 1;
	// 	} else {
	// 		cursorContainer.style.opacity = 0;
	// 	}
	// });

	// const animate = () => {
	// 	currentX += aimX - currentX;
	// 	currentY += aimY - currentY;

	// 	cursorContainer.style.left = currentX + "px";
	// 	cursorContainer.style.top = currentY + "px";
	// 	const index = Math.floor(currentX / 100) % images.length;
	// 	cursorImage.src = images[index].url;
	// 	imageTitleDisplay.textContent = images[index].title;

	// 	requestAnimationFrame(animate);
	// };

	// animate();
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
