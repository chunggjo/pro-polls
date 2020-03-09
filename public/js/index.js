// Forms
const pollForm = document.querySelector('form')
// const voteForm = document.querySelector('#voteForm')


const search = document.querySelector('input')

// const pollTitle = document.querySelector('#pollName')
// const statusMessage = document.querySelector('#message')

pollForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const id = search.value

    window.location.href = '/polls/'+id
    // getPoll()
})

// voteForm.addEventListener('submit',(e)=>{
//     e.preventDefault()

//     vote()
// })

// // Get poll data and create form
// const getPoll = ()=>{
//     var id = search.value
//     pollTitle.textContent = ''
//     statusMessage.textContent = 'Loading...'

//     $('#options').empty()

//     fetch('http://localhost:3000/polls/'+id).then((response)=>{
//         if(response.status === 404) {
//             pollTitle.textContent = ''
//             statusMessage.textContent = 'Poll not found'
//             $('#vote').hide();
//             return;
//         }
//         response.json().then((data)=>{
//             pollTitle.textContent = data.title
//             statusMessage.textContent = ''
//             if(!data.multi) { // Check if poll doesn't allow multiple answers
//                 radioButtons(data)
//             } else {
//                 checkboxes(data)
//             }
//             votes = data.votes
//             $('#vote').show();
//         })
//     })

// }

// // Vote on poll
// const vote = ()=>{
//     statusMessage.textContent = ''

//     var options = document.getElementsByName('option')
//     var selected = []

//     for(var i = 0; i < options.length; i++) {
//         if(options[i].checked) {
//             selected.push(options[i].value)
//         }
//     }

//     if(selected.length===0){
//         return statusMessage.textContent = 'Please select an option'
//     }

//     for(var i = 0; i < selected.length; i++) {
//         data.votes[selected]++;
//     }
//     $('#vote').hide();
//     statusMessage.textContent = 'Thanks for voting!'

    
//     fetch('http://localhost:3000/polls/'+data.id,{
//         method:'PATCH',
//         headers:{'Content-Type':'application/json'},
//         body: JSON.stringify({
//               "votes":data.votes
//         }),
//     })
// }

// const checkboxes = (data)=>{
//     for(let i = 0; i < data.options.length; i++) {
//         $('#options').append('<input type="checkbox" id=option'+(i)+' name="option" value="'+(i)+'">')
//         .append('<label for="option'+(i)+'">'+data.options[i]+' - '+data.votes[i]+' votes</label><br>')
//     }
// }

// const radioButtons = (data)=>{
//     for(let i = 0; i < data.options.length; i++) {
//         $('#options').append('<input type="radio" id=option'+(i)+' name="option" value="'+(i)+'">')
//         .append('<label for="option'+(i)+'">'+data.options[i]+' - '+data.votes[i]+' votes</label><br>')
//     }
// }

