// Navigation toggle for small screens
document.addEventListener('DOMContentLoaded', function(){
	const nav = document.getElementById('nav');
	const toggle = document.getElementById('navToggle');
	toggle.addEventListener('click', () => {
		nav.classList.toggle('open');
		if(nav.classList.contains('open')){
			nav.style.display = 'flex';
			nav.style.flexDirection = 'column';
			nav.style.gap = '12px';
		} else {
			nav.style.display = '';
		}
	});

	// Smooth scrolling for internal links
	document.querySelectorAll('a[href^="#"]').forEach(a=>{
		a.addEventListener('click', (e)=>{
			const href = a.getAttribute('href');
			if(href.length>1){
				e.preventDefault();
				const el = document.querySelector(href);
				if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
			}
		})
	})

	// Project filter
	const filters = document.querySelectorAll('.filter-btn');
	const projects = document.querySelectorAll('.project');
	filters.forEach(btn=>btn.addEventListener('click', ()=>{
		filters.forEach(b=>b.classList.remove('active'));
		btn.classList.add('active');
		const f = btn.dataset.filter;
		projects.forEach(p=>{
			if(f==='all' || p.dataset.type===f){
				p.style.display = '';
			} else {
				p.style.display = 'none';
			}
		})
	}));

	// Testimonials slider simple
	const track = document.querySelector('.testi-track');
	const slides = document.querySelectorAll('.testi');
	const prev = document.getElementById('tprev');
	const next = document.getElementById('tnext');
	let index = 0;
	function show(i){
		index = (i + slides.length) % slides.length;
		track.style.transform = `translateX(-${index*100}%)`;
	}
	prev.addEventListener('click', ()=> show(index-1));
	next.addEventListener('click', ()=> show(index+1));
	// auto rotate
	let auto = setInterval(()=> show(index+1), 6000);
	[prev,next,track].forEach(el=> el.addEventListener('mouseenter', ()=> clearInterval(auto)));
	[prev,next,track].forEach(el=> el.addEventListener('mouseleave', ()=> auto = setInterval(()=> show(index+1), 6000)));

	// Contact form stub
	const form = document.getElementById('contactForm');
	form.addEventListener('submit', (e)=>{
		e.preventDefault();
		const fd = new FormData(form);
		const name = fd.get('name');
		// For demo we'll just show a message
		const btn = form.querySelector('button');
		btn.textContent = 'Sending...';
		setTimeout(()=>{
			btn.textContent = 'Contact Me';
			alert(`Thanks ${name}! Your message was received (demo).`);
			form.reset();
		},900);
	});

});
