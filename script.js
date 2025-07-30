let posts = [];

// Load posts from localStorage when page loads
function loadPosts() {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
        posts = JSON.parse(savedPosts);
        displayPosts();
    }
}

// Save posts to localStorage
function savePosts() {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
}

// Load posts when page loads
document.addEventListener('DOMContentLoaded', loadPosts);

document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    
    // Simple validation
    if (!title || !content) {
        alert('Please fill in both fields');
        return;
    }
    
    // Construct the post object
    const post = { title, content };
    
    // Add the post
    addPost(post);
    displayPosts();
    savePosts(); // Save to localStorage after adding
    
    // Clear form after successful submission
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
});

function addPost(post) {
    posts.push(post);
}

function displayPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button onclick="deletePost(${index})">Delete</button>
        `;
        postsContainer.appendChild(postElement);
    });
}

function deletePost(index) {
    posts.splice(index, 1);
    displayPosts();
    savePosts(); // Save to localStorage after deleting
}
const toggle = document.getElementById('darkModeToggle');
const body = document.body;

// Load saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
}

toggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
