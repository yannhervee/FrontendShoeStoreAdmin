import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import useRedirectIfLoggedIn from "../components/useRedirectIfLoggedIn";

const RegistrationPage = () => {
    useRedirectIfLoggedIn();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [emailExists, setEmailExists] = useState(false);
    const router = useRouter();

      // Helper function to check if the password meets the criteria
      const isValidPassword = password => {
        return password.length >= 8 && /[A-Z]/.test(password);
    };

    // Check if all form fields meet the requirements for enabling the submit button
    const isFormValid = () => {
        return email && firstName && lastName && isValidPassword(password) && password === confirmPassword && !emailExists;
    };

    const validateField = () => {
        let newErrors = {};
    
        // Validate First Name
        if (!firstName.trim()) {
            newErrors.firstName = 'First name is required.';
        }
    
        // Validate Last Name
        if (!lastName.trim()) {
            newErrors.lastName = 'Last name is required.';
        }
    
        // Validate Email
        if (!email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid.';
        }
    
        // Validate Password
        if (password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long.';
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = 'Password must contain at least one uppercase letter.';
        }
    
        // Validate Confirm Password
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }
    
        setErrors(newErrors);
    
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };
    

    const checkEmailExists = async (email) => {
        console.log("check email")
        if (!email) return;
        
        if (!/\S+@\S+\.\S+/.test(email)) return; // Also validate email before checking existence

        try {
            const response = await axios.get(`http://localhost:8080/checkEmailExists/${email}`);
            console.log("response from email check", response)
            if (response.status === 200) {
                setEmailExists(false);  // Email does not exist, OK to proceed
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setEmailExists(true); // Email exists, prevent registration
                alert(error.response.data); // "The email is already Present, Failed to Create new User"
            } else {
                console.error('Error checking email:', error);
                // Handle other errors (e.g., network error, server error)
                alert('Failed to check email availability.');
            }
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
       // console.log("submit")
       if (!validateField()) {
        alert('Please correct the errors before submitting.');
        return;
    }

        if (!isFormValid()) {
            alert('Please correct the errors before submitting.');
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:8080/adminRegistration', {
                firstName, lastName, email, password
            });
            console.log("response after registration", response)
            sessionStorage.setItem('user', response.data.userId);
            router.push('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-my-image bg-contain"></div>
            <div className="w-1/2 flex flex-col justify-center items-center bg-green-500 px-12">
                <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Register</h2>
                    <form onSubmit={handleSubmit}>
                   
                            <input
                                id="first-name"
                                name="firstName"
                                type="text"
                                required
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            {errors.firstName && <p className="text-red-500 text-xs italic mb-4">{errors.firstName}</p>}

                        {/* <input
                            type="text"
                            name="lastName"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        /> */}
                         <input
                            type="text"
                            name="lastName"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                            {errors.lastName && <p className="text-red-500 text-xs italic mb-4">{errors.lastName}</p>}

                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => checkEmailExists(email)}
                        />
                            {errors.email && <p className="text-red-500 text-xs italic mb-4">{errors.email}</p>}

                        <input
                            type="password"
                            name="password"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                            {errors.password && <p className="text-red-500 text-xs italic mb-4">{errors.password}</p>}

                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-full p-2 border border-gray-300 rounded mb-6"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                            {errors.confirmPassword && <p className="text-red-500 text-xs italic mb-4">{errors.confirmPassword}</p>}

                         <button
                            type="submit"
                            //disabled={!isFormValid()}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
