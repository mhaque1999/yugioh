// import React, { useState } from 'react';
// import { useAuth } from './AuthContext';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Login form submitted with:', { username, password });
//     try {
//       await login(username, password);
      
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//       <h2>Login</h2>
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
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import { useAuth } from './AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted with:', { username, password });
    try {
      await login(username, password);
      setErrorMessage(''); // Clear any previous error messages on successful login
    } catch (error) {
      console.error('Login error:', error.message);
      setErrorMessage('Invalid username or password'); // Set error message on login failure
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
