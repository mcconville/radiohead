var fs = require('fs');
var gl = require('genius-lyrics-api');

var config = require('./config/credentials.json');

var key = config.genius;

function buildLyrics(songtitle, songdata, albumlyrics, albumdata ) {

    albumlyrics = albumlyrics + "\n\n\n" + songtitle + "\n\n" + songdata.lyrics;

    console.log(albumdata.title);
    console.log(songdata.albumArt);

    var path = "./lyrics/" + albumdata.filename;

    fs.writeFile(path, albumlyrics, function (err) {
        if (err) {
            return console.log(err);
        }
    })

    return albumlyrics;
}

function alert(thing){
    console.log(thing);
}

var timeline = require('./result.json');

key.artist = "Radiohead";

timeline.forEach(function (era) {

    console.log(era.era);

    era.albums.forEach(function (album) {

        var eralyrics = "";

        var albumdata = album;

        var songcount = album.songs.length;

        album.songs.forEach(function (song) {
           
            key.title = song;

            gl.getSong(key).then((songdata) =>
                eralyrics = buildLyrics(song, songdata, eralyrics, albumdata)
            ).catch(err => alert(err));
        })
    })
});


// gl.getLyrics(config).then((lyrics) => console.log(lyrics));

// gl.getSong(config).then((song) =>
//     console.log(`
//     ${song.id}
//     ${song.url}
//     ${song.albumArt}
//     ${song.lyrics}`)
// );

console.log('ran genius');