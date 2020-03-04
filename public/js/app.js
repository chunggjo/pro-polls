
fetch('http://localhost:3000/vote?id=19458348').then((res)=>{
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