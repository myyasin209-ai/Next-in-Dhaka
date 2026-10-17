/* NEXT IN DHAKA - the page logic. Beginners rarely need to edit this file. */
(()=>{
const D=window.SITE,$=s=>document.querySelector(s),P=document.body.dataset.page,Q=new URLSearchParams(location.search);
const fmt=d=>new Date(d+'T00:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
const bg=o=>o.image?`url('${o.image}') center/cover`:`linear-gradient(135deg,hsl(${o.hue} 55% 28%),hsl(${(o.hue+45)%360} 75% 55%))`;
const top=o=>`<div class="img" style="background:${bg(o)}"><span class="tag">${o.category}</span><span class="fic">Fictional sample</span></div>`;
const eCard=e=>`<a class="card" href="event.html?id=${e.id}">${top(e)}<div class="body"><p class="meta">${fmt(e.date)}</p><h3>${e.title}</h3><p class="meta">${e.venue}, ${e.area}</p></div></a>`;
const sCard=s=>`<a class="card" href="article.html?id=${s.id}">${top(s)}<div class="body"><p class="meta">${fmt(s.date)}</p><h3>${s.title}</h3><p class="meta">${s.summary}</p></div></a>`;

const links=[['index.html#events','Events'],['index.html#stories','Stories'],['about.html','About'],['advertise.html','Advertise'],['contact.html','Contact']];
$('#site-header').innerHTML=`<div class="banner">${D.notice}</div><div class="wrap nav"><a class="logo" href="index.html">Next in <b>Dhaka</b></a><button class="menu" aria-label="Open menu">☰</button><nav><ul>${links.map(l=>`<li><a href="${l[0]}">${l[1]}</a></li>`).join('')}<li><a class="btn sm" href="contact.html?topic=event">Submit an event</a></li></ul></nav></div>`;
$('.menu').onclick=()=>$('nav').classList.toggle('open');
$('#site-footer').innerHTML=`<div class="wrap fcols"><div><h3 style="color:#fff">Next in Dhaka</h3><p>Events and stories from across Dhaka. Prototype with fictional sample content.</p></div><div><a href="index.html#events">Browse events</a><a href="index.html#stories">Read stories</a></div><div><a href="contact.html?topic=event">Submit an event</a><a href="advertise.html">Advertise with us</a><a href="about.html">About</a></div></div>`;

if(P==='home'){
const up=D.events.slice().sort((a,b)=>a.date.localeCompare(b.date));
$('#featured').innerHTML=up.filter(e=>e.featured).map(eCard).join('');
$('#storyGrid').innerHTML=D.stories.map(sCard).join('');
$('#cats').innerHTML=D.categories.map(c=>`<a class="cat" href="index.html?cat=${encodeURIComponent(c.name)}#events"><span>${c.icon}</span><h3>${c.name}</h3><p>${c.blurb}</p></a>`).join('');
let cat=Q.get('cat')||'All';
const render=()=>{const t=$('#q').value.trim().toLowerCase();
const r=up.filter(e=>(cat==='All'||e.category===cat)&&(e.title+e.venue+e.area+e.category+e.summary).toLowerCase().includes(t));
$('#upcoming').innerHTML=r.map(eCard).join('')||'<p>No events match. Clear the search or pick another category.</p>';
$('#count').textContent=r.length+(r.length===1?' event':' events');
$('#chips').innerHTML=['All',...D.categories.map(c=>c.name)].map(c=>`<button class="chip${c===cat?' on':''}" data-c="${c}">${c}</button>`).join('')};
$('#chips').onclick=e=>{if(e.target.dataset.c){cat=e.target.dataset.c;render()}};
$('#q').oninput=render;render();
$('#news').onsubmit=e=>{e.preventDefault();$('#newsMsg').textContent='Thank you. This is a prototype, so no email was sent or saved.'};
}

if(P==='event'){const e=D.events.find(x=>x.id===Q.get('id')),v=$('#view');
if(!e)v.innerHTML='<h1>Event not found</h1><p><a href="index.html#events">Back to all events</a></p>';
else{document.title=e.title+' | Next in Dhaka';
v.innerHTML=`<a class="back" href="index.html#events">Back to all events</a><div class="dhero" style="background:${bg(e)}"><span class="tag">${e.category}</span><span class="fic">Fictional sample</span></div><div class="cols"><article><h1>${e.title}</h1><p class="lead">${e.summary}</p><p>${e.details}</p></article><aside class="box"><h3>Event details</h3><p><b>Date</b><br>${fmt(e.date)}</p><p><b>Time</b><br>${e.time}</p><p><b>Venue</b><br>${e.venue}, ${e.area}</p><p><b>Price</b><br>${e.price}</p><a class="btn" href="contact.html?topic=event">List your own event</a></aside></div><h2 style="margin-top:3rem">More events</h2><div class="grid">${D.events.filter(x=>x.id!==e.id).slice(0,3).map(eCard).join('')}</div>`}}

if(P==='article'){const s=D.stories.find(x=>x.id===Q.get('id')),v=$('#view');
if(!s)v.innerHTML='<h1>Story not found</h1><p><a href="index.html#stories">Back to stories</a></p>';
else{document.title=s.title+' | Next in Dhaka';
v.innerHTML=`<a class="back" href="index.html#stories">Back to stories</a><div class="dhero" style="background:${bg(s)}"><span class="tag">${s.category}</span><span class="fic">Fictional sample</span></div><article class="narrow"><h1>${s.title}</h1><p class="meta">${fmt(s.date)}, by ${s.author}</p>${s.body.map(p=>`<p>${p}</p>`).join('')}</article><h2 style="margin-top:3rem">More stories</h2><div class="grid">${D.stories.filter(x=>x.id!==s.id).slice(0,3).map(sCard).join('')}</div>`}}

if(P==='contact'||P==='advertise'){
const t=Q.get('topic');if(t&&$('#topic'))$('#topic').value=t;
if($('#cf'))$('#cf').onsubmit=ev=>{ev.preventDefault();
location.href=`mailto:${D.contactEmail}?subject=${encodeURIComponent('['+$('#topic').value+'] '+$('#cn').value)}&body=${encodeURIComponent($('#msg').value+'\n\nReply to: '+$('#ce').value)}`};
if($('#adlink'))$('#adlink').href=`mailto:${D.contactEmail}?subject=${encodeURIComponent('Advertising enquiry')}`;}
})();
