import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { db, auth } from '../../firebase';
import {
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from 'firebase/firestore';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function AddContact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);
  const [existingContacts, setExistingContacts] = useState([]);

  useEffect(() => {
    fetchExistingContacts();
  }, []);

  const fetchExistingContacts = async () => {
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData && userData.contacts) {
          setExistingContacts(userData.contacts);
        }
      }
    } catch (error) {
      console.error('Error fetching existing contacts:', error);
    }
  };

  const handleNameChange = e => {
    setName(e.target.value);
    validateForm();
  };

  const handlePhoneChange = e => {
    setPhone(e.target.value);
    validateForm();
  };

  const validateForm = () => {
    const isPhoneValid = /^\d+$/.test(phone);
    if (name && isPhoneValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    setIsPhoneInvalid(!isPhoneValid && phone !== '');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isValid) {
      Notify.failure(
        'Name and phone number are required and phone number should not contain letters.'
      );
      return;
    }

    const contact = {
      name,
      phone,
    };

    if (existingContacts.some(contact => contact.name === name)) {
      Notify.failure('Contact with the same name already exists.');
      return;
    }

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        contacts: arrayUnion(contact),
      });

      setName('');
      setPhone('');
      setIsValid(false);
      setIsPhoneInvalid(false);

      setExistingContacts([...existingContacts, { name, phone }]);

      Notify.success('Contact added successfully.');

    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: '0 auto',
        padding: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" component="h2">
        Add Contact
      </Typography>
      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        margin="normal"
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        fullWidth
        label="Phone Number"
        variant="outlined"
        margin="normal"
        value={phone}
        onChange={handlePhoneChange}
        inputProps={{
          pattern: '[0-9]*',
        }}
        onInvalid={() => setIsPhoneInvalid(true)}
        error={isPhoneInvalid}
        helperText={
          isPhoneInvalid ? 'Phone number should only contain digits.' : ''
        }
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!isValid}
        onClick={handleSubmit}
      >
        Add Contact
      </Button>
    </Box>
  );
}
