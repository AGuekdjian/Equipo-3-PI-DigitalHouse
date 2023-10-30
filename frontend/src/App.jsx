import Header from "./components/header/Header";
import Routing from "./router/Routing";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="bg-dark min-h-screen text-txt-grey">
        <Routing />
      </main>
      <Footer />
    </>
  );
}

export default App;
