import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';



const Signup = () => {      ///where does this come from?
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {          ///where does this come from?
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  
  const handleFormSubmit = async (event) => { ///where does this come from?
    event.preventDefault();
  

   try {
    
    const { data } = await addUser({
      variables: { ...formState },
    });

    Auth.login(data.addUser.token);
  } catch (e) {
    console.error(e);
  }
};
}

return (
<main>    
</main>

);
