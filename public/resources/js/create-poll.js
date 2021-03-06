const message = document.getElementById('message')

// Create poll
document.querySelector('form').addEventListener('submit', (e) => {
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
      votes: 0,
    }
    optionObjects.push(obj)
  }
  formData = {
    title: title,
    options: optionObjects,
  }

  // Post form data
  fetch('/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  }).then((response) => {
    response.json().then((poll) => {
      if (response.status === 201) {
        window.location.href = '../polls/' + poll.id
      } else if (response.status === 400) {
        // TODO: Return specific error message
        message.textContent =
          'Could not create poll. Please check that all options are unique and there are no inappropriate words.'
      }
    })
  })
})

// Reduce number of options
document.getElementById('removeOption').addEventListener('click', () => {
  let optionCount = getOptionCount()

  const minOptions = 2
  if (optionCount === minOptions) {
    return
  }

  $('#' + optionCount).remove()
})

// Increase number of options
document.getElementById('addOption').addEventListener('click', () => {
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
    '" type="text" class="option rounded-input create-input" name="option" required>'
  html += '</div>'

  $('#options').append(html)
})

let getOptionCount = () => {
  return $('.option').length
}
