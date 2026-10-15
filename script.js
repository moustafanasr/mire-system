const header=document.querySelector('.site-header');
const progress=document.querySelector('.page-progress span');
const toggle=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('.mobile-menu');
function onScroll(){
  if(header && !header.classList.contains('light-header')) header.classList.toggle('is-sticky',scrollY>80);
  const max=document.documentElement.scrollHeight-innerHeight;
  if(progress) progress.style.width=(max>0?scrollY/max*100:0)+'%';
}
addEventListener('scroll',onScroll,{passive:true});onScroll();
if(toggle&&mobileMenu){toggle.addEventListener('click',()=>{const open=!toggle.classList.contains('is-open');toggle.classList.toggle('is-open',open);mobileMenu.classList.toggle('is-open',open);mobileMenu.setAttribute('aria-hidden',String(!open));toggle.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open)});document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>{toggle.classList.remove('is-open');mobileMenu.classList.remove('is-open');document.body.classList.remove('menu-open')}))}
const slides=[...document.querySelectorAll('.hero-slide')];
if(slides.length){const currentNo=document.querySelector('.hero-pagination strong'),heroProgress=document.querySelector('.hero-line span');let heroIndex=0,timer;function showSlide(index){heroIndex=(index+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('is-active',i===heroIndex));if(currentNo)currentNo.textContent=String(heroIndex+1).padStart(2,'0');if(heroProgress){heroProgress.style.animation='none';void heroProgress.offsetWidth;heroProgress.style.animation='heroProgress 6s linear infinite'}clearInterval(timer);timer=setInterval(()=>showSlide(heroIndex+1),6000)}document.querySelector('.hero-next')?.addEventListener('click',()=>showSlide(heroIndex+1));document.querySelector('.hero-prev')?.addEventListener('click',()=>showSlide(heroIndex-1));showSlide(0)}
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');revealObserver.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal,.fade-sequence').forEach(el=>revealObserver.observe(el));
document.querySelectorAll('[data-drag-scroll]').forEach(track=>{let down=false,startX=0,startLeft=0;track.addEventListener('pointerdown',e=>{down=true;startX=e.clientX;startLeft=track.scrollLeft;track.setPointerCapture?.(e.pointerId)});track.addEventListener('pointermove',e=>{if(down)track.scrollLeft=startLeft-(e.clientX-startX)});['pointerup','pointercancel','pointerleave'].forEach(ev=>track.addEventListener(ev,()=>down=false))});
const filterButtons=[...document.querySelectorAll('[data-filter]')];const projectTiles=[...document.querySelectorAll('[data-category]')];filterButtons.forEach(btn=>btn.addEventListener('click',()=>{filterButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;projectTiles.forEach(tile=>tile.style.display=(f==='all'||tile.dataset.category===f)?'block':'none')}));
document.querySelectorAll('form[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const b=form.querySelector('button[type="submit"]');if(b){const old=b.innerHTML;b.innerHTML='Message ready <span>✓</span>';setTimeout(()=>b.innerHTML=old,2400)}}));

// Full-card navigation: the image, title and CTA all resolve to the same destination.
document.querySelectorAll('[data-card-link]').forEach(card=>{
  let pointerStart=null, moved=false;
  card.addEventListener('pointerdown',e=>{pointerStart={x:e.clientX,y:e.clientY};moved=false});
  card.addEventListener('pointermove',e=>{if(pointerStart && (Math.abs(e.clientX-pointerStart.x)>8 || Math.abs(e.clientY-pointerStart.y)>8)) moved=true});
  card.addEventListener('click',e=>{
    if(moved || e.target.closest('a,button,input,select,textarea,label')) return;
    const href=card.dataset.cardLink;
    if(href) location.href=href;
  });
  card.addEventListener('keydown',e=>{
    if((e.key==='Enter'||e.key===' ') && !e.target.closest('a,button,input,select,textarea')){
      e.preventDefault();
      const href=card.dataset.cardLink;
      if(href) location.href=href;
    }
  });
});

// Preserve useful context when a careers link opens the contact form.
if(location.pathname.endsWith('contact.html') && location.hash==='#enquiry-form'){
  requestAnimationFrame(()=>document.querySelector('#name')?.focus({preventScroll:true}));
}
