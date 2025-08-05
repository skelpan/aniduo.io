// Инициализация анимации
TweenLite.set("ANIDUO", { perspective:600 });
TweenLite.set("img", { xPercent:"-50%", yPercent:"-50%" });

var total = 50;
var warp = document.getElementById("ANIDUO"),
w = window.innerWidth,
h = window.innerHeight;

for (i = 0; i < total; i++) {
    var Div = document.createElement('div');
    Div.className = 'dot';
    // Укажите путь к вашему изображению лепестка
    Div.style.backgroundImage = "url('images/petal.png')";
    Div.style.backgroundSize = "contain";
    
    TweenLite.set(Div, { 
        x: R(0,w), 
        y: R(-200,-150), 
        z: R(-200,200)
    });
    
    warp.appendChild(Div);
    animm(Div);
}

// Функция анимации
function animm(elm) {
    TweenMax.to(elm, R(6,15), { 
        y: h+100, 
        ease: Linear.easeNone, 
        repeat: -1, 
        delay: -15 
    });
    
    TweenMax.to(elm, R(4,8), { 
        x: '+=100', 
        rotationZ: R(0,180), 
        repeat: -1, 
        yoyo: true, 
        ease: Sine.easeInOut 
    });
    
    TweenMax.to(elm, R(2,8), { 
        rotationX: R(0,360), 
        rotationY: R(0,360), 
        repeat: -1, 
        yoyo: true, 
        ease: Sine.easeInOut, 
        delay: -5 
    });
};

// Вспомогательная функция для случайных чисел
function R(min,max) { 
    return min + Math.random() * (max-min) 
};














// Конфигурация эффектов
const effectsConfig = {
    particles: {
        colors: ['#ff4d79', '#8847ca', '#ffb347', '#4dffb8', '#47b8ff'],
        types: ['circle', 'heart', 'dota']
    },
    sounds: {
        pageTurn: 'https://www.soundjay.com/mechanical/sounds/page-turn-01.mp3',
        dota: 'https://www.soundjay.com/buttons/sounds/button-09.mp3',
        birthday: 'https://www.soundjay.com/human/sounds/happy-birthday-01.mp3'
    }
};

// Инициализация аудио
const audio = {
    pageTurn: new Audio(effectsConfig.sounds.pageTurn),
    dota: new Audio(effectsConfig.sounds.dota),
    birthday: new Audio(effectsConfig.sounds.birthday)
};

// Создание эффектов
function createParticles(type, container) {
    const particleCount = type === 'heart' ? 15 : 30;
    const particlesContainer = container || document.body;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Разные типы частиц
        if (type === 'heart') {
            particle.innerHTML = '❤️';
            particle.style.fontSize = `${15 + Math.random() * 20}px`;
        } else if (type === 'dota') {
            particle.innerHTML = '🎮';
            particle.style.fontSize = '20px';
            audio.dota.play();
        } else {
            particle.style.backgroundColor = effectsConfig.particles.colors[
                Math.floor(Math.random() * effectsConfig.particles.colors.length)
            ];
            particle.style.borderRadius = '50%';
            particle.style.width = `${5 + Math.random() * 10}px`;
            particle.style.height = particle.style.width;
        }
        
        // Позиционирование
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Анимация
        gsap.to(particle, {
            x: `${(Math.random() - 0.5) * 200}`,
            y: `${(Math.random() - 0.5) * 200}`,
            opacity: 0,
            rotation: Math.random() * 360,
            duration: 1 + Math.random(),
            onComplete: () => particle.remove()
        });
        
        particlesContainer.appendChild(particle);
    }
}

