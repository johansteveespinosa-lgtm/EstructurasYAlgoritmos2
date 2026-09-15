// Homework 01 - Arrays
// Research and use all Array functions

let numeros = [1, 2, 3, 4, 5];

// 1. at()
console.log("at:", numeros.at(2));

// 2. concat()
let otrosNumeros = [6, 7];
console.log("concat:", numeros.concat(otrosNumeros));

// 3. copyWithin()
let copia = [1, 2, 3, 4, 5];
copia.copyWithin(0, 3);
console.log("copyWithin:", copia);

// 4. entries()
let entradas = numeros.entries();
console.log("entries:", entradas.next().value);

// 5. every()
console.log("every:", numeros.every(numero => numero > 0));

// 6. fill()
let llenado = [1, 2, 3, 4, 5];
llenado.fill(0, 1, 4);
console.log("fill:", llenado);

// 7. filter()
console.log("filter:", numeros.filter(numero => numero > 2));

// 8. find()
console.log("find:", numeros.find(numero => numero > 3));

// 9. findIndex()
console.log("findIndex:", numeros.findIndex(numero => numero > 3));

// 10. findLast()
console.log("findLast:", numeros.findLast(numero => numero > 2));

// 11. findLastIndex()
console.log("findLastIndex:", numeros.findLastIndex(numero => numero > 2));

// 12. flat()
let anidados = [1, [2, 3], [4, 5]];
console.log("flat:", anidados.flat());

// 13. flatMap()
console.log("flatMap:", numeros.flatMap(numero => [numero, numero * 2]));

// 14. forEach()
numeros.forEach(numero => {
    console.log("forEach:", numero);
});

// 15. includes()
console.log("includes:", numeros.includes(3));

// 16. indexOf()
console.log("indexOf:", numeros.indexOf(3));

// 17. join()
console.log("join:", numeros.join("-"));

// 18. keys()
let claves = numeros.keys();
console.log("keys:", claves.next().value);

// 19. lastIndexOf()
let repetidos = [1, 2, 3, 2, 4];
console.log("lastIndexOf:", repetidos.lastIndexOf(2));

// 20. map()
console.log("map:", numeros.map(numero => numero * 2));

// 21. pop()
let final = [1, 2, 3];
console.log("pop:", final.pop(), final);

// 22. push()
let agregar = [1, 2, 3];
agregar.push(4);
console.log("push:", agregar);

// 23. reduce()
console.log("reduce:", numeros.reduce((total, numero) => total + numero, 0));

// 24. reduceRight()
console.log("reduceRight:", numeros.reduceRight((total, numero) => total + numero, 0));

// 25. reverse()
let invertido = [1, 2, 3, 4, 5];
invertido.reverse();
console.log("reverse:", invertido);

// 26. shift()
let primero = [1, 2, 3];
console.log("shift:", primero.shift(), primero);

// 27. slice()
console.log("slice:", numeros.slice(1, 4));

// 28. some()
console.log("some:", numeros.some(numero => numero > 4));

// 29. sort()
let desordenados = [5, 2, 4, 1, 3];
desordenados.sort((a, b) => a - b);
console.log("sort:", desordenados);

// 30. splice()
let modificados = [1, 2, 3, 4];
modificados.splice(1, 2, 10, 20);
console.log("splice:", modificados);

// 31. toLocaleString()
console.log("toLocaleString:", numeros.toLocaleString());

// 32. toString()
console.log("toString:", numeros.toString());

// 33. unshift()
let agregarInicio = [2, 3, 4];
agregarInicio.unshift(1);
console.log("unshift:", agregarInicio);

// 34. values()
let valores = numeros.values();
console.log("values:", valores.next().value);