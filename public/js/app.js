const pollIdForm = document.querySelector('form')
const search = document.querySelector('input')
const pollName = document.querySelector('#pollName')
const message = document.querySelector('#message')

pollIdForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const id = search.value

    message.pollName = ''
    message.textContent = 'Loading...'
    $('#votes').empty()
    fetch('http://localhost:3000/vote?id='+id).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                message.textContent=data.error
            } else {
                pollName.textContent=data.pollName
                message.textContent=''
                for(var i = 0; i < data.options.length; i++) {
                    $('#votes').append('<li>'+data.options[i]+' - '+data.votes[i]+' votes</li>')
                }
                
            }
        })
    })
})
