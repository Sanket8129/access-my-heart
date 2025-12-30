function checkPassword() {
  const enteredPass = document.getElementById("password").value;
  const correctPass = "Andaa";

  if (enteredPass === correctPass) {
    document.body.innerHTML = `
      <div style="
        height:100vh;
        display:flex;
        justify-content:center;
        align-items:center;
        background: linear-gradient(135deg, #ff758c, #ff7eb3);
        color:white;
        font-family:'Segoe UI', sans-serif;
        text-align:center;
        padding:30px;
      ">
        <div>
          <h1>💖 Access Granted 💖</h1>
          <p>Looks like you unlocked my heart 🥰</p>
          <h2>
            This New Year 🎆<br>
            I want to start every chapter of my life with you❤️
          </h2>
          <h3>
            Will you be my girlfriend? 💍💫
          </h3>
          <p>Forever sounds perfect with you 💕</p>
        </div>
      </div>
    `;
  } else {
    document.getElementById("error").innerText =
      "❌ Oops… try again, my love 💔";
  }
}
