var lines = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

function setHvrdBoxStyle(event) {
 	var targetBox = event.target || event.srcElement
 	$(targetBox).addClass("hovered");
}

function setDfltBoxStyle(event) {
  	var targetBox = event.target || event.srcElement
  	$(targetBox).removeClass("hovered");
}

function setSelctedBoxStyle(event) {
	var targetBox = event.target || event.srcElement
	// if (!isMemberOf(targetBox, 'neighbor')) {
	if (!$(targetBox).hasClass('neighbor')) {
		// if (!isMemberOf(targetBox, 'selected')) {
		if (!$(targetBox).hasClass('selected')) {
			// console.log(targetBox.className);
		 	$(targetBox).addClass("selected");  	
		 	// console.log(targetBox.className);	
		 	markingNeighborBoxs(targetBox, 0);
	  	} else { 
	  		// if selected box already is select, then make for it default style
	  		$(targetBox).removeClass('selected');
		  	markingNeighborBoxs(targetBox, 1);
	  	}
	}
}

function getLineOfElem(elem) {
	var idStr = elem.id.split('_');
	return idStr[0];
}

function getIndexOfElem(elem) {
	var idStr = elem.id.split('_');
	return Number(idStr[1]);
}

function isMemberOf(elem, className) {
	var elemClasses = elem.className.split(' ');
	for (var i = 0; i < elemClasses.length; i++) {
		if (elemClasses[i] == className) {
			return 1;
		}
	}
	return 0;
}

// The fuction of selecting and marking a neighbor boxs of the selected box.
// Function accepts 2 arguments.
// selectedBox - a DOM object.
// mode - the parametr of mode of work.
// mode = 0 - marking a neighbor boxs
// mode = 1 - unmarking a neighbor boxs
function markingNeighborBoxs(selectedBox, mode) {
	// TODO:
	// to write a check of accepted arguments
	//

	var neighborBoxs = [];
	// var parsingIdResult = selectedBox.id.split('_');
	// var lineOfSelectedBox = parsingIdResult[0];
	// var indexOfSelectedBox = Number(parsingIdResult[1]);
	var lineOfSelectedBox = getLineOfElem(selectedBox);
	var indexOfSelectedBox = getIndexOfElem(selectedBox);

	switch(lineOfSelectedBox) {
		case lines[0]: {
			var lineFrom = 0, lineTo = 2;
			break;
		}
		case lines[lines.length - 1]: {
			var lineFrom = -1, lineTo = 1;
		}
		default: {
			var lineFrom = -1, lineTo = 2;
		}
	}
	switch(indexOfSelectedBox) {
		case 1: {
			var indexFrom = 0, indexTo = 2;
			break;
		}
		case 10: {
			var indexFrom = -1, indexTo = 1;
		}
		default: {
			var indexFrom = -1, indexTo = 2;
		}
	}

	for (var i = lineFrom, lineNE = lines[lines.indexOf(lineOfSelectedBox) + lineFrom]; i < lineTo; i++, lineNE = lines[lines.indexOf(lineOfSelectedBox) + i]) {
		for (var j = indexFrom, indexNE = indexOfSelectedBox + indexFrom; j < indexTo; j++, indexNE = indexOfSelectedBox + j) {
			if (indexNE != indexOfSelectedBox && lineNE != lineOfSelectedBox) {
				var neighborEl = document.getElementById(lineNE + '_' + indexNE);
				if ( mode == 0 && !$(neighborEl).hasClass('selected')) {
					$(neighborEl).addClass("neighbor");
				} else {
					if (!isNeeded(neighborEl)) {
						$(neighborEl).removeClass("neighbor")
			  		}
				}
			}
		}
	}
}

// The function checks is needed disabled box for a selected box or not
function isNeeded(elem) {
	var line = getLineOfElem(elem);
	var index = getIndexOfElem(elem);
	if (!$(document.getElementById(lines[lines.indexOf(line) - 1] + '_' + (index - 1))).hasClass('selected') && 
		!$(document.getElementById(lines[lines.indexOf(line) - 1] + '_' + (index + 1))).hasClass('selected') &&
		!$(document.getElementById(lines[lines.indexOf(line) + 1] + '_' + (index - 1))).hasClass('selected') &&
		!$(document.getElementById(lines[lines.indexOf(line) + 1] + '_' + (index + 1))).hasClass('selected')) {
		return 0;
	} else {
		return 1;
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