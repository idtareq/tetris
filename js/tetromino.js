const dirPath = window.location.href.substring(0, window.location.href.lastIndexOf("/"));

PIXI.sound.add('GameStart', dirPath + '/snd/SFX_GameStart.ogg');
PIXI.sound.add('GameOver', dirPath + '/snd/SFX_GameOver.ogg');
PIXI.sound.add('LevelUp', dirPath + '/snd/SFX_LevelUp.ogg');
PIXI.sound.add('PieceTouchDown', dirPath + '/snd/SFX_PieceTouchDown.ogg');
PIXI.sound.add('PieceRotateLR', dirPath + '/snd/SFX_PieceRotateLR.ogg');
PIXI.sound.add('PieceRotateFail', dirPath + '/snd/SFX_PieceRotateFail.ogg');
PIXI.sound.add('PieceMoveLR', dirPath + '/snd/SFX_PieceMoveLR.ogg');
PIXI.sound.add('PieceSoftDrop', dirPath + '/snd/SFX_PieceSoftDrop.ogg');
PIXI.sound.add('SpecialLineClearDouble', dirPath + '/snd/SFX_SpecialLineClearDouble.ogg');
PIXI.sound.add('SpecialLineClearSingle', dirPath + '/snd/SFX_SpecialLineClearSingle.ogg');

const tettex = [];

tettex[0] = PIXI.Texture.fromImage(dirPath + '/res/empty.png');
tettex[1] = PIXI.Texture.fromImage(dirPath + '/res/0.png');
tettex[2] = PIXI.Texture.fromImage(dirPath + '/res/1.png');
tettex[3] = PIXI.Texture.fromImage(dirPath + '/res/2.png');
tettex[4] = PIXI.Texture.fromImage(dirPath + '/res/3.png');
tettex[5] = PIXI.Texture.fromImage(dirPath + '/res/4.png');
tettex[6] = PIXI.Texture.fromImage(dirPath + '/res/5.png');
tettex[7] = PIXI.Texture.fromImage(dirPath + '/res/6.png');
tettex[8] = PIXI.Texture.fromImage(dirPath + '/res/8.png');
tettex[9] = PIXI.Texture.fromImage(dirPath + '/res/brick.png');
tettex[10] = PIXI.Texture.fromImage(dirPath + '/res/14.png');
tettex[11] = PIXI.Texture.fromImage(dirPath + '/res/15.png');

const tetromino = [];

tetromino[1] ="..x.";
tetromino[1]+="..x.";
tetromino[1]+="..x.";
tetromino[1]+="..x.";

tetromino[2] ="..x.";
tetromino[2]+=".xx.";
tetromino[2]+=".x..";
tetromino[2]+="....";

tetromino[3] =".x..";
tetromino[3]+=".xx.";
tetromino[3]+="..x.";
tetromino[3]+="....";

tetromino[4] ="..x.";
tetromino[4]+=".xx.";
tetromino[4]+="..x.";
tetromino[4]+="....";

tetromino[5] ="....";
tetromino[5]+=".xx.";
tetromino[5]+="..x.";
tetromino[5]+="..x.";

tetromino[6] ="....";
tetromino[6]+=".xx.";
tetromino[6]+=".x..";
tetromino[6]+=".x..";

tetromino[7] ="....";
tetromino[7]+=".xx.";
tetromino[7]+=".xx.";
tetromino[7]+="....";

export {tettex, tetromino};
