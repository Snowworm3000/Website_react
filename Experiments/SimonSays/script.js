function main(){
    function randomInteger(start,end){
        return Math.floor(Math.random() * (end - start + 1)) + start
    }

    let sound = ['pike','straddle','tuckJump','180','360','starJump','tuckJump']
    soundsFolder = './sounds/'

    function randomSound(){
        audio = soundsFolder +  sound[0,randomInteger(0,sound.length-1)]+ '.wav'
        playSound(audio)
    }

    function playSound(file,random){
        audio = new Audio(file)
        audio.play()
        audio.addEventListener('ended',async function(){
            if(random){
                randomSound()
            }else{
                await sleep(2000)
                playLoop()
            }
        })
    }

    playLoop()
    function playLoop(){
        if(randomInteger(0,5)==0){
            playSound(soundsFolder+'doA.wav',true)
        }else if(randomInteger(0,2)==0){
            playSound(soundsFolder+'siSays.wav',true)
        }else{
            playSound(soundsFolder+'simonSays.wav',true)
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}