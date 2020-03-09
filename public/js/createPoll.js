var addOptionButton = document.getElementById('addOption')
var removeOptionButton = document.getElementById('removeOption')
var createForm = document.querySelector('form')
var message = document.getElementById('message')

createForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    var formData
    var optionObjects = []

    var title = document.getElementById('pollTitle').value
    var optionInputs = document.getElementsByClassName('option')

    for(var i = 0; i <  optionInputs.length; i++){
        var obj = {
            "option": optionInputs[i].value,
            "votes":0
        }
        optionObjects.push(obj)
    }

    formData = {
        "title":title,
        "options":optionObjects
    }

    fetch(window.location.href,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(formData)
    }).then((response)=>{        
        response.json().then((data)=>{
            window.location.href = '../polls/' + data.id
        })
    })
})

removeOptionButton.addEventListener('click',()=>{
    var optionCount = getOptionCount()
    var minOptions = 2
    if(optionCount === minOptions){
        return
    }

    $('#'+optionCount).remove()
})

addOptionButton.addEventListener('click',()=>{
    var optionCount = getOptionCount()
    var maxOptions = 8    
    if(optionCount === maxOptions){
        return
    }
    optionCount++

    var html='<div id="'+optionCount+'">'
    html+='<label for="option-'+optionCount+'">Option ' + optionCount + '</label>'
    html+='<input type="text" class="option" name="option-'+optionCount+'">'
    html+='</div>'
    $('#options').append(html)
})

var getOptionCount = () =>{
    return $('.option').length
}