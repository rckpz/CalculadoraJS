window.onload = function () {
  // Seleccionamos el elemento div donde se mostrará el resultado
  const resultadoDiv = document.getElementById("resultadodiv");
  // Seleccionamos todos los botones de la calculadora
  const botones = document.querySelectorAll("button");
  // Declaramos la variable para la expresión con "0" como valor inicial
  let expresion = "0";
  // Declaramos una variable para controlar si se ha ingresado un operador
  let operadorIngresado = false;

  // Asignamos un manejador de eventos a cada botón
  botones.forEach((boton) => {
    // Asignamos la función de manejo de clics a cada botón
    boton.onclick = (event) => {
      // Obtenemos el valor del botón clickeado
      const valor = event.target.innerText;

      // Verificamos si se presionó el botón AC (borrar todo)
      if (valor === "AC") {
        expresion = "0"; // Reiniciamos la expresión a "0"
        resultadoDiv.innerText = expresion; // Mostramos "0" en el resultado
        operadorIngresado = false; // Reiniciamos el control de operador
      }
      // Verificamos si se presionó el botón "=" (calcular resultado)
      else if (valor === "=") {
        try {
          // Evaluamos la expresión y mostramos el resultado
          const resultado = eval(expresion);
          resultadoDiv.innerText = resultado;
          expresion = resultado.toString(); // Convertimos el resultado a cadena
          operadorIngresado = false; // Reiniciamos el control de operador
        } catch (error) {
          resultadoDiv.innerText = "Error"; // Mostramos un mensaje de error en caso de excepción
        }
      }
      // Verificamos si se presionó un operador
      else if ("+-*/".includes(valor)) {
        // Si ya se ingresó un operador previamente, actualizamos la expresión con el último operador
        if (operadorIngresado) {
          expresion = expresion.slice(0, -1) + valor; // Reemplazamos el último operador con el nuevo
        } else {
          expresion += valor; // Agregamos el operador a la expresión
        }
        resultadoDiv.innerText = valor; // Mostramos el operador en el resultado
        operadorIngresado = true; // Actualizamos el control de operador
      }
      // En cualquier otro caso (números)
      else {
        // Verificamos si el último carácter en la expresión es un operador
        if ("+-*/".includes(expresion.slice(-1))) {
          expresion += valor; // Agregamos el número a la expresión
          resultadoDiv.innerText = valor; // Mostramos el número en resultado
        } else {
          // Si no hay operador, agregamos el número a la expresión y lo mostramos
          expresion = expresion === "0" ? valor : expresion + valor;
          resultadoDiv.innerText += valor; // Mostramos el número en resultado
        }
        operadorIngresado = false; // Actualizamos el control de operador
      }
    };
  });
};
