import Header from "./components/Header";
import Routing from "./router/Routing";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routing />
      </main>
      <Footer />
    </>
  );
}

export default App;
