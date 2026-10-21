/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {

        preloader.classList.add("hide");

    }, 700);

});


/* =========================================================
   ELEMENTS
========================================================= */

const menuBtn = document.getElementById("menu-btn");

const navbar = document.getElementById("navbar");

const themeBtn = document.getElementById("theme-btn");

const header = document.getElementById("header");

const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll("section[id]");


/* =========================================================
   MOBILE MENU
========================================================= */

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navbar.classList.contains("active")) {

        icon.classList.remove("bx-menu");

        icon.classList.add("bx-x");

        document.body.classList.add("no-scroll");

    } else {

        icon.classList.remove("bx-x");

        icon.classList.add("bx-menu");

        document.body.classList.remove("no-scroll");

    }

});


/* Close menu after clicking link */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("bx-x");

        icon.classList.add("bx-menu");

        document.body.classList.remove("no-scroll");

    });

});


/* =========================================================
   DARK / LIGHT THEME
========================================================= */

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {

    document.body.classList.add("light-theme");

    themeBtn.querySelector("i").className = "bx bx-sun";

}


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("light-theme")) {

        icon.className = "bx bx-sun";

        localStorage.setItem(
            "portfolio-theme",
            "light"
        );

    } else {

        icon.className = "bx bx-moon";

        localStorage.setItem(
            "portfolio-theme",
            "dark"
        );

    }

});


/* =========================================================
   HEADER ON SCROLL
========================================================= */

function updateHeader() {

    if (window.scrollY > 60) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 200;

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    `#${sectionId}`
                ) {

                    link.classList.add("active");

                }

            });

        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNav
);


/* =========================================================
   TYPING ANIMATION
========================================================= */

const typingText =
    document.querySelector(".typing-text");

const words = [

    "Digital Marketer",

    "SEO Learner",

    "WordPress Developer",

    "Web Developer",

    "Web Designer"

];

let wordIndex = 0;

let charIndex = 0;

let deleting = false;


function typeEffect() {

    const currentWord =
        words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(
                0,
                charIndex + 1
            );

        charIndex++;

        if (
            charIndex ===
            currentWord.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;

        }

    } else {

        typingText.textContent =
            currentWord.substring(
                0,
                charIndex - 1
            );

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (
                wordIndex >=
                words.length
            ) {

                wordIndex = 0;

            }

        }

    }

    const speed =
        deleting ? 60 : 110;

    setTimeout(
        typeEffect,
        speed
    );

}

typeEffect();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   SKILL BAR ANIMATION
========================================================= */

const skillBars =
    document.querySelectorAll(
        ".skill-bar span"
    );


const skillObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    const bar =
                        entry.target;

                    const width =
                        bar.dataset.width;

                    bar.style.width =
                        width;

                    skillObserver.unobserve(
                        bar
                    );

                }

            });

        },

        {
            threshold: 0.5
        }

    );


skillBars.forEach(bar => {

    skillObserver.observe(bar);

});


/* =========================================================
   COUNTER ANIMATION
========================================================= */

const counters =
    document.querySelectorAll(".counter");

let counterStarted = false;


function startCounters() {

    if (counterStarted) return;

    const statsSection =
        document.querySelector(".stats");

    const position =
        statsSection.getBoundingClientRect();

    if (
        position.top <
        window.innerHeight &&
        position.bottom > 0
    ) {

        counterStarted = true;

        counters.forEach(counter => {

            const target =
                Number(
                    counter.dataset.target
                );

            let current = 0;

            const increment =
                Math.max(
                    1,
                    Math.ceil(target / 50)
                );

            const updateCounter = () => {

                current += increment;

                if (current >= target) {

                    counter.textContent =
                        target + "+";

                    return;

                }

                counter.textContent =
                    current;

                requestAnimationFrame(
                    updateCounter
                );

            };

            updateCounter();

        });

    }

}

window.addEventListener(
    "scroll",
    startCounters
);


/* =========================================================
   PROJECT SLIDER
========================================================= */

const track =
    document.getElementById(
        "project-track"
    );

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );

const prevBtn =
    document.getElementById(
        "prev-project"
    );

const nextBtn =
    document.getElementById(
        "next-project"
    );

const dotsContainer =
    document.getElementById(
        "slider-dots"
    );


let currentSlide = 0;

let cardsPerView = 3;

let maxSlide = 0;


/* Determine cards per view */

