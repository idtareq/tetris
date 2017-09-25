log = console.log 

let board_state, piecesBag, piece, keys, score, scoreEl = document.querySelector(".score span"), 
gameState="playing", newgameBtn=document.querySelector(".btn-newgame");

let pieces = {
    'I':[ [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]], [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]], [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]], [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]] ],
    'J':[ [[1,0,0],[1,1,1],[0,0,0]], [[0,1,1],[0,1,0],[0,1,0]], [[0,0,0],[1,1,1],[0,0,1]], [[0,1,0],[0,1,0],[1,1,0]] ],
    'L':[ [[0,0,1],[1,1,1],[0,0,0]], [[0,1,0],[0,1,0],[0,1,1]], [[0,0,0],[1,1,1],[1,0,0]], [[1,1,0],[0,1,0],[0,1,0]] ],
    'O':[ [[0,1,1,0],[0,1,1,0],[0,0,0,0]], [[0,1,1,0],[0,1,1,0],[0,0,0,0]], [[0,1,1,0],[0,1,1,0],[0,0,0,0]], [[0,1,1,0],[0,1,1,0],[0,0,0,0]] ],
    'S':[ [[0,1,1],[1,1,0],[0,0,0]], [[0,1,0],[0,1,1],[0,0,1]], [[0,0,0],[0,1,1],[1,1,0]], [[1,0,0],[1,1,0],[0,1,0]] ],
    'T':[ [[0,1,0],[1,1,1],[0,0,0]], [[0,1,0],[0,1,1],[0,1,0]], [[0,0,0],[1,1,1],[0,1,0]], [[0,1,0],[1,1,0],[0,1,0]] ],
    'Z':[ [[1,1,0],[0,1,1],[0,0,0]], [[0,0,1],[0,1,1],[0,1,0]], [[0,0,0],[1,1,0],[0,1,1]], [[0,1,0],[1,1,0],[1,0,0]] ]
};

function DrawGrid(){
    let b = document.querySelector(".board");
    for(let c=0;c<16*10;c++){
        let el = document.createElement('div');
        el.className="piece";
        b.appendChild(el);
    }
}

function UpdateState(){
    // add piece to board
    piece.type[piece.rotation].forEach((r, rx)=>{
        r.forEach((c, cx)=>{
            if (c==1) { board_state[piece.row+rx][piece.col+cx]=c; }
        });
    });


    let ps = document.querySelectorAll(".piece");
    board_state.forEach( (row,rowix)=>{
        row.forEach( (col,colix)=>{
            let num = (rowix*10)+colix;
            if(col==0 || col==2){
                ps[num].classList.remove("piece-filled");
                ps[num].style.backgroundColor="";
                if (col==2) { board_state[rowix][colix]=0; }
            }
            if(col==1 || col==3){
                ps[num].classList.add("piece-filled");
                if (col==1) { 
                    board_state[rowix][colix]=2; 
                    ps[num].style.backgroundColor=piece.color;
                }
            }
        });
    });
}

function CollisionCheck(type){
    let collision=false;
    piece.type[piece.rotation].forEach((r, rx)=>{
        r.forEach((c, cx)=>{
            if (c==1){
                if ( piece.row+rx>15 ) { piece.collision="floor"; }
                else if ( board_state[piece.row+rx][piece.col+cx]===3 ) { piece.collision=type==="Horz"?"pieceHorz":"piece"; }
                else if ( piece.col+cx>9 ) { piece.collision="rightwall"; }
                else if ( piece.col+cx<0 ) { piece.collision="leftwall"; }
            }
        });
    });
    return piece.collision;
}

function FreezPiece(){
    board_state.forEach((r, rx)=>{
        r.forEach((c, cx)=>{
            if (c==2){
                board_state[rx][cx]=3;
            }
        });
    });
}

