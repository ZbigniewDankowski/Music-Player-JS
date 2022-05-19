import { songs } from "./MusicList.js";

//create list elements

const createPlaylist = (song, index) => {
  const number = index < 10 ? `0${index}` : index;
  return `<li class="song">
        <p class="number">${number}</p>
        <img src=${song.image} alt="" />
        <div class="song_info">
          <span class="song_title">${song.title}</span>
          <span class="song_author">${song.artist}</span>
        </div>
        <span class="play_button"
          ><i class="fa-solid fa-circle-play"></i
        ></span>
      </li>`;
};

const musicListParrentElement = document.querySelector(".list");

songs.forEach((song, index) => {
  const element = createPlaylist(song, index);
  musicListParrentElement.innerHTML += element;
});

//selectors
const unactiveSongContainer = document.querySelector(".unactiveSong");
const activeSongContainer = document.querySelector(".activeSong");
const activeMusicTitle = document.querySelector(".active_song_title");
const activeMusicAuthor = document.querySelector(".active_song_author");
const activeMusicImage = document.querySelector(".active_song_image");

//music play
const music = new Audio();
let activeMusicIndex = 0;

const setActualMusicInfo = (index) => {
  activeMusicTitle.textContent = songs[index].title;
  activeMusicAuthor.textContent = songs[index].artist;
  activeMusicImage.style.backgroundImage = `url(${songs[index].image})`;
};
//playlist button event
const playlistButtons = Array.from(
  musicListParrentElement.getElementsByTagName("i")
);
playlistButtons.forEach((button, index) =>
  button.addEventListener("click", () => {
    activeMusicIndex = index;
    playlist.classList.toggle("visible");
    music.src = songs[index].path;
    music.play();
    unactiveSongContainer.classList.add("hidden");
    activeSongContainer.classList.remove("hidden");
    setActualMusicInfo(index);
  })
);

const musicPlayButton = document.querySelector(".music_play");
const musicNextButton = document.querySelector(".music_forward");
const musicPreviousButton = document.querySelector(".music_back");

musicNextButton.addEventListener("click", () => {
  if (activeMusicIndex === songs.length - 1) {
    music.src = songs[0].path;
    activeMusicIndex = 0;
    setActualMusicInfo(activeMusicIndex);
  } else {
    music.src = songs[activeMusicIndex + 1].path;
    activeMusicIndex += 1;
    setActualMusicInfo(activeMusicIndex);
  }
  musicPlayButton.classList.add("fa-pause");
  musicPlayButton.classList.remove("fa-play");
  music.play();
});
musicPreviousButton.addEventListener("click", () => {
  if (activeMusicIndex === 0) {
    music.src = songs[songs.length - 1].path;
    activeMusicIndex = songs.length - 1;
    setActualMusicInfo(activeMusicIndex);
  } else {
    music.src = songs[activeMusicIndex - 1].path;
    activeMusicIndex -= 1;
    setActualMusicInfo(activeMusicIndex);
  }
  musicPlayButton.classList.add("fa-pause");
  musicPlayButton.classList.remove("fa-play");
  music.play();
});

musicPlayButton.addEventListener("click", () => {
  if (music.paused || music.currentTime <= 0) {
    music.play();
    musicPlayButton.classList.add("fa-pause");
    musicPlayButton.classList.remove("fa-play");
  } else {
    music.pause();
    musicPlayButton.classList.remove("fa-pause");
    musicPlayButton.classList.add("fa-play");
  }
});

//music time
const bar = document.querySelector(".seek");
const dot = document.querySelector(".dot");
const timeBar = document.querySelector(".time_bar");
const startTime = document.querySelector(".startTime");
const endTime = document.querySelector(".endTime");

music.addEventListener("timeupdate", () => {
  //D-Duration C-Current
  let musicCurrentTime = music.currentTime;
  let musicDuration = music.duration;

  let Dmin = Math.floor(musicDuration / 60);
  let Dsec = Math.floor(musicDuration % 60);

  let Cmin = Math.floor(musicCurrentTime / 60);
  let Csec = Math.floor(musicCurrentTime % 60);

  if (Dsec < 10) {
    Dsec = `0${Dsec}`;
  }
  endTime.textContent = `${Dmin}:${Dsec}`;

  if (Csec < 10) {
    Csec = `0${Csec}`;
  }
  startTime.textContent = `${Cmin}:${Csec}`;

  //bar

  let progressBar = parseInt((music.currentTime / music.duration) * 100);
  bar.value = progressBar;
  let seekBar = bar.value;
  timeBar.style.width = `${seekBar}%`;
  dot.style.left = `${seekBar}%`;

  bar.addEventListener("change", () => {
    music.currentTime = (bar.value * music.duration) / 100;
  });

  music.addEventListener("ended", () => {
    musicPlayButton.classList.remove("fa-pause");
    musicPlayButton.classList.add("fa-play");
  });
});

const mobile_playlist_button = document.querySelector(".playlist_mobile");
const playlist = document.querySelector(".playlist");

mobile_playlist_button.addEventListener("click", () => {
  playlist.classList.toggle("visible");
});

