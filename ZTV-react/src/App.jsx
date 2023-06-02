import logotype from './logo.svg';
import './App.css';
import './variables.css'
import './buttons.css'
import './auto-layout.css'
import Header from './Header/Header';
import Main from './Main/Main'
import Footer from './Footer/Footer';

function App() {
  
  return (
    <div>
      <Header />
      <div className="Plashka"></div> {/* Часть, разделяющая Хэдер и Основную часть  */}
      <Main />
      <Footer />
    </div>
  );
}

export default App;
