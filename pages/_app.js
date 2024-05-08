import "@/styles/globals.css";
import AdminLayout from "@/components/AdminLayout";
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Check if the current route is the login page
  const isLoginPage = router.pathname === '/login';

  // Render the AdminLayout only if the route is not the login page
  return (
    <>
      {isLoginPage ? (
        // If it's the login page, render only the Component without the AdminLayout
        <Component {...pageProps} />
      ) : (
        // If it's not the login page, render the AdminLayout with the Component
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      )}
    </>
  );
}
