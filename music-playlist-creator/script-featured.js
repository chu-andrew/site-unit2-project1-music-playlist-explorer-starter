// copied from script.js
function generateSongCard(id, title, creator, album, imgSrc, duration) {
    let card = `
        <article id=song-info-${id} class="song-info">
            <img class="song-album-cover" src=${imgSrc}>
            <div class="song-modal-text">
                <div class="song-data-group">
                    <h4 class="song-title">${title}</h4>
                    <h6 class="song-data">${creator}</h6>
                    <p class="song-data">${album}</p>
                </div>
                <p class="song-length">${duration}</p>
            </div>
        </article>`;
    return card;
}

function populateFeatured() {
    const choice = Math.floor(Math.random() * playlists.length);

    playlist = playlists[choice];

    populateFeaturedSongInfo(playlist);
    populateFeaturedSongList(playlist);
}

function populateFeaturedSongInfo(playlist) {
    document.getElementById("featured-title").textContent = playlist["playlist_name"];
    document.getElementById("featured-creator").textContent = playlist["playlist_creator"];
    document.getElementById("featured-cover").src = playlist["playlist_art"];
}

function populateFeaturedSongList(playlist) {
    cards = "";
    for (let song of playlist["songs"]) {
        cards += generateSongCard(
            song["songID"],
            song["title"],
            song["artist"],
            song["album"],
            song["cover_art"],
            song["duration"]
        );
    }

    let list = document.getElementById("featured-song-list");
    list.innerHTML = cards;
}

let playlists = JSON.parse(JSON.stringify(data.playlists));
populateFeatured(playlists[Math.floor(Math.random() * playlists.length)]);