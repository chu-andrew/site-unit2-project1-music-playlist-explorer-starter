
// helper functions
function getPlaylist(id) {
    for (let playlist of playlists) {
        if (playlist["playlistID"] == id) {
            return playlist;
        }
    }
    return null;
}

function songIsNull(song) {
    let isNull = [
        song["title"],
        song["artist"],
        song["album"],
        song["cover_art"],
        song["duration"]]
        .every(x => x === null || x === '' || x === 0);
    return isNull;
}

// playlist cards
function displayPlaylistCards(playlists) {
    let cards = "";
    for (let playlist of playlists) {
        if (playlist.display) {
            cards += generatePlaylistCard(
                playlist["playlistID"],
                playlist["playlist_name"],
                playlist["playlist_creator"],
                playlist["playlist_art"],
                playlist["likeCount"]
            );
        }
    }

    let list = document.getElementById("playlist-cards-list");
    list.innerHTML = cards;

    // add event listener to created cards
    let playlistCards = document.getElementsByClassName("playlist-card");
    for (let cardHTML of playlistCards) {
        cardHTML.addEventListener('click', clickedPlaylistCard);
    }

    for (let playlist of playlists) {
        displayLikes(playlist);
    }

    return playlistCards;
}

function generatePlaylistCard(id, title, creator, imgSrc, likes) {
    let card = `
        <article id=${id} class="playlist-card">
            <img class="playlist-card-cover" src=${imgSrc}>
            <div class="playlist-info-group">
                <div>
                    <h3 class="playlist-card-title">${title}</h3>
                    <h4 class="playlist-card-creator">${creator}</h4>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <div class="playlist-card-likes">
                        <button id="playlist-card-likes-button-${id}" class="playlist-card-likes-button"><i
                            class="fa-solid fa-heart fa-xl heart-icon"></i></button>
                        <p id="like-num-${id}" class="like-num">${likes}</p>
                    </div>
                    <button id="playlist-card-edit-${id}" class="playlist-card-misc-button"><i class="fa-solid fa-pencil fa-xl pencil-icon"></i></button> 
                    <button id="playlist-card-del-${id}" class="playlist-card-misc-button"><i class="fa-solid fa-trash fa-xl trash-icon"></i></button> 
                </div>
            </div>
        </article>`;
    return card;
}

function clickedPlaylistCard(e) {
    let playlist = getPlaylist(e.currentTarget.id);

    if (e.srcElement.classList.contains("heart-icon")) {
        updateLikes(playlist);
        displayLikes(playlist);
    }
    else if (e.srcElement.classList.contains("trash-icon")) {
        playlist.display = false;
        playlist.deleted = true;
        delete playlist;

        displayPlaylistCards(playlists);
    }
    else if (e.srcElement.classList.contains("pencil-icon")) {
        openEditModal(playlist);
    }
    else {
        openInfoModal(playlist);
    }
}

// like playlist
function updateLikes(playlist) {
    // if previously liked, now unliked, and vice versa
    if (playlist.liked) {
        playlist.likeCount--;
    } else {
        playlist.likeCount++;
    }
    playlist.liked = !playlist.liked;
}

function displayLikes(playlist) {
    if (!playlist.display) return;

    let id = playlist.playlistID;
    const likeButton = document.getElementById(`playlist-card-likes-button-${id}`);
    if (playlist.liked) {
        likeButton.classList.replace("playlist-card-likes-button", "playlist-card-likes-button-active");
    } else {
        likeButton.classList.replace("playlist-card-likes-button-active", "playlist-card-likes-button");
    }

    const likeCount = document.getElementById(`like-num-${id}`);
    likeCount.textContent = playlist["likeCount"];
}


