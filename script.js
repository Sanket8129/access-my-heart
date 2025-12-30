function checkPassword() {
  const enteredPass = document.getElementById("password").value;
  const correctPass = "Andaa";

  if (enteredPass === correctPass) {
    document.body.innerHTML = `
      <div class="main">
        <h1>💖 Access Granted 💖</h1>
        <p>Looks like you unlocked my heart 💘</p>

        <h2>This New Year 🎆</h2>
        <p class="forever">
          I want to start every chapter of my life with you ❤️
        </p>

        <button onclick="showSurprise()">Click here for surprise 💝</button>
      </div>

      <div class="hearts"></div>

      <style>
        body {
          margin: 0;
          height: 100vh;
          background: linear-gradient(135deg, #ff758c, #ff7eb3);
          font-family: 'Courier New', monospace;
          overflow: hidden;
          color: white;
        }
        .main {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          z-index: 2;
          position: relative;
        }
        button {
          margin-top: 25px;
          padding: 14px 30px;
          font-size: 16px;
          border-radius: 30px;
          border: none;
          cursor: pointer;
          background: #ff2f6d;
          color: white;
          box-shadow: 0 0 15px rgba(255,255,255,0.6);
        }
        .hearts span {
          position: fixed;
          bottom: -20px;
          font-size: 24px;
          animation: float 6s linear infinite;
        }
        @keyframes float {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(-110vh); opacity: 0; }
        }
        canvas { position: fixed; top:0; left:0; pointer-events:none; z-index:1; }
      </style>
    `;
    startHearts();
  } else {
    document.getElementById("error").innerText =
      "❌ Access Denied… try again 💔";
  }
}

function showSurprise() {
  document.body.innerHTML = `
    <canvas id="fireworks"></canvas>
    <div class="love">
      <h1 class="sparkle">😍 I LOVE YOU DEEPIKA 💖😍</h1>
      <h2>❤️💘💞💓💗💝💟❤️</h2>
      <p>You are my today, my tomorrow & my forever 🥺✨</p>
    </div>
    <div class="hearts"></div>

    <style>
      body {
        margin: 0;
        height: 100vh;
        background: linear-gradient(135deg, #ff416c, #ff4b2b);
        font-family: 'Courier New', monospace;
        overflow: hidden;
        color: white;
      }
      .love {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 28px;
        z-index: 2;
        position: relative;
      }
      .sparkle {
        font-size: 48px;
        font-weight: bold;
        animation: glow 1s ease-in-out infinite alternate;
      }
      @keyframes glow {
        0% { text-shadow: 0 0 5px #ff77aa, 0 0 10px #ff77aa, 0 0 20px #ff44aa; color: #fff; }
        50% { text-shadow: 0 0 20px #ffddff, 0 0 40px #ff77ff, 0 0 80px #ff44ff; color: #ffe; }
        100% { text-shadow: 0 0 10px #ff77aa, 0 0 20px #ff44aa, 0 0 30px #ff88ff; color: #fff; }
      }
      .hearts span {
        position: fixed;
        bottom: -20px;
        font-size: 26px;
        animation: float 5s linear infinite;
      }
      @keyframes float {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-110vh); opacity: 0; }
      }
      canvas { position: fixed; top:0; left:0; pointer-events:none; z-index:1; }
    </style>
  `;
  startHearts();
  startFireworks();
}

function startHearts() {
  const hearts = document.querySelector(".hearts");
  setInterval(() => {
    const heart = document.createElement("span");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (3 + Math.random() * 3) + "s";
    hearts.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 6000);
  }, 300);
}

// ---------------- FIREWORKS ----------------
function startFireworks() {
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fireworks = [];
  const particles = [];

  function random(min, max) { return Math.random() * (max - min) + min; }

  class Firework {
    constructor() {
      this.x = random(0, canvas.width);
      this.y = canvas.height;
      this.targetY = random(100, canvas.height/2);
      this.color = `hsl(${Math.random()*360}, 100%, 50%)`;
      this.speed = 4;
    }
    update() {
      this.y -= this.speed;
      if (this.y <= this.targetY) {
        this.explode();
        return false;
      }
      return true;
    }
    explode() {
      for(let i=0;i<50;i++){
        particles.push(new Particle(this.x, this.y, this.color));
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x,this.y,3,0,Math.PI*2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  class Particle {
    constructor(x, y, color) {
      this.x = x; this.y = y;
      this.color = color;
      this.speedX = random(-5,5);
      this.speedY = random(-5,5);
      this.alpha = 1;
      this.decay = random(0.01,0.02);
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= this.decay;
      return this.alpha > 0;
    }
    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x,this.y,3,0,Math.PI*2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    if(Math.random()<0.05) fireworks.push(new Firework());

    for(let i=fireworks.length-1;i>=0;i--){
      if(!fireworks[i].update()) fireworks.splice(i,1);
      else fireworks[i].draw();
    }

    for(let i=particles.length-1;i>=0;i--){
      if(!particles[i].update()) particles.splice(i,1);
      else particles[i].draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
}


