var board = new Array()
var score = 0
var hasConflicted = new Array()

$(document).ready(
    function() {
        newgame()
    }
)

function newgame() {
    //初始化棋盘格
    init();
    //在随机的两个格子生成数字
    generateOneNumber();
    generateOneNumber();
};

function init() {
    //设置棋盘的格子布局
    for (var i=0;i<4;i++) {
        for (var j=0;j<4;j++) {
            var gridCell = $('#grid-cell-'+i+'-'+j)
            gridCell.css("top",getPosTop(i,j))
            gridCell.css("left",getPosLeft(i,j))
        }
    }
    //建立board数组
    for (var i=0;i<4;i++) {
        board[i] = new Array()
        hasConflicted[i] = new Array()
        for (var j=0;j<4;j++) {
            board[i][j] = 0
            hasConflicted[i][j] = false
        }
    }
    //把board数组传递到前端界面
    updateBoardView()

    score = 0
}

//根据每次的数组的每个值，来更新每个theNumberCell的样式
function updateBoardView() {
    $(".number-cell").remove()
    for (i=0;i<4;i++) {
        for (j=0;j<4;j++) {
            $("#grid-container").append(
            '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>'
            )
            //JS尽量使用单引号；变量不需要引号
            var theNumberCell = $('#number-cell-'+i+'-'+j)

            hasConflicted[i][j] = false

            if (board[i][j] == 0) {
                    theNumberCell.css({
                    'width':'0px',
                    'height':'0px',
                    'top':getPosTop(i,j),
                    'left':getPosLeft(i,j)
                    })
                }   
                
                else {
                    theNumberCell.css({
                    'width':'100px',
                    'height':'100px',
                    'top':getPosTop(i,j),
                    'left':getPosLeft(i,j),
                    'background-color':getBackGroundColor(board[i][j]),
                    'color':getColor(board[i][j])
                    })
                    theNumberCell.text(board[i][j])}
        }
    }
}

function generateOneNumber() {
    if (nospace(board) == true) {
       
    } else {
        //随机生成一个位置
        var randx = parseInt(Math.floor(Math.random() * 4))  
        var randy = parseInt(Math.floor(Math.random() * 4))  
        
        for (var times=0;times<50;times++) {
            if (board[randx][randy] == 0) {
                break
            }
            else {
                randx = parseInt(Math.floor(Math.random() * 4))
                randy = parseInt(Math.floor(Math.random() * 4))
            }
        }

        if (times == 50) {
            for (var i=0;i<4;i++) {
                for (var j=0;j<4;j++) {
                    if (board[i][j] == 0) {
                        randx = i
                        randy = j
                        break
                    }
                }
            }
        }

        //随机生成2或4
        if (Math.random() < 0.5) {
            var randNumber = 2
        } else {
            var randNumber = 4
        }

        //把这个2或4显示在这个位置上
        board[randx][randy] = randNumber
        showNumberWithAnimation(randx,randy,randNumber)

    }
}



//document不需要加引号
$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37:
            moveLeft()
            setTimeout("generateOneNumber()",350)
            setTimeout("isgameover()",400)

            break;
        case 38:
            event.preventDefault()
            moveUp()
            setTimeout("generateOneNumber()",350)
            setTimeout("isgameover()",400)
            
            break;
        case 39:
            moveRight()
            setTimeout("generateOneNumber()",350)
            setTimeout("isgameover()",400)
            
            break;
        case 40:
            event.preventDefault()
            moveDown()
            setTimeout("generateOneNumber()",350)
            setTimeout("isgameover()",400)
            
            break;
    
        default:
            break;
    }
})

//实现触控
document.addEventListener('touchstart',function(event) {
    start_x = event.touches[0].pageX
    start_y = event.touches[0].pageY
})

document.addEventListener('touchend',function(event) {
    end_x = event.changedTouches[0].pageX
    end_y = event.changedTouches[0].pageY

    var delta_x = end_x - start_x
    var delta_y = end_y - start_y

    if (Math.abs(delta_x) < 20 && Math.abs(delta_y) < 20) {
        //return代表返回函数，不再进行后续代码
        return
    }

    if (Math.abs(delta_x) > Math.abs(delta_y)) {
        if (delta_x > 0) {
            moveRight()
            setTimeout("generateOneNumber()",350)
            setTimeout("isgameover()",400)       
        }
        else {
            moveLeft()
            setTimeout("generateOneNumber()",350)
            setTimeout("isgameover()",400)      
        }
    }
    else {
        if (delta_y > 0) {
            moveDown()
            setTimeout("generateOneNumber()",350)
            setTimeout("isgameover()",400)            
        }
        else {
            moveUp()
            setTimeout("generateOneNumber()",350)
            setTimeout("isgameover()",400)            
        }
    }

})





