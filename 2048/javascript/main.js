var broad=new Array();
var score=0;
var isUse=new Array();
window.onload=function(){
    prepare();
    newgame();
};

document.onkeydown=function(event){
    var e=event||window.event||arguments.callee.caller.arguments[0];
    if(e){
        if(canMove(e.keyCode)){
            move(e.keyCode,broad);
            setTimeout("generateOneNumber()",300);
            setTimeout("isGameOver()",450);
        }
    }
}

function prepare()
{
    if(screenWidth>544)
    {
        containerWidth=500;
        cellWidth=100;
        intervalWidth=20;
    }
    var elem=document.getElementById("container");
    elem.style.width=containerWidth+"px";
    elem.style.height=containerWidth+"px";
    var elems=document.querySelectorAll(".cell");
    for(var i=0;i<elems.length;i++)
    {
        elems[i].style.width=cellWidth+"px";
        elems[i].style.height=cellWidth+"px";
    }
}

function isGameOver(){
    if(nospace(broad))
    {
        var flag=false;
        for(var i=0;i<4;i++)
        for(var j=0;j<4;j++)
        {
            if(j-1>=0&&broad[i][j]==broad[i][j-1])flag=true;
            if(i-1>=0&&broad[i][j]==broad[i-1][j])flag=true;
            if(j+1<4&&broad[i][j]==broad[i][j+1])flag=true;
            if(i+1<4&&broad[i][j]==broad[i+1][j])flag=true;
        }
        if(flag==false)alert("游戏结束！");
    }
}

function canMove(dir){
    for(var i=0;i<4;i++)
    {
        for(var j=0;j<4;j++)
        {
            if(dir==37&&j==0)continue;
            if(dir==38&&i==0)continue;
            if(dir==39&&j==3)continue;
            if(dir==40&&i==3)continue;
            if(broad[i][j]!=0)
            {
                if(dir==37&&(broad[i][j-1]==0||broad[i][j]==broad[i][j-1]))return true;
                if(dir==38&&(broad[i-1][j]==0||broad[i][j]==broad[i-1][j]))return true;
                if(dir==39&&(broad[i][j+1]==0||broad[i][j]==broad[i][j+1]))return true;
                if(dir==40&&(broad[i+1][j]==0||broad[i][j]==broad[i+1][j]))return true;
            }
        }
    }
    return false;
}
// left:37
// up:38
// right:39
// down:40
function isClock(x,y,k,dir){
    if(dir==true)
    {
        for(var j=k+1;j<y;j++)
        if(broad[x][j]!=0)return true;

        return false;
    }
    else if(dir==false){
        for(var i=k+1;i<y;i++)
        if(broad[i][x]!=0)return true;
        return false;
    }
}

function newgame(){
    init();//初始化棋盘格
    generateOneNumber();
    generateOneNumber();
}

function init(){
    score=0;
    for(var i=0;i<4;i++)
    {
        broad[i]=new Array();
        isUse[i]=new Array();
        for(var j=0;j<4;j++)
        {
            var elem=document.getElementById("cell-"+i+"-"+j);
            elem.style.left=getPosLeft(i,j)+"px";
            elem.style.top=getPosTop(i,j)+"px";
            broad[i][j]=0;
            isUse[i][j]=false;
        }
    }
    //  broad[3][3]=8;
    updateBroadView();
    score=0;
}

function updateBroadView()
{
    var elems=document.querySelectorAll(".num-cell");
    for(var i=0;i<elems.length;i++)
    elems[i].remove();

    var elem=document.getElementById("container");
    for(var i=0;i<4;i++)
    {
        for(var j=0;j<4;j++)
        {
            isUse[i][j]=false;
            var divs=document.createElement("div");
            divs.className="num-cell";
            divs.id="num-cell-"+i+"-"+j;

            if(broad[i][j]==0)
            {
                divs.style.width=0;
                divs.style.height=0;
                divs.style.left=getPosLeft(i,j)+cellWidth/2+"px";
                divs.style.top=getPosTop(i,j)+cellWidth/2+"px";
            }
            else 
            {
                divs.innerHTML=broad[i][j].toString();
                divs.style.backgroundColor=getNumberBackgroundColor(broad[i][j]);
                divs.style.color=getNumberColor(broad[i][j]);
                divs.style.left=getPosLeft(i,j)+"px";
                divs.style.top=getPosTop(i,j)+"px";
                divs.style.width=cellWidth+"px";
                divs.style.height=cellWidth+"px";
            }
            divs.style.lineHeight=cellWidth+"px";
            elem.appendChild(divs);
        }
    }
}

function generateOneNumber(){
    if(nospace(broad))return false;
    
    var spaceCount=0;
    for(var i=0;i<4;i++)
    {
        for(var j=0;j<4;j++)
        if(broad[i][j]==0)spaceCount++;
    }
    var count=parseInt(Math.floor(Math.random()*spaceCount))+1;
    spaceCount=0;
    for(var i=0;i<4;i++)
    {
        for(var j=0;j<4;j++)
        if(broad[i][j]==0)
        {
            spaceCount++;
            if(spaceCount==count)
            {
                x=i;y=j;break;
            }
        }
    }

    // var x=parseInt(Math.floor(Math.random()*4));
    // var y=parseInt(Math.floor(Math.random()*4));
    // while(broad[x][y]!=0)
    // {
    //     x=parseInt(Math.floor(Math.random()*4));
    //     y=parseInt(Math.floor(Math.random()*4));
    // }

    var value=parseInt(Math.floor(Math.random()*2));
    value=value*2+2;
    broad[x][y]=value;
    showNum(x,y,value);

    return true;
}