function onAddSongClick(playlist) {
    return (e) => {
        e.preventDefault();
        writeEditedPlaylistData(e, playlist.playlistID);
        populateEditModal(playlist)

        let songEditList = document.getElementById("song-edit-list");
        songEditList.innerHTML += `
        <li>
        Song title: <input type="text" name="title"><br/> 
        Artist: <input type="text" name="creator"><br/> 
        Album: <input type="text" name="album"><br/> 
        Song cover art URL: <input type="url" name="cover"><br/>
        Song duration: <input type="text" name="duration"><br/>
        </li>
        <br/>
    `
    }
}

// edit playlist
function populateEditModal(playlist) {
    let formData = `
        <h2>Edit playlist</h2>
        Playlist title: <input type="text" name="title" value="${playlist.playlist_name}"><br/> 
        Playlist creator: <input type="text" name="creator" value="${playlist.playlist_creator}"><br/> 
        Playlist cover art URL: <input type="url" name="cover" value="${playlist.playlist_art}"><br/>
        <br />
        <section id="edit-song-scroller" class="song-scroller">
        <ol id="song-edit-list">
    `

    for (let song of playlist.songs.filter(song => !songIsNull(song))) {
        formData += `
        <li>
        Song title: <input type="text" name="title" value="${song.title}"><br/> 
        Artist: <input type="text" name="creator" value="${song.artist}"><br/> 
        Album: <input type="text" name="album" value="${song.album}"><br/> 
        Song cover art URL: <input type="url" name="cover" value="${song.cover_art}"><br/>
        Song duration: <input type="text" name="duration" value="${song.duration}"><br/>
        </li>
        <br/>
        `
    }
    formData += `</ol> 
                </section>
                <div>
                    <button id="add-song" name="add-song" type="button" class="norm-button">Add Song</button>
                </div>
                <div>
                    <button id="save-playlist" type="button" class="norm-button">Save</button>
                </div>
                `;


    let form = document.getElementById("edit-form");
    form.innerHTML = formData;

    let addSongButton = document.getElementById("add-song");
    addSongButton.addEventListener("click", onAddSongClick(playlist));

    let saveButton = document.getElementById("save-playlist");
    saveButton.addEventListener("click", onSubmitEditPlaylist(playlist.playlistID), false);
}

function openEditModal(playlist) {
    populateEditModal(playlist);

    const modal = document.getElementById("edit-modal");
    modal.style.display = "block";
}

function writeEditedPlaylistData(e, id) {
    const form = e.target.closest('form');

    const entries = [...new FormData(form).entries()];

    let playlist = getPlaylist(id);

    playlist.playlist_name = entries[0][1];
    playlist.playlist_creator = entries[1][1];
    playlist.playlist_art = entries[2][1];

    let songNum = 0;
    for (let i = 3; i < entries.length; i += 5) {
        let song;
        if (songNum > playlist.songs.length - 1) {
            playlist.songs.push({
                songID: parseInt(playlist.songs[playlist.songs.length - 1].songID) + 1,
                title: "title",
            })
        }
        song = playlist.songs[songNum];

        song.title = entries[i][1];
        song.artist = entries[i + 1][1];
        song.album = entries[i + 2][1];
        song.cover_art = entries[i + 3][1];
        song.duration = entries[i + 4][1];
        songNum++;

    }
}

function onSubmitEditPlaylist(id) {
    return (e) => {
        e.preventDefault();

        const modal = document.getElementById("edit-modal");
        modal.style.display = "none";
        writeEditedPlaylistData(e, id);

        displayPlaylistCards(playlists);
    }
}

// info modal
function openInfoModal(playlist) {
    populateInfoModal(playlist);

    const modal = document.getElementById("info-modal");
    const modalCloseButton = document.getElementsByClassName("close")[0];
    modalCloseButton.onclick = function () {
        modal.style.display = "none";
    }

    modal.style.display = "block";
}

