import './App.css';
import React, { useState } from 'react'
import axios from 'axios';

function App() {

  const URL = `http://localhost:3030/api/`;

  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    marital_status: "",
    personal_id: "",
    sum: "",
    birthday: "",
  });
  const [items, setItems] = useState([{
    _id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    createdAt: "",
  }])


  const handleSubmit = (event) => {
    event.preventDefault();
    id.length !== 9 || isNaN(id) ? setError("Personal Id Should be 9 numbers only") : success();
  }

  const handleChange = (event) => {
    setId(event.target.value);
  }

  const success = async () => {
    setError("");
   const response = await axios.get(`${URL}users/${id}`);

   if (response.status !== 200){
    setError("something went wrong fetching your account")
   }

   if (response.data.user || response.data.items) {
    handleStates(response)
   }
  }

  const handleStates = (response) => {
    makeUser(response.data.user)
    makeItems(response.data.items)
  }

  const makeUser = (userData) => {
    setUser(prevState => {
      let newUser = Object.assign({}, prevState.user);
      newUser.first_name = userData.first_name; 
      newUser.last_name = userData.last_name;
      newUser.marital_status = userData.marital_status;
      newUser.personal_id = userData.personal_id;
      newUser.birthday = userData.birthday;
      newUser.sum = userData.sum;
      return newUser; 
    })
  }

  const makeItems = (itemsData) => {
    setItems(itemsData);
  }

  const renderedItems = items.map((item, index) => {
    console.log(item);
    return (
      <tr>
        <th>{item._id}</th>
        <th>{item.name}</th>
        <th>{item.category}</th>
        <th>{item.description}</th>
        <th>{item.price}</th>
        <th>{item.createdAt}</th>
        <th><button>Delete</button></th>
      </tr>
    )
  })

  console.log(items);

  return (
    <div className="App">
      <h1>Async final project</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Personal ID: {' '}
          <input type="text" onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p className='red'>{error}</p>
      <div>
        <p>Personal_id: {user.personal_id}</p>
        <p>First Name: {user.first_name}</p>
        <p>Last Nam: {user.last_name}</p>
        <p>Birthday: {user.birthday}</p>
        <p>Marital Status: {user.marital_status}</p>
        <p className='bold'>Sum so far: {user.sum}</p>
      </div>
      <div>
      <table className='myTable'>
   <tbody>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Category</th>
        <th>Description</th>
        <th>Price</th>
        <th>CreatedAt</th>
        <th>Action</th>
      </tr>
      {user.personal_id ? 
        renderedItems
      : ""}
   </tbody>
   </table>
      </div>
    </div>
  );
}

export default App;
