const addOptionButton = document.getElementById('addOption')
const removeOptionButton = document.getElementById('removeOption')
const createForm = document.querySelector('form')
const message = document.getElementById('message')

createForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    message.textContent=''
    let formData = {}
    let optionObjects = []

    // Create form data
    const title = document.getElementById('pollTitle').value
    const optionInputs = document.getElementsByClassName('option')
    for(let i = 0; i <  optionInputs.length; i++){
        const obj = {
            "option": optionInputs[i].value,
            "votes":0
        }
        optionObjects.push(obj)
    }
    formData = {
        "title":title,
        "options":optionObjects,
        "voters":[]
    }

    // Post form data
    fetch(window.location.href,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(formData)
    }).then((response)=>{        
        if(response.status===201){
            response.json().then((data)=>{
                window.location.href = '../polls/' + data.id
            })
        }else{
            message.textContent='Please fill in all the fields and try again.'
        }
    })
})

removeOptionButton.addEventListener('click',()=>{
    let optionCount = getOptionCount()
    console.log(optionCount)

    const minOptions = 2
    if(optionCount === minOptions){
        return
    }

    $('#'+optionCount).remove()
})

addOptionButton.addEventListener('click',()=>{
    let optionCount = getOptionCount()
    console.log(optionCount)

    const maxOptions = 16    
    if(optionCount === maxOptions){
        return
    }

    optionCount++
    var html='<div id="'+optionCount+'">'
    html+='<label for="option-'+optionCount+'">Option '+optionCount+'&nbsp;</label>'
    html+='<input type="text" class="option create-input" name="option-'+optionCount+'">'
    html+='</div>'

    $('#options').append(html)
})

var getOptionCount = () =>{
    return $('.option').length
}