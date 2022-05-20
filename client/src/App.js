import './App.css';
import React, { useState } from 'react'
import axios from 'axios';

function App() {

  const [id, setId] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  }

  const handleChange = (event) => {
    console.log(event.target.value);
    //setId({value: event.target.value});
  }


  return (
    <div className="App">
      <h1>Hello</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={id} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
