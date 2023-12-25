import React, { Component } from 'react';
import { nanoid } from 'nanoid';
// import css from './ContactForm.module.css'; // Assuming you have a ContactForm.module.css file

// Assuming styles is imported from './ContactForm.module.css'
import styles from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onSubmitForm = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const { name, number } = form.elements;

    this.props.addNewContact(name.value, number.value);
    this.resetForm();
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.contactForm} action="" onSubmit={this.onSubmitForm}>
        <label htmlFor={nanoid()} className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
          />
        </label>
        <label htmlFor={nanoid()} className={styles.label}>
          Number
          <input
            className={styles.input}
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChange}
            required
          />
        </label>

        <button className={styles.addButton} type="submit">
          add contact
        </button>
      </form>
    );
  }
}
