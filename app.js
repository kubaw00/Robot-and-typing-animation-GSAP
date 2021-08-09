const box = document.querySelector('.typing');
const text = ["Cześć! jak tam?", 'Cieszę się, że Cię widzę', 'Chodźmy gdzieś', 'Plaża^Góry^Parasol^Plecak?'];
let wordIndex = 0;
let textIndex = 0;
let oldTime = 0;
const speed = 80;
const stop = 2000;
let activeDOMElement = box;


const typing = (newTime) => {
    if(newTime - oldTime > speed){
        const letter = text[textIndex].substr(wordIndex, 1)
        if(wordIndex === text[textIndex].length){
         if(textIndex === text.length - 1){
             return
         }   
            return setTimeout(() => {
                textIndex++;
                box.textContent ="";
                wordIndex = 0;
            requestAnimationFrame(typing)
            }, stop)
        } else if(wordIndex === 0 || letter ==='^'){
            const p = document.createElement('p');
            box.appendChild(p);
            activeDOMElement = p;
        }

        if(!(letter === "^")){
            activeDOMElement.textContent += letter;
        }

        oldTime = newTime; //aktualizacja czasu 
        wordIndex ++;
        
    }
     requestAnimationFrame(typing) 
}

typing();

//animacja robota
// animacja prostokątów
const bars = () => {
  const tl = gsap.timeline({
    onComplete: bars
  });
  const scale = () => {
    return 0.1 + Math.random() * 3;
  }

  const color = () => {
    const colors = ['green', 'red', 'yellow'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  // const voiceBars = document.querySelector('#voice-bars');
  const barsElement = document.querySelectorAll('#voice-bars rect');
  tl.set(barsElement, {
    y: -30,
    transformOrigin: '50% 50%'
  })
  tl.to(barsElement, .7, {
    stagger: {
      each: 0.1,
      repeat: 1,
      yoyo: true,

    },
    fill: color,
    ease: Bounce.easeIn,
    scaleY: scale,


  })
  return tl;
}

//animacja oczów
const blink = () => {
  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 3,
    delay: 2
  });
  const eyes = document.querySelectorAll('#eye-left, #eye-right');
  tl
    .set(eyes, {
      transformOrigin: "50% 50%"
    })
    .to(eyes, .1, {
      scaleY: 0,
      fill: "#231f20"
    })
    .to(eyes, .05, {
      scaleY: 1,
      fill: "#48b3e6"
    })
    .to(eyes, .12, {
      scaleY: 0,
      fill: "#231f20"
    }, "+=0.5")
    .to(eyes, .03, {
      scaleY: 1,
      fill: "#48b3e6"
    })
    .to(eyes, .08, {
      scaleY: 0,
      fill: "#231f20"
    }, "+=1.5")
    .to(eyes, .08, {
      scaleY: 1,
      fill: "#48b3e6"
    })

  return tl;
}

const move = (legs) => {
  // console.log(elements);
  const tl = gsap.timeline();
  tl.staggerTo(legs, .5, {
    y: -60,
    repeat: -1,
    yoyo: true,
    ease: Power0.easeNone
  }, .5)
  return tl;
}

// Master Timeline
const master = gsap.timeline();
master.add('start');
master.add(move(document.querySelectorAll('#leg-right, #leg-left')), "start");
master.add(bars(), "start");
master.add(blink(), "start");
