// script.js - interactions
document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const enterBtn = document.getElementById('enterBtn');
  const mainContent = document.getElementById('mainContent');
  const bars = document.querySelectorAll('.bar');

  // Show main content after Enter (splash fades out)
  enterBtn.addEventListener('click', () => {
    splash.style.transition = 'opacity .45s ease';
    splash.style.opacity = '0';
    setTimeout(()=>{ splash.style.display='none'; mainContent.classList.remove('hidden'); window.scrollTo({top:0, behavior:"smooth"});}, 450);
  });

  // Fade-in on scroll using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.bar').forEach((el, i) => {
    // staggered initial delay for nicer appearance
    el.style.transitionDelay = (i * 120) + 'ms';
    observer.observe(el);

    // click animation + navigation
    el.addEventListener('click', (e) => {
      el.style.transition = 'transform .18s ease, opacity .18s ease';
      el.style.transform = 'scale(.98)';
      setTimeout(()=>{
        const t = el.getAttribute('data-target');
        // simple page transition (fade out main then navigate)
        document.body.style.transition = 'opacity .28s ease';
        document.body.style.opacity = '0';
        setTimeout(()=>{ window.location.href = t; }, 260);
      }, 140);
    });
  });

  // Simple search (filter bars by text)
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    document.querySelectorAll('.bar').forEach(b => {
      const text = (b.innerText || '').toLowerCase();
      b.style.display = text.includes(q) ? 'block' : 'none';
    });
  });
});
