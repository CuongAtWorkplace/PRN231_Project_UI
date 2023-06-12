
// import React, { userState ,Component ,handleLogin,handlePasswordChange,handleUsernameChange} from "react";
// // import jwt from 'jsonwebtoken'



// export class Login extends Component {
  
//     LoginFrom = () =>{
//     const [username ,setUsername] = userState('');
//     const [password ,setPassword] = userState('');

//     const handleUsernameChange  = (e) =>{
//       setUsername(e.target.value);
//     };

//     const handlePasswordChange = (e) =>{
//       setPassword(e.target.value);
//     };
    
//     const handleLogin = async (e) =>{
//       e.preventDefaulf();
//     }

//     try{
//       const response =  fetch ('https://localhost:7248/api/Login',{
//         method:'POST',
//         headers:{
//           'Content-Type':'application/json'
//         },
//         body:JSON.stringify({username,password})
//       });
//       if(response.ok){
//         console.log("ok");
//       }

//       const data = response.json();
//       localStorage.setItem('token',data.token);
//       setUsername('');
//       setPassword('');
//     }catch(error){
//       console.error(error);
//     }
// };
// //   getProtectedData = async () => {
// //   try {
// //     const token = localStorage.getItem('token');

// //     if (!token) {
// //       console.log('User not logged in');
// //       return;
// //     }

// //     const response = await fetch('https://your-api-url/api/protected-data', {
// //       headers: {
// //         'Authorization': `Bearer ${token}`
// //       }
// //     });

// //     if (!response.ok) {
// //       throw new Error('Request failed');
// //     }

// //     const data = await response.json();

// //     console.log(data);
// //   } catch (error) {
// //     console.error(error);
// //   }
// // };


// render() {
//   var{username,password} = this;
//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <label>
//           Username:
//           <input type="text" value={username} onChange={handleUsernameChange} />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input type="password" value={username} onChange={handlePasswordChange} />
//         </label>
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
//   }
// }
// export default Login;


import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://localhost:7248/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        
        // Lưu token vào localStorage hoặc session storage
        localStorage.setItem('token', token);
        
        // Đăng nhập thành công, chuyển hướng hoặc thực hiện các hành động khác
        console.log('Đăng nhập thành công');
      } else {
        // Xử lý lỗi đăng nhập, hiển thị thông báo lỗi cho người dùng
        console.log('Đăng nhập thất bại');
      }
    } catch (error) {
      // Xử lý lỗi gọi API
      console.log('Lỗi gọi API', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
};

export default Login;