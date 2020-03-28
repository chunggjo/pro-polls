const addOptionButton = document.getElementById('addOption')
const removeOptionButton = document.getElementById('removeOption')
const createForm = document.querySelector('form')
const message = document.getElementById('message')

createForm.addEventListener('submit', e => {
	e.preventDefault()

	message.textContent = ''
	let formData = {}
	let optionObjects = []

	const title = document.getElementById('pollTitle').value
	const optionInputs = document.getElementsByName('option')


	// Create form data
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
		voters: [],
		totalVotes: 0,
		dateCreated: new Date()
	}

	// Post form data
	fetch('/create', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(formData)
	}).then(response => {
		if (response.status === 201) {
			response.json().then(poll => {
				window.location.href = '../polls/' + poll.id
			})
		} else if (response.status === 400) {
			message.textContent =
				'Could not create poll. Please check that all options are unique.'
		}
	})

	//alert("Button clicked");
            grecaptcha.ready(function() {
                grecaptcha.execute('6LfL_eMUAAAAAD8KT1-IbleO62YzIfO8T9ns676P', {action: 'homepage'}).then(function(token) {
                    alert("Tokem went away")
                 });
            }); 
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

	optionCount++
	var html = '<div id="' + optionCount + '">'
	html +=
		'<label for="option-' +
		optionCount +
		'">Option ' +
		optionCount +
		'&nbsp;</label>'
	html +=
		'<input id="option-' +
		optionCount +
		'" type="text" class="option create-input" name="option" required>'
	html += '</div>'

	$('#options').append(html)
})

var getOptionCount = () => {
	return $('.option').length
}
