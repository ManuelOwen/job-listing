// Fetch data from JSON file and initialize the job listings
async function fetchData() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        console.log(data);
        createJobItems(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
fetchData();

// Function to create job items and append them to the DOM
function createJobItems(data) {
    const jobItemsContainer = document.getElementById('job-items');

    data.forEach(job => {
        const jobItem = document.createElement('div');
        jobItem.className = 'job-item';

        // Job item structure
        jobItem.innerHTML = `
            <div class="job-item-header">
                <img src="${job.logo}" alt="${job.company} logo" class="job-logo">
                <div class="job-info">
                    <div class="job-company">
                        <span>${job.company}</span>
                        ${job.new ? '<span class="new">New!</span>' : ''}
                        ${job.featured ? '<span class="featured">Featured</span>' : ''}
                    </div>
                    <h2 class="job-position">${job.position}</h2>
                    <div class="job-details">
                        <span>${job.postedAt}</span>
                        <span>•</span>
                        <span>${job.contract}</span>
                        <span>•</span>
                        <span>${job.location}</span>
                    </div>
                </div>
            </div>
            <div class="job-tags">
                ${createTags(job).join('')}
            </div>
        `;

        jobItemsContainer.appendChild(jobItem);
    });
}

// Function to create tags for each job item
function createTags(job) {
    const tags = [];
    
    tags.push(`<span class="tag">${job.role}</span>`);
    tags.push(`<span class="tag">${job.level}</span>`);

    job.languages.forEach(language => {
        tags.push(`<span class="tag">${language}</span>`);
    });

    job.tools.forEach(tool => {
        tags.push(`<span class="tag">${tool}</span>`);
    });

    return tags;
}
