
const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];

const menuBtn=$('.menu-btn'), nav=$('.nav-links');
if(menuBtn&&nav){
  menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
  $$('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
}

const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')})
},{threshold:.12});
$$('.reveal').forEach(el=>io.observe(el));

$$('.accordion-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item=btn.closest('.accordion-item');
    item.classList.toggle('open');
    btn.querySelector('span:last-child').textContent=item.classList.contains('open')?'−':'+';
  });
});

const glow=$('.glow');
if(glow && matchMedia('(pointer:fine)').matches){
  window.addEventListener('pointermove',e=>{
    glow.style.left=e.clientX+'px';
    glow.style.top=e.clientY+'px';
  },{passive:true});
}

const browser=$('.browser');
if(browser && matchMedia('(pointer:fine)').matches){
  const wrap=browser.parentElement;
  wrap.addEventListener('pointermove',e=>{
    const r=wrap.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    browser.style.transform=`rotateY(${x*8-6}deg) rotateX(${-y*6+3}deg) translateY(-2px)`;
  });
  wrap.addEventListener('pointerleave',()=>browser.style.transform='rotateY(-8deg) rotateX(4deg)');
}

const contactForm=$('#contact-form');
if(contactForm){
  contactForm.addEventListener('submit',e=>{
    e.preventDefault();
    const d=new FormData(contactForm);
    const subject=encodeURIComponent(`Levels Local enquiry — ${d.get('business')||d.get('name')||'Website project'}`);
    const body=encodeURIComponent(
`Name: ${d.get('name')||''}
Business: ${d.get('business')||''}
Email: ${d.get('email')||''}
Phone: ${d.get('phone')||''}
Current website: ${d.get('website')||''}
Interested in: ${d.get('service')||''}

Message:
${d.get('message')||''}`
    );
    window.location.href=`mailto:levelslocal@gmail.com?subject=${subject}&body=${body}`;
  });
}

const year=$('[data-year]');
if(year) year.textContent=new Date().getFullYear();
