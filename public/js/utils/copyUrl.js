const urlText = document.querySelector('#urlText')

urlText.value=window.location.href

copyUrl.addEventListener('click',()=>{
    urlText.select()
    urlText.setSelectionRange(0,99999)

    document.execCommand('copy')

    message.textContent='Link copied!'
})
