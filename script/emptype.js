function debounce(func, wait, immediate) {
	var timeout;
	return function executedFunction() {
    var context = this;
    var args = arguments;
  	var later = function() {
    	timeout = null;
    	if (!immediate) {
    		func.apply(context, args);
    	}
  	};
  	var callNow = immediate && !timeout;
  	clearTimeout(timeout);
  	timeout = setTimeout(later, wait);
  	if (callNow) {
  		func.apply(context, args);
  	}
	};
};
function addColor() {
	addSelectedValue(document.querySelector('#colors').value);
}
function addGlyph() {
	addSelectedValue(document.querySelector('#glyphs').value);
}
function addAsciiEmoji() {
	addSelectedValue(document.querySelector('#ascii').value);
}
function addSelectedValue(valueToAdd) {
	var area = document.querySelector('#area');
	var startPos = area.selectionStart;
    var endPos = area.selectionEnd;
    area.value = area.value.substring(0, startPos)
        + valueToAdd
        + area.value.substring(endPos, area.value.length);
	updateDiv();
	area.focus();
}
function updateDiv() {
	var areatxt = document.querySelector('#area').value;
	// Look for colors to replace:
	while (areatxt.indexOf('[') >= 0) {
		var start = areatxt.indexOf('[');
		var end = areatxt.indexOf(']');
		var colorHex = areatxt.substring(start + 1, end);
		areatxt = areatxt.replace(/\[.*?\]/, `</span><span style="color:${colorHex}">`)
	}
	// Look for glyphs to replace:
	GLYPHS.forEach(glyph => {
		var ix = areatxt.indexOf(`:${glyph}:`);
		if (ix >= 0) {
			var imgsrc = `img/glyphs/${glyph}.png`;
			areatxt = areatxt.replace(new RegExp(`:${glyph}:`, 'g'), `<img src=${imgsrc}>`);
		}
	});
	document.querySelector('#divtext').innerHTML = `<span>${areatxt}</span>`;
}
function copyText() {
	var area = document.querySelector('#area');
	area.select();
	document.execCommand('copy');
}
function initGlyphSelect() {
	var select = document.querySelector('#glyphs');
	GLYPHS.forEach(glyph => {
		select.options[select.options.length] = new Option(glyph, `:${glyph}:`);
	});
}
function initColorSelect() {
	var select = document.querySelector('#colors');
	for (var color in COLORS) {
		if (COLORS.hasOwnProperty(color)) {
			select.options[select.options.length] = new Option(color, COLORS[color]);
		}
	}
}
function initAsciiSelect() {
	var select = document.querySelector('#ascii');
	ASCII.forEach(ascii => {
		select.options[select.options.length] = new Option(ascii, ascii);
	});
}
function randomGlyph() {
	const shuffled = shuffle(GLYPHS);
	const glyph = random(shuffled);
	return `img/glyphs/${glyph}.png`;
}
function shuffle(list) {
  var i = 0
    , j = 0
    , temp = null

  for (i = list.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = list[i]
    list[i] = list[j]
    list[j] = temp
  }
  return list;
}
function random(list) {
	const min = Math.ceil(0);
  const max = Math.floor(list.length - 1);
  const index = Math.floor(Math.random() * (max - min + 1)) + min;
  return list[index];
}
