var score,started=false;
var playerSeqLen=0;
var originalSeq=[];
var r = new Audio("res/click.mp3");
var w = new Audio("res/wrong.mp3");
$(".btn").click(function(){
    r.play();
    start();
    play();
});

$(".box").click(function(){
    if(!started) wrong();
    else{
        flash($(this));
        r.play();
        playerSeqLen++;
        var t=parseInt($(this).attr("id"));
        if(t!==originalSeq[playerSeqLen-1]) wrong();
        else if(playerSeqLen===originalSeq.length) {
            score++;
            $(".score").text(score);
            playerSeqLen=0;
            setTimeout(play,1000);
        }
    } 
});

$(document).on("keypress",function (k){
    var c=k.key;
    console.log(c);
    c=c.toLowerCase();
    var t;
    switch(c){
        case "r": t=0; break;
        case "b": t=1; break;
        case "g": t=2; break;
        case "y": t=3; break;
        case "s": start(); play(); return;
        default : wrong(); return;
    }
    if(!started) wrong();
        else{
            flash($("#"+t));
            r.play();
            playerSeqLen++;
            if(t!==originalSeq[playerSeqLen-1]) wrong();
            else if(playerSeqLen===originalSeq.length) {
                score++;
                r.play();
                $(".score").text(score);
                playerSeqLen=0;
                setTimeout(play,1000);
            }
        } 
});



function flash(a){
    a.css("opacity","0.5");
    setTimeout(function(){
    a.css("opacity","1");
    },100);
}
function start(){
    r.play();
    flash($(".btn"));
    score=0;
    started=true;
    playerSeqLen=0;
    originalSeq.length=0;
    $(".heading").text("Score : ");
    $(".score").text(score);
}
function wrong(){
    w.play();
    $("body").css("background-color","red");
    setTimeout(function(){
        $("body").css("background-color","white");
    },200);
    if(started) {
        $(".heading").text("Game Over.");
        $(".score").text("");
    }
    started=false;
}
function play(){
    var f=Math.floor(Math.random()*4);
    originalSeq.push(f);
    flash($("#"+f));    
}