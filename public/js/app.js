const pollIdForm = document.querySelector('form')
const search = document.querySelector('input')
pollIdForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const id = search.value
    fetch('http://localhost:3000/vote?id='+id).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                console.log(data.error)
            } else {
                console.log(data.pollName)
                for(var i = 0; i < data.options.length; i++) {
                    console.log('Votes for ' + data.options[i] + ': ' + data.votes[i])
                }
            }
        })
    })
})
