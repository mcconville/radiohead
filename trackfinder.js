var lineReader = require('line-reader');
var fs = require('fs');

const { resolve } = require('path');

var config = require('./config/credentials.json');

const LastFM = require('last-fm')
const lastfm = new LastFM(config.lastfm, { userAgent: 'MyApp/1.0.0 (http://example.com)' })

// lastfm.trackSearch({ q: 'magic' }, (err, data) => {
//   if (err) console.error(err)
//   else console.log(data)
// })

// var opts = { name: 'David Bowie (aka Space Oddity)', artistName: 'David Bowie' }

// lastfm.albumInfo(opts, (err, data) => {
//     if (err) {
//         console.log('Album not found: ' + opts.name)
//         console.error(err)
//     } else {
//         for (track of data.tracks) {
//             console.log(track.name)
//         }
//     }
// })



var albumdata = new Map();

function getSongs(title, artist) {

    console.log('received: ' + title)
    return new Promise((resolve, reject) => {

        var parameters = { name: title, artistName: artist }

        lastfm.albumInfo(parameters, (err, data) => {
            if (err) {
                // console.error(err)
                console.error(opts)
            } else {

                albumdata.set(data.name, data);

                count++;

                if (count == expected) {
                    console.log(albumdata)
                    writeFile()
                };

                resolve(data)
            }
        })
    })
}



function getAllSongs(artist) {
    return new Promise((resolve, reject) => {

        var titles = [];

        for (era of timeline) {
            var album;
            for (album of era.albums) {

                getSongs(album.title, artist).then(function (data) {

                    var songs = [];


                })
            }
        }
    })
}



function writeFile() {

    for (era of timeline) {
        var album;
        for (album of era.albums) {
            var newdata = albumdata.get(album.title);

            var songs = [];

            if (newdata != null && newdata.tracks != null) {

                for (track of newdata.tracks) {
                    songs.push(track.name);
                }

                album.songs = songs;

                if (newdata.summary != null) {
                    var background = newdata.summary.split("+");
                    album.background = background;
                }

                var imageIndex =  newdata.images.length -1;

                album.cover = newdata.images[imageIndex];
            }
        }
    }

    fs.writeFile(filepath, JSON.stringify(timeline), function (err) {
        if (err) {
            return console.log(err);
        }
    })
}

var artist = 'Radiohead';
var timeline = require('./data/timeline.json');
var filepath = "./result.json";

var count = 0;
var expected = 0;

for (era of timeline) {
    for (album of era.albums) {
        album.songs = [];
        expected++;
    }
}

getAllSongs(artist).then();

// var opts = { name: 'A Head Full of Dreams', artistName: 'Coldplay' }

// lastfm.albumInfo(opts, (err, data) => {
//     if (err) {
//         console.log('Album not found: ' + opts.name)
//         console.error(err)
//     } else {
//         for (track of data.tracks) {
//             console.log(track.name)
//         }
//     }
// })