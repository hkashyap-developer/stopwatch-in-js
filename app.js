/* Stopwatch object */

function punchLap() {
    this.start = 0;
    this.end = 0; 
    this.lap = 0; 

    this.process = function(){

        if(this.start == 0) {
            this.start = new Date(); 
        }
        else {           
            this.end = new Date();          
        }
        if(this.start!=0 && this.end != 0) {
            this.lap = this.end - this.start; 
        }
    }  
}


let punches = []; 

let punch = {}; 

let toggVar = 1; 

function aPunch() {


    if(toggVar) {
        /* Creating object when clicking first time */
        punch = new punchLap();

        punch.process();

        console.log("Started"); 

        console.log(punch); 
        toggVar = 0;         

        showDataOnFrontEnd();
        document.querySelector("#statusMessage").innerHTML = "Running";


    }
    else {
        punch.process();
        console.log("Ended");
        console.log(punch);  

        punches.push(punch); 

        toggVar = 1; 
        console.table(punches);


        showDataOnFrontEnd()
        document.querySelector("#statusMessage").innerHTML = "Start Your Sprint";

    }

 




 





}


function clearStopwatch() {
    punches = []; 
    console.log("Clear"); 
    showDataOnFrontEnd()
}

/* ADDITIONAL FEATURES */ 

/* To trigger Punch function on pressing "Spacebar" key */

document.addEventListener("keydown", event => {
    if (event.isComposing || event.keyCode !== 32) {
      return;
    }
    aPunch();  
});



function showDataOnFrontEnd() {


    var k = '<tbody>'
    for(i = 0;i < punches.length; i++){
        k+= '<tr>';
        k+= '<td>' + (i+1) + '</td>';
        k+= '<td>' + punches[i].start.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + '</td>';
        k+= '<td>' + punches[i].end.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + '</td>';
        k+= '<td>' + msToTime(punches[i].lap) + '</td>';
        k+= '</tr>';
    }
    k+='</tbody>';
    document.getElementById('tbody').innerHTML = k;
}

function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }



