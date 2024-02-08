document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.create-post');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.querySelector('#post-name').value;
    const content = document.querySelector('#post-content').value;
    const author =  document.querySelector('#post-author').value;

    fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        content: content,
        author: author
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response);
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        console.log(response.statusText);
        alert('Failed to create post');
      }
    })
    .catch(err => console.log(err));
  });
});