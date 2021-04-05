const addPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const content = document.querySelector('#postContent').value.trim();

    if (title && content) {
        console.log('any inpit', title,content);

        const response = await fetch('/api/blogpost', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-type': 'application/json'
            },
        });
    if (response.ok) {
        document.location.replace('/dashboard');
    }   else {
        alert('Failed to create post');
    }
}
};

document
    .querySelector("#newPostForm")
    .addEventListener('submit', addPost );