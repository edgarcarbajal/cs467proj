import AppHeader from "../components/AppHeader";
import greenhouseLogoPlain from "../greenhouseLogoPlain.svg"

const App = () => {
    return (
        <div>
            <AppHeader />

            <div className="container mx-auto flex flex-col place-items-center p-12">
                <h1>Greenhouse Plant Repair Services</h1>
                <img className="size-80 bg-green-700 rounded-lg" src={greenhouseLogoPlain} alt="Greenhouse Services Logo"/>

            </div>
        </div>
    );
}

export default App;