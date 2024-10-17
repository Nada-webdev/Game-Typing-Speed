window.onload= congrat();
  //  document.getElementById('confettiButton').addEventListener('click',()=>congrat());

   function congrat (){
          const end = Date.now() + 3 * 1000; // 3 seconds
      const colors = ["#52fce3", "#3ce9fd", "#fff", "rgb(143, 2, 143)"];

      const frame = () => {
        if (Date.now() > end) return;

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });

        requestAnimationFrame(frame);
      };

      frame();
    };
   
  