import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://645774181a4c152cf982582a.mockapi.io/',
});

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await api.get('/contacts');
    return response.data;
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    const response = await api.post('/contacts', contact);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    await api.delete(`/contacts/${id}`);
    return id;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    filter: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchContacts.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    });
    builder.addCase(fetchContacts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(addContact.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });

    builder.addCase(deleteContact.fulfilled, (state, action) => {
      const index = state.items.findIndex(
        contact => contact.id === action.payload
      );
      state.items.splice(index, 1);
    });
  },
});

export const { setFilter } = contactsSlice.actions;

export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.contacts.filter;
export const selectFilteredContacts = state => {
  const filter = state.contacts.filter.toLowerCase();
  return state.contacts.items.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );
};

export default contactsSlice.reducer;
