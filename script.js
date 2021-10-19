let dino = document.getElementById("dino");
let small_cactus = document.getElementById("small_cactus");

const ground_canvas = document.getElementById("Ground_Canvas");
let ground_ctx = ground_canvas.getContext("2d");
const ground = document.getElementById("ground");
var ground_x = 0.0;
function ground_translation() {
    ground_x -= 0.75;
    if (ground_x < -(ground_canvas.width * 2)) {
        ground_x = 0;
    }

    ground_ctx.clearRect(0, 0, ground_canvas.width, ground_canvas.height);
    ground_ctx.drawImage(ground, ground_x, 0);
}
setInterval(ground_translation, 1);

const cloud1_canvas = document.getElementById("Cloud1_Canvas");
let cloud1_ctx = cloud1_canvas.getContext("2d");
const cloud_1 = document.getElementById("cloud");
var cloud1_x = 100;
function cloud1_translation() {
    cloud1_x -= 0.1;
    if (cloud1_x < 0) {
        cloud1_x = 555;
    }

    cloud1_ctx.clearRect(0, 0, cloud1_canvas.width, cloud1_canvas.height);
    cloud1_ctx.drawImage(cloud_1, cloud1_x, 0);
}
setInterval(cloud1_translation, 1);

const cloud2_canvas = document.getElementById("Cloud2_Canvas");
let cloud2_ctx = cloud2_canvas.getContext("2d");
const cloud_2 = document.getElementById("cloud");
var cloud2_x = 350;
function cloud2_translation() {
    cloud2_x -= 0.1;
    if (cloud2_x < 0) {
        cloud2_x = 555;
    }

    cloud2_ctx.clearRect(0, 0, cloud2_canvas.width, cloud2_canvas.height);
    cloud2_ctx.drawImage(cloud_2, cloud2_x, 0);
}
setInterval(cloud2_translation, 1);

dino.src = "media/dino_S1.png"
let stats = 1;
function dino_walking() {
    if (stats == 1) {
        dino.src = "media/dino_S1.png"
        stats = 2;
    } else {
        dino.src = "media/dino_S2.png"
        stats = 1;
    }
}
setInterval(dino_walking, 100);

let score_counter = 0;

let isAlive = setInterval(function () {
    let dinoTop = parseInt(
        window.getComputedStyle(dino).getPropertyValue("top")
    );

    let cactusLeft = parseInt(
        window.getComputedStyle(small_cactus).getPropertyValue("left")
    );

    if (cactusLeft < 44 && cactusLeft > 0 && dinoTop >= -475) {
        document.getElementById('game-over_audio').play();
        
        small_cactus.style.animation = "none";

        dino.src = "media/dino_dead.png";

        document.getElementById("game_over_msg").innerHTML = "GAME OVER";
        window.alert(
            `Game Over!\nFinal Score = ${Math.floor(score_counter / 100)}`
        );

        document.getElementById("game_over_msg").innerHTML = "";

        score_counter = 0;

        small_cactus.style.animation = "cactus_translation 2.0s infinite linear";
    } else {
        score_counter += 10;
        document.getElementById("score_n").innerHTML = Math.floor(
            score_counter / 100
        );

        if ((Math.floor(score_counter / 100) % 100) == 0 && (Math.floor(score_counter / 100) > 0)) {
            document.getElementById("multiple_100_audio").play();
        }
    }
}, 10);

function jump() {
    if (dino.classList != "dino_jump") {
        dino.classList.add("dino_jump");

        setTimeout(function () {
            dino.classList.remove("dino_jump");
        }, 300);
    }
}
document.addEventListener("keydown", function (event) {
    dino.src = "media/dino_S0.png"
    jump();
    document.getElementById('jump_audio').play();
});