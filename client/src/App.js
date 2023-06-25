import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Configure axios to use the backend URL
axios.defaults.baseURL = 'http://localhost:5000';


function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '', email: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/api/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };
  

  const addContact = async () => {
    try {
      const response = await axios.post('/api/contacts', newContact);
      setContacts([...contacts, response.data]);
      setNewContact({ name: '', phone: '', email: '' });
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };
  
  
  const deleteContact = async (phone) => {
    try {
      await axios.delete(`/api/contacts/phone/${phone}`);
      setContacts(contacts.filter((contact) => contact.phone !== phone));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/contacts/search', {
        params: { q: searchQuery },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching contacts:', error);
    }
  };
  

  return (
    <div>
      <h1>Contact Management</h1>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
        />
        <button type="button" onClick={addContact}>Add Contact</button>
      </form>

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name"
        />
        <button type="submit">Search</button>
      </form>


      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <strong>Name:</strong> {contact.name}<br />
            <strong>Phone:</strong> {contact.phone}<br />
            <strong>Email:</strong> {contact.email}<br />
            <button type="button" onClick={() => deleteContact(contact.phone)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
