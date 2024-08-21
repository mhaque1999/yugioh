// import React, { useState } from 'react';
// import { useAuth } from './AuthContext';

// function Signup() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { register } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await register(username, password);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//       <h2>Signup</h2>
//         <label>Username:</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// }

// export default Signup;

import React, { useState } from 'react';
import { useAuth } from './AuthContext';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Add state for error messages
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    try {
      await register(username, password);
    } catch (error) {
      console.error('Signup error:', error.message);
      setErrorMessage('Username has been taken'); // Set the error message to display
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;


