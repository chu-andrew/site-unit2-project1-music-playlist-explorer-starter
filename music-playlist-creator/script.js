
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
        incrementLikesCount(e, playlist);
    }
    else {
        openModal(playlist);
    }
}

function incrementLikesCount(e, playlist) {
    // TODO must also keep track of state and decrement as necessary
    playlist["likeCount"] += 1;

    const likeCount = document.getElementById(`like-num-${playlist["playlistID"]}`);
    likeCount.textContent = playlist["likeCount"];
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
    var playlistCards = document.getElementsByClassName("playlist-card");
    for (let cardHTML of playlistCards) {
        cardHTML.addEventListener('click', clickedPlaylistCard);
    }
}

function generatePlaylistCard(id, title, creator, imgSrc, likes) {
    let card = `
        <article id=${id} class="playlist-card">
            <img class="playlist-card-cover" src=${imgSrc}>
            <div class="playlist-info-group">
                <h3 class="playlist-card-title">${title}</h3>
                <h4 class="playlist-card-creator">${creator}</h4>
                <div class="playlist-card-likes">
                    <button class="playlist-card-likes-button"><i
                        class="fa-regular fa-heart fa-xl heart-icon"></i></button>
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

    let list = document.getElementById("song-list");
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
                <button class="shuffle-button">Shuffle</button>
            </div>`;
    return info;
}

function generateSongCard(id, title, creator, album, imgSrc, duration) {
    let card = `
        <article id=${id} class="song-info">
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



let playlists = JSON.parse(JSON.stringify(data.playlists));

populatePlaylistCards(playlists);
