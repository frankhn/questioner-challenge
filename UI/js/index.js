
function getMeetups(){
    fetch('http://localhost:3000/api/v1/meetups/')
    .then((res) => res.json())
    .then((data) => {
        let output='';
        data.data.forEach(function(meetup){
           output += `
        <div class="card">
         <div class="meetup-content">
            <img src="/UI/images/${meetup.image_name}" id="imgs" alt="Sunday Bible study">
            <h4 class="meetup-name">${meetup.topic}</h4>
            <h5 class="date">${meetup.happening_on}</h5>
            <p class="location">${meetup.location}</p>
            <h5 class="time">15:00 P:M</h5>
            <p id="rdmore"><a id="rdmore" href="singlemeetup.html">Read More</a></p>
         </div>
        </div>`;
        });
        document.getElementById('meetupgird').innerHTML = output;
    })
}
