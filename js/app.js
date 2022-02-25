//funzione numeri random
function getRandom(min,max){
    return Math.round(Math.random() * (max - min) + min);
}

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
const game_start = document.querySelector('.game_start');
game_start.innerHTML = numbers.join(' - ')