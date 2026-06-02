// Preloader
window.addEventListener('load',()=>{
  setTimeout(()=>document.getElementById('preloader')?.classList.add('hidden'),600);
});

// Navbar scroll
const nav=document.querySelector('.navbar');
window.addEventListener('scroll',()=>{
  if(window.scrollY>30) nav?.classList.add('scrolled'); else nav?.classList.remove('scrolled');
  const btt=document.getElementById('backToTop');
  if(window.scrollY>400) btt?.classList.add('show'); else btt?.classList.remove('show');
});

// Back to top
document.getElementById('backToTop')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// Scroll-triggered animations
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:.12});
document.querySelectorAll('[data-anim]').forEach(el=>io.observe(el));

// Counter animation
const counterIO=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const el=e.target;
    const target=+el.dataset.count;
    const dur=1800;const start=performance.now();
    const suffix=el.dataset.suffix||'';
    const step=t=>{
      const p=Math.min((t-start)/dur,1);
      el.textContent=Math.floor(p*target).toLocaleString()+suffix;
      if(p<1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    counterIO.unobserve(el);
  });
},{threshold:.4});
document.querySelectorAll('[data-count]').forEach(el=>counterIO.observe(el));

// Portfolio filter
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('.portfolio-item').forEach(item=>{
      if(f==='all'||item.dataset.cat===f){ item.style.display=''; }
      else{ item.style.display='none'; }
    });
  });
});

// Active nav link
const path=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.navbar .nav-link').forEach(l=>{
  const href=l.getAttribute('href');
  if(href && (href===path || (path==='' && href==='index.html'))) l.classList.add('active');
});

// Contact form
document.getElementById('contactForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const btn=e.target.querySelector('button[type=submit]');
  const orig=btn.innerHTML;
  btn.innerHTML='<i class="fa-solid fa-check"></i> Message Sent!';
  btn.disabled=true;
  e.target.reset();
  setTimeout(()=>{btn.innerHTML=orig;btn.disabled=false},2800);
});

// Testimonials auto (bootstrap carousel handles it)
