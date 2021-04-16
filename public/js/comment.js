const addPost = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#commentContent').value.trim();
    const post_id = document.querySelector('#post_id').value.trim();
    if (comment_text && post_id ) {


        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_text, post_id }),
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
    .querySelector("#commentForm")
    .addEventListener('submit', addPost );