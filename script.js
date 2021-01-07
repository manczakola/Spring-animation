const fill = document.querySelector('.fill');
const button = document.querySelector('.btn-action');
const ball = document.querySelector('.ball');
const spring = document.querySelector('.spring');
const bar = document.querySelector('.bar');
const box = document.querySelector('.box');


const position = () => {
    let randomPositionOfBox = Math.floor(Math.random() * 100) - 20;
    
    if (randomPositionOfBox > 0 && randomPositionOfBox < 80) {
        box.style.right = `${randomPositionOfBox}%`;
 
    } else {
        randomPositionOfBox = 50;
    }

}

position();





const stretchSpring = () => {
    fill.style.animationName = 'fill';
    fill.style.animationPlayState = 'running';
    spring.style.animationPlayState = 'running';
    button.textContent = "Release the spring";

    button.removeEventListener('mousedown', stretchSpring);
    button.removeEventListener('touchstart', stretchSpring);

};

const releaseSpring = () => {

    fill.style.animationPlayState = 'paused';
    button.textContent = "Stretch the spring";
    const fillStyles = getComputedStyle(fill);

    const fillWidth = parseInt(fillStyles.width, 10);
    const barWidth = parseInt(getComputedStyle(bar).width);
    const power = parseInt(((fillWidth / barWidth) * 100).toFixed());
    button.textContent = `Power ${power}%`;

    button.removeEventListener('mousedown', stretchSpring);
    button.removeEventListener('touchstart', stretchSpring);

    document.documentElement.style.setProperty("--power-x", `${power + 20}%`); //HTML style
    ball.style.animation = 'fly-ball-x 1s 1 forwards .15s cubic-bezier(.17, .67, .6, 1), fly-ball-y 1s 1 forwards .15s linear';

    document.documentElement.style.setProperty("--spring-left", getComputedStyle(spring).left);
    spring.style.animation = 'release-spring .2s 1 forwards linear';

  
    // blocking click

    button.removeEventListener('mouseup', stretchSpring);
    button.removeEventListener('touchend', stretchSpring);

    ball.addEventListener('animationend', resetAnimation);

};

const resetAnimation = () => {

    ball.removeEventListener('animationend', resetAnimation);

    setTimeout(() => {
        button.addEventListener('mousedown', stretchSpring);
        button.addEventListener('mouseup', releaseSpring);
        button.addEventListener('touchstart', stretchSpring);
        button.addEventListener('touchend', releaseSpring);


        button.textContent = 'Stretch the spring';

        spring.style.animation = '';
        ball.style.animation = '';
        fill.style.animationName = 'none';
        position();

    }, 2000)



};


button.addEventListener('mousedown', stretchSpring);
button.addEventListener('mouseup', releaseSpring);
button.addEventListener('touchstart', stretchSpring);
button.addEventListener('touchend', releaseSpring);