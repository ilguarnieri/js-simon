//timer memory
const timeWait = 10;
//timer attesa
const timeInput = 20;


const div_title = document.querySelector('.div_title');
const time_wrapper = document.querySelector('.time-wrapper');
const game_start = document.querySelector('.game_start');
const mind_wait = document.querySelector('.mind_wrapper');
const div_alert = document.querySelector('.div_alert');


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

    //btn alert
    const cta_alert = document.querySelector('.cta_alert');
    cta_alert.addEventListener('click', close_alert);

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
    game_start.classList.add('text-red');
    game_start.classList.remove('d-none');
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

        //fissaggio numeri input in un array
        for(let i = 0; i < 5; i++){
            const inputValue = parseInt(numberInput[i].value);
            if(numberInput[i].value !== '' && !numbersUser.includes(inputValue)){
                //input valido
                numbersUser.push(inputValue);
            }else{
                //input vuoto
                div_alert.classList.remove('d-none');    
                return;
            }
        }

        //cta send scompare
        cta_send.classList.add('d-none');

        //colorazione celle
        numbersUser.forEach((el, i) => {
            const cellInput = numberInput[i];
            if(numbers.includes(el)){
                //numero esatto
                score++;
                cellInput.classList.add('green');
            }else{
                //numero sbagliato
                cellInput.classList.add('red');
            }
        });   

        if(score == 5){
            // title vincita
            div_title.innerHTML = `Wow, sei un genio!`;
        }else{
            let q = 0;
            const solution = [];
            const wrongNumbers = [];
            // ricerca numeri sbagliati
            numbers.forEach(el => {
                if(!numbersUser.includes(el)){
                    wrongNumbers.push(el);
                }              
            });
            // ricerca numeri indovinati
            numbersUser.forEach(el => {
                if(numbers.includes(el)){
                    solution.push(el);
                }else{
                    solution.push(wrongNumbers[q]);
                    q++;
                }                
            });

            // title hai perso
            div_title.innerHTML = `Hai indovinato ${score} numeri su 5!`;
            game_start.classList.remove('d-none');
            game_start.classList.remove('text-red');
            game_start.classList.add('text-blue');
            game_start.innerHTML = solution.join(' - ');    
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


//funzione chiusura alert
function close_alert(){
    div_alert.classList.add('d-none');
}