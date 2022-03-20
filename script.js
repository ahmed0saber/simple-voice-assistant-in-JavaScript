var speech = new SpeechSynthesisUtterance()
console.log("Ready")
const btn = document.querySelector('.microphone')

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition =  new SpeechRecognition()

recognition.onstart = function(){
    btn.classList.add('on')
    speech.text = ''
    window.speechSynthesis.speak(speech)
    setTimeout(voiceOff, 2000)
}

function voiceOff() {
    btn.classList.remove('on')
}

recognition.onresult = function (event){
    const current = event.resultIndex
    const transcript = event.results[current][0].transcript
    readOutLoud(transcript)
    voiceOff()
}

btn.addEventListener('click', () =>{
    recognition.start()
})

function readOutLoud(message){
    speech.text = 'I cannot understand you ! can you say that again ?'

    if(message.includes('hello')){
        speech.text = "Hello sir"
    }
    else if(message.includes('YouTube')){
        understood('https://www.youtube.com/')
    }
    else if(message == 'Google'){
        understood('https://www.google.com')
    }
    else if(message.includes('Google')){
        understood('https://www.google.com/search?q=' + message.substr(message.indexOf("Google") + 6))
    }
    else if(message.includes('Facebook')){
        understood('https://www.facebook.com/')
    }
    
    speech.volume = 1
    speech.rate = 1.1
    speech.pitch = 1

    window.speechSynthesis.speak(speech)
}
function understood(link){
    speech.text = "opening , please wait !"
    window.open(link)
}