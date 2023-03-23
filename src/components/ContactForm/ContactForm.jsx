import { useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { Form, FormInput, FormLabel, FormBtn } from './ContactForm.styled';

function ContactForm({ onCreateContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

 const handleChange = e => {
    console.log(e.currentTarget.value);
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.log('input value: error');
        return;
    }
  };

 const reset = () => {
    setName('')
    setNumber('')
  };

  const getNewContact = () => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };
    return newContact;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newContact = getNewContact();
    onCreateContact(newContact);

    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel htmlFor="name">Name</FormLabel>
      <FormInput
        className="input"
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        onChange={handleChange}
        required
      />
      <FormLabel htmlFor="number">Number</FormLabel>
      <FormInput
        className="input"
        type="tel"
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        onChange={handleChange}
        required
      />
      <FormBtn type="submit">Add contact</FormBtn>
    </Form>
  );
}

export default ContactForm;

ContactForm.propTypes = {
  onCreateContact: PropTypes.func.isRequired,
};
