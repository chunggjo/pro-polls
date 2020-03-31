$.ajax({
    url: "https://api.linkpreview.net?key=f7a8f49f09c9564fd1eeb5704a7e16d6&q=" + urlText,
    success: function(result){
        console.log(result);
    }
})