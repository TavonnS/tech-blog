const editButtons = document.querySelectorAll('#edit-button');
const editFormContainer = document.getElementById('edit-form-container');
const cancelButton = document.getElementById('cancel');

editButtons.forEach((editButton) => {
  editButton.addEventListener('click', () => {
    editFormContainer.style.display = 'block';

    const postId = editButton.parentNode.querySelector('a').getAttribute('href').split('/').pop();
    const updateButton = editFormContainer.querySelector('#update-button');
    updateButton.setAttribute('href', `/api/posts/${postId}`);
  });
});

cancelButton.addEventListener('click', () => {
  editFormContainer.style.display = 'none';
});

const updateButton = document.getElementById('update-button');

updateButton.addEventListener('click', (event) => {
  event.preventDefault();

  const postId = event.target.getAttribute('href').split('/').pop();
  const updatedTitle = document.getElementById('edit-name').value;
  const updatedContent = document.getElementById('edit-content').value;

  const updatedPostData = {
    title: updatedTitle,
    content: updatedContent,
  };

  console.log(updatedPostData, postId);

  fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPostData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Perform any necessary actions after updating the post
      window.location.reload();
    })
    .catch((error) => {
      console.error(error);
      // Handle any errors that occur during the request
    });
});