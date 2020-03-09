var options = $('#options')
var addOptionButton = document.getElementById('addOption')
var removeOptionButton = document.getElementById('removeOption')

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
    options.append(html)
})

var getOptionCount = () =>{
    return $('.option').length
}