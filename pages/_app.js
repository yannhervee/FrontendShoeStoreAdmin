import "@/styles/globals.css";
import AdminLayout from "@/components/AdminLayout";

export default function App({ Component, pageProps }) {
  return (
<AdminLayout>
  <Component {...pageProps} />
  </AdminLayout>
  );
}
