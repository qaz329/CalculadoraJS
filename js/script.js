(function(){
    // Numero actual
    var numActual;
    // Boto clicat abans
    var btnAnterior;
    // Ha clicat operador?
    var clicaOperador;
    // Operador clicat
    var operador;
    // Pantalla principal
    var pantallaPrincipal = document.querySelector('#principal');
    // Pantalla historial
    var pantallaHistorial = document.querySelector('#historial');

    // Click event als botons
    var btns = document.querySelectorAll('.boto');
    for (i = 0; i < btns.length; i++) {
    	btns[i].addEventListener("click", function(e) {
    		var botoClicat = this.getAttribute('data-value');
        input(botoClicat);
    	});
  	}

    function reset(){

    }

    function input(btn){
      /* TODO
      switch(btn) {
          case '+':
            clicaOperador = true;
            operador = addition;
            break;
          case '-':
            clicaOperador = true;
            operador = subtraction;
            break;
          case '/':
            clicaOperador = true;
            operador = division;
            break;
          case '*':
            clicaOperador = true;
            operador = multiplication;
            break;
          case 'C':
            reset();
            break;
      }*/

      gestionaBoto(btn);
    }

    function gestionaBoto(btn){
      // Si el boto es un Numero o '.'
      if (!isNaN(btn) || btn === '.') {
          // Expressió regular que comprova si 'numActual' es un numero
          if (btn === '.' && /^\d+$/.test(numActual)) {
              numActual = numActual + btn;
          } else if (!isNaN(btn)) {
              if((!isNaN(btnAnterior) && btnAnterior !== null && pantallaPrincipal.value !== '0') || btnAnterior === '.'){
                numActual = numActual + btn;
              }else{
                numActual = btn;
              }
          }
          clicaOperador = false;
          actualitzaPantalla(numActual);
      }
    }

    function actualitzaPantalla(val) {

        val = String(val);

        //TODO comprovar quants nums hi ha en pantalla per fer-los mes petits

        pantallaPrincipal.value = val;
    }
})();
