const newFormHandler = async (event) => {
    event.preventDefault();
    
    
    const title = document.querySelector('#new-blog-title').value.trim();
    const content = document.querySelector('#new-blog-content').value.trim();
    console.log(document.querySelector('#new-blog-content').value.trim());
    alert('submit button pushed'); //works
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

const createButtonHandler = async (event) => {
    event.preventDefault();
    // alert('update button pushed'); //Works!
    
    var createNewFormEl = document.querySelector('.blog-form');
    var createButtonEl = document.querySelector('#create-blog-btn');
    // console.log(updateFormEl);
    createNewFormEl.classList.remove("hide");
    createButtonEl.classList.add("hide");
};

const delButtonHandler = async (event) => {
    event.preventDefault();
    // alert('delete button pushed'); //works!
    
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
    var updateBtnEl = document.querySelector('#update-btn');
    // console.log(updateFormEl);
    updateFormEl.classList.remove("hide");
    createNewFormEl.classList.add("hide");
    updateBtnEl.classList.add("hide");
};

const updateButtonHandler = async (event) => {
    event.preventDefault();
    // alert('update button pushed'); //Works!

    const title = document.querySelector('#blog-title').value;
    const content = document.querySelector('#blog-content').value;
    console.log(title);
    
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        // console.log('event target:', event.target);
        // console.log('id:', id);

        const response = await fetch(`/api/blogPosts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update blog post');
        }
    }
    createNewFormEl.classList.remove("hide");
};

document
    .querySelector('#create-blog-btn')
    .addEventListener('click', createButtonHandler);

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
