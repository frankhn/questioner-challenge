function opencomment(){
    let com = document.getElementById("commentfield");
    com.style.display="block";
}
function closecomment(){
    let com = document.getElementById("commentfield");
    com.style.display="none";
    let allcom = document.getElementById("dallcomments");
    allcom.style.display="none";
}
function allcomments(){
    let com = document.getElementById("dallcomments");
    com.style.display="block";
}