function updateSliderSettings() {

    if (window.innerWidth <= 600) {

        cardsPerView = 1;

    } else if (
        window.innerWidth <= 1100
    ) {

        cardsPerView = 2;

    } else {

        cardsPerView = 3;

    }

    maxSlide =
        Math.max(
            0,
            projectCards.length -
            cardsPerView
        );

    if (
        currentSlide >
        maxSlide
    ) {

        currentSlide =
            maxSlide;

    }

    createDots();

    updateSlider();

}


/* Create dots */

function createDots() {

    dotsContainer.innerHTML = "";

    for (
        let i = 0;
        i <= maxSlide;
        i++
    ) {

        const dot =
            document.createElement(
                "button"
            );

        dot.setAttribute(
            "aria-label",
            `Go to slide ${i + 1}`
        );

        if (i === currentSlide) {

            dot.classList.add("active");

        }

        dot.addEventListener(
            "click",
            () => {

                currentSlide = i;

                updateSlider();

            }
        );

        dotsContainer.appendChild(dot);

    }

}


/* Update slider */

function updateSlider() {

    if (!projectCards.length) return;

    const cardWidth =
        projectCards[0].offsetWidth;

    const gap = 20;

    const movement =
        currentSlide *
        (cardWidth + gap);

    track.style.transform =
        `translateX(-${movement}px)`;


    const dots =
        dotsContainer.querySelectorAll(
            "button"
        );

    dots.forEach(dot => {

        dot.classList.remove(
            "active"
        );

    });

    if (dots[currentSlide]) {

        dots[currentSlide]
            .classList.add("active");

    }

}


/* Next */

nextBtn.addEventListener(
    "click",
    () => {

        if (
            currentSlide <
            maxSlide
        ) {

            currentSlide++;

        } else {

            currentSlide = 0;

        }

        updateSlider();

    }
);


/* Previous */

prevBtn.addEventListener(
    "click",
    () => {

        if (
            currentSlide > 0
        ) {

            currentSlide--;

        } else {

            currentSlide =
                maxSlide;

        }

        updateSlider();

    }
);


/* Resize */

window.addEventListener(
    "resize",
    updateSliderSettings
);

updateSliderSettings();


/* =========================================================
   AUTO SLIDER
========================================================= */

let autoSlider =
    setInterval(() => {

        if (
            currentSlide <
            maxSlide
        ) {

            currentSlide++;

        } else {

            currentSlide = 0;

        }

        updateSlider();

    }, 5000);


/* Pause slider on hover */

const slider =
    document.querySelector(
        ".project-slider"
    );


slider.addEventListener(
    "mouseenter",
    () => {

        clearInterval(autoSlider);

    }
);


slider.addEventListener(
    "mouseleave",
    () => {

        autoSlider =
            setInterval(() => {

                if (
                    currentSlide <
                    maxSlide
                ) {

                    currentSlide++;

                } else {

                    currentSlide = 0;

                }

                updateSlider();

            }, 5000);

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById(
        "contact-form"
    );

const toast =
    document.getElementById(
        "toast"
    );


contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "name"
            ).value.trim();

        const email =
            document.getElementById(
                "email"
            ).value.trim();

        const subject =
            document.getElementById(
                "subject"
            ).value.trim();

        const message =
            document.getElementById(
                "message"
            ).value.trim();


        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {

            showToast(
                "Please fill all required fields."
            );

            return;

        }


        if (!validateEmail(email)) {

            showToast(
                "Please enter a valid email."
            );

            return;

        }


        showToast(
            "Message submitted successfully!"
        );


        contactForm.reset();

    }
);


/* Email validation */

function validateEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}


/* Toast */

function showToast(message) {

    const toastText =
        toast.querySelector("span");

    toastText.textContent =
        message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 3500);

}


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            navbar.classList.remove(
                "active"
            );

            const icon =
                menuBtn.querySelector("i");

            icon.classList.remove(
                "bx-x"
            );

            icon.classList.add(
                "bx-menu"
            );

            document.body.classList.remove(
                "no-scroll"
            );

        }

    }
);


/* =========================================================
   BACK TO TOP
========================================================= */

const topBtn =
    document.querySelector(
        ".top-btn"
    );


topBtn.addEventListener(
    "click",
    event => {

        event.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =========================================================
   PREVENT PLACEHOLDER LINKS
========================================================= */

document.querySelectorAll(
    'a[href="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            event.preventDefault();

        }
    );

});