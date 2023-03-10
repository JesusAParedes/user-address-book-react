import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';

function Users() {
 const [users, setUsers] = useState([]);
 const [isHidden, setIsHidden] = useState(false);
 const [currentUser, setCurrentUser] = useState('');

 const handleClick = (index) => {
  let clickedUser = index
  setCurrentUser(clickedUser)
  
  let status = isHidden === true ? false : true;
  setIsHidden(status);
};

 useEffect(() => {
  fetch('https://randomuser.me/api?results=25')
    .then(res => {
      return res.json()
    })
    // update state with setUsers 
    .then(user => {setUsers(user.results)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        {users.map((user, index) => {
          return <div>
            <img src={user.picture.medium} alt='user'/>
          <li key={index}>{user.name.first} {user.name.last}
          {isHidden && currentUser === index ? <div> 
          <p>E-mail: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Age: {user.dob.age}</p> 
          </div> : 
          <div></div>}
          
          <button onClick={() => handleClick(index)}>{isHidden && currentUser === index ? 'Hide Details' : 'Show Details'}</button>
          </li>
          </div>
        })}
      </header>
    </div>
  );
}

export default Users;
