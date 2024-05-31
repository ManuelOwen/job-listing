document.addEventListener('DOMContentLoaded', () => {
    const tags = document.querySelectorAll('.tag');
    const jobItems = document.querySelectorAll('.item');
    const selectedTags = new Set();

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            const tagText = tag.textContent.toLowerCase();

            // Toggle tag selection
            if (selectedTags.has(tagText)) {
                selectedTags.delete(tagText);
                tag.classList.remove('selected');
            } else {
                selectedTags.add(tagText);
                tag.classList.add('selected');
            }

            // Filter job listings
            jobItems.forEach(item => {
                const itemTags = Array.from(item.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase());
                const isVisible = Array.from(selectedTags).every(selectedTag => itemTags.includes(selectedTag));

                item.style.display = isVisible ? 'block' : 'none';
            });

            // Show all items if no tags are selected
            if (selectedTags.size === 0) {
                jobItems.forEach(item => {
                    item.style.display = 'block';
                });
            }
        });
    });
});
