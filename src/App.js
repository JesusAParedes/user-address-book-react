import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import UserCard from './UserCard';

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
          return <UserCard 
          first={user.name.first} 
          last={user.name.last} 
          pic={user.picture.large} 
          index={index}
          isHidden= {isHidden}
          currentUser= {currentUser}
          email={user.email}
          phone={user.phone}
          age={user.dob.age}
          handleClick={handleClick}
          />
        }
        )}
      </header>
    </div>
  );
}

export default Users;
