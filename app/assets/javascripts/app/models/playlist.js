var Playlist = Backbone.Model.extend({
    initialize: function() {
        this.set('songs', new Songs());
        this.set('currentSong', null);
        // this.get('songs').on('add', 'triggerFirst',this);
    },
    addSong: function(song){
        this.get('songs').add(song);
    },
    getCurrent: function(){
        return this.get('currentSong') || this.get('songs').first();
    },
    getNext: function(){
        var currentIndex =  this.get('songs').indexOf(this.getCurrent());
        console.log('current index: '+currentIndex);
        if(currentIndex > -1 && currentIndex < this.get('songs').length-1)
            return this.get('songs').at(currentIndex + 1);
        else
            return null;
    },
    getPrev: function(){
        var currentIndex =  this.get('songs').indexOf(this.getCurrent());
        if(currentIndex > -1 && currentIndex > 0)
            return this.get('songs').at(currentIndex - 1);
        else
            return null;
    }
    // triggerFirst: function(song, songs){
    //     if(songs.length == 1)
    //         console.log('first added');
    //     else
    //         console.log('added another one');
    // }
    
});