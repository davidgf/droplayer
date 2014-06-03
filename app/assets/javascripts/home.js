// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

//= require jquery
//= require jquery_ujs

$(function(){
    var $root = $('html, body');
    var $links = $('#sections-menu a');
    $links.click(function(e){
        e.preventDefault();
        var anchor = $.attr(this, 'href');
        $root.animate({
            scrollTop: $(anchor).offset().top
        }, 500, function () {
            window.location.hash = anchor;
        });
        $("#nav-collapse").removeClass("in").addClass("collapse");
        return false;
    });

    $('#logo').click(function(e){
        $root.animate({scrollTop:0}, '500', 'swing');
    });
})