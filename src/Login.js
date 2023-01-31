import React from 'react';
import { loginUrl } from './Spotify';

export default function Login() {
    return (
        <body class="flex h-screen justify-center items-center bg-home-gradient bg-no-repeat bg-cover">
            <div class="flex flex-wrap content-center justify-evenly rounded h-96 sm:w-4/5 lg:w-3/6 xl:w-2/6 bg-spotify-grey shadow-gray-900/30 shadow-lg p-10">
                <div class="basis-full">
                    <h1 class="font-coolvetica text-3xl font-bold tracking-wider basis-full text-center m-3 bg-clip-text bg-gradient-to-r from-pastel-purple to-pastel-pink text-transparent hover:animate-pulse">BioVisualizer</h1>
                    <h1 class="font-manrope text-xl basis-full text-center text-white">Your Spotify stats all in one place!</h1>
                    <h1 class="font-manrope text-xl basis-full text-center text-white">Login now to generate your personalized card :{')'} </h1>
                </div>
                <div class="m-6">
                    <a href={loginUrl}>
                        <button class="rounded-full h-18 w-60 bg-spotify-green py-3 px-12 hover:bg-spotify-green/80 hover:-translate-y-0.5 active:translate-y-0.5 transition duration-100 ease">
                            <img class="m-auto" src={require('./assets/spotify-logo-black.png')} alt="spotify-logo"></img>
                        </button>
                    </a>
                </div>
            </div>
        </body>
    )
}