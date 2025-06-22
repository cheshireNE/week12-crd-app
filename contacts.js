// Get form and input field references
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name-input');
const bookInput = document.getElementById('book-input');
const phoneInput = document.getElementById('phone-input');
const list = document.getElementById('contact-list');

// API base URL
const baseURL = 'http://localhost:3000/contacts';

// Load contacts when page loads
function loadContacts() {
  fetch(baseURL)
    .then(res => res.json())
    .then(contacts => {
      list.innerHTML = ''; // Clear old list
      contacts.forEach(renderContact); // Add each contact
    });
}

// Render one contact in the list
function renderContact(contact) {
  const li = document.createElement('li');
  li.className = 'list-group-item';

  li.innerHTML = `
    <strong>${contact.name}</strong><br>
    Book: ${contact.book}<br>
    Phone: ${contact.phone}
    <button class="btn btn-danger btn-sm float-end mt-2" onclick="deleteContact(${contact.id})">X</button>

  `;

  list.appendChild(li);
}

// Handle form submission
contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const newContact = {
    name: nameInput.value.trim(),
    book: bookInput.value.trim(),
    phone: phoneInput.value.trim()
  };

  // Post to API
  fetch(baseURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newContact)
  })
    .then(res => res.json())
    .then(added => {
      renderContact(added); // Show new contact
      contactForm.reset();         // Clear form
    });
});

// Delete a contact
function deleteContact(id) {
  fetch(`${baseURL}/${id}`, {
    method: 'DELETE'
  }).then(loadContacts);
}
window.deleteContact = deleteContact;

// Initial load
loadContacts();

// Make deleteContact available to HTML buttons
window.deleteContact = deleteContact;
