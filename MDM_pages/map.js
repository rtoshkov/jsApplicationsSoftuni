// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

// Map връща нов масив от резултата от функцията, която му е подадена
// Map-a не мутира масива върху, който работи - но подадената callback фунцкция може да го мотира.



const array1 = [1, 4, 9, 16];
const map1 = array1.map(x => x * 2);

console.log(map1);  // [ 2, 8, 18, 32 ]
console.log(array1); // [ 1, 4, 9, 16 ]


// Синтакса е стандартния
// Arrow function
// map((element,index,array) => {...});

// Може да подадем и this на map фунцкия
// map(function callbackFn(element, index, array) { ... }, thisArg)
// map(callbackFn, thisArg)


/*
------- Кога да не използваме MAP
Когато не използваш върнатият масив - демек резулатата
Не връщаш стойност от callback фунцкията.
В такива случаи е по-добре да използваш forEech или for...of
 */


/*
Рейнджа, който ще обходи map-а се взима преди извикването за пръв път на callback функцията. Ако променим елемент в runtime-a
на map-a (и този елемент вече е бил минат) то няма да се върне за да го обработи отново. Също така ако променим
дължината на масива по време на runtime-а - новите елементи няма да бъдат обходени. Обаче ако изтрием елемент, преди да
бъде минат - този елемент няма да бъде обработен.
 */

// ************** EXAMPLES


let map = Array.prototype.map;
let a = map.call('Hello World', function(x) {
    return x.charCodeAt(0)
});

console.log(a); // a now equals [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]


