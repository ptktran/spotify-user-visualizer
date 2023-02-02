export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "https://biovisualizer.vercel.app/";
export const clientId = "befbe424967c4a1fb35027bbb437ea0c";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-top-read",
    "user-read-private",
    "user-read-email",
];

export const getTokenFromUrl = () => {
    return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
    }, {});
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;