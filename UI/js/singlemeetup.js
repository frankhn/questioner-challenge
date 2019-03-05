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

class StartMeetUp{
    constructor(){
        this.url = new URL(window.location.href)
        this.meetupId= this.url.searchParams.get("id")
    }
    meetup(){
        fetch(`/api/v1/meetups/${this.meetupId}`)
        .then(res => res.json())
        .then(data => {
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
getQuestions(){
    fetch(`api/v1/meetups/${this.meetupId}/questions`)
    .then(res => res.json())
    .then(data =>{
        let output = ''
        data.forEach(question => {
           output+= `
           <div class="singquestioncolcent"><h4>Was the meet up venue rescheduled?</h4>
           <button id="upvote" onclick="upvote()"><span id="numberupvote"></span><span>upvote</span></button>
           <button  id="downvote" onclick="downvote()"><span id="numberdownvote"></span><span>downvote</span></button>
           <button  id="comment" onclick="opencomment()">comment</button>
           <div class="commentfield" id="commentfield">
           <form method="" action="">
           <input type="text" class="postforminput" name="qst" placeholder="post a Comment">
           <input type="submit" name="post" id="postformsubmit" value="Post">
           </form>
           <button  id="comment" onclick="closecomment()">close</button>
           <button  id="allcomment" onclick="allcomments()">comments</button>
           </div>
           <div class="dallcomments" id="dallcomments">
           <div>
           <p><h5>John</h5>::the venue isn't rescheduled dude!!</p>
           </div>
           <div>
           <p><h5>Mark</h5>::We only changed the Entrance but not the venue</p>
           </div>
           </div>
           `
        });
    })
}
}
function getMeetup(){
    let mast = new StartMeetUp();
    mast.meetup()
    mast.getQuestions()
} 