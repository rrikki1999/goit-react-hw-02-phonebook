import React, { useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

export const App = () => {
  const [contacts, setContacts] = useState([]);

  const addContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  return (
    <div>
      <ContactForm addContact={addContact} />
      <ContactList contacts={contacts} />
    </div>
  );
};
