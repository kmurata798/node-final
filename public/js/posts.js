$(document).ready(function() {
    $(".vote-up").submit(function(e) {
        e.preventDefault();
    
        var postId = $(this).data("id");
        $.ajax({
            type: "PUT",
            url: "posts/" + postId + "/vote-up",
            success: function(data) {
                // select vote count in dom
                // this. => vote up button
                // use jquery to query up
                let voteCountEl = $(this).closest('.voteScore') // closest goes up the dom, find goes down dom
                votecount = parseInt(voteCountEl.text()) // parses a string argument
                votecount += 1
                voteCountEl.text(votecount) // Same for vote down (But -= 1)
                // .closest will go up one level in the dom => pass in class "votecount" wrap number with span
                // this will return the element  
                // 
                // adjacent div to the vote button
                // go up one with a sibling in the certain class
                // vote count has to be wrapped in span
                // have to select # in itself
                // parse into integer
                // increment by one
                // write it in with .text => overwrite with new text
                // 
                console.log("voted up!");
            },
            
            error: function(err) {
                console.log(err.messsage);
            }
        });
    });
  
    $(".vote-down").submit(function(e) {
        e.preventDefault();
    
        var postId = $(this).data("id");
        $.ajax({
            type: "PUT",
            url: "posts/" + postId + "/vote-down",
            success: function(data) {
            console.log("voted down!");
            },
            error: function(err) {
            console.log(err.messsage);
            }
        });
    });
});