const caption = document.querySelector("figcaption")

let captionText = ''

for (let i = 0; i < poll.options.length; i++) {
	captionText += poll.options[i].option + ' - ' + poll.options[i].votes
	if(i !== options.length){
		captionText += ', '
	}
}
caption.textContent = captionText

socketio.on('vote', data => {
    captionText = ''
    let options = data.options
	for (let i = 0; i < options.length; i++) {
		captionText += options[i].option + ' - ' + options[i].votes
		if(i !== options.length){
			captionText += ', '
		}
	}
	caption.textContent = captionText
})

