const signupFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (email && password) {
        console.log(email, password);
        const response = await fetch('/api/users', {
            method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
        document.location.replace('/dashboard');
        }
        alert(response.statusText);
        
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);