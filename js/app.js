//timer memory
const timeWait = 15;
//timer attesa
const timeInput = 30;


const div_title = document.querySelector('.div_title');
const time_wrapper = document.querySelector('.time-wrapper');
const game_start = document.querySelector('.game_start');
const mind_wait = document.querySelector('.mind_wait');


//btn start
const cta_start = document.querySelector('.cta_start');
cta_start.addEventListener('click', start);


//btn send
const cta_send = document.querySelector('.cta_send');


//funzione restart
function restart(){
    window.location.reload();
}


//funzione start game
function start(){

    //btn restart
    const cta_restart = document.querySelector('.cta_restart');
    cta_restart.addEventListener('click', restart);

    //cambio titolo div
    div_title.innerHTML = `Memorizza i seguenti numeri!`;
    time_wrapper.classList.remove('d-none');

    //scambio btn
    cta_start.classList.add('d-none');
    cta_restart.classList.remove('d-none');

    const numbers = [];

    //generazione numeri
    while(numbers.length < 5){
        const numero = getRandom(1,99);
        
        if(!numbers.includes(numero)){
            numbers.push(numero);
        }
    }

    
    //stampa numeri
    game_start.innerHTML = numbers.join(' - ');

    //avvio timer 15 sec
    timeClock(timeWait);
    //time memorizazzione
    setTimeout(timeRemember, timeWait * 1000);
    //time attesa
    setTimeout(inputUser, (timeWait + timeInput) * 1000);

    //listener invio dati
    cta_send.addEventListener('click', sendInput);

    //funzione invio input utente
    function sendInput(){

        const numberInput = document.getElementsByClassName('input_number');
        let score = 0;
        const numbersUser = [];

        for(let i = 0; i < 5; i++){

            const inputValue = numberInput[i].value;
            if(inputValue !== '' && !numbersUser.includes(inputValue)){
                //input valido
                numbersUser.push(inputValue);
            }else{
                //input vuoto
                
                return;
            }
        }

        //cta send scompare
        cta_send.classList.add('d-none');

        for(let k = 0; k < numbersUser.length; k++){

            //cella input
            const cellInput = numberInput[k];
            //valori array numeri utente
            const userVerification = parseInt(numbersUser[k]);

            if(numbers.includes(userVerification)){
                //numero esatto
                score++;
                cellInput.classList.add('green');
            }else{
                //numero sbagliato
                cellInput.classList.add('red');
            }
        }

        if(score == 5){
            div_title.innerHTML = `Wow, sei un genio!`;
        }else{
            div_title.innerHTML = `Hai indovinato ${score} numeri su 5!`;
        }
    }
}


//funzione numeri random
function getRandom(min,max){
    return Math.round(Math.random() * (max - min) + min);
}


//funzione time circle
function timeClock(time){
    const time_memory = document.querySelector('.time_memory');
    time_memory.innerHTML = time;
    const clockMemory = setInterval(() => {

        time--;
        time_memory.innerHTML = time;

        if(time === 5){
            time_memory.classList.add('c-red');
        }

        if(time === 0){
            clearInterval(clockMemory);
            time_memory.classList.remove('c-red');
        }
    }, 1000);
}


//funzione time remember
function timeRemember(){

    //array nascosto
    game_start.innerHTML = '';
    game_start.classList.add('d-none');
    //comparsa mind
    mind_wait.classList.remove('d-none');
    //cancellazione title
    div_title.innerHTML = `Ooooom...concetrati`;
    //avvio timer 30 sec
    timeClock(timeInput);
}


//funzione comparsa input
function inputUser(){        

    const game_input = document.querySelector('.game_input');
    //scomparsa timer e img attesa
    time_wrapper.classList.add('d-none');
    mind_wait.classList.add('d-none');
    //comparsa input utente
    game_input.classList.remove('d-none');
    cta_send.classList.remove('d-none');

    //titolo
    div_title.innerHTML = `Scrivi i numeri che ricordi <i class="far fa-meh-rolling-eyes"></i>`;
}