// Эффект фейерверка
function createFireworks() {
    const fireworksCount = 5;
    
    for (let i = 0; i < fireworksCount; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = `${10 + Math.random() * 80}%`;
            firework.style.top = '80%';
            document.body.appendChild(firework);
            
            // Взлёт
            gsap.to(firework, {
                top: `${20 + Math.random() * 30}%`,
                duration: 0.5 + Math.random(),
                onComplete: () => {
                    // Взрыв
                    createParticles('circle', document.body);
                    firework.remove();
                }
            });
        }, i * 300);
    }
    audio.birthday.play();
}

// Эффект печатной машинки с улучшениями
function initTypedWithEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        const messageEl = card.querySelector('.message');
        const authorEl = card.querySelector('.author');
        
        const typed = new Typed(messageEl, {
            strings: [wishes[index].message],
            typeSpeed: 30,
            startDelay: index === 0 ? 1000 : 300,
            showCursor: true,
            cursorChar: '|',
            onComplete: () => {
                authorEl.style.opacity = 1;
                isAnimating = false;
                
                // Разные эффекты для разных карточек
                if (wishes[index].author.includes('dota')) {
                    createParticles('dota', card);
                } else if (index % 3 === 0) {
                    createParticles('heart', card);
                }
                
                // Особый эффект для последней карточки
                if (index === cards.length - 1) {
                    createFireworks();
                }
            },
            onStart: () => {
                isAnimating = true;
                authorEl.style.opacity = 0;
                audio.pageTurn.play();
            }
        });
        
        typedInstances.push(typed);
    });
}

// Показ карточки с улучшенными эффектами
async function showCardWithEffects(newIndex) {
    if (isAnimating) return;
    if (newIndex < 0 || newIndex >= typedInstances.length) return;
    
    isAnimating = true;
    const cards = document.querySelectorAll('.card');
    
    // Эффект исчезновения текущей карточки
    gsap.to(cards[currentCardIndex], {
        opacity: 0,
        x: newIndex > currentCardIndex ? -50 : 50,
        duration: 0.5,
        onComplete: () => {
            cards[currentCardIndex].classList.remove('active');
        }
    });
    
    // Обновляем индекс
    currentCardIndex = newIndex;
    
    // Эффект появления новой карточки
    cards[currentCardIndex].style.opacity = 0;
    cards[currentCardIndex].style.transform = `translateX(${newIndex > currentCardIndex ? 50 : -50}px)`;
    cards[currentCardIndex].classList.add('active');
    
    gsap.to(cards[currentCardIndex], {
        opacity: 1,
        x: 0,
        duration: 0.5,
        onStart: () => {
            typedInstances[currentCardIndex].start();
        }
    });
    
    // Эффект частиц при переключении
    createParticles('circle');
    
    updateUI();
}

// Добавляем стили для эффектов
const effectStyles = document.createElement('style');
effectStyles.innerHTML = `
    .particle {
        position: absolute;
        pointer-events: none;
        z-index: 10;
        will-change: transform, opacity;
    }
    .firework {
        position: fixed;
        width: 5px;
        height: 5px;
        background: #ff4d79;
        border-radius: 50%;
        z-index: 10;
    }
    .typed-cursor {
        opacity: 1;
        color: #ff4d79;
    }
    .typed-cursor.typed-cursor--blink {
        animation: blink 0.7s infinite;
    }
    @keyframes blink {
        50% { opacity: 0; }
    }
`;
document.head.appendChild(effectStyles);

// Инициализация с эффектами
function initWithEffects() {
    createCards();
    initTypedWithEffects();
    updateUI();
    
    // Первый запуск с эффектами
    setTimeout(() => {
        document.querySelector('.card').classList.add('active');
        createParticles('heart');
        audio.birthday.play();
    }, 500);
}

// Заменяем старые обработчики на новые
prevBtn.removeEventListener('click', showCard);
nextBtn.removeEventListener('click', showCard);
prevBtn.addEventListener('click', () => showCardWithEffects(currentCardIndex - 1));
nextBtn.addEventListener('click', () => showCardWithEffects(currentCardIndex + 1));

// Запускаем улучшенную инициализацию
initWithEffects();

