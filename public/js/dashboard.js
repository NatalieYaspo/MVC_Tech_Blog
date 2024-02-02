const newFormHandler = async (event) => {
    event.preventDefault();
    alert('submit button pushed');
    
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    console.log(title);
    
    if (title && content) {
        const response = await fetch(`/api/blogPosts`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create blog post');
        }
    }
};

const delButtonHandler = async (event) => {
    event.preventDefault();
    alert('delete button pushed'); //works!
    
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        
        const response = await fetch(`/api/blogPosts/${id}`, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete blog post');
        }
    }
};

const updateFormHandler = async (event) => {
    event.preventDefault();
    // alert('update button pushed'); //Works!
    
    var updateFormEl = document.querySelector('.update');
    var createNewFormEl = document.querySelector('.blog-form');
    // console.log(updateFormEl);
    updateFormEl.classList.remove("hide");
    createNewFormEl.classList.add("hide");
};

const updateButtonHandler = async (event) => {
    event.preventDefault();
    alert('update button pushed'); //Works!
    
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogPosts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update blog post');
        }
    }
    createNewFormEl.classList.remove("hide");
};

document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('#delete-btn')
    .addEventListener('click', delButtonHandler);

document
    .querySelector('#update-btn')
    .addEventListener('click', updateFormHandler);

document
    .querySelector('#submit-update-btn')
    .addEventListener('click', updateButtonHandler);
