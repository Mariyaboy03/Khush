// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const buttons = document.querySelectorAll(".cta-button, .btn, .glow-btn, .glassy-btn");

buttons.forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
  });
});



function scrollCarousel() {
  const track = document.getElementById('carouselTrack');
  track.scrollBy({ left: 320, behavior: 'smooth' });
}


document.querySelectorAll('.glassy-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
    btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});

const scrollers = document.querySelectorAll(".scroller");

if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  addAnimation();
}

function addAnimation(){
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector('.scroller_inner');
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    })
  });
}

console.log("script.js loaded and started!"); 

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM content loaded event fired!"); 
    // Select all parallax video sections
    const parallaxVideoSections = document.querySelectorAll('.parallax-video-section');
    console.log("Found parallax sections:", parallaxVideoSections.length); // Diagnostic log

    // Define a parallax speed. Lower value = slower video movement relative to scroll.
    const parallaxSpeed = 0.4; // Experiment with this value: 0.1 (very slow) to 0.8 (faster)

    // This function will be called on every scroll event
    function applyParallax() {
        console.log("APPLY PARALLAX FUNCTION IS RUNNING!"); // Diagnostic log

        parallaxVideoSections.forEach(section => {
            const video = section.querySelector('video');

            // Only proceed if a video element is found within the section
            if (video) {
                const sectionTop = section.getBoundingClientRect().top;
                const movement = -sectionTop * parallaxSpeed;
                console.log(`Section ID: ${section.id || 'N/A'}, Calculated Movement: ${movement.toFixed(2)}px`); // Diagnostic log
                video.style.transform = `translate(-50%, calc(-50% + ${movement}px))`;
            } else {
                console.warn(`Video element not found in section: ${section.id || 'N/A'}`); // Diagnostic warn
            }
        });
    }

    // Attach the parallax function to the scroll event of the window
    window.addEventListener('scroll', applyParallax);
    console.log("Scroll event listener attached."); // Diagnostic log

    // Call the function once initially to set the correct position
    // in case the user loads the page already scrolled (e.g., refreshing).
    applyParallax();
    console.log("applyParallax called once on DOMContentLoaded."); // Diagnostic log

    // Optional: Smooth scroll for "Learn More" button
    const scrollButton = document.querySelector('.scroll-button');
    if (scrollButton) {
        scrollButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor jump
            const targetId = this.getAttribute('href'); // Get the target section ID (e.g., "#about-section")
            const targetElement = document.querySelector(targetId); // Find the element

            if (targetElement) {
                // Scroll smoothly to the target element's top position
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});