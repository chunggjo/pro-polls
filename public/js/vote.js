(function createPollForm(){
    var html = ''
    for(var i = 0; i < options.length; i++){
        var option = options[i].option
        var votes = options[i].votes
        html+='<div>'
        html+='<input id="'+option+'" type="radio" name="option" value="'+option+'">'
        html+='<label for="'+option+'">'+option+' - <span id="'+option+'-votes">'+votes+'</span> votes</label>'
        html+='</div>'
    }
    return document.querySelector('#options').innerHTML=html
})()

const voteForm = document.querySelector('form')
const message = document.querySelector('#message')
const copyUrl = document.querySelector('#copyUrl')
const urlText = document.querySelector('#urlText')
const socketio = io()

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
    fetch('/polls/'+pollId, {
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
            "option":selectedOption
        })
    }).then((response)=>{
        if(response.status===200){ 
            message.innerHTML='Thanks for voting! <img src="../img/feelsgoodman.png" width="25px">'
            $('#voteButton').hide()
        } else if(response.status===400){
            message.textContent='You\'ve already voted on this poll'
            $('#voteButton').hide()
        }
        response.json().then((data)=>{
            // Send updated options to server
            socketio.emit('vote',{
                options:data.options
            })
        })
    })
})

socketio.on('vote',(data)=>{
    var options = data.options
    for(var i = 0; i < options.length; i++){
        document.getElementById(options[i].option+'-votes').textContent=options[i].votes
    }
})

socketio.emit('join',pollId)

copyUrl.addEventListener('click',()=>{
    urlText.select()
    urlText.setSelectionRange(0,99999)

    document.execCommand('copy')

    message.textContent='Link copied!'
})