function isgameover() {
    if (nospace(board) && nomove(board)) {
        gameover()
    }
}

function gameover() {
    alert('gameover!')
}



function moveLeft() {
//    if (canMoveLeft() == true) {
        //进行moveLeft操作
        //'='是赋值运算符，'=='是比较运算符中的'等于','==='是比较运算符中的'等值等型'
        for (var i=0;i<4;i++) {
            for (var j=1;j<4;j++) {
                if (board[i][j] != 0) {
                    for (var k=0;k<j;k++) {
                        if (board[i][k] == 0 && noBlockHorizon(i,k,j,board) == true) {
                            board[i][k] = board[i][j]
                            board[i][j] = 0
                            showMoveWithAnimation(i,j,i,k)
                        }
                        else if (board[i][k] ==board[i][j] && noBlockHorizon(i,k,j,board) == true 
                                    && hasConflicted[i][k] == false) {
                            board[i][k] += board[i][j]
                            board[i][j] = 0
                            showMoveWithAnimation(i,j,i,k)

                            hasConflicted[i][k] = true
                            score += board[i][k]
                            updateScore(score)
                        }
                    }
                }
            }
        }
        //setTimeout里面的函数需要带上引号
        setTimeout("updateBoardView()",300) 
//    }

//    else {}
}

function moveUp() {
    for (var i=1;i<4;i++) {
        for (var j=0;j<4;j++) {
            if (board[i][j] != 0) {
                //把每一种可能都遍历一次
                for (var k=0;k<i;k++) {
                    if (board[k][j] == 0 && noBlockVertical(k,i,j,board) == true) {
                        board[k][j] = board[i][j]
                        board[i][j] = 0
                        showMoveWithAnimation(i,j,k,j)
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(k,i,j,board) == true
                                && hasConflicted[k][j] == false) {
                        board[k][j] += board[i][j]
                        board[i][j] = 0
                        showMoveWithAnimation(i,j,k,j)

                        hasConflicted[k][j] = true
                        score += board[k][j]
                        updateScore(score)
                    }
                }
            }
        }
    }
    //能移动的都移动完了，然后再把数组的信息传递到前端界面
    setTimeout("updateBoardView()",300)

}

function moveRight() {
    for (var i=0;i<4;i++) {
        //j的初始值决定着遍历的顺序，如果j=0，左边的数字可能会因右边的数字的阻挡而静止不动，所以j应该从2开始遍历到0
        for (var j=2;j>=0;j--) {
            if (board[i][j] != 0) {
                //k要小于4
                for (var k=3;k>j;k--) {
                    if (board[i][k] == 0 && noBlockHorizon(i,j,k,board) == true) {
                        board[i][k] = board[i][j]
                        board[i][j] = 0
                        showMoveWithAnimation(i,j,i,k)
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizon(i,j,k,board) == true 
                                && hasConflicted[i][k] ==false) {
                        board[i][k] += board[i][j]
                        board[i][j] = 0
                        showMoveWithAnimation(i,j,i,k)

                        hasConflicted[i][k] = true
                        score += board[i][k]
                        updateScore(score)
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",300)
}

function moveDown() {
    for (var i=2;i>=0;i--) {
        for (var j=0;j<4;j++) {
            if (board[i][j] != 0) {
                for (var k=3;k>i;k--) {
                    if (board[k][j] == 0 && noBlockVertical(i,k,j,board) == true) {
                        board[k][j] = board[i][j]
                        board[i][j] = 0
                        showMoveWithAnimation(i,j,k,j)
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(i,k,j,board) == true 
                                && hasConflicted[k][j] == false) {
                        board[k][j] += board[i][j]
                        board[i][j] = 0
                        showMoveWithAnimation(i,j,k,j)

                        hasConflicted[k][j] = true
                        score += board[k][j]
                        updateScore(score)
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",300)
}