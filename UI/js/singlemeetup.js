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
let meetupData = document.getElementById('singlemeetupleft');

function getMeetup(){
    //console.log("reached the point")
    const url = new URL(window.location.href)
    const meetupId= url.searchParams.get("id")
    // console.log(meetupId)
    fetch(`/api/v1/meetups/${meetupId}`)
    .then(res => res.json())
    .then(data => {
        console.log(data.meetup.id);
        let output = '';
        output+= `
        <div class="col-left" id="singlemeetupleft">
        <img id="singmeetuppimg" src="/UI/images/${data.meetup.image_name}">
        </div>
        <div class="col-center">
            <p id="venue">${data.meetup.topic}</p>
            <p id="venue"> Venue : ${data.meetup.location}</p>
            <p id="venue"> Date: ${data.meetup.happening_on} </p>
            <p id="venue"> Time : 05:00 P:M </p>
            <p id="venue"> Participants : 15 scheduled</p>
            <form>
                <button id="rsvp" type="submit">RSVP</button>
            </form></a>
        </div>
        <!--<div class="col-right" id="singlemeetupcentercol">
            <div class="images-gird">
                <div class="thumbnail-grid">
                    <img id="thumb-image" src="../images/meetupp.jpg" alt="">
                </div>
                <div class="thumbnail-grid">
                    <img id="thumb-image" src="../images/meetups.jpg" alt="">
                </div>
                <div class="thumbnail-grid">
                    <img id="thumb-image" src="../images/meetups.jpg" alt="">
                </div>
                <div class="thumbnail-grid">
                    <img id="thumb-image" src="../images/meetupp.jpg" alt="">
                </div>
                <div class="thumbnail-grid">
                    <img id="thumb-image" src="../images/meetupp.jpg" alt="">
                </div>
            </div>
        </div>-->
        `;
    document.getElementById('singlemeetupcont').innerHTML = output;
})
} 