function CheckFullLines() {
    let fullrow, fullrows=[];
    board_state.forEach((r, rx)=>{
        fullrow=0;
        r.forEach((c, cx)=>{
            if (c==3){
                fullrow++;
                if(fullrow==10){ fullrows.push(rx); }
            }
        });
    });
    fullrows.forEach(function(r){
        board_state.splice(r, 1);
        board_state.unshift( Array(10).fill(0) );
        score++;
        scoreEl.innerText=score;
    });
}

function MovePiece(type, param){
    let tmp;
    switch (type) {
        case 'gravity':case 'MoveDown':
        tmp=piece.row;
        piece.row+=1;
        if (CollisionCheck()) { piece.row=tmp;}
            break;
        case 'MoveHorz':
        tmp=piece.col;
        piece.col+=param;
        if (CollisionCheck("Horz")) { piece.col=tmp;}
            break;
        case 'Rotate':
        tmp=piece.rotation;
        piece.rotation+=param;
        if (piece.rotation>3) { piece.rotation=0; } else if (piece.rotation<0) { piece.rotation=3; }
        if (CollisionCheck()) { piece.rotation=tmp;}
            break;
    }
    if(piece.collision) {
        //log(piece.collision);
        if(piece.numOfMoves==0) {
            log("You lost.");
            newgameBtn.classList.remove('hidden');
            newgameBtn.disabled=false;
            gameState="paused";
            return;
        }
        switch (piece.collision) {
            case 'floor':case 'piece':
            piece.delayFreez++;
            if(piece.delayFreez>2){
                FreezPiece();
                CheckFullLines();
                NewPiece();
                piece.delayFreez=0;
            }
                break;
        }
        piece.collision=null;
    }else{
        piece.delayFreez=0;
        piece.numOfMoves++;
    }
}

function CheckInput(){
    if (keys.horz!==0){
        MovePiece("MoveHorz", keys.horz);
    }
    if (keys.vert!==0){
        MovePiece("Rotate", keys.vert);
    }
    if (keys.space!==0){
        MovePiece("MoveDown");
    }
    ResetKeys();
}

function ResetKeys(){
    keys = {horz:0, vert:0, space:0};
}

document.addEventListener("keydown", function(e){
    switch (e.keyCode) {
        case 37: //left
        keys.horz=-1;
        GameLoop("NoGravity");
            break;
        case 39: //right
        keys.horz=1;
        GameLoop("NoGravity");
            break;
        case 40: //down
        keys.vert=1;
        GameLoop("NoGravity");
            break;
        case 38: //up
        keys.vert=-1;
        GameLoop("NoGravity");
            break;
        case 32: //space
        keys.space=1;
            break;
    }
});

function NewPiece(){
    if(piecesBag.length==0){ ResetPiecesBag(); }
    let p = {};
    p.type=pieces[ piecesBag.splice(Math.floor( Math.random()*piecesBag.length ), 1) ];
    p.rotation=Math.floor( Math.random()*3 );
    p.collision=null;
    p.color=GetRandomRgb();
    p.numOfMoves=0;
    p.delayFreez=0;
    p.row=1;
    p.col=3;
    piece=p;
}

function ResetPiecesBag(){
    piecesBag=['I','I','I','J','J','J','L','L','L','O','O','O','S','S','S','T','T','T','Z','Z','Z'];
}

function GetRandomRgb() {
    var num = Math.round(0xcccccc * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

newgameBtn.addEventListener("click",function(){
    NewGame();
});

function NewGame(){
    // 0: nothing, 1: current, 2: marked for removal, 3: freezed
    board_state = Array(16).fill(0).map(_=>Array(10).fill(0));
    ResetPiecesBag();
    NewPiece();
    ResetKeys();
    score=0;
    scoreEl.innerText="0";
    newgameBtn.classList.add('hidden');
    newgameBtn.disabled=true;
    gameState="playing";
}

function GameLoop(type){
    if( gameState=="playing"){
        CheckInput();
        if(type!=="NoGravity") { MovePiece('gravity'); }
        UpdateState();
    }
}

// Start
DrawGrid();
NewGame();
setInterval(GameLoop,350);