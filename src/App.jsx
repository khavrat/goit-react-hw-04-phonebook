import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import ContactFilter from './components/ContactFilter/ContactFilter';
import { Phonebook, PhonebookTitle, ContactsTitle } from './App.styled';

const LS_KEY = 'Contacts';

function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem(LS_KEY)) ?? '';
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleCreateContact = newContact => {
    const searchedContact = contacts.find(
      contact =>
        contact.name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()
    );
    if (searchedContact) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      setContacts(prevState => {
        return [newContact, ...prevState];
      });
    }
  };

  const deleteContact = contactId => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== contactId);
    });
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return Array.isArray(contacts)
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
      : [];
  };
  const contactsList = visibleContacts();

  return (
    <Phonebook>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <ContactForm onCreateContact={handleCreateContact} />

      <ContactsTitle>Contacts</ContactsTitle>
      <ContactFilter
        filter={filter}
        changeFilter={changeFilter}
      ></ContactFilter>

      <ContactList
        visibleContacts={contactsList}
        onDeleteContact={deleteContact}
      />
    </Phonebook>
  );
}

export default App;
