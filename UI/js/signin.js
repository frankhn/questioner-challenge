
function create(){
	document.getElementById("lform").style.display="none";
	document.getElementById("crform").style.display="block";
}
function login(){
	document.getElementById("lform").style.display="block";
	document.getElementById("crform").style.display="none";
		document.getElementById("rform").style.display="none";
}
function reset(){
	document.getElementById("lform").style.display="none";
	document.getElementById("rform").style.display="block";
}