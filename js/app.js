const div_title = document.querySelector('.div_title');
const time_wrapper = document.querySelector('.time-wrapper');
const game_start = document.querySelector('.game_start');

const mind_wait = document.querySelector('.mind_wait');


//15
const timeWait = 5;
//30
const timeInput = 8;






const cta_btn = document.querySelector('.cta_btn');
cta_btn.addEventListener('click', start);


const cta_restart = document.querySelector('.cta_restart');
cta_restart.addEventListener('click', restart);






function restart(){
    window.location.reload()
}











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

    setTimeout(timeRemember, timeWait * 1000);

    const fafafa = setTimeout(() =>{
        
        time_wrapper.classList.add('d-none');
        mind_wait.classList.add('d-none');






    }, (timeWait + timeInput) * 1000);


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

    game_start.classList.add('d-none');
    time_wrapper.classList.remove('align-self-end');
    time_wrapper.classList.add('align-self-center');
    mind_wait.classList.remove('d-none');
    div_title.innerHTML = ``;
    //avvio timer 30 sec
    timeClock(timeInput);
}












//funzione numeri random
function getRandom(min,max){
    return Math.round(Math.random() * (max - min) + min);
}