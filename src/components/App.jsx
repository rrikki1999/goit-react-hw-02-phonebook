import { Component } from 'react';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  addNewContact = (name, number) => {
    const isInContacts = this.state.contacts.some(
      contact => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [
        {
          id: nanoid(),
          name,
          number,
        },
        ...prevState.contacts,
      ],
    }));
  };

  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.trim().toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filterContacts = this.filterContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addNewContact={this.addNewContact} />
        <h2>Contacts</h2>
        {this.state.contacts.length > 0 ? (
          <>
            <Filter value={filter} onChangeFilter={this.changeFilter} />
            <ContactList
              contacts={filterContacts}
              onRemoveContact={this.removeContact}
            />
          </>
        ) : (
          <p>
            Your phonebook is empty. Add first contact!
          </p>
        )}
      </div>
    );
  }
}