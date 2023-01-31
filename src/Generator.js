import React, { useEffect, useState } from 'react';
import { getTokenFromUrl } from './Spotify';
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();
let user_token = null;

export function CheckToken() {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const token = hash.access_token;

    if (token) {
        user_token = token
    }
        // spotify.setAccessToken(user_token);
        // spotify.getMe().then((user) => {
        //     console.log("USERNAME", user.display_name);
        //     console.log("PROFILE PIC", user.images);
        // });

        // window.localStorage.setItem('user-token', user_token);
        // console.log("THE TOKEN >", user_token);
    return (user_token);
}

export function GenerateCard() {
    const [Name, setName] = useState("");
    const [Image, setImage] = useState(null);
    const [Country, setCountry] = useState("");
    const [Followers, setFollowers] = useState(0);
    

    useEffect(() => {
        spotify.setAccessToken(user_token);
        spotify.getMyTopArtists().then((value) => {
            console.log(value.items[0].name);
        });
        console.log(spotify.getMyTopTracks());
        spotify.getMe().then((user) => {
            console.log(user)
        });
    }, []);

    return (
        <div>
        <h1></h1>
        </div>
    );
}