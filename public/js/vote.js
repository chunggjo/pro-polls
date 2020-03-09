const voteForm = document.querySelector('form')

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
    }).then(()=>{
        location.reload()
    })
})

