function quest(){
	document.getElementById("topquestion").style.display="none";
	document.getElementById("questions").style.display="block";
		document.getElementById("lastcomments").style.display="none";
  document.getElementById("Comment-tab").classList.remove('active');
  document.getElementById("feed-tab").classList.remove('active');
  document.getElementById("question-tab").classList.add('active');
}
function comm(){
	document.getElementById("lastcomments").style.display="block";
	document.getElementById("topquestion").style.display="none";
	document.getElementById("questions").style.display="none";
  document.getElementById("feed-tab").classList.remove('active');
  document.getElementById("Comment-tab").classList.add('active');
  document.getElementById("question-tab").classList.remove('active');
}
function feed(){
	document.getElementById("lastcomments").style.display="none";
	document.getElementById("topquestion").style.display="block";
	document.getElementById("questions").style.display="none";
  document.getElementById("question-tab").classList.remove('active');
  document.getElementById("Comment-tab").classList.remove('active');
  document.getElementById("feed-tab").classList.add('active');
}

function openEdit(){
  document.getElementById("q-buttons-save").style.display="block";
  document.getElementById("q-buttons").style.display="none";
  document.getElementById("q-input").disabled = false;
}
