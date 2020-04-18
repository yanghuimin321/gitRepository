function showNum(x,y,value){
    var elem=$("#num-cell-"+x+"-"+y);
    elem.css('color',getNumberColor(value));
    elem.css('background-color',getNumberBackgroundColor(value));
    elem.text(value);
    // var elem=document.getElementById("num-cell-"+x+"-"+y);
    // elem.innerHTML=value.toString();
    // elem.style.backgroundColor=getNumberBackgroundColor(value);
    // elem.style.color=getNumberColor(value);
    //  elem.style.left=getPosLeft(x,y)+"px";
    //  elem.style.top=getPosTop(x,y)+"px";
    //  elem.style.width="100px";
    //  elem.style.height="100px";
    elem.animate({
        width:cellWidth+"px",
        height:cellWidth+"px",
        top:getPosTop(x,y),
        left:getPosLeft(x,y)
    },100);
}

function moveAnimation(fromi,fromj,toi,toj){
    var elem=$("#num-cell-"+fromi+"-"+fromj);
    elem.animate({
        top:getPosTop(toi,toj),
        left:getPosLeft(toi,toj)
    },300);
}

function updateScore(socre){
    var elem=document.getElementById("score");
    elem.innerHTML=score.toString();
}