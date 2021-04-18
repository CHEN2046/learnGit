
function getPosTop(i,j) {
    return 20+120*i
}

function getPosLeft(i,j) {
    return 20+120*j
}

function getBackGroundColor(number) {
    switch (number) {
        case 2:return 'red';break;
        case 4:return 'green';break;
        case 8:return 'blue';break;
        case 16:return 'yellow';break;
        default:return 'grey';break;
    }
}

function getColor(number) {
    if (number<=4) {
        return 'black'
    } else {
        return 'white'
    }
}

function nospace(board) {
    for (var i=0;i<4;i++) {
        for (var j=0;j<4;j++) {
            if (board[i][j] == 0) 
                return false
        }

    }
    //遍历完后，没有为0的值，即可返回true
    return true
}

function canMoveLeft(board) {
    for (var i=0;i<4;i++) {
        for (var j=1;j<4;j++) {
            if (board[i][j] != 0) {
                if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
                    return true
                }
            }
        }
    }

    return false
}

function canMoveUp(board) {
    for (var i=1;i<4;i++) {
        for (var j=0;j<4;j++) {
            if (board[i][j] != 0) {
                if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
                    return true
                }
            }
        }
    }
    return false
} 

function canMoveRight(board) {
    for (var i=0;i<4;i++) {
        for (var j=0;j<3;j++) {
            if (board[i][j] != 0) {
                if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]) {
                    return true
                }
            }
        }
    }
    return false
}

function canMoveDown(board) {
    for (var i=0;i<3;i++) {
        for (var j=0;j<4;j++) {
            if (board[i][j] != 0) {
                if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
                    return true
                }
            }
        }
    }
    return false
} 


function noBlockHorizon(row,col1,col2,board) {
    for (var num=1;col1+num<col2;num++) {
        if (board[row][col1+num] != 0) {
            return false
        } 
    }
    return true
}

function noBlockVertical(row1,row2,col,board) {
    for (var num=1;row1+num<row2;num++) {
        if (board[row1+num][col] != 0) {
            return false
        }
    }
    return true
}


function nomove(board) {
    if (canMoveLeft(board) || canMoveUp(board) || canMoveRight(board) || canMoveDown(board)) {
        return false
    } 
    else {
        return true
    }
}