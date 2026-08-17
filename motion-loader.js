(() => {
  // Small UI fixes that should apply regardless of motion preferences.
  const uiStyle = document.createElement('style');
  uiStyle.textContent = `
    .role-head{align-items:flex-start}
    .current-badge{align-self:flex-start;white-space:nowrap;line-height:1.2}
    .mobile-nav-frost{display:none}

    @media(max-width:760px){
      .menu-btn{
        position:relative;
        display:block;
        flex:0 0 44px;
        width:44px;
        height:44px;
      }
      .menu-btn span{
        position:absolute;
        left:50%;
        top:50%;
        display:block;
        width:18px;
        height:1.5px;
        margin:0!important;
        border-radius:999px;
        background:currentColor;
        transform-origin:center;
        transition:transform .22s cubic-bezier(.2,.75,.2,1),opacity .18s ease;
      }
      .menu-btn span:first-child{
        transform:translate(-50%,-4px);
      }
      .menu-btn span:last-child{
        transform:translate(-50%,4px);
      }
      .menu-btn[aria-expanded="true"] span:first-child{
        transform:translate(-50%,0) rotate(45deg);
      }
      .menu-btn[aria-expanded="true"] span:last-child{
        transform:translate(-50%,0) rotate(-45deg);
      }

      /* The mobile menu is nested inside the frosted navbar. Nested backdrop
         filters cannot reliably sample the page behind the parent on Chrome.
         The actual blur therefore lives on a separate fixed layer appended
         directly to <body>, underneath the menu but above page content. */
      .nav-shell:has(.nav-links.open){
        -webkit-backdrop-filter:none!important;
        backdrop-filter:none!important;
      }
      .nav-links.open{
        background:rgba(8,10,18,.10)!important;
        -webkit-backdrop-filter:none!important;
        backdrop-filter:none!important;
        box-shadow:inset 0 1px 0 rgba(255,255,255,.06)!important;
      }
      .mobile-nav-frost{
        display:block;
        position:fixed;
        z-index:39;
        pointer-events:none;
        opacity:0;
        border-radius:24px;
        overflow:hidden;
        background:linear-gradient(145deg,rgba(26,29,48,.46),rgba(8,10,19,.28));
        border:1px solid rgba(255,255,255,.14);
        box-shadow:0 26px 80px rgba(0,0,0,.34),inset 0 1px 0 rgba(255,255,255,.08);
        -webkit-backdrop-filter:blur(32px) saturate(175%);
        backdrop-filter:blur(32px) saturate(175%);
        transition:opacity .16s ease;
        will-change:left,top,width,height,opacity;
      }
      .mobile-nav-frost.is-open{opacity:1}

      html[data-theme="light"] .nav-links.open{
        background:rgba(255,255,255,.08)!important;
      }
      html[data-theme="light"] .mobile-nav-frost{
        background:linear-gradient(145deg,rgba(255,255,255,.54),rgba(233,238,249,.30));
        border-color:rgba(35,45,70,.12);
        box-shadow:0 26px 80px rgba(65,76,112,.18),inset 0 1px 0 rgba(255,255,255,.72);
        -webkit-backdrop-filter:blur(32px) saturate(165%);
        backdrop-filter:blur(32px) saturate(165%);
      }
    }
  `;
  document.head.appendChild(uiStyle);

  // Dedicated backdrop layer for the expanded mobile navigation.
  const mobileNav = document.getElementById('navLinks');
  const mobileMenuBtn = document.getElementById('menuBtn');
  if (mobileNav && mobileMenuBtn) {
    const frost = document.createElement('div');
    frost.className = 'mobile-nav-frost';
    frost.setAttribute('aria-hidden', 'true');
    document.body.appendChild(frost);

    let frostFrame = 0;
    const syncMobileNavFrost = () => {
      cancelAnimationFrame(frostFrame);
      frostFrame = requestAnimationFrame(() => {
        const isMobile = window.matchMedia('(max-width:760px)').matches;
        const isOpen = mobileNav.classList.contains('open');
        if (!isMobile || !isOpen) {
          frost.classList.remove('is-open');
          return;
        }

        const rect = mobileNav.getBoundingClientRect();
        frost.style.left = `${rect.left}px`;
        frost.style.top = `${rect.top}px`;
        frost.style.width = `${rect.width}px`;
        frost.style.height = `${rect.height}px`;
        frost.style.borderRadius = getComputedStyle(mobileNav).borderRadius || '24px';
        frost.classList.add('is-open');
      });
    };

    const navClassObserver = new MutationObserver(syncMobileNavFrost);
    navClassObserver.observe(mobileNav, { attributes: true, attributeFilter: ['class'] });
    mobileMenuBtn.addEventListener('click', syncMobileNavFrost);
    mobileNav.addEventListener('click', event => {
      if (event.target.closest('a')) syncMobileNavFrost();
    });
    window.addEventListener('resize', syncMobileNavFrost, { passive: true });
    window.addEventListener('orientationchange', syncMobileNavFrost, { passive: true });
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  // Slow ambient background motion.
  const style = document.createElement('style');
  style.textContent = `
    .ambient{will-change:transform}
    .ambient-a{animation:ambientFloatA 24s ease-in-out infinite alternate}
    .ambient-b{animation:ambientFloatB 29s ease-in-out infinite alternate}
    .ambient-c{animation:ambientFloatC 33s ease-in-out infinite alternate}
    @keyframes ambientFloatA{0%{transform:translate3d(0,0,0) scale(1)}40%{transform:translate3d(12vw,8vh,0) scale(1.08)}75%{transform:translate3d(5vw,20vh,0) scale(.96)}100%{transform:translate3d(16vw,12vh,0) scale(1.04)}}
    @keyframes ambientFloatB{0%{transform:translate3d(0,0,0) scale(1)}35%{transform:translate3d(-14vw,-8vh,0) scale(.94)}70%{transform:translate3d(-7vw,14vh,0) scale(1.09)}100%{transform:translate3d(-18vw,4vh,0) scale(1.02)}}
    @keyframes ambientFloatC{0%{transform:translate3d(0,0,0) scale(1)}30%{transform:translate3d(-10vw,-14vh,0) scale(1.07)}65%{transform:translate3d(13vw,-7vh,0) scale(.95)}100%{transform:translate3d(5vw,-18vh,0) scale(1.05)}}

    html[data-theme="light"] .ambient-a{opacity:.28;filter:blur(76px) saturate(135%);mix-blend-mode:multiply}
    html[data-theme="light"] .ambient-b{opacity:.24;filter:blur(72px) saturate(145%);mix-blend-mode:multiply}
    html[data-theme="light"] .ambient-c{opacity:.20;filter:blur(78px) saturate(140%);mix-blend-mode:multiply}
    html[data-theme="light"] body{background:radial-gradient(circle at 14% 18%,rgba(125,103,255,.09),transparent 31%),radial-gradient(circle at 84% 38%,rgba(73,191,255,.08),transparent 30%),radial-gradient(circle at 46% 92%,rgba(210,105,255,.07),transparent 31%),var(--bg)}
  `;
  document.head.appendChild(style);

  // Animate layout reflow when translated text changes its line count.
  // This prevents content below a taller translated headline from jumping.
  const layoutSelector = [
    '.hero-description',
    '.hero-actions .btn',
    '.hero-meta > div',
    '.hero-visual',
    '.section-heading',
    '.about-copy',
    '.stack-grid',
    '.timeline-item',
    '.project-card',
    '.education-card',
    '.contact-card',
    '.footer'
  ].join(',');

  let previousLayout = null;
  let transitionToken = 0;
  let mutationObserver = null;
  let cleanupTimer = null;

  function captureLayout() {
    const elements = [...document.querySelectorAll(layoutSelector)];
    previousLayout = new Map(elements.map(element => [element, element.getBoundingClientRect()]));
  }

  function animateLayout(token) {
    if (token !== transitionToken || !previousLayout) return;

    previousLayout.forEach((before, element) => {
      if (!element.isConnected) return;

      const after = element.getBoundingClientRect();
      const deltaX = before.left - after.left;
      const deltaY = before.top - after.top;

      if (Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5) return;

      element.getAnimations().forEach(animation => {
        if (animation.id === 'language-layout-shift') animation.cancel();
      });

      const animation = element.animate(
        [
          { transform: `translate3d(${deltaX}px, ${deltaY}px, 0)` },
          { transform: 'translate3d(0, 0, 0)' }
        ],
        {
          duration: 460,
          easing: 'cubic-bezier(.2,.75,.2,1)',
          fill: 'both'
        }
      );
      animation.id = 'language-layout-shift';
      animation.finished.finally(() => animation.cancel()).catch(() => {});
    });

    previousLayout = null;
  }

  document.querySelectorAll('.language-btn').forEach(button => {
    button.addEventListener('click', () => {
      const token = ++transitionToken;
      captureLayout();

      mutationObserver?.disconnect();
      clearTimeout(cleanupTimer);

      // applyLanguage() mutates all translated text in one JS task.
      // MutationObserver runs after those mutations but before the next paint,
      // which lets us invert the layout shift before the user sees it.
      mutationObserver = new MutationObserver(mutations => {
        const textChanged = mutations.some(mutation =>
          mutation.type === 'childList' || mutation.type === 'characterData'
        );
        if (!textChanged || token !== transitionToken) return;

        mutationObserver.disconnect();
        animateLayout(token);
      });

      mutationObserver.observe(document.body, {
        subtree: true,
        childList: true,
        characterData: true
      });

      cleanupTimer = setTimeout(() => {
        mutationObserver?.disconnect();
        if (token === transitionToken) previousLayout = null;
      }, 900);
    }, { capture: true });
  });
})();
