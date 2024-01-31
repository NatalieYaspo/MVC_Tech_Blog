const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    if (title && content) {
        const response = await fetch(`/api/blogPosts`, {
            method: 'POST',
            body: JSON.stringify({ title, content, user_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/blogPosts');
        } else {
            alert('Failed to create blog post');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogPosts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/blogPosts');
        } else {
            alert('Failed to delete blog post');
        }
    }
};

document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.blog-list')
    .addEventListener('click', delButtonHandler);
