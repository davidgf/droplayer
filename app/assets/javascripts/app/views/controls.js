var Controls = Backbone.View.extend({
  el: '#controls',

  playIconClass: 'play',
  pauseIconClass: 'pause',

  events: {
    'click .play_btn': 'playToggle',
    'click .next_song': 'playNext',
    'click .prev_song': 'playPrev'
  },

  initialize: function(){
    app.playlist.on('playsong',this.play,this);
    this.audio = this.$el.find('audio')[0];
  },

  play: function(song){
    if(song){
      var self = this;
      app.playlist.set('currentSong', song[0]);
      self.audio.src = song[1];
    }
  },

  playToggle: function() {
    console.log('play');
    if (this.audio.paused) {
      this.audio.play();
    } else{
      this.audio.pause();
    }
  },

  togglePlayIcon: function(){
    var play_btn = this.$el.find('.play_btn'); 
    if(play_btn.hasClass(this.playIconClass))
      play_btn.removeClass(this.playIconClass).addClass(this.pauseIconClass);
    else
      play_btn.removeClass(this.pauseIconClass).addClass(this.playIconClass);
  },

  playNext: function(){
    console.log('next');
    var next = app.playlist.getNext();
    if(next){
      var self = this;
      app.playlist.set('currentSong', next);
      next.getMediaLink(function(data){
        if (data && data.hasOwnProperty('url'))
          self.$('audio').attr('src', data.url);
      });
    }
  },

  playPrev: function(){
    console.log('prev');
    var prev = app.playlist.getPrev();
    if(prev){
      var self = this;
      app.playlist.set('currentSong', prev);
      prev.getMediaLink(function(data){
        if (data && data.hasOwnProperty('url'))
          self.$('audio').attr('src', data.url);
      });
    }
  }
});