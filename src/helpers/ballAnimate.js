export default {
  animate: (
    querySelector,
    numBalls = 50,
    colors = ['#0056e0', '#0B212E', '#E2F6FF', '#47B6FE']
  ) => {
    const balls = [];

    for (let i = 0; i < numBalls; i++) {
      let ball = document.createElement('div');
      ball.classList.add('ball');
      ball.style.background = colors[Math.floor(Math.random() * colors.length)];
      ball.style.left = `${Math.floor(Math.random() * (100 - 0) + 0)}%`;
      ball.style.top = `${Math.floor(Math.random() * (100 - 0) + 0)}%`;
      ball.style.transform = `scale(${Math.random()})`;
      ball.style.width = `${Math.random()}em`;
      ball.style.height = ball.style.width;

      balls.push(ball);
      document.querySelector(querySelector).prepend(ball);
    }

    // Keyframes
    balls.forEach((el, i) => {
      let to = {
        x: Math.random() * (i % 2 === 0 ? -12 : 12),
        y: Math.random() * 12,
      };

      el.animate(
        [{ transform: 'translate(0, 0)' }, { transform: `translate(${to.x}rem, ${to.y}rem)` }],
        {
          duration: (Math.random() + 1) * 5000, // random duration
          direction: 'alternate',
          fill: 'both',
          iterations: Infinity,
          easing: 'ease-in-out',
        }
      );
    });
  },
};
