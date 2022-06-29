import '../styles/globals.css'
import {EventProvider} from "../context/EventsContext";

function MyApp({ Component, pageProps }) {
  return (
    <EventProvider>
      <Component {...pageProps} />
    </EventProvider>
  );
}

export default MyApp