function populateInfoModal(playlist) {
    let modalInfo = document.getElementById("playlist-modal-info");
    modalInfo.innerHTML = generateModalInfo(
        playlist["playlist_name"],
        playlist["playlist_creator"],
        playlist["playlist_art"]
    );

    let shuffleButton = document.getElementById("shuffle-button");
    shuffleButton.addEventListener("click", shufflePlaylist);

    cards = "";
    for (let song of playlist["songs"]) {


        if (!songIsNull(song)) {
            cards += generateSongCard(
                song["songID"],
                song["title"],
                song["artist"],
                song["album"],
                song["cover_art"],
                song["duration"]
            );
        }
    }
    let list = document.getElementById("modal-song-list");
    list.innerHTML = cards;
}

function generateModalInfo(title, creator, imgSrc) {
    let info = `
            <img class="playlist-modal-cover" src=${imgSrc}>
            <div id="playlist-info-group-modal" class="playlist-info-group-modal">
                <span id="modal-close-holder" style="display: flex; justify-content: flex-end;">
                    <span class="close">&times;</span>
                </span>
                <h2 class="playlist-modal-title">${title}</h2>
                <h3 class="playlist-modal-creator">${creator}</h3>

                <br />
                <button id="shuffle-button" class="shuffle-button">Shuffle</button>
            </div>`;
    return info;
}

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

// shuffle playlist
function shufflePlaylist() {
    const songList = document.getElementById("modal-song-list");
    for (let i = songList.children.length; i >= 0; i--) {
        songList.appendChild(songList.children[Math.random() * songList.children.length | 0]);
    }
}

// search playlists
function filterCardsDynamicSearch(e) {
    const search = e.target.value.toLowerCase();

    let shown = 0;
    for (let playlist of playlists) {
        title = playlist.playlist_name.toLowerCase();
        creator = playlist.playlist_creator.toLowerCase();
        if ((title.includes(search) || creator.includes(search)) && !playlist.deleted) {
            playlist.display = true;
            shown++;
        } else {
            playlist.display = false;
        }
    }

    displayPlaylistCards(playlists);
    if (shown === 0) {
        document.getElementById("no-search-results").style.display = "flex";
    } else {
        document.getElementById("no-search-results").style.display = "none";
    }
}

function enableDynamicSearch() {
    document.getElementById("playlistSearch").addEventListener("input", filterCardsDynamicSearch);
}

// sort playlists
function onSortPlaylists(e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    let choice = "";
    for (const entry of data) {
        choice = entry[1];
    }

    switch (choice) {
        case "likes":
            playlists.sort((a, b) => b.likeCount - a.likeCount);
            break;
        case "title":
            playlists.sort((a, b) => a.playlist_name.localeCompare(b.playlist_name));
            break;
        case "date":
            playlists.sort((a, b) => a - b);
            break;
    }
    displayPlaylistCards(playlists);
}

function sortPlaylistsButton() {
    const form = document.getElementById("sort-form");

    form.addEventListener("submit", onSortPlaylists, false);
}

// add playlist
function onAddPlaylist(e) {
    playlists.push(
        {
            playlistID: Math.max(...playlists.map(pl => pl.playlistID)) + 1,
            playlist_name: "",
            playlist_creator: "",
            playlist_art: "",
            likeCount: 0,
            songs: [{
                songID: 0,
                title: "",
                artist: "",
                album: "",
                cover_art: "",
                duration: "",
            }],
            liked: false,
            display: true,
            deleted: false,
            dateAdded: new Date(),
        }
    );
    openEditModal(playlists[playlists.length - 1]);
}

function addPlaylistButton() {
    const button = document.getElementById("addPlaylist");
    button.addEventListener("click", onAddPlaylist, false);
}

// initialize
let playlists = JSON.parse(JSON.stringify(data.playlists));
for (let playlist of playlists) {
    playlist.liked = false;
    playlist.display = true;
    playlist.deleted = false;
    playlist.dateAdded = new Date();
}

displayPlaylistCards(playlists);
enableDynamicSearch();
sortPlaylistsButton();
addPlaylistButton();