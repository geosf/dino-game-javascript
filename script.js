const dino = document.querySelector('.dino');
let isJumping = false;
let background = document.querySelector('.background');
let position = 0;
var continua = true;
let e = document.querySelector('.contador');
let contador = 0;
var velocity = 20;
		
let countInterval = setInterval(() => { 
    e.innerHTML = contador++
}, 100);

let handleKeyUp = (event)=>{
    if (event.keyCode === 32 || event.keyCode ===38){
        if(!isJumping){
        jump();
        }
    }
}

let jump = ()=>{
    isJumping = true;

    let upInterval = setInterval(()=> {
        if(position >= 150){
            clearInterval(upInterval);

            let downInterval = setInterval(()=>{
                if (position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }
                else{
                position -= 20;
                dino.style.bottom = position + 'px';
                }
            }, 30);
        }
        else{
        position += 20;
        dino.style.bottom = position + "px";
        }
    }, 25);
}

let createCactus = ()=>{
    const cactus = document.createElement('div');
    let cactusPosition = 1220;
    let randomTime = Math.random() * 3000;

    console.log(randomTime);

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus)

    let leftInterval = setInterval(()=>{
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + "px";

        if (cactusPosition < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
            continua = true;
            console.log(continua + " entrou aq")
            
            if(contador >= 150){
                console.log('contador: ' + contador)
                console.log('velocidade: ' + velocity)
                velocity = 15;
            }
            if(contador >= 250){
                console.log('contador: ' + contador)
                console.log('velocidade: ' + velocity)
                velocity = 10;
            }
            if (contador >= 400){
                velocity = 5;
            }

            if (contador >= 600){
                velocity = 1;
            }

            setTimeout(createCactus, randomTime)

        }
        else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
            clearInterval(leftInterval)
            
            gameOver();
            
            
            //document.body.innerHTML = '<h1 class="game-over">fim de jogo</h1>'
            
        }
    }, velocity);
        

        
}


let gameOver = ()=>{
    background.style.animationPlayState = 'paused';
    const fim = document.createElement('div');
    fim.classList.add('fim');
    background.appendChild(fim);

    const refresh = document.createElement('button')
    refresh.classList.add('refresh')
    background.appendChild(refresh)
    refresh.setAttribute('onclick', 'botaoRefresh()')
    clearInterval(countInterval);

    
}

let botaoRefresh = ()=>{
    document.location.reload(true)
}

createCactus();
document.addEventListener('keydown', handleKeyUp);

//document.addEventListener('keydown', handleKeyDown);

// let handleKeyDown = (event)=>{
//     if(event.keyCode === 40){
//         if(!isDown){
//             down();
//         }
//     }
// }

// let down = ()=>{
//     isDown = true;
//     dino.style.width = "80px"
//     dino.style.height = "46px"
//     dino.style.backgroundImage = "url(dino-bot1.png)";
// }