const Post = require('../models/Post');


document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.create.post');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const postTitle = document.getElementById('post-name').value;
      const postContent = document.getElementById('post-content').value;
      const postAuthor = document.getElementById('post-author').value;     

      const postData = {
        title: postTitle,
        content: postContent,
        author: postAuthor, 
      };

      fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Handle the response from the server, e.g., show a success message
          console.log('Post created successfully:', data);
        })
        .catch(error => {
          // Handle errors, e.g., show an error message
          console.error('Error creating post:', error.message);
        });
    });
  });

