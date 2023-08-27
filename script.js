console.log("Welcome to spotify");


// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio ('music/1.mp3');
let masterPlay = document.getElementById('masterPlay')
let masterSongName = document.getElementById('masterSongName')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "annihilate", filepath: "music/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Self Love", filepath: "music/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Home", filepath: "music/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Silk and Cologne", filepath: "music/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Link Up", filepath: "music/5.mp3", coverPath: "covers/5.jpeg"}

]
const songColors = {
    "Annihilate": "#ffba4b",
    "Self Love": "#cc99ff",
    "Home": "#ffff00",
    "Silk and Cologne": "#0099cc",
    "Link Up": "#6600cc"
};


// Inside your songItem click event listener
songItems.forEach((element, i) => {
    element.addEventListener('click', (e) => {
        // Rest of your existing song item click code

        // Change background color when a new song starts playing
        const songName = songs[songIndex].songName;
        const color = songColors[songName];
        if (color) {
            document.body.style.backgroundColor = color;
        }
    });
});

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//Handle play pause
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity = 0;

    }
})

//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    //Update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
    })

    myProgressBar.addEventListener('change',()=>{
        audioElement.currentTime = myProgressBar.value * audioElement.duration/100
    })


    const makeAllPlays = ()=>{
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-pause-circle')
            element.classList.add('fa-play-circle');
        })
    }
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
element.addEventListener('click',(e)=>{
    makeAllPlays();
   
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle')
    e.target.classList.add('fa-pause-circle')
    audioElement.src = `music/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')

})
    })

    document.getElementById('next').addEventListener('click',()=>{
        if(songIndex>=5){
            songIndex = 0
        }
        else{
            songIndex +=1
        }
        audioElement.src = `music/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle')
            masterPlay.classList.add('fa-pause-circle')
            const songName = songs[songIndex].songName;
            const color = songColors[songName];
            if (color) {
                document.body.style.backgroundColor = color;
            }
    });

    
    document.getElementById('previous').addEventListener('click',()=>{
        if(songIndex<=0){
            songIndex = 0
        }
        else{
            songIndex -=1
        }
        audioElement.src = `music/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle')
            masterPlay.classList.add('fa-pause-circle')
            const songName = songs[songIndex].songName;
            const color = songColors[songName];
            if (color) {
                document.body.style.backgroundColor = color;
            }
    });
   