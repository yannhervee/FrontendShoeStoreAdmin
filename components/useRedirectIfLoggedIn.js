// File: useRedirectIfLoggedIn.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useRedirectIfLoggedIn() {
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('user');

        if (token && userId) {
            router.push('/adminHome');  // Adjust the redirect path as needed
        }
    }, [router]);
}
