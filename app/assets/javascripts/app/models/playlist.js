var Playlist = Backbone.Model.extend({
    initialize: function() {
        this.set('songs', new Songs());
        this.set('currentSong', null);
        this.on(Events.playsong, this.setCurrent, this);
    },
    addSong: function(song){
        this.get('songs').add(song);
    },
    play: function(song){
        console.log('this should play songs');
    },
    getCurrent: function(){
        return this.get('currentSong') || this.get('songs').first();
    },
    setCurrent: function(song){
        this.set('currentSong', song);
    },
    setNext: function(){
        var nextSong = this.getNext();
        if(nextSong)
            this.setCurrent(nextSong);
    },
    setPrev: function(){
        var prevSong = this.getPrev();
        if(prevSong)
            this.setCurrent(prevSong);
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
});