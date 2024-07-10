// Responsive Navigation Menu
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.createElement('button');
    navToggle.innerHTML = 'Menu';
    navToggle.classList.add('nav-toggle');
    document.querySelector('header').appendChild(navToggle);

    const navLinks = document.querySelector('nav');
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Simplified Smooth Scrolling
    const smoothScroll = (target, duration) => {
        const targetPosition = document.querySelector(target).offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();

        const animation = (currentTime) => {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1); // Ensure progress does not exceed 1
            window.scrollTo(0, startPosition + distance * progress);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    };

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target, 1000);
            // Ensure the "Back to Top" button appears when any section is clicked
            if (window.pageYOffset < 100) {
                backToTopButton.style.display = 'block';
            }
        });
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        smoothScroll('header', 1000);
    });

    // Theme Toggle
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const header = document.querySelector('header');
    const navLinksArray = document.querySelectorAll('nav a');

    const applyDarkTheme = (isDark) => {
        body.classList.toggle('dark-theme', isDark);
        header.classList.toggle('dark-theme', isDark);
        navLinksArray.forEach(link => link.classList.toggle('dark-theme', isDark));
        localStorage.setItem('darkTheme', isDark ? 'enabled' : 'disabled');
    };

    // Load theme preference from localStorage
    const darkThemeEnabled = localStorage.getItem('darkTheme') === 'enabled';
    applyDarkTheme(darkThemeEnabled);

    themeToggleButton.addEventListener('click', () => {
        const isDark = !body.classList.contains('dark-theme');
        applyDarkTheme(isDark);
    });


	// Toggle project description
    document.querySelectorAll('.project h3').forEach(title => {
        title.addEventListener('click', () => {
            const paragraph = title.nextElementSibling;
            const ul = paragraph.nextElementSibling;
            [paragraph, ul].forEach(element => {
                if (element.classList.contains('show')) {
                    element.classList.remove('show');
                } else {
                    element.classList.add('show');
                }
            });
        });
    });
});