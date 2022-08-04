var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img1 = new Image();
img1.src = 'dino.png';

var dino = {
    x : 10,
    y : 200, // 공룡 등장 좌표
    width: 50,
    height: 50, // 공룡 폭, 높이
    draw() {
        ctx.fillStyle = 'transparent';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y);
    }
}

var img2 = new Image();
img2.src = 'cactus.png';

class Cactus {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = 'transparent';
        ctx.fillRect(this.x, this.y, this.width, this.height); // 히트박스
        ctx.drawImage(img2, this.x, this.y);
    }
}

var timer = 0;
var manycactus = []; // 선인장 담아둘 배열
var jumpingtimer = 0;
var animation;

function gamestart() {
    animation = requestAnimationFrame(gamestart);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // 지우는 함수

    if (timer % 200 === 0) { // 200프레임마다 한 번 선인장 생성
        var cactus = new Cactus();
        manycactus.push(cactus);
    }

    manycactus.forEach((a, i, o) => {
        // x좌표가 0 미만이면 제거 (왼쪽 끝까지 간 장애물 사라지게)
        if (a.x < 0) {
            o.splice(i, 1)
        }
        a.x--; // 장애물 움직이는 거

        collisioncheck(dino, a); // 공룡이랑 모든 장애물이랑 충돌 체크

        a.draw();
    })


    // 점프 기능
    // 스페이스바 누르면 공룡이 점프
    if (jumping == true) {
        dino.y-=5;
        jumpingtimer++;
    }
    if (jumping == false) { // 점프중 아닐 땐 아래로, 200px (시작 위치) 까지 오면 그만
        if (dino.y < 200) {
            dino.y+=2;
        }
    }
    if (jumpingtimer > 30) { // 40프레임 후 점프 그만
        jumping = false;
        jumpingtimer = 0;
    }
    dino.draw();
}

gamestart();

// 충돌 확인
function collisioncheck(dino, cactus) {
    var x축차이 = cactus.x - (dino.x + dino.width);
    var y축차이 = cactus.y - (dino.y + dino.height);
    if (x축차이 < 0 && y축차이 < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 클리어
        cancelAnimationFrame(animation); //애니메이션 중단
    }
}


var jumping = false;
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        jumping = true;
    }
})