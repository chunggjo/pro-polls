const voteForm = document.querySelector('form')
const message = document.querySelector('#message')
const copyUrl = document.querySelector('#copyUrl')
const urlText = document.querySelector('#urlText')
const socket = io()

urlText.value=window.location.href

voteForm.addEventListener('submit',(e)=>{

    let selectedOption = ''

    e.preventDefault()
    
    const options = document.getElementsByName('option')
    for(let i = 0; i < options.length; i++) {
        if(options[i].checked){
            selectedOption = options[i].value
        }
    }

    // Send patch request with selected option
    fetch(window.location.href, {
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
            "option":selectedOption
        })
    }).then((response)=>{
        if(response.status===200){ 
            message.innerHTML='Thanks for voting! <img src="../img/feelsgoodman.png" width="25px">'
        } else if(response.status===400){
            message.textContent='You\'ve already voted on this poll'
        }
        // TODO: Implement realtime results
        setTimeout(()=>{
            location.reload()
        }, 1000)
    })
})

copyUrl.addEventListener('click',()=>{
    urlText.value=window.location.href

    urlText.select()
    urlText.setSelectionRange(0,99999)

    document.execCommand('copy')

    message.textContent='Link copied!'
})