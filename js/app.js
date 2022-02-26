const div_title = document.querySelector('.div_title');
const time_wrapper = document.querySelector('.time-wrapper');
const game_start = document.querySelector('.game_start');
const game_input = document.querySelector('.game_input');

const mind_wait = document.querySelector('.mind_wait');


//15
const timeWait = 5;
//30
const timeInput = 8;





//btn start
const cta_btn = document.querySelector('.cta_btn');
cta_btn.addEventListener('click', start);

//btn restart
const cta_restart = document.querySelector('.cta_restart');
cta_restart.addEventListener('click', restart);





//funzione restart
function restart(){
    window.location.reload()
}










//funzione start game
function start(){

    div_title.innerHTML = `Memorizza i seguenti numeri!`;
    time_wrapper.classList.remove('d-none');

    const numbers = [];
    let i = 0;

    //generazione numeri
    while(i < 5){
        const numero = getRandom(1,99);
        
        if(!numbers.includes(numero)){
            i++;
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

    //creazione listener invio dati
    //controllo inserimento dati
    //confronto array



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
    game_start.classList.add('d-none');
    //circle time centrale
    time_wrapper.classList.remove('align-self-end');
    time_wrapper.classList.add('align-self-center');
    //comparsa mind
    mind_wait.classList.remove('d-none');
    //cancellazione title
    div_title.innerHTML = ``;
    //avvio timer 30 sec
    timeClock(timeInput);
}


//funzione comparsa input
function inputUser(){        
    time_wrapper.classList.add('d-none');
    mind_wait.classList.add('d-none');
    game_input.classList.remove('d-none');
}