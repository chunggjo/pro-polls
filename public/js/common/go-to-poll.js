window.addEventListener('pageshow', function (event) {
  var historyTraversal =
    event.persisted ||
    (typeof window.performance != 'undefined' &&
      window.performance.navigation.type === 2)
  if (historyTraversal) {
    // Handle page restore.
    window.location.reload()
  }
})
const pollForm = document.querySelector('form')

const search = document.querySelector('input')

pollForm.addEventListener('submit', (e) => {
  e.preventDefault()
  document.querySelector('#message').textContent = ''

  const id = search.value
  if (isNaN(id)) {
    document.querySelector('#message').textContent = 'Please input a number.'
  } else {
    window.location.href = '/polls/' + id
  }
})
