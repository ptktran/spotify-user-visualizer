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
    return (user_token);
}

// name, followers DONE
// favourite genre DONE
// favourite song
// favourite artist
// recently played song

export function GenerateCard() {
    spotify.setAccessToken(user_token);

    const [Name, setName] = useState("");
    const [Followers, setFollowers] = useState(0);
    const [ProfilePic, setProfilePic] = useState("");
    useEffect(() => {
        spotify.getMe().then((user) => {
            setName(user.display_name);
            setFollowers(user.followers.total);
            setProfilePic(user.images[0].url);
        })
    }, [])

    const [topArtistsAllTime, setTopArtistsAllTime] = useState([]);
    const [genresAllTime, setGenresAllTime] = useState([]);
    useEffect(() => {
        spotify.getMyTopArtists({ time_range: "long_term" }).then((data) => {
            setTopArtistsAllTime(data.items);
            Promise.all(
                data.items.map((artist) => spotify.getArtist(artist.id))
            ).then((artistData) => {
                const genres = artistData.map((artist) => artist.genres).flat();
                setGenresAllTime(genres);
            });
        });
    }, []);
    
    function genreAllTime() {
        let genreCountsAllTime = {};
        genresAllTime.forEach((genre) => {
            if (!genreCountsAllTime[genre]) {
                genreCountsAllTime[genre] = 1;
            } else {
                genreCountsAllTime[genre]++;
            }
        });
        const topGenreAllTime = Object.keys(genreCountsAllTime).sort(
            (a, b) => genreCountsAllTime[b] - genreCountsAllTime[a]
        )[0];
        return topGenreAllTime;
    }

    const [topArtistsCurrent, setTopArtistsCurrent] = useState([]);
    const [genresCurrent, setGenresCurrent] = useState([]);
    useEffect(() => {
        spotify.getMyTopArtists({ time_range: "short_term" }).then((data) => {
            setTopArtistsCurrent(data.items);
            Promise.all(
                data.items.map((artist) => spotify.getArtist(artist.id))
            ).then((artistData) => {
                const genres = artistData.map((artist) => artist.genres).flat();
                setGenresCurrent(genres);
            });
        });
    }, []);

    function genreCurrent() {
        let genreCountsCurrent = {};
        genresCurrent.forEach((genre) => {
            if (!genreCountsCurrent[genre]) {
                genreCountsCurrent[genre] = 1;
            } else {
                genreCountsCurrent[genre]++;
            }
        });
        const topGenreCurrent = Object.keys(genreCountsCurrent).sort(
            (a, b) => genreCountsCurrent[b] - genreCountsCurrent[a]
        )[0];
        return topGenreCurrent;
    }
    
    const [topSongCurrent, setTopSongCurrent] = useState([]);
    const [topSongCurrentArtist, setTopSongCurrentArtist] = useState([]);
    const [topSongCurrentCover, setTopSongCurrentCover] = useState([]);
    useEffect(() => {
        spotify.getMyTopTracks({ time_range: "short_term" }).then((data) => {
            setTopSongCurrent(data.items[0].name);
            setTopSongCurrentArtist(data.items[0].artists[0].name);
            setTopSongCurrentCover(data.items[0].album.images[0].url);
            console.log(data.items);
        });
    }, []);
    console.log("TOP", topSongCurrent);
    console.log("TOP", topSongCurrentArtist);
    
    return (
        <div>
            <h1>Hello {Name}!!!</h1>
            <div>{Followers} followers</div>
            <img src={ProfilePic} width="10%"/>
            <h1>Current favourite genre: {genreCurrent()}</h1>
            <h1>All-time favourite genre: {genreAllTime()}</h1>
            <h1>Current favourite song: {topSongCurrent} by {topSongCurrentArtist}</h1>
            <img src={topSongCurrentCover} alt="" width="20%"/>
        </div>
    );
}