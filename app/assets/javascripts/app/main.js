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

    var DEBUG_MODE = true; // Set this value to false for production

    if(typeof(console) === 'undefined') {
       console = {}
    }

    if(!DEBUG_MODE || typeof(console.log) === 'undefined') {
       // FYI: Firebug might get cranky...
       console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time =    console.timeEnd = console.assert = console.profile = function() {};
    }
})
