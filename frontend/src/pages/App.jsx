import logo from '../logo.svg';
import '../css_files/App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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

        {/* prepends the current page's route to the link! */}
        <Link to={'hqstaff'}>
          <button>Go to HQ Staff Interface!</button>
        </Link>
      </header>

    </div>
  );
}

export default App;
