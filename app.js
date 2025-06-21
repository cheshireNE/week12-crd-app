// Get references to HTML elements: the form, input field, and list container
const form = document.getElementById('item-form');
const input = document.getElementById('item-input');
const list = document.getElementById('item-list');

// Base URL for the JSON server API
const baseURL = 'http://localhost:3001/items';

/**
 * Fetch all items from the API and display them in the list
 */
function loadItems() {
  fetch(baseURL)
    .then(res => res.json())         // Convert response to JSON
    .then(items => {
      list.innerHTML = '';          // Clear the list before adding new items
      items.forEach(item => renderItem(item));  // Render each item
    });
}

/**
 * Render a single item in the list with a delete button
 * @param {Object} item - An object with at least an `id` and `name`
 */
function renderItem(item) {
  const li = document.createElement('li');         // Create list item
  li.textContent = item.name;                      // Set text to item name
  li.className = 'list-group-item';                // Apply Bootstrap styling

  const delBtn = document.createElement('button'); // Create delete button
  delBtn.textContent = 'X';                        // Label it with "X"
  delBtn.className = 'btn btn-danger btn-sm float-end'; // Style the button
  delBtn.onclick = () => deleteItem(item.id);      // Add click handler

  li.appendChild(delBtn);                          // Add delete button to list item
  list.appendChild(li);                            // Add list item to the page
}

/**
 * Handle form submission to add a new item
 */
form.addEventListener('submit', e => {
  e.preventDefault();                               // Prevent page reload
  const newItem = { name: input.value };            // Create item object

  fetch(baseURL, {
    method: 'POST',                                 // Use POST to add new item
    headers: { 'Content-Type': 'application/json' },// Set content type
    body: JSON.stringify(newItem),                  // Convert object to JSON
  })
    .then(res => res.json())                        // Get the created item back
    .then(addedItem => {
      renderItem(addedItem);                        // Render new item on the list
      form.reset();                                 // Clear form input
    });
});

/**
 * Delete an item from the list and API
 * @param {number} id - ID of the item to delete
 */
function deleteItem(id) {
  fetch(`${baseURL}/${id}`, {
    method: 'DELETE',                              // Use DELETE method
  }).then(() => loadItems());                      // Refresh the list after deletion
}

// Load all items on initial page load
loadItems();
