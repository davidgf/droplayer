var GroupedSongsTemplate = 
    '<div class="songslist"> \
        <li class="layout horizontal"> \
            <div><span class="playall"><span class="icon play"></span>Play all</span></div> \
            <div><span class="qeueall"><span class="icon plus-sign"></span>Qeue all</span></div> \
        </li> \
        <ul> \
            <% _.each(songs, function(song){ %> \
                <li><strong><%= song.get("title") || song.get("path") %></strong></li> \
            <% }); %> \
        </ul> \
    </div>';