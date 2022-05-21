import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const URL = `http://localhost:3030/api/`;

  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    marital_status: "",
    personal_id: "",
    sum: "",
    birthday: "",
  });
  const [items, setItems] = useState([
    {
      _id: "",
      name: "",
      description: "",
      price: "",
      category: "",
      createdAt: "",
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    id.length !== 9 || isNaN(id)
      ? setError("Personal Id Should be 9 numbers only")
      : success();
  };

  const handleChange = (event) => {
    setId(event.target.value);
  };

  const success = async () => {
    setError("");
    const response = await axios.get(`${URL}users/${id}`);

    if (response.status !== 200) {
      setError("something went wrong fetching your account");
    } else {
      setError("");
    }

    if (response.data.user || response.data.items) {
      handleStates(response);
    }
  };

  const handleStates = (response) => {
    makeUser(response.data.user);
    makeItems(response.data.items);
  };

  const makeUser = (userData) => {
    setUser((prevState) => {
      let newUser = Object.assign({}, prevState.user);
      newUser.first_name = userData.first_name;
      newUser.last_name = userData.last_name;
      newUser.marital_status = userData.marital_status;
      newUser.personal_id = userData.personal_id;
      newUser.birthday = userData.birthday;
      newUser.sum = userData.sum;
      return newUser;
    });
  };

  const makeItems = (itemsData) => {
    setItems(itemsData);
  };

  const deleteItem = async (itemId, personalId) => {
    const response = await axios.post(`${URL}costs/deleteItem`, {
      id: itemId,
      personal_id: personalId,
    });

    if (response.status !== 200) {
      setError("something went wrong deleting the item");
    } else {
      setError("");
    }
    setUser((prevState) => {
      let newUser = Object.assign({}, prevState.user);
      newUser.first_name = prevState.first_name;
      newUser.last_name = prevState.last_name;
      newUser.marital_status = prevState.marital_status;
      newUser.personal_id = prevState.personal_id;
      newUser.birthday = prevState.birthday;
      newUser.sum = response.data.user.sum - response.data.item.price;
      return newUser;
    });
    makeItems(response.data.items);
  };

  const renderedItems = items.map((item, index) => {
    return (
      <tr key={item._id}>
        <th>{item._id}</th>
        <th>{item.name}</th>
        <th>{item.category}</th>
        <th>{item.description}</th>
        <th>{item.price}</th>
        <th>{item.createdAt}</th>
        <th>
          <button onClick={() => deleteItem(item._id, item.createdBy)}>
            Delete
          </button>
        </th>
      </tr>
    );
  });

  const handleAddItem = (event) => {
    console.log(event.target);
    event.preventDefault();
  };

  return (
    <div className="App">
      <h1>Async final project</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Personal ID: <input type="text" onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p className="red">{error}</p>
      {user.first_name ? (
        <div>
          <p>Personal_id: {user.personal_id}</p>
          <p>First Name: {user.first_name}</p>
          <p>Last Nam: {user.last_name}</p>
          <p>Birthday: {user.birthday}</p>
          <p>Marital Status: {user.marital_status}</p>
          <p className="bold">Sum prices: {user.sum}</p>
        </div>
      ) : (
        ""
      )}
      <div>
        <button>All</button>
        <button>Year</button>
        <button>Month</button>
      </div>
      <div>
        <div>
          <form onSubmit={handleAddItem}>
            <label for="fname">name:</label>
            <br />
            <input type="text" id="name" name="name" />
            <br />
            <label for="fname">description:</label>
            <br />
            <input type="text" id="description" name="description" />
            <br />
            <label for="fname">price:</label>
            <br />
            <input type="text" id="price" name="price" />
            <br />
            <label for="fname">category:</label>
            <br />
            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
            <br />

            <input type="submit" value="Submit"></input>
          </form>
        </div>
      </div>
      <div>
        {user.personal_id ? (
          <>
            <table className="myTable">
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
                {renderedItems}
              </tbody>
            </table>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
