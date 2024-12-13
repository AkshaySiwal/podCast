// app.js
const GITHUB_TOKEN = 'your_github_token';
const REPO_OWNER = 'your_username';
const REPO_NAME = 'your_repo_name';

async function fetchPodcasts() {
    try {
        const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/podcasts`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        const data = await response.json();
        const podcastList = document.getElementById('podcast-list');
        
        data.forEach(file => {
            if (file.name.endsWith('.wav')) {
                const podcastItem = document.createElement('div');
                podcastItem.className = 'podcast-item';
                
                const audio = document.createElement('audio');
                audio.controls = true;
                audio.className = 'audio-player';
                audio.src = file.download_url;
                
                const title = document.createElement('h2');
                title.textContent = file.name.replace('.wav', '');
                
                podcastItem.appendChild(title);
                podcastItem.appendChild(audio);
                podcastList.appendChild(podcastItem);
            }
        });
    } catch (error) {
        console.error('Error fetching podcasts:', error);
    }
}

fetchPodcasts();
