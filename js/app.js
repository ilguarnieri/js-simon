const div_title = document.querySelector('.div_title');
const time_wrapper = document.querySelector('.time-wrapper');
const game_start = document.querySelector('.game_start');
const game_input = document.querySelector('.game_input');

const mind_wait = document.querySelector('.mind_wait');


//15
const timeWait = 1;
//30
const timeInput = 2;





//btn start
const cta_start = document.querySelector('.cta_start');
cta_start.addEventListener('click', start);

//btn restart
const cta_restart = document.querySelector('.cta_restart');
cta_restart.addEventListener('click', restart);

//btn send
const cta_send = document.querySelector('.cta_send');






//funzione restart
function restart(){
    window.location.reload()
}










//funzione start game
function start(){

    div_title.innerHTML = `Memorizza i seguenti numeri!`;
    time_wrapper.classList.remove('d-none');

    //scambio btn
    cta_start.classList.add('d-none');
    cta_restart.classList.remove('d-none');

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

    //listener invio dati
    cta_send.addEventListener('click', sendInput);

    //controllo inserimento dati
    //confronto array

    //funzione invio input utente
    function sendInput(){

        //listener btn
        const numberInput = document.getElementsByClassName('input_number');

        let j = 0;
        const numbersUser = [];

        while(j < 5){
            const inputValue = numberInput[j];
            if(inputValue.value !== ''){
                //input valido
                j++;
                numbersUser.push(inputValue.value);
            }else{
                //input vuoto
                alert('ATTENZIONE!\nUna o più caselle sono vuote.');
                return;
            }
        }

        //cta send scompare
        cta_send.classList.add('d-none');

        for(let k = 0; k < numbersUser.length; k++){

            


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
    game_start.classList.add('d-none');
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
    cta_send.classList.remove('d-none');
}