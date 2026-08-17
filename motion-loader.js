(() => {
  const style = document.createElement('style');
  style.textContent = `
    .ambient{will-change:transform}

    /* Light theme needs stronger ambient contrast because the same blurred
       colors get washed out against the pale background. */
    html[data-theme="light"] .ambient{
      filter:blur(72px) saturate(135%);
      mix-blend-mode:multiply;
    }
    html[data-theme="light"] .ambient-a{opacity:.30}
    html[data-theme="light"] .ambient-b{opacity:.22}
    html[data-theme="light"] .ambient-c{opacity:.20}
    html[data-theme="light"] body{
      background:
        radial-gradient(circle at 50% -10%,rgba(90,68,220,.18),transparent 36%),
        radial-gradient(circle at 88% 35%,rgba(36,170,210,.08),transparent 30%),
        var(--bg);
    }

    @media (prefers-reduced-motion:no-preference){
      .ambient-a{animation:ambientFloatA 24s ease-in-out infinite alternate}
      .ambient-b{animation:ambientFloatB 29s ease-in-out infinite alternate}
      .ambient-c{animation:ambientFloatC 33s ease-in-out infinite alternate}
    }

    @keyframes ambientFloatA{
      0%{transform:translate3d(0,0,0) scale(1)}
      40%{transform:translate3d(12vw,8vh,0) scale(1.08)}
      75%{transform:translate3d(5vw,20vh,0) scale(.96)}
      100%{transform:translate3d(16vw,12vh,0) scale(1.04)}
    }
    @keyframes ambientFloatB{
      0%{transform:translate3d(0,0,0) scale(1)}
      35%{transform:translate3d(-14vw,-8vh,0) scale(.94)}
      70%{transform:translate3d(-7vw,14vh,0) scale(1.09)}
      100%{transform:translate3d(-18vw,4vh,0) scale(1.02)}
    }
    @keyframes ambientFloatC{
      0%{transform:translate3d(0,0,0) scale(1)}
      30%{transform:translate3d(-10vw,-14vh,0) scale(1.07)}
      65%{transform:translate3d(13vw,-7vh,0) scale(.95)}
      100%{transform:translate3d(5vw,-18vh,0) scale(1.05)}
    }
  `;
  document.head.appendChild(style);
})();
