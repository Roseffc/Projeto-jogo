const cat = document.querySelector('.cat');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyUp(event)   {
    if (event.keyCode === 32) {
        if(!isJumping){
          jump();
       }
    }
}

function jump () {

    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            //descendo
            let downInterval = setInterval(() => {
                if(position <=0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                position -= 20;
                cat.style.bottom = position + 'px';
                }             
            },20);
        } else {
            //subindo
            position += 20;
            cat.style.bottom = position + "px";
        }
    }, 20);
}

function createPedra() {
    const pedra = document.createElement('div');
    let pedraPosition = 1000;
    let randomTime = Math.random() * 6000;

    pedra.classList.add('pedra');
    pedra.style.left = 1000 + 'px';
    background.appendChild(pedra);

    let leftInterval = setInterval(() => {
        if (pedraPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(pedra);
        } else if (pedraPosition > 0 && pedraPosition < 60 && position < 60) {
        //Game over 
        clearInterval(leftInterval);
        document.body.innerHTML = '<h1 class = "game-over">Fim de jogo</h1>';
    } else {
            pedraPosition -= 10;
            pedra.style.left = pedraPosition + 'px';
        }
    }, 20);
    setTimeout(createPedra, randomTime);
}

createPedra();
document.addEventListener('keyup', handleKeyUp);