status="";
objects=[];


function preload(){
    song = loadSound("music.mp3");
}

function setup(){
canvas= createCanvas(650,400);
canvas.center();
video=createCapture(VIDEO);
video.hide();
objectDetecter=ml5.objectDetector("cocossd",modelloaded);
document.getElementById("status").innerHTML= "status: Detecting object";
}

function draw(){
image(video, 0, 0, 650,400);


if( status != "" ){
    R= random(255);
    G= random(255);
    B= random(255);
     objectDetecter.detect(video,gotResult);
for(i=0; i<objects.length; i++){
    document.getElementById("status").innerHTML= "status: object detected";
    fill(R,G,B);
    percent=floor(objects[i].confidence*100);
    text(objects[i].label + "  "+ percent+"%",objects[i].x,objects[i].y);
    noFill();
    stroke(R,G,B);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    if(objects[i].label == "person"){
        song.stop()
        document.getElementById("number_of_objects").innerHTML="Person Detected"; 
    }
   else{
       song.play();
   }
}    
}

}

function modelloaded(){
    console.log(" model is loaded");
    status="true";
   
}

function gotResult(error,results){
if( error){
    console.error(error);
}
else{
    console.log(results);
    objects=results;

}
}