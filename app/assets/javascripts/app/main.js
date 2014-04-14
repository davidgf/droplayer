$(function() {

    toastr.options = {
      "closeButton": false,
      "debug": false,
      "positionClass": "toast-bottom-full-width",
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "300",
      "timeOut": "1000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    
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
