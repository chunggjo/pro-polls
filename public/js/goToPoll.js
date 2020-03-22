window.addEventListener( "pageshow", function ( event ) {
    var historyTraversal = event.persisted || 
                           ( typeof window.performance != "undefined" && 
                                window.performance.navigation.type === 2 );
    if ( historyTraversal ) {
      // Handle page restore.
      window.location.reload();
    }
});
const pollForm = document.querySelector('form')

const search = document.querySelector('input')

pollForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const id = search.value

    window.location.href = '/polls/'+id
})
