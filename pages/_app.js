import '../styles/globals.css'
import {EventProvider} from "../context/EventsContext";
import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {
  return (
    <EventProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </EventProvider>
  );
}

export default MyApp
