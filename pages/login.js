import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faStore } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useRouter } from 'next/router';

import useRedirectIfLoggedIn from "../components/useRedirectIfLoggedIn";

const LoginPage = () => {
    useRedirectIfLoggedIn();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async(e) => {
        e.preventDefault();
        // Handle login logic here
        try {
            const response = await axios.post('http://localhost:8080/generateToken', {
                username: email,
                password,
              
            });
            console.log('login response:', response);
            
            //     const userData = await response.json();
                
            //     // Store user information securely in session storage
            console.log("response from login", response)
            sessionStorage.setItem('token', response.data.token);
                        //     // Store user information securely in session storage
            sessionStorage.setItem('user', response.data.userId);
                
            //     // Redirect to home page or user profile page
              router.push('/adminHome');
            
            // Navigate to another page or clear the form
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Login failed: ' + "The password or email entered doesn't match our record");
        }
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Background Image Section */}
            <div className="w-1/2 bg-cover bg-my-image bg-contain"></div>

            {/* Login Form Section */}
            <div className="w-1/2 flex flex-col justify-center items-center bg-green-500">
                <FontAwesomeIcon icon={faStore} style={{ fontSize: '200px' }} className="text-white mb-6" />
                <h2 className="text-3xl font-bold text-white mb-8">Admin Portal</h2>

                <div className="w-96 bg-white p-8 rounded-lg shadow-md">
                    <div className="relative mb-6">
                        <FontAwesomeIcon icon={faUser} className="absolute left-0 inset-y-0 m-auto ml-4 text-gray-400" />
                        <input
                            
                            className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500"
                            placeholder="EMAIL"
                            name="email"
                            type="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative mb-6">
                        <FontAwesomeIcon icon={faLock} className="absolute left-0 inset-y-0 m-auto ml-4 text-gray-400" />
                        <input
                            type="password"
                            className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500"
                            placeholder="PASSWORD"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={handleLogin}
                    >
                        LOGIN
                    </button>

                    <div className="text-center mt-4">
                        <a href="#" className="font-medium text-sm text-green-600 hover:underline">Forgot password?</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
