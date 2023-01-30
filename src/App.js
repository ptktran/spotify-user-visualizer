import React, { useEffect, useState } from "react";
import Login from './Login.js';
import { getTokenFromUrl } from './Spotify';
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const hash = getTokenFromUrl();
        window.location.hash = "";
        const _token = hash.access_token;
        
        if (_token) {
            setToken(_token);
            spotify.setAccessToken(_token);
            spotify.getMe().then((user) => {
                console.log("USERNAME", user.display_name);
            });
            console.log(token);
        }
    }, []);
    
    return (
        <div>
            {!token && <Login />}
            {token && <div>LOGGED IN</div>}
        </div>
    );
}
export default App;
