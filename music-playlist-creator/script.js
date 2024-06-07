
function clickedPlaylistCard(e) {
    let clickedPlaylist = e.currentTarget.id;

    let playlist = null;
    for (let pl of playlists) {
        if (pl["playlistID"] == clickedPlaylist) {
            playlist = pl
            break;
        }
    }

    if (e.srcElement.classList.contains("heart-icon")) {
        updateLikeCount(playlist);
    }
    else {
        openModal(playlist);
    }
}

let likeStatusMap = new Map();

function initializeLikeStatusMap() {
    for (let playlist of playlists) {
        likeStatusMap.set(playlist["playlistID"], false);
    }
}

function updateLikeCount(playlist) {
    const id = playlist["playlistID"];
    let liked = likeStatusMap.get(playlist["playlistID"]);
    if (liked) {
        playlists.find(item => item.playlistID === id).likeCount--;
        likeStatusMap.set(id, false);
    } else {
        playlists.find(item => item.playlistID === id).likeCount++;
        likeStatusMap.set(id, true);
    }

    const likeButton = document.getElementById(`playlist-card-likes-button-${id}`);
    likeButton.classList.toggle("playlist-card-likes-button");
    likeButton.classList.toggle("playlist-card-likes-button-active");

    const likeCount = document.getElementById(`like-num-${id}`);
    likeCount.textContent = playlist["likeCount"];

    console.log(playlists);
}

function openModal(playlist) {
    populateModal(playlist);

    const modal = document.getElementById("info-modal");
    const modalCloseButton = document.getElementsByClassName("close")[0];
    modalCloseButton.onclick = function () {
        modal.style.display = "none";
    }

    modal.style.display = "block";
}

function populatePlaylistCards(playlists) {
    let cards = "";
    for (let playlist of playlists) {
        cards += generatePlaylistCard(
            playlist["playlistID"],
            playlist["playlist_name"],
            playlist["playlist_creator"],
            playlist["playlist_art"],
            playlist["likeCount"]
        );
    }

    let list = document.getElementById("playlist-cards-list");
    list.innerHTML = cards;

    // add event listener to created cards
    let playlistCards = document.getElementsByClassName("playlist-card");
    for (let cardHTML of playlistCards) {
        cardHTML.addEventListener('click', clickedPlaylistCard);
    }

    return playlistCards;
}

function generatePlaylistCard(id, title, creator, imgSrc, likes) {
    let card = `
        <article id=${id} class="playlist-card">
            <img class="playlist-card-cover" src=${imgSrc}>
            <div class="playlist-info-group">
                <h3 class="playlist-card-title">${title}</h3>
                <h4 class="playlist-card-creator">${creator}</h4>
                <div class="playlist-card-likes">
                    <button id="playlist-card-likes-button-${id}" class="playlist-card-likes-button"><i
                        class="fa-solid fa-heart fa-xl heart-icon"></i></button>
                    <p id="like-num-${id}" class="like-num">${likes}</p>
                </div>
            </div>
        </article>`;
    return card;
}

function populateModal(playlist) {
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
        cards += generateSongCard(
            song["songID"],
            song["title"],
            song["artist"],
            song["album"],
            song["cover_art"],
            song["duration"]
        );
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

function shufflePlaylist() {
    const songList = document.getElementById("modal-song-list");
    for (let i = songList.children.length; i >= 0; i--) {
        songList.appendChild(songList.children[Math.random() * songList.children.length | 0]);
    }
}

function filterCardsDynamicSearch(e) {
    const search = e.target.value.toLowerCase();

    let shown = 0;
    for (let card of playlistCards) {
        // let title = card["title"];
        title = card.getElementsByClassName("playlist-card-title")[0]
            .textContent.toLowerCase();
        creator = card.getElementsByClassName("playlist-card-creator")[0]
            .textContent.toLowerCase();
        if (title.includes(search) || creator.includes(search)) {
            card.style.display = "block";
            shown++;
        } else {
            card.style.display = "none";
        }
    }
    if (shown === 0) {
        document.getElementById("no-search-results").style.display = "flex";
    } else {
        document.getElementById("no-search-results").style.display = "none";
    }
}

function dynamicSearch() {
    document.getElementById("playlistSearch").addEventListener("input", filterCardsDynamicSearch);
}

function likeSort(playlists) {
    pl = playlists[0];
    console.log(playlists);
}

function sortPlaylists() {
    const form = document.getElementById("sort-form");

    form.addEventListener(
        "submit",
        (e) => {
            e.preventDefault();
            const data = new FormData(form);
            let choice = "";
            for (const entry of data) {
                choice = entry[1];
            }
            console.log(playlists[2]);
            switch (choice) {
                case "likes":
                    playlists.sort((a, b) => b.likeCount - a.likeCount);
                    break;
                case "title":
                    playlists.sort((a, b) => a.playlist_name.localeCompare(b.playlist_name));
                    break;
                case "date":
                    break;
            }
            console.log(playlists[2]);
            populatePlaylistCards(playlists);
        },
        false,
    );
}

let playlists = JSON.parse(JSON.stringify(data.playlists));
for (let playlist of playlists) {
    playlist.liked = false;
    playlist.display = true;
}

var playlistCards = populatePlaylistCards(playlists);
initializeLikeStatusMap();
dynamicSearch();
sortPlaylists();