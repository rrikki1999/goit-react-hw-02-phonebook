import React, { useState, useReducer } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList';
import filterContacts from './filterContacts';
import Notiflix from 'notiflix';
import styles from './ContactForm.module.css';

const contactsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return [...state, action.payload];
    case 'DELETE_CONTACT':
      return state.filter(contact => contact.id !== action.payload);
    default:
      return state;
  }
};

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [contacts, dispatchContacts] = useReducer(contactsReducer, [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSearch = (e) => {
    setFilter(e.target.value.trim().toLowerCase());
  };

  const filteredContacts = filterContacts(contacts, filter);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };

    if (contacts.some(contact => contact.name === newContact.name)) {
      Notiflix.Notify.warning(`${newContact.name} is already in your contacts`);
    } else if (newContact.name !== '') {
      dispatchContacts({ type: 'ADD_CONTACT', payload: newContact });
      setName('');
      setNumber('');
    }
  };

  const deleteContact = (id) => {
    dispatchContacts({ type: 'DELETE_CONTACT', payload: id });
  };

  return (
    <div className={styles.formContainer}>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h3>Name</h3>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          required
        />
        <h3>Number</h3>
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleNumberChange}
          pattern="[0-9]{6,}"
          required
        />
        <button type="submit"  className={`${styles.addContactButton} ${styles.button}`}>Add Contact</button>
      </form>
      <div>
        <h2>Contacts</h2>
        <h3>Find contacts by name</h3>
        <input
          type="text"
          name="filter"
          onChange={handleSearch}
          value={filter}
          placeholder="Search contacts"
          className={styles.input}
        />
        <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
      </div>
    </div>
  );
};

export default ContactForm;
