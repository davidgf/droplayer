$(function() {
    
    app = {};
 
    app.library = new Songs(window.songs_json);
    app.library.url = '/songs';
    app.playlist = new Playlist();
    app.songslist = new MainView();
    app.artistslist = new ArtistsView();
    app.albumslist = new AlbumsView();
    app.plview = new PlaylistView();
    app.controls = new Controls();

    Lungo.init({
        name: 'example'
    });
})
