const urlText = document.querySelector('#urlText')

urlText.value=window.location.href

copyUrl.addEventListener('click',()=>{
    urlText.select()
    urlText.setSelectionRange(0,99999)

    document.execCommand('copy')

    message.textContent='Link copied!'
})

$.ajax({
    url: "https://api.linkpreview.net?key=f7a8f49f09c9564fd1eeb5704a7e16d6&q=" + urlText,
    success: function(result){
        console.log(result);
    }
})