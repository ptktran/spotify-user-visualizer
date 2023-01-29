import './App.css';

function App() {
    return (
        <body class="flex h-screen justify-center items-center bg-indigo-700">
            <div class="flex flex-wrap content-center justify-evenly rounded w-2/3 h-1/3 bg-spotify-grey shadow-gray-900/30 shadow-lg">
                <div class="basis-full">
                    <h1 class="font-coolvetica text-4xl font-bold tracking-wider basis-full text-center m-3 bg-clip-text bg-gradient-to-r from-pastel-purple to-pastel-pink text-transparent hover:animate-pulse">BioVisualizer</h1>
                    <h1 class="font-manrope text-2xl basis-full text-center text-white">Your Spotify stats all in one place!</h1>
                    <h1 class="font-manrope text-2xl basis-full text-center text-white">Login now to generate your personalized card :{')'} </h1>
                </div>
                <button class="rounded-full h-18 w-64 bg-spotify-green m-7 py-3 px-12 hover:bg-spotify-green/80 hover:-translate-y-0.5 active:translate-y-0.5 transition duration-100 ease">
                    <img class="m-auto" src={require('./assets/spotify-logo-black.png')} alt="spotify-logo"></img>
                </button>
            </div>
        </body>
    );
}
export default App;
