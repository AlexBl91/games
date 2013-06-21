function setHvrdBoxStyle(event) {
 	var targetBox = event.target || event.srcElement
 	// targetBox.style.background = "#000";
 	$(targetBox).addClass("hovered");
}

function setDfltBoxStyle(event) {
  	var targetBox = event.target || event.srcElement
  	$(targetBox).removeClass("hovered");
}
function setSelctedBoxStyle(event) {
	var targetBox = event.target || event.srcElement
	if (targetBox.className != "box selected hovered") {
		console.log(targetBox.className);
	 	$(targetBox).addClass("selected");  	
	 	console.log(targetBox.className);	
  	} else { 
  		// if selected box already is select, then make for it default style
  		$(targetBox).removeClass("selected");
  	}
}

$(document).ready(function(){
	$(".box").mouseover(function(event){
		setHvrdBoxStyle(event);
	});
	$(".box").mouseout(function(event){
		setDfltBoxStyle(event);
	});
	$(".box").click(function(event){
		setSelctedBoxStyle(event);
	});
});