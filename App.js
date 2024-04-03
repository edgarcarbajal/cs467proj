import Button from 'react-bootstrap/Button';
import logo from './Green Modern Plant Store Logo (900 x 900 px).svg';
import './App.css';
import {Navbar} from './components/Navbar';
import {Route, Routes} from "react-router-dom";
import {About, Contact, Home, Services, Products} from "./components/pages/pageIndex";



function App() {
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/products" element={<Products />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/services" element={<Services />}/>
                <Route path="/Contact" element={<Contact />}/>
            </Routes>


        </div>
    );
}

export default App;
