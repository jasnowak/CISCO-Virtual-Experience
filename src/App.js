import './App.css';

function App() {
  const banner = <h1>Sextant App</h1>
      const exhibit = (
      <div>
        <h1>Hello!</h1>
        <h2>Good to see you here.</h2>
      </div>
      );
  return (
    <div className="App">
      {banner}
      {exhibit}
    </div>
  );
}

export default App;
