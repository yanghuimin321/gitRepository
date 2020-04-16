function getPosLeft(i,j){
    return 20+j*120;
}
function getPosTop(i,j){
    return 20+i*120;
}

function getNumberBackgroundColor(num){
    switch(num){
        case 2:
            return "#eee4da";break;
        case 4:
            return "#ede0c8";break;
        case 8:
            return "#f2b179";break;
        case 16:
            return "#f59563";break;
        case 32:
            return "#f67c5f";break;
        case 64:
            return "#f65b3b";break;
        case 128:
            return "#edcf72";break;
        case 256:
            return "#edcc61";break;
        case 512:
            return "#9c0";break;
        case 1024:
            return "#33b5e5";break;
        case 2048:
            return "#09c";break;
        case 4096:
            return "#a6c";break;
        case 8192:
            return "#93c";break;
    }
    return "black";
}

function getNumberColor(num)
{
    if(num<=4)
        return "#776e65";
    
    return "white";
}

function nospace(broad)//判断是否没有空位置
{
    var flag=0;
    for(var i=0;i<4;i++)
    {
        for(var j=0;j<4;j++)
        if(broad[i][j]==0)
        {
            flag=1;break;
        }
    }
    if(flag==0)return true;
    else return false;
}

function move(dir,broad){
    if(dir==37){
        for(var i=0;i<4;i++)
            for(var j=1;j<4;j++)
                if(broad[i][j]!=0)
                {
                    for(var k=0;k<j;k++)
                    {
                        if(broad[i][k]==0&&!isClock(i,j,k,true))
                        {
                            broad[i][k]=broad[i][j];
                            broad[i][j]=0;
                            moveAnimation(i,j,i,k);
                        }
                        else if(broad[i][k]==broad[i][j]&&!isClock(i,j,k,true)&&!isUse[i][k])
                        {
                            broad[i][k]+=broad[i][j];
                            broad[i][j]=0;
                            moveAnimation(i,j,i,k);
                            score+=broad[i][k];
                            updateScore(score);
                            isUse[i][k]=true;
                        }
                    }
                }
    }
    else if(dir==38){
        for(var j=0;j<4;j++)
            for(var i=1;i<4;i++)
                if(broad[i][j]!=0)
                {
                    for(var k=0;k<i;k++)
                    {
                        if(broad[k][j]==0&&!isClock(j,i,k,false))
                        {
                            broad[k][j]=broad[i][j];
                            broad[i][j]=0;
                            moveAnimation(i,j,k,j);
                        }
                        else if(broad[k][j]==broad[i][j]&&!isClock(j,i,k,false)&&!isUse[k][j])
                        {
                            broad[k][j]+=broad[i][j];
                            broad[i][j]=0;
                            moveAnimation(i,j,k,j);
                            score+=broad[k][j];
                            updateScore(score);
                            isUse[k][j]=true;
                        }
                    }
                }
    }
    else if(dir==39){
        for(var i=0;i<4;i++)
        for(var j=2;j>=0;j--)
        {
            if(broad[i][j]!=0)
            {
                for(var k=3;k>j;k--)
                {
                    if(broad[i][k]==0&&!isClock(i,k,j,true))
                    {
                        broad[i][k]=broad[i][j];
                        broad[i][j]=0;
                        moveAnimation(i,j,i,k);
                    }
                    else if(broad[i][k]==broad[i][j]&&!isClock(i,k,j,true)&&!isUse[i][k])
                    {
                        broad[i][k]+=broad[i][j];
                        broad[i][j]=0;
                        moveAnimation(i,j,i,k);
                        score+=broad[i][k];
                        updateScore(score);
                        isUse[i][k]=true;
                    }
                }
            }
        }
    }
    else if(dir==40){
        for(var j=0;j<4;j++)
        for(var i=2;i>=0;i--)
        if(broad[i][j]!=0)
        {
            for(var k=3;k>i;k--)
            {
                if(broad[k][j]==0&&!isClock(j,k,i,false))
                {
                    broad[k][j]=broad[i][j];
                    broad[i][j]=0;
                    moveAnimation(i,j,k,j);
                }
                else if(broad[k][j]==broad[i][j]&&!isClock(j,k,i,false)&&!isUse[k][j])
                {
                    broad[k][j]+=broad[i][j];
                    broad[i][j]=0;
                    moveAnimation(i,j,k,j);
                    score+=broad[k][j];
                    updateScore(score);
                    isUse[k][j]=true;
                }
            }
        }
    }
    setTimeout("updateBroadView()",300);
}
