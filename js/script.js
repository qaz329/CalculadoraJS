(function(){
    // Click event als botons
    var btns = document.querySelectorAll('.boto');
    for (i = 0; i < btns.length; i++) {
    	btns[i].addEventListener("click", function(e) {
    		var botoClicat = this.getAttribute('data-value');
    	});
  	}
})();