require(['jquery', 'backbone', 'underscore', 'models/song', 'collections/songs', 'models/playlist', 'views/main_view', 'views/playlist', 'views/controls', 'lungo'], function($, Backbone, _, song, songs, playlist, mainview, plview, controls, Lungo) {

    

   /* _.templateSettings = {
        interpolate: /\{\{\=(.+?)\}\}/g,
        evaluate: /\{\{(.+?)\}\}/g
    };*/

    $(function() {
        
        app = {};
     
        app.library = new songs();
        app.library.url = '/songs';
        app.playlist = new playlist();
        app.songslist = new mainview();
        app.plview = new plview();
        app.controls = new controls();

        Lungo.init({
            name: 'example'
        });
    })
})
