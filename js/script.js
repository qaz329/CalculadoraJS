(function(){
    // Resultat
    var resultat;
    // Resultat anterior
    var resAnterior;
    // Historial
    var historial;
    // Numero actual
    var numActual;
    // Boto clicat abans
    var btnAnterior;
    // Ha clicat operador?
    var clicaOperador;
    // Operador clicat
    var operador;
    // Operador clicat anteriormentcalcc
    var operadorAnterior;

    var contadorOperadors;
    // Reset?
    var esReset;
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
      resultat = null;
      numActual = 0;
      btnAnterior = null;
      operador = null;
      operadorAnterior = null;
      contadorOperadors = 0;
      historial = '';
      clicaOperador = false;
      esReset = true;
      actualitzaPantalla(0);
      actualitzaHistorial(historial);
    }

    function input(btn){

      if (!isNaN(btnAnterior) && btn !== '=' && btn !== 'C' && btn !== 'CE' && btn !== 'CS' && btn !== '.') {
          operadorAnterior = operador;
      }

      switch(btn) {
          case '+':
            clicaOperador = true;
            operador = suma;
            break;
          case '-':
            clicaOperador = true;
            operador = resta;
            break;
          case '/':
            clicaOperador = true;
            operador = divisio;
            break;
          case '*':
            clicaOperador = true;
            operador = multiplicacio;
            break;
          case 'C':
            reset();
            break;
      }

      gestionaBoto(btn);

      var fontSize = parseFloat(pantallaPrincipal.style.fontSize);
      // return to default main screen size
      if (fontSize < 3 && numActual.length < 11) {
          pantallaPrincipal.style.fontSize = '3rem';
      }

      console.log('Resultat: ' + resultat);
      console.log('Resultat anterior: ' + resAnterior);
      console.log('Numero actual: ' + numActual);
      console.log('Boto: ' + btn);
      console.log('Operador anterior: ' + operadorAnterior);
      console.log('Contador operadors: ' + contadorOperadors);
      console.log('Boto anterior: '+ btnAnterior);
      console.log('Historial: ' + historial);
      console.log('Pantalla principal ' + pantallaPrincipal.value);
      console.log('*'.repeat(15));
    }

    function gestionaBoto(btn){
      // return si C no es clica quan es divideix per 0
      if (btn !== 'C' && resultat === 'Result is undefined' || resultat === 'Cannot divide by zero') {
          return;
      }

      // actualitza historial
      if (btn !== '=' && btn !== 'C' && btn !== 'CE' && btn !== 'CS') {
          historial = (isNaN(btnAnterior) && isNaN(btn)) ? historial.slice(0, -1) + btn : historial + btn;
      }

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
      }else{
        // actualitza historial
        if (btn === '-' || btn === '+' || btn === '*' || btn === '/') {
            // per exemple, quan es cliqui `-`, afegir `0 -` al historial
            if ((btnAnterior === null || btnAnterior === '=') && !esReset) {
                historial = '0' + btn;
                contadorOperadors++;
            }

            if (!pantallaHistorial.value.length && pantallaPrincipal.value.length) {
                historial = pantallaPrincipal.value + btn;
            }
          }

            // if math op was pressed and result is null
            if (operador && resultat === null) {
                resultat = Number(numActual);
            }

            // percentatges
            if (btn === '%') {
                historial = historial.slice(0, -(numActual.length + 1));
                numActual = percentatge(numActual, resultat);
                historial += numActual + ' ';
                actualitzaPantalla(numActual);
            // arrel
            } else if (btn === 'quadrat' || btn === 'arrel' || btn === '1/x') {
                historial = historial.slice(0, -(numActual.length + btn.length)) + (btn === '1/x' ? '1/(' + numActual + ') ' : btn + '(' + numActual + ') ');

                if(btn === 'quadrat'){
                  numActual = quadrat(numActual);
                }else if(btn === 'arrel'){
                  numActual = arrel(numActual);
                }else{
                  numActual = fraccio(numActual);
                }

                actualitzaPantalla(numActual);
                actualitzaHistorial(historial);
            }

            // resultat
            if (btn === '=') {
                // si existeix operador
                if (operador) {
                    contadorOperadors = 0;
                    // si el ultim boto abans de '=' es un operador
                    if (clicaOperador) {
                        operador(resAnterior);
                    // if last button pressed is `digit` before `=` was pressed
                    } else {
                        operador(Number(numActual));
                    }

                    historial = '';
                    btnAnterior = btn;

                    actualitzaPantalla(resultat);
                    actualitzaHistorial(historial);

                    return;
                }
            }

            // contar operadors

            if (isNaN(btn) && (!isNaN(btnAnterior) || btnAnterior === '%' || btnAnterior === 'sqr' || btnAnterior === 'sqrt' || btnAnterior === '1/x') &&
                btn !== '=' && btn !== 'C' && btn !== 'CE' && btn !== 'CS' && btn !== '.' && btn !== '%' && btn !== 'sqr' & btn !== 'sqrt' && btn !== '1/x') {
                contadorOperadors++;
            }


            if (contadorOperadors >= 2 && (!isNaN(btnAnterior) || btnAnterior === 'sqrt' || btnAnterior === 'sqr' || btnAnterior === '1/x' || btnAnterior === '%') && btn !== 'CE' && btn !== 'CS') {
                operadorAnterior(Number(numActual));
                actualitzaPantalla(resultat);
            }

            if (btn === 'CE' && historial.length > 0) {
                historial = historial.slice(0, -(numActual.length));
                numActual = '0';
                actualitzaPantalla(0);
            } else if (btn === 'CS') {
                if (resultat != pantallaPrincipal.value) {
                    numActual = numActual.slice(0, -1);
                    historial = historial.slice(0, -1);
                    if (!numActual.length) {
                        numActual = '0';
                    }
                    actualitzaPantalla(numActual);
                } else {
                    return;
                }
            }

            if (resultat !== null && btn !== 'CE' && btn !== 'CS') {
                actualitzaHistorial(historial);
            }
          }

      btnAnterior = btn;
      resAnterior = resultat;
      esReset = false;
    }

    function actualitzaPantalla(val) {

        val = String(val);

        if (val.length > 10) {
            pantallaPrincipal.style.fontSize = '1.75rem';
            val = Math.round(val * 10000000000000000) / 10000000000000000;
        }

        pantallaPrincipal.value = val;
    }

    function actualitzaHistorial(historial) {
        pantallaHistorial.value = historial;
    }

    function suma(val) {
        resultat += val;
    }

    function resta(val) {
        resultat -= val;
    }

    function divisio(val) {
        resultat /= val;
    }

    function multiplicacio(val) {
        resultat *= val;
    }

    function quadrat(val) {
        return val * val;
    }

    function arrel(val) {
        return Math.sqrt(val);
    }

    function percentatge(val, res) {
        return res * val / 100;
    }

    function fraccio(val) {
        return 1 / val;
    }

    reset();
})();
