// Challenge - Regular Functions and Arrow Functions

// Regular Function
function verificarParImpar(numero) {
    if (numero % 2 === 0) {
        console.log("Regular Function:", numero, "es par");
    } else {
        console.log("Regular Function:", numero, "es impar");
    }
}

// Arrow Function
const verificarParImparArrow = (numero) => {
    if (numero % 2 === 0) {
        console.log("Arrow Function:", numero, "es par");
    } else {
        console.log("Arrow Function:", numero, "es impar");
    }
}

// Pruebas
verificarParImpar(8);
verificarParImpar(7);

verificarParImparArrow(10);
verificarParImparArrow(5);