document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = question.nextElementSibling;
            const toggle = question.querySelector('.faq-toggle');
            
            // Check if this item is already active
            const isActive = answer.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.classList.remove('active');
                item.style.maxHeight = '0px';
            });
            
            document.querySelectorAll('.faq-toggle').forEach(item => {
                item.classList.remove('active');
            });
            
            // If clicked item wasn't active, open it
            if (!isActive) {
                answer.classList.add('active');
                toggle.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Fullscreen functionality for game iframe
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const gameIframe = document.querySelector('.game-container iframe');

    fullscreenBtn?.addEventListener('click', () => {
        if (gameIframe) {
            if (gameIframe.requestFullscreen) {
                gameIframe.requestFullscreen();
            } else if (gameIframe.mozRequestFullScreen) { /* Firefox */
                gameIframe.mozRequestFullScreen();
            } else if (gameIframe.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                gameIframe.webkitRequestFullscreen();
            } else if (gameIframe.msRequestFullscreen) { /* IE/Edge */
                gameIframe.msRequestFullscreen();
            }
        }
    });

    // Social share buttons functionality
    const socialBtns = document.querySelectorAll('.social-btn');
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    socialBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            let shareUrl = '';

            if (btn.classList.contains('twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
            } else if (btn.classList.contains('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
            } else if (btn.classList.contains('linkedin')) {
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
            } else if (btn.classList.contains('reddit')) {
                shareUrl = `https://www.reddit.com/submit?url=${pageUrl}&title=${pageTitle}`;
            } else if (btn.classList.contains('tiktok')) {
                // TikTok doesn't have a direct share URL, so we'll just copy the URL to clipboard
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('URL copied! You can now paste it in TikTok.');
                }).catch(err => {
                    console.error('Failed to copy URL: ', err);
                });
                return;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
}); 