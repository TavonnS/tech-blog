// Get all delete buttons
const deleteButtons = document.querySelectorAll('#delete');

// Add event listener to each delete button
deleteButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();

    // Get the post ID from the href attribute
    const postId = button.querySelector('a').getAttribute('href').split('/').pop();
    console.log(postId);

    // Send a DELETE request to the server API endpoint
    fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // If the delete request is successful, refresh the page
          window.location.reload();
        } else {
          // If the delete request fails, display an error message
          console.error('Failed to delete post');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
});