import React from 'react';

const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=befbe424967c4a1fb35027bbb437ea0c&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
    return (
        <body class="flex h-screen justify-center items-center bg-home-gradient bg-no-repeat bg-cover">
            <div class="flex flex-wrap content-center justify-evenly rounded h-96 sm:w-4/5 lg:w-3/6 xl:w-2/6 bg-spotify-grey shadow-gray-900/30 shadow-lg p-10">
                <div class="basis-full">
                    <h1 class="font-coolvetica text-3xl font-bold tracking-wider basis-full text-center m-3 bg-clip-text bg-gradient-to-r from-pastel-purple to-pastel-pink text-transparent hover:animate-pulse">BioVisualizer</h1>
                    <h1 class="font-manrope text-xl basis-full text-center text-white">Your Spotify stats all in one place!</h1>
                    <h1 class="font-manrope text-xl basis-full text-center text-white">Login now to generate your personalized card :{')'} </h1>
                </div>
                <a href={AUTH_URL}>
                    <button class="rounded-full h-18 w-60 bg-spotify-green m-7 py-3 px-12 hover:bg-spotify-green/80 hover:-translate-y-0.5 active:translate-y-0.5 transition duration-100 ease">
                        <img class="m-auto" src={require('./assets/spotify-logo-black.png')} alt="spotify-logo"></img>
                    </button>
                </a>
            </div>
        </body>
    )
}