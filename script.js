let jobData = [];
let filters = [];

// Fetch data from JSON file and initialize the job listings
async function fetchData() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        jobData = data;
        createJobItems(jobData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
fetchData();

// Function to create job items and append them to the DOM
function createJobItems(data) {
    const jobItemsContainer = document.getElementById('job-items');
    jobItemsContainer.innerHTML = ''; // Clear previous job items

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

    // Add event listeners to tags
    addTagEventListeners();
}

// Function to create tags for each job item
function createTags(job) {
    const tags = [];
    
    tags.push(`<span class="tag" data-tag="${job.role}">${job.role}</span>`);
    tags.push(`<span class="tag" data-tag="${job.level}">${job.level}</span>`);

    job.languages.forEach(language => {
        tags.push(`<span class="tag" data-tag="${language}">${language}</span>`);
    });

    job.tools.forEach(tool => {
        tags.push(`<span class="tag" data-tag="${tool}">${tool}</span>`);
    });

    return tags;
}

// Function to add event listeners to tags
function addTagEventListeners() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', (event) => {
            const tagText = event.target.dataset.tag;
            if (!filters.includes(tagText)) {
                filters.push(tagText);
                updateFilters();
                filterJobItems();
            }
        });
    });
}

// Function to update the filters display
function updateFilters() {
    const header = document.querySelector('.header');
    let filterContainer = document.getElementById('filter-container');
    
    if (!filterContainer) {
        filterContainer = document.createElement('div');
        filterContainer.id = 'filter-container';
        header.appendChild(filterContainer);
    }
    
    filterContainer.innerHTML = ''; // Clear previous filters

    filters.forEach(filter => {
        const filterTag = document.createElement('span');
        filterTag.className = 'filter-tag';
        filterTag.innerHTML = `${filter} <span class="remove-filter" data-filter="${filter}">x</span>`;
        filterContainer.appendChild(filterTag);
    });

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear All';
    clearButton.id = 'clear-filters';
    filterContainer.appendChild(clearButton);

    // Add event listeners to remove individual filters and clear all filters
    addFilterEventListeners();
}

// Function to add event listeners to filter tags and clear button
function addFilterEventListeners() {
    const removeFilterButtons = document.querySelectorAll('.remove-filter');
    removeFilterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const filter = event.target.dataset.filter;
            filters = filters.filter(f => f !== filter);
            updateFilters();
            filterJobItems();
        });
    });

    const clearFiltersButton = document.getElementById('clear-filters');
    if (clearFiltersButton) {
        clearFiltersButton.addEventListener('click', () => {
            filters = [];
            updateFilters();
            filterJobItems();
        });
    }
}

// Function to filter job items based on selected tags
function filterJobItems() {
    if (filters.length === 0) {
        createJobItems(jobData);
    } else {
        const filteredData = jobData.filter(job => {
            const jobTags = [
                job.role, 
                job.level, 
                ...job.languages, 
                ...job.tools
            ];
            return filters.every(filter => jobTags.includes(filter));
        });
        createJobItems(filteredData);
    }
}
