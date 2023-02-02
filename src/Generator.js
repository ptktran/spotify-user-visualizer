import React, { useEffect, useState } from 'react';
import { getTokenFromUrl } from './Spotify';
import SpotifyWebApi from "spotify-web-api-js";
import { clientId, clientSecret } from "./Spotify";

const spotify = new SpotifyWebApi;
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

export function GenerateCard() {
    spotify.setAccessToken(user_token);

    // FUNCTION TO FETCH USER DATA

    const [User, setUser] = useState({});
    useEffect(() => {
        spotify.getMe().then((user) => {
            setUser({
                name: user.display_name,
                followers: user.followers.total,
                profile: user.images[0] ? user.images[0].url : false
            });
        });
    }, []);

    // SEARCH FUNCTIONS FOR TOP GENRE

    const [topArtistsCurrent, setTopArtistsCurrent] = useState({ artists: [], genres: [] });
    useEffect(() => {
        spotify.getMyTopArtists({ time_range: "short_term" }).then((data) => {
            Promise.all(
                data.items.map((artist) => spotify.getArtist(artist.id))
            ).then((artistData) => {
                const genres = artistData.map((artist) => artist.genres).flat();
                setTopArtistsCurrent({ artists: data.items, genres });
            });
        });
    }, []);

    function genreCurrent() {
        let genreCounts = {};
        topArtistsCurrent.genres.forEach((genre) => {
            if (!genreCounts[genre]) {
                genreCounts[genre] = 1;
            } else {
                genreCounts[genre]++;
            }
        });
        const topGenreCurrent = Object.keys(genreCounts).sort(
            (a, b) => genreCounts[b] - genreCounts[a]
        )[0];
        return topGenreCurrent;
    }

    const [topArtistsAllTime, setTopArtistsAllTime] = useState({ artists: [], genres: [] });
    useEffect(() => {
        spotify.getMyTopArtists({ time_range: "long_term" }).then((data) => {
            Promise.all(
                data.items.map((artist) => spotify.getArtist(artist.id))
            ).then((artistData) => {
                const genres = artistData.map((artist) => artist.genres).flat();
                setTopArtistsAllTime({ artists: data.items, genres });
            });
        });
    }, []);

    function genreAllTime() {
        let genreCounts = {};
        topArtistsAllTime.genres.forEach((genre) => {
            if (!genreCounts[genre]) {
                genreCounts[genre] = 1;
            } else {
                genreCounts[genre]++;
            }
        });
        const topGenreAllTime = Object.keys(genreCounts).sort(
            (a, b) => genreCounts[b] - genreCounts[a]
        )[0];
        return topGenreAllTime;
    }


    // SEARCH FUNCTIONS FOR TOP SONG

    const [topSongCurrent, setTopSongCurrent] = useState({});
    useEffect(() => {
        spotify.getMyTopTracks({ time_range: "short_term" }).then((data) => {
            setTopSongCurrent({
                name: data.items[0].name,
                artist: data.items[0].artists[0].name,
                cover: data.items[0].album.images[2].url,
                link: data.items[0].external_urls.spotify
            });
        });
    }, []);

    const [topSongAllTime, setTopSongAllTime] = useState({});
    useEffect(() => {
        spotify.getMyTopTracks({ time_range: "long_term" }).then((data) => {
            setTopSongAllTime({
                name: data.items[0].name,
                artist: data.items[0].artists[0].name,
                cover: data.items[0].album.images[2].url,
                link: data.items[0].external_urls.spotify
            });
        });
    }, []);


    // SEARCH FUNCTIONS FOR TOP ARTIST

    const [topArtistCurrent, setTopArtistCurrent] = useState({});
    useEffect(() => {
        spotify.getMyTopArtists({ time_range: "short_term" }).then((data) => {
            setTopArtistCurrent({
                name: data.items[0].name,
                cover: data.items[0].images[2].url,
                link: data.items[0].external_urls.spotify
            });
        });
    }, []);

    const [topArtistAllTime, setTopArtistAllTime] = useState({});
    useEffect(() => {
        spotify.getMyTopArtists({ time_range: "long_term" }).then((data) => {
            setTopArtistAllTime({
                name: data.items[0].name,
                cover: data.items[0].images[2].url,
                link: data.items[0].external_urls.spotify
            });
        });
    }, []);


    // GET RECENTLY PLAYED SONG
    const [recentlyPlayed, setRecentlyPlayed] = useState({});
    useEffect(() => {
        spotify.getMyRecentlyPlayedTracks().then((data) => {
            setRecentlyPlayed({
                name: data.items[0].track.name,
                artist: data.items[0].track.artists[0].name,
                cover: data.items[0].track.album.images[2].url,
                link: data.items[0].track.external_urls.spotify
            });
        });
    }, [recentlyPlayed]);

    function convertToMinutes(total_ms) {
        let minutes = Math.floor(total_ms / 60000);
        let seconds = ((total_ms % 60000) / 1000).toFixed(0);
        return (
            seconds == 60 ?
                (minutes + 1) + ":00" :
                minutes + ":" + (seconds < 10 ? "0" : "") + seconds
        );
    }

    const [currentlyPlaying, setCurrentlyPlaying] = useState({});
    useEffect(() => {
        spotify.getMyCurrentPlayingTrack().then((data) => {
            if (data === "") {
                setCurrentlyPlaying(null);
            } else {
                setCurrentlyPlaying({
                    name: data.item.name,
                    artist: data.item.artists[0].name,
                    cover: data.item.album.images[2].url,
                    link: data.item.external_urls.spotify,
                    time: data.progress_ms,
                    total_time: data.item.duration_ms,
                });
            }
        });
    }, []);

    function currentlyPlayingDiv(link, cover, time, total, name, artist) {
        return (
            <div class="w-full px-3 md:px-5 pt-5 gap-2 h-max">
                <h1 class="font-manrope font-light text-sm">currently playing</h1>
                <a href={link} target="_blank">
                    <button class="flex items-center bg-spotify-black rounded-md w-full p-2 hover:bg-spotify-green hover:text-black active:translate-y-0.5 transition duration-200 ease">
                        <img class="w-9" src={cover} />
                        <h1 class="font-coolvetica text-sm ml-2">♫ @{convertToMinutes(time)} | {artist} - {name} </h1>
                    </button>
                </a>
            </div>
        )
    }

    const userProfileDefault = "https://i.postimg.cc/hvyYWh2g/profilepic.jpg";

    return (
        <body class="flex h-screen justify-center items-center bg-2nd-gradient bg-no-repeat bg-cover">
            <div class="flex flex-wrap items-center rounded-xl h-fit pb-9 sm:w-11/12 lg:w-5/6 xl:w-3/6 bg-spotify-grey shadow-lg text-white">
                <div class="flex flex-wrap w-full bg-spotify-black py-2 px-2 md:px-3 rounded-tr-xl rounded-tl-xl">
                    <div class="w-1/6 md:w-1/12 my-3 mx-2">
                        <img class="border-2 border-spotify-green rounded-full" src={User.profile ? User.profile : userProfileDefault} />
                    </div>
                    <div class="flex flex-wrap h-max my-auto mx-2 items-center">
                        <h1 class="font-coolvetica text-2xl basis-full">{User.name}</h1>
                        <h1 class="font-manrope text-sm basis-full"><b>{User.followers}</b> Followers</h1>
                    </div>
                </div>
                <div class="flex basis-full h-max px-3 md:px-5 gap-3">
                    <div class="w-1/2">
                        <div class="my-4">
                            <h1 class="font-manrope font-light text-sm">current top genre</h1>
                            <h1 class="font-coolvetica font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">{genreCurrent()}</h1>
                        </div>

                        <div class="my-4">
                            <h1 class="font-manrope font-light text-sm">current top artist</h1>
                            <a href={topArtistCurrent.link} target="_blank">
                                <button class="flex items-center bg-spotify-black rounded-md w-full p-2 hover:bg-spotify-green hover:text-black active:translate-y-0.5 transition duration-200 ease">
                                    <img class="w-9" src={topArtistCurrent.cover} />
                                    <h1 class="font-coolvetica text-sm ml-2">{topArtistCurrent.name}</h1>
                                </button>
                            </a>
                        </div>

                        <div>
                            <h1 class="font-manrope font-light text-sm">current top song</h1>
                            <a href={topSongCurrent.link} target="_blank">
                                <button class="flex items-center bg-spotify-black rounded-md w-full p-2 hover:bg-spotify-green hover:text-black active:translate-y-0.5 transition duration-200 ease">
                                    <img class="w-9" src={topSongCurrent.cover} />
                                    <h1 class="font-coolvetica text-sm ml-2">{topSongCurrent.artist} - {topSongCurrent.name}</h1>
                                </button>
                            </a>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <div class="my-4">
                            <h1 class="font-manrope font-light text-sm">all-time top genre</h1>
                            <h1 class="font-coolvetica font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">{genreAllTime()}</h1>
                        </div>

                        <div class="my-4">
                            <h1 class="font-manrope font-light text-sm">all-time top artist</h1>
                            <a href={topArtistAllTime.link} target="_blank">
                                <button class="flex items-center bg-spotify-black rounded-md w-full p-2 hover:bg-spotify-green hover:text-black active:translate-y-0.5 transition duration-200 ease">
                                    <img class="w-9" src={topArtistAllTime.cover} />
                                    <h1 class="font-coolvetica text-sm ml-2">{topArtistAllTime.name}</h1>
                                </button>
                            </a>
                        </div>

                        <div>
                            <h1 class="font-manrope font-light text-sm">all-time top song</h1>
                            <a href={topSongAllTime.link} target="_blank">
                                <button class="flex items-center bg-spotify-black rounded-md w-full p-2 hover:bg-spotify-green hover:text-black active:translate-y-0.5 transition duration-200 ease">
                                    <img class="w-9" src={topSongAllTime.cover} />
                                    <h1 class="font-coolvetica text-sm ml-2">{topSongAllTime.artist} - {topSongAllTime.name}</h1>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="w-full px-3 md:px-5 pt-5 gap-2 h-max">
                    <h1 class="font-manrope font-light text-sm">recently played</h1>
                    <a href={recentlyPlayed.link} target="_blank">
                        <button class="flex items-center bg-spotify-black rounded-md w-full p-2 hover:bg-spotify-green hover:text-black active:translate-y-0.5 transition duration-200 ease">
                            <img class="w-9" src={recentlyPlayed.cover} />
                            <h1 class="font-coolvetica text-sm ml-2">{recentlyPlayed.artist} - {recentlyPlayed.name}</h1>
                        </button>
                    </a>
                </div>
                {!currentlyPlaying ? <div></div> : currentlyPlayingDiv(currentlyPlaying.link, currentlyPlaying.cover, currentlyPlaying.time, currentlyPlaying.total_time, currentlyPlaying.name, currentlyPlaying.artist)}
            </div>
        </body>
    );
}