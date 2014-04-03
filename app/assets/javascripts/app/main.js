$(function() {
    
    app = {};
 
    app.library = new Songs(window.songs_json);
    app.library.url = '/songs';
    app.artists = new Artists();
    app.playlist = new Playlist();
    app.songslist = new MainView();
    app.artistslist = new MainView();
    app.plview = new ByArtistView();
    app.controls = new Controls();

    Lungo.init({
        name: 'example'
    });
})
