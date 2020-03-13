const voteForm = document.querySelector('form')
const message = document.getElementById('message')

voteForm.addEventListener('submit',(e)=>{
    var selectedOption = ''

    e.preventDefault()
    
    var options = document.getElementsByName('option')
    for(var i = 0; i < options.length; i++) {
        if(options[i].checked){
            selectedOption = options[i].value
        }
    }
    fetch(window.location.href, {
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
            "option":selectedOption
        })
    }).then((response)=>{
        if(response.status===200){
            message.textContent="Thanks for voting!"
        } else if(response.status===400){
            message.textContent="You've already voted on this poll"
        }
        // TODO: Implement realtime results
        setTimeout(()=>{
            location.reload()
        }, 1000)
        
    })
})

