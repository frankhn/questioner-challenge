function opencomment() {
    const com = document.getElementById('commentfield');
    com.style.display = 'block';
}
function closecomment() {
    const com = document.getElementById('commentfield');
    com.style.display = 'none';
    const allcom = document.getElementById('dallcomments');
    allcom.style.display = 'none';
}
function allcomments() {
    const com = document.getElementById('dallcomments');
    com.style.display = 'block';
}
const meetupData = document.getElementById('singlemeetupleft');

function getMeetup(){
    let mast = new StartMeetUp();
    mast.meetup()
    mast.getQuestions() 
}
function askq(){
    let ques = new StartMeetUp();
    ques.ask(title, body)
}

class StartMeetUp {
    constructor() {
        this.url = new URL(window.location.href);
        this.meetupId = this.url.searchParams.get('id');
        this.Mquestion = '';
    }
    ask(title, body) {
        const data =  new FormData ();
        data.append ('title', title);
        data.append ('body', body);
        
        fetch(`/api/v1/meetups/${this.meetupId}/questions`, {
            method: 'POST',
            body: data
        })
    }
    meetup() {
        fetch(`/api/v1/meetups/${this.meetupId}`)
        .then(res => res.json())
        .then(data => {
            let output = '';
            output+= `
            <div class='col-left' id='singlemeetupleft'>
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
            </div>-->`;
            document.getElementById('singlemeetupcont').innerHTML = output;
        })
    }
    getQuestions(){
        fetch(`/api/v1/meetups/${this.meetupId}/questions`)
        .then(res => res.json())
        .then(data =>{ 
            data.data.forEach(question => {
                this.Mquestion+=`
                <div class="singquestioncolcent"><h4>${question.title}</h4>
                <button id="upvote" onclick="upvote()"><span id="numberupvote"></span><span>upvote</span></button>
                <button  id="downvote" onclick="downvote()"><span id="numberdownvote"></span><span>downvote</span></button>
                <button  id="comment" onclick="opencomment()">comment</i></button>
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
                </div>
                `
            });
            document.getElementById('mquest').innerHTML = this.Mquestion;
        })
    }
}
