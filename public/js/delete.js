const deletePost = async (event) => {
    event.preventDefault();
    const id = document.querySelector('#post_id').value.trim();

    const response = await fetch(`/api/blogpost/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete Post')
    }
};

document.querySelector('#delete-btn').addEventListener('click', deletePost)