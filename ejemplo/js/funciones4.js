$(document).ready(function(){
	$.lFormAjaxMagic("#lForm1",callback);
	$.lFormAjaxMagic("#lForm2",callback);
	$.lFormAjaxMagic("#lForm3",callback);
})

function callback(datos){
	console.log(datos);
	alert("Listo!");
}