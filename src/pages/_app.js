import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import  {Layout}  from "../components/Layout.js";

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;