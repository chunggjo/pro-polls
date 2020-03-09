// Forms
const getPollForm = document.querySelector('#getPollForm')
const voteForm = document.querySelector('#voteForm')

// Search box
const search = document.querySelector('input')

// Dynamic text content
const pollTitle = document.querySelector('#pollName')
const statusMessage = document.querySelector('#message')

let id = ''

// Get poll data and create form
getPollForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    id = search.value

    pollTitle.textContent = ''
    statusMessage.textContent = 'Loading...'

    $('#options').empty()

    fetch('http://localhost:3000/polls/'+id).then((response)=>{
        if(response.status === 404) {
            pollTitle.textContent = ''
            statusMessage.textContent = 'Poll not found'
            $('#vote').hide();
            return;
        }
        response.json().then((data)=>{
            pollTitle.textContent = data.title
            statusMessage.textContent = ''
            if(!data.multi) { // Check if poll doesn't allow multiple answers
                radioButtons(data)
            } else {
                checkboxes(data)
            }
            $('#vote').show();
            
        })
    })
})

// Vote on poll
voteForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    statusMessage.textContent = ''

    let options = document.getElementsByName('option')
    let selected = []

    for(let i = 0; i < options.length; i++) {
        if(options[i].checked) {
            selected.push(options[i].value)
        }
    }

    if(selected.length===0){
        return statusMessage.textContent = 'Please select an option'
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

