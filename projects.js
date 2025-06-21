document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        // Animation delay from the second block
        const animationDelayBase = 0.5;
        card.style.animationDelay = `${animationDelayBase + index * 0.15}s`;

        const projectType = card.dataset.projectType; // From first block
        const githubUrl = card.dataset.githubUrl;
        const liveUrl = card.dataset.liveUrl;
        const downloadInfo = card.dataset.downloadInfo;

        const viewSiteBtn = card.querySelector('.view-site-btn');
        const downloadBtn = card.querySelector('.download-btn');
        const githubBtn = card.querySelector('.github-btn');

        // --- Handle Button Clicks ---

        // View Site button (for websites) - combined logic
        if (viewSiteBtn) {
            viewSiteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (liveUrl) {
                    window.open(liveUrl, '_blank', 'noopener noreferrer');
                } else {
                    alert('Live site URL is not available for this project.');
                }
            });
        }

        // Download button (for apps) - combined logic
        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (downloadInfo && downloadInfo.startsWith('http')) {
                    window.open(downloadInfo, '_blank', 'noopener noreferrer');
                } else {
                    // This combines the warning from the second block with the alert from the first
                    console.warn('Download info is not a valid URL or not provided:', downloadInfo);
                    alert(`To download the ${card.querySelector('h3').textContent} or view its source, please visit the GitHub repository.`);
                }
            });
        }

        // GitHub button (for all project types) - combined logic
        if (githubBtn) {
            githubBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (githubUrl) {
                    window.open(githubUrl, '_blank', 'noopener noreferrer');
                } else {
                    alert('GitHub repository URL is not available for this project.');
                }
            });
        }

        // --- Handle Card Click (if no specific button was clicked) ---
        card.addEventListener('click', () => {
            if (projectType === 'website' && liveUrl) {
                window.open(liveUrl, '_blank', 'noopener noreferrer');
            } else if (projectType === 'app' && downloadInfo) {
                // If downloadInfo is a URL, open it, otherwise direct to GitHub
                if (downloadInfo.startsWith('http')) { // Simplified check for URL
                    window.open(downloadInfo, '_blank', 'noopener noreferrer');
                } else if (githubUrl) {
                    window.open(githubUrl, '_blank', 'noopener noreferrer');
                } else {
                    alert('No direct download or GitHub link available for this app.');
                }
            } else if (githubUrl) {
                window.open(githubUrl, '_blank', 'noopener noreferrer');
            } else {
                alert('No link available for this project.');
            }
        });
    });
});