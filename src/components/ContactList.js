import ContactListItem from './ContactListElement';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredContacts, deleteContact } from '../redux/contactsSlice';
import css from '../App.module.css';

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => (
        <ContactListItem
          key={id}
          name={name}
          number={number}
          id={id}
          onDelete={() => handleDeleteContact(id)}
        />
      ))}
    </ul>
  );
}
