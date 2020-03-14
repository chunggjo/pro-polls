const pollForm = document.querySelector('form')

const search = document.querySelector('input')

pollForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const id = search.value

    window.location.href = '/polls/'+id
})
