'use client'
import { useState } from 'react';

import { useRouter } from 'next/navigation';

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/authen/regi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.error) {
      
        console.error(result.error);
        alert(result.error);
      } else {
      
        router.push('/LoginPage');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;




















// 'use client'
// import { useState } from 'react';

// const UserForm = () => {
//   const [formData, setFormData] = useState({
//     id: '',
//     firstname: '',
//     lastname: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const response = await fetch('/api/authen/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       window.location.href = '/login'; // Redirect to login page
//     } else {
//       console.error(data.error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* <div>
//         <label>
//           ID:
//           <input type="text" name="id" value={formData.id} onChange={handleChange} />
//         </label>
//       </div> */}
//       <div>
//         <label>
//           First Name:
//           <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
//         </label>
//       </div>
//       <div>
//         <label>
//           Last Name:
//           <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
//         </label>
//       </div>
//       <div>
//         <label>
//           Email:
//           <input type="email" name="email" value={formData.email} onChange={handleChange} />
//         </label>
//       </div>
//       <div>
//         <label>
//           Password:
//           <input type="password" name="password" value={formData.password} onChange={handleChange} />
//         </label>
//       </div>
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default UserForm;


// 'use client'
// import React, { useState } from 'react';

// import { useRouter } from 'next/navigation';

// const UserForm: React.FC = () => {
//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const response = await fetch('/api/authen/regi', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();

//     if (result.error) {
//       // Handle API errors
//       console.error(result.error);
//       alert(result.error);
//     } else {
//       // Redirect to login page
//       router.push('/login');
//     }
//  }   catch (error) {
//      console.error('An error occurred:', error);
//      alert('An error occurred while submitting the form.');
//   }
// };

  //   if (response.ok) {
  
  //     router.push('/LoginPage');
  //   } else {
  //     // Show error message
  //     setError(result.error || 'An error occurred.');
  //   }
  // };

//   return (
//     <div>
//       <h1>Register</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="firstname"
//           placeholder="First Name"
//           value={formData.firstname}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="lastname"
//           placeholder="Last Name"
//           value={formData.lastname}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default UserForm;

















