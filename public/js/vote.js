const voteForm = document.querySelector('form')
const message = document.querySelector('#message')
const socketio = io()

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
    fetch('/polls/'+poll.id, {
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
            message.textContent="You've already voted on this poll"
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

const totalVotes = ()=>{
    let totalVotes = 0
    for(let i=0; i<poll.options.length;i++){
        totalVotes += Number(document.getElementById(poll.options[i].option+'-votes').textContent)
    }
    return totalVotes
}
document.querySelector('#totalVotes').textContent=totalVotes()

socketio.on('vote',(data)=>{
    var options = data.options
    for(var i = 0; i < options.length; i++){
        document.getElementById(options[i].option+'-votes').textContent=options[i].votes
    }
    document.querySelector('#totalVotes').textContent=totalVotes()
})

socketio.emit('join',poll.id)