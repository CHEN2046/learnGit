function showNumberWithAnimation(i,j,randNumber) {
    var numberCell = $('#number-cell-'+i+'-'+j)
    numberCell.css({
        'background-color':getBackGroundColor(randNumber),
        'color':getColor(randNumber)
    })
    numberCell.text(randNumber)
    numberCell.animate({
        width:'100px',
        height:'100px',
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },300)
}


function showMoveWithAnimation(fromX,fromY,toX,toY) {
    var numberCell = $('#number-cell-'+fromX+'-'+fromY)
    numberCell.animate({
        top:getPosTop(toX,toY),
        left:getPosLeft(toX,toY)
    },300)
}

function updateScore(score) {
    $('#score').text(score)
}