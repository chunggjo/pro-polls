const pollIdForm = document.querySelector('#getPollForm')
const voteForm = document.querySelector('#voteForm')
const search = document.querySelector('input')
const pollName = document.querySelector('#pollName')
const message = document.querySelector('#message')

pollIdForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const id=search.value

    message.pollName=''
    message.textContent='Loading...'
    $('#options').empty()
    fetch('http://localhost:3000/vote?id='+id).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                message.pollName=''
                message.textContent=data.error
                $('#vote').hide();
            } else {
                pollName.textContent=data.pollName
                message.textContent=''
                if(!data.multi) { // If poll does not allow multiple options to be voted on
                    createRadioButtons(data)
                } else {
                    createCheckboxes(data)
                }
                
                $('#vote').show();
            }
        })
    })
})

voteForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    let options = document.getElementsByName('option')
    let selected = []
    for(let i = 0; i < options.length; i++) {
        if(options[i].checked) {
            selected.push(options[i].value)
        }
    }
    console.log(selected)

})

const createCheckboxes = (data)=>{
    for(let i = 0; i < data.options.length; i++) {
        $('#options').append('<input type="checkbox" id=option'+(i+1)+' name="option" value="'+(i+1)+'">')
        .append('<label for="option'+(i+1)+'">'+data.options[i]+' - '+data.votes[i]+' votes</label><br>')
    }
}


const createRadioButtons = (data)=>{
    for(let i = 0; i < data.options.length; i++) {
        $('#options').append('<input type="radio" id=option'+(i+1)+' name="option" value="'+(i+1)+'">')
        .append('<label for="option'+(i+1)+'">'+data.options[i]+' - '+data.votes[i]+' votes</label><br>')
    }
}

