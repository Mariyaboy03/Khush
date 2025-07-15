
// --- DOMContentLoaded Wrapper ---
document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                // Get the offset of the target element relative to the document
                const targetOffset = target.offsetTop;
                // Get the height of the fixed navbar
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                // Calculate the final scroll position, accounting for the navbar
                const scrollPosition = targetOffset - navbarHeight;

                window.scrollTo({
                    top: scrollPosition,
                    behavior: "smooth"
                });

                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const hamburgerMenu = document.querySelector('.hamburger-menu');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburgerMenu.classList.remove('active');
                }
            }
        });
    });

    // --- Button Glow Effect (mousemove) ---
    const buttons = document.querySelectorAll(".cta-button, .btn, .glow-btn, .glassy-btn, .book-call-button");

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });

    // --- Carousel Scroll Function ---
    // Made globally accessible because  HTML calls it directly via onclick
    window.scrollCarousel = function() {
        const track = document.getElementById('carouselTrack');
        if (track) {
            // Scroll by a fixed amount (e.g., 320px) or calculate based on item width + gap
            const scrollAmount = track.querySelector('.case-item')?.offsetWidth + 20 || 320; // Item width + gap
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else {
            console.warn("Carousel track with ID 'carouselTrack' not found.");
        }
    };

    // --- Scroller/Marquee Animation ---
    const scrollers = document.querySelectorAll(".scroller");

    // Check if user prefers reduced motion
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
    }

    function addAnimation() {
        scrollers.forEach((scroller) => {
            scroller.setAttribute("data-animated", true);

            const scrollerInner = scroller.querySelector('.scroller_inner');
            if (scrollerInner) {
                const scrollerContent = Array.from(scrollerInner.children);

                // Duplicate content for seamless infinite scroll
                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute("aria-hidden", true); // Hide from screen readers
                    scrollerInner.appendChild(duplicatedItem);
                });
            } else {
                console.warn("Scroller inner element not found for a scroller.");
            }
        });
    }

    // --- Parallax Video Background Effect ---
    // Select all parallax video sections (hero and footer)
    const parallaxVideoSections = document.querySelectorAll('.parallax-video-section');
    console.log("Found parallax sections for video effect:", parallaxVideoSections.length);

    const parallaxSpeed = 0.4; // Adjust this value: 0.1 (very slow) to 0.8 (faster)

    function applyParallax() {
        // console.log("APPLY PARALLAX FUNCTION IS RUNNING!"); // Uncomment for debugging

        parallaxVideoSections.forEach(section => {
            const video = section.querySelector('video');

            if (video) {
                // Get the top position of the section relative to the viewport
                const sectionTop = section.getBoundingClientRect().top;
                // Calculate movement: negative sectionTop makes it move up as we scroll down
                const movement = -sectionTop * parallaxSpeed;

                // Apply the transform to the video
                // Combines initial -50% translation (for centering) with parallax movement
                video.style.transform = `translate(-50%, calc(-50% + ${movement}px))`;
            } else {
                console.warn(`Video element not found in section: ${section.id || 'N/A'}`);
            }
        });
    }

    // Attach the parallax function to the scroll event of the window
    window.addEventListener('scroll', applyParallax);
    console.log("Scroll event listener attached.");

    // Call the function once initially to set the correct position (e.g., on page refresh)
    applyParallax();
    console.log("applyParallax called once on DOMContentLoaded.");


    // --- Hamburger Menu Toggle (Basic functionality) ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('active'); // Optional: for animating hamburger icon
        });
    } else {
        console.warn("Hamburger menu or nav links not found. Mobile menu might not work.");
    }

}); 
