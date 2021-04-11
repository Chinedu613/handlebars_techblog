const editPost = async (event) => {
    event.preventDefault();
    // Grabs the inputs of the post
    const title = document.querySelector('#editTitle').value.trim();
    const content = document.querySelector('#editContent').value.trim();
    // Grabs the id of the post 
    const id = document.querySelector('#post_id').value.trim();

    if(title && content) {
        const response = await fetch(`/api/blogpost/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-type': 'application/json'
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to edit post!');
        }
    }
};

document.querySelector('#EditForm').addEventListener('submit', editPost);