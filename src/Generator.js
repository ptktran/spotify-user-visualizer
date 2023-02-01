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

    // FUNCTION TO FETCH USER DATA

    const [User, setUser] = useState({});
    useEffect(() => {
        spotify.getMe().then((user) => {
            setUser({
                name: user.display_name,
                followers: user.followers.total,
                profile: user.images[0].url
            })
        })
    }, [])


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
    }, []);
    
    return (
        // <div>
        //     <h1>Hello {User.name}!!!</h1>
        //     <div>{User.followers} followers</div>
        //     <img src={User.profile} width="10%"/>
        //     <h1>Current favourite genre: {genreCurrent()}</h1>
        //     <h1>All-time favourite genre: {genreAllTime()}</h1>
        //     <h1>Current favourite song: {topSongCurrent.name} by {topSongCurrent.artist}</h1>
        //     <img src={topSongCurrent.cover} alt="" width="20%"/>
        //     <h1>All-time favourite song: <a href={topSongAllTime.link} target="_blank">{topSongAllTime.name} by {topSongAllTime.artist}</a></h1>
        //     <img src={topSongAllTime.cover} alt="" width="20%"/>
        //     <h1>All-time favourite artist: {topArtistAllTime.name}</h1>
        //     <h1>Current favourite artist: {topArtistCurrent.name}</h1>
        // </div>
        <body class="flex h-screen justify-center items-center bg-2nd-gradient bg-no-repeat bg-cover">
                <div class="flex flex-wrap rounded-xl h-3/4 md:h-4/6 sm:w-5/6 lg:w-5/6 xl:w-3/6 bg-offwhite shadow-gray-900/30 shadow-lg p-2">
                    <div class="flex flex-wrap h-2/6 w-full content-center p-6">
                        <div class="w-full">
                            <img class="m-auto rounded-full w-2/6 md:w-1/12" src={User.profile}/>
                        </div>
                        <h1 class="font-coolvetica text-3xl basis-full text-center">{User.name}</h1>
                        <h1 class="font-manrope text-md basis-full text-center"><b>{User.followers}</b> Followers</h1>
                    </div>
                    <div class="flex h-3/6 basis-full">
                        <div class="w-1/2">
                            <div class="my-4">
                                <h1 class="font-manrope font-bold text-sm">current top artist</h1>
                                <div class="flex items-center bg-white">
                                    <img class="w-9" src={topArtistCurrent.cover} />
                                    <a href={topArtistCurrent.link} class="font-coolvetica text-sm ml-2" target="_blank">{topArtistCurrent.name}</a>
                                </div>
                            </div>
                            <div class="my-4">
                                <h1 class="font-manrope font-bold text-sm">current top genre</h1>
                                <h1 class="font-coolvetica font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">{genreCurrent()}</h1>
                            </div>
                            <div class="my-4">
                                <h1 class="font-manrope font-bold text-sm">current top song</h1>
                                <div class="flex items-center bg-white">
                                    <img class="w-9" src={topSongCurrent.cover} />
                                    <a href={topSongCurrent.link} class="font-coolvetica text-sm ml-2" target="_blank">{topSongCurrent.artist} - {topSongCurrent.name}</a>
                                </div>
                            </div>
                        </div>
                        <div class="w-1/2">
                        <div class="my-4">
                                <h1 class="font-manrope font-bold text-sm">all-time top artist</h1>
                                <div class="flex items-center bg-white">
                                    <img class="w-9" src={topArtistAllTime.cover} />
                                    <a href={topArtistAllTime.link} class="font-coolvetica text-sm ml-2" target="_blank">{topArtistAllTime.name}</a>
                                </div>
                            </div>

                            <div class="my-4">
                                <h1 class="font-manrope font-bold text-sm">all-time top genre</h1>
                                <h1 class="font-coolvetica font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">{genreAllTime()}</h1>
                            </div>

                            <div class="my-4">
                                <h1 class="font-manrope font-bold text-sm">all-time top song</h1>
                                <div class="flex items-center bg-white">
                                    <img class="w-9" src={topSongAllTime.cover} />
                                    <a href={topSongAllTime.link} class="font-coolvetica text-sm ml-2" target="_blank">{topSongAllTime.artist} - {topSongAllTime.name}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full h-1/6">
                            <h1 class="font-manrope font-bold text-sm">most recently played song</h1>
                            <div class="flex items-center bg-white">
                                <img class="w-9" src={recentlyPlayed.cover} />
                                <a href={recentlyPlayed.link} class="font-coolvetica text-sm ml-2" target="_blank">{recentlyPlayed.artist} - {recentlyPlayed.name}</a>
                            </div>
                    </div>
                </div>
            </body>
    );
}