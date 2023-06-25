const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Helper function to read contacts from JSON file
function readContactsFromFile() {
  const contactsData = fs.readFileSync('./data/contacts.json');
  return JSON.parse(contactsData);
}

// Helper function to write contacts to JSON file
function writeContactsToFile(contacts) {
  fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts, null, 2));
}

// GET /api/contacts - Retrieve all contacts
app.get('/api/contacts', (req, res) => {
  const contacts = readContactsFromFile();
  res.json(contacts);
});

// GET /api/contacts/:phone - Retrieve a specific contact by phone number
app.get('/api/contacts/:phone', (req, res) => {
    const contacts = readContactsFromFile();
    const contact = contacts.find((c) => c.phone === req.params.phone);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  });

// POST /api/contacts - Create a new contact
app.post('/api/contacts', (req, res) => {
  const contacts = readContactsFromFile();
  const newContact = req.body;
  contacts.push(newContact);
  writeContactsToFile(contacts);
  res.json(newContact);
});

// PUT /api/contacts/:phone - Update an existing contact
app.put('/api/contacts/:phone', (req, res) => {
  const contacts = readContactsFromFile();
  const contactIndex = contacts.findIndex((c) => c.phone === req.params.phone);
  if (contactIndex !== -1) {
    const updatedContact = { ...contacts[contactIndex], ...req.body };
    contacts[contactIndex] = updatedContact;
    writeContactsToFile(contacts);
    res.json(updatedContact);
  } else {
    res.status(404).json({ error: 'Contact not found' });
  }
});

// DELETE /api/contacts/phone/:phone - Delete a contact
app.delete('/api/contacts/phone/:phone', (req, res) => {
    const phone = req.params.phone;
    // Find the contact with the specified phone number and delete it from the data store
    // ...
  
    res.sendStatus(204); // Send a success status code (204: No Content)
  });
  
// SEARCH
  app.get('/api/contacts/search', (req, res) => {
    const searchQuery = req.query.q; // Get the search query from the query parameters
    // Implement the logic to search for contacts by name in the data store
    
  
    res.json(searchedContacts); // Send the searched contacts as a JSON response
  });

  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
