import logo from '../logo.svg';
import '../css_files/App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> This will be the Home Page!</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p> Testing live editing with dev server!</p>

        <Link to={'login'}>
          <button>Go to Login Page</button>
        </Link>

      </header>

    </div>
  );
}

export default App;
