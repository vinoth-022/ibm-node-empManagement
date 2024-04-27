import './App.css';
import DataUnit from './components/DataUnit/DataUnit';
import Header from './components/Header/Header'

function App() {
  return (
    <div className="App">
      <header className="head">
      <Header />
      <DataUnit/>
      </header>
    </div>
  );
}

export default App;
