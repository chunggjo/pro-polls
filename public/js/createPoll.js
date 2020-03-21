const addOptionButton = document.getElementById('addOption')
const removeOptionButton = document.getElementById('removeOption')
const createForm = document.querySelector('form')
const message = document.getElementById('message')

createForm.addEventListener('submit', e => {
	e.preventDefault()

<<<<<<< HEAD
	message.textContent = ''
	let formData = {}
	let optionObjects = []

	// Create form data
	const title = document.getElementById('pollTitle').value
	const optionInputs = document.getElementsByClassName('option')
	for (let i = 0; i < optionInputs.length; i++) {
		const obj = {
			option: optionInputs[i].value,
			votes: 0
		}
		optionObjects.push(obj)
	}
	formData = {
		title: title,
		options: optionObjects,
		voters: []
	}

	// Post form data
	fetch(window.location.href, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(formData)
	}).then(response => {
		if (response.status === 201) {
			response.json().then(data => {
				window.location.href = '../polls/' + data.id
			})
		} else {
			message.textContent = 'Please fill in all the fields and try again.'
		}
	})
=======
    const title = document.getElementById('pollTitle').value
    const optionInputs = document.getElementsByName('option')
    const optionsArray = []

    // Check for valid form data
    for(let i = 0; i <  optionInputs.length; i++){
        if(optionInputs[i].value===''){
            return message.textContent='Please make sure all fields are filled then try again.'
        }
        optionsArray.push(optionInputs[i].value)
    }
    
    const uniqueOptions = [...new Set(optionsArray)]
    if(uniqueOptions.length < getOptionCount()){
        return message.textContent='Please make sure all options are unique then try again.'
    }

    // Create form data
    for(let i = 0; i <  optionsArray.length; i++){
        const obj = {
            "option": optionsArray[i],
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
            message.textContent='Could not create poll, please check your internet connection.'
        }
    })
>>>>>>> efa1573580cc7e08ea3b2f41153e6d2f07944355
})

removeOptionButton.addEventListener('click', () => {
	let optionCount = getOptionCount()

	const minOptions = 2
	if (optionCount === minOptions) {
		return
	}

	$('#' + optionCount).remove()
})

addOptionButton.addEventListener('click', () => {
	let optionCount = getOptionCount()

	const maxOptions = 8
	if (optionCount === maxOptions) {
		return
	}

<<<<<<< HEAD
	optionCount++
	var html = '<div id="' + optionCount + '">'
	html +=
		'<label for="option-' +
		optionCount +
		'">Option ' +
		optionCount +
		'&nbsp;</label>'
	html +=
		'<input type="text" class="option create-input" name="option-' +
		optionCount +
		'">'
	html += '</div>'
=======
    optionCount++
    var html='<div id="'+optionCount+'">'
    html+='<label for="option-'+optionCount+'">Option '+optionCount+'&nbsp;</label>'
    html+='<input id="option-'+optionCount+'" type="text" class="option create-input" name="option">'
    html+='</div>'
>>>>>>> efa1573580cc7e08ea3b2f41153e6d2f07944355

	$('#options').append(html)
})

var getOptionCount = () => {
	return $('.option').length
}
