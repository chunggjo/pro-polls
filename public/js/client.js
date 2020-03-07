const pollIdForm = document.querySelector('#getPollForm')
const voteForm = document.querySelector('#voteForm')
const search = document.querySelector('input')
const pollName = document.querySelector('#pollName')
const message = document.querySelector('#message')

let id = ''
// Get poll data and create form
pollIdForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    id = search.value

    pollName.textContent = ''
    message.textContent = 'Loading...'
    $('#options').empty()
    fetch('http://localhost:3000/vote?id='+id).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                pollName.textContent = ''
                message.textContent = data.error
                $('#vote').hide();
            } else {
                pollName.textContent = data.pollName
                message.textContent = ''
                if(!data.multi) { // Multiple poll answers
                    radioButtons(data)
                } else {
                    checkboxes(data)
                }
                
                $('#vote').show();
            }
        })
    })
})

// Vote on poll
voteForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    message.textContent = ''
    let options = document.getElementsByName('option')
    let selected = []
    for(let i = 0; i < options.length; i++) {
        if(options[i].checked) {
            selected.push(options[i].value)
        }
    }

    if(selected.length===0){
        return message.textContent = 'Please select an option'
    }

    console.log(selected)
    // TODO: Create database and let user vote
})


const checkboxes = (data)=>{
    for(let i = 0; i < data.options.length; i++) {
        $('#options').append('<input type="checkbox" id=option'+(i)+' name="option" value="'+(i)+'">')
        .append('<label for="option'+(i)+'">'+data.options[i]+' - '+data.votes[i]+' votes</label><br>')
    }
}


const radioButtons = (data)=>{
    for(let i = 0; i < data.options.length; i++) {
        $('#options').append('<input type="radio" id=option'+(i)+' name="option" value="'+(i)+'">')
        .append('<label for="option'+(i)+'">'+data.options[i]+' - '+data.votes[i]+' votes</label><br>')
    }
}

