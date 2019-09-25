document.addEventListener('DOMContentLoaded',function() {

    const score = document.querySelector('.score');
    const start = document.querySelector('.start-wrap');
    const startBtn = document.querySelector('.start-btn');
    const gameArea = document.querySelector('.gameArea');
    const car = document.createElement('div');
    const music = document.createElement('audio');

    car.classList.add('car');

    startBtn.addEventListener('click', startGame);
    document.addEventListener('keydown', startRun);
    document.addEventListener('keyup', stopRun);

    const keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowRight: false,
        ArrowLeft: false,
    };

    const setting = {
        start: false ,
        speed : 6 ,
        score : 0,
        traffic: 3
    };

    function getElementQuantity(height) {
        return (document.documentElement.clientHeight / height );
    }

    function startGame() {
        start.classList.add('hide');
        gameArea.innerHTML='';
        setting.score = 0;
        let miscR = Math.floor(Math.random() * (4 - 1) + 1)
        music.setAttribute('autoplay', true);
        music.setAttribute('src', './assets/misc/misc'+miscR+'.mp3');

        for(let i = 0 ; i < getElementQuantity(100); i++) {
            const line = document.createElement('div');
            line.classList.add('line');
            line.style.top = i * 100 + 'px';
            line.y = i * 100;
            gameArea.appendChild(line);
        }

        for(let i = 0; i < getElementQuantity(100*setting.traffic); i++) {
            const enemy = document.createElement('div');
            let enemyRandom = Math.floor(Math.random() * (4 - 1) + 1);
            enemy.classList.add('enemy');

            enemy.style.background = 'url(./assets/img/enemy'+enemyRandom+'.png) no-repeat center /cover';
            enemy.y = -100 * setting.traffic * (i + 1);
            enemy.style.top = enemy.y + 'px';
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
            gameArea.appendChild(enemy);
        }

        setting.start = true;
        gameArea.appendChild(car);
        car.style.top = 'auto';
        car.style.left = (gameArea.offsetWidth / 2 - car.offsetWidth / 2) + 'px';
        setting.x = car.offsetLeft;
        setting.y = car.offsetTop;
        requestAnimationFrame(playGame);
    }

    function playGame() {
        if(setting.start) {

            setting.score += setting.speed;
            score.innerHTML =  'SCORE <br>'+setting.score+''; 
            moveRoad();
            moveEnemy();
            

            if(keys.ArrowLeft && setting.x > 0) {
                setting.x-= setting.speed;
            }
            if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
                setting.x+= setting.speed;
            }
            if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
                setting.y+= setting.speed;
            }
            if(keys.ArrowUp && setting.y > 0) {
                setting.y-= setting.speed;
            }

            car.style.left = setting.x + 'px';
            car.style.top = setting.y + 'px';
            requestAnimationFrame(playGame);
        }
        
    }

    function startRun(event) {
        event.preventDefault();
        if(keys.hasOwnProperty(event.key)) {
            keys[event.key] = true;
        }
        
    }
    function stopRun(event) {
        event.preventDefault();
        if(keys.hasOwnProperty(event.key)) {
            keys[event.key] = false;
        }
    }
    
    function moveRoad() {
        let lines = document.querySelectorAll('.line');
        lines.forEach(function(item) {
            item.y += setting.speed;
            item.style.top = item.y + 'px';

            if(item.y > document.documentElement.clientHeight) {
                item.y = -100;
                
            }
        });
    }

    function moveEnemy() {
        let enemy = document.querySelectorAll('.enemy');
        enemy.forEach(function(item){
            item.y+= setting.speed /2;
            item.style.top = item.y +'px';

            if(item.y >= document.documentElement.clientHeight) {
                item.y = -100 * setting.traffic;
                item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
            }

            let carRect = car.getBoundingClientRect();
            let enemyRect = item.getBoundingClientRect();
            
            if(carRect.top <= enemyRect.bottom &&
                carRect.bottom >= enemyRect.top &&
                carRect.left <= enemyRect.right &&
                carRect.right >= enemyRect.left) {
                    setting.start = false;
                    start.classList.remove('hide');
                    music.setAttribute('src', '');
            }
                

        });
        
    }


});