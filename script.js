// Navigation toggle for small screens
document.addEventListener('DOMContentLoaded', function () {
    var nav = document.getElementById('nav');
    var toggle = document.getElementById('navToggle');

    // Hamburger toggle
    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            nav.classList.toggle('open');
        });
    }

    // FIX: close mobile nav FIRST, then scroll
    var links = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < links.length; i++) {
        (function (a) {
            a.addEventListener('click', function () {
                var href = a.getAttribute('href');
                if (!href || href === '#') return;

                if (nav && nav.classList.contains('open')) {
                    nav.classList.remove('open');
                }

                // allow menu to close before scrolling (mobile fix)
                setTimeout(function () {
                    var target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 60);
            });
        })(links[i]);
    }

    // ===== filters (unchanged) =====
    var filters = document.querySelectorAll('.filter-btn');
    var projects = document.querySelectorAll('.project');
    for (i = 0; i < filters.length; i++) {
        (function (btn) {
            btn.addEventListener('click', function () {
                for (var j = 0; j < filters.length; j++) {
                    filters[j].classList.remove('active');
                }
                btn.classList.add('active');
                var f = btn.dataset.filter;
                for (var k = 0; k < projects.length; k++) {
                    var p = projects[k];
                    p.style.display = (f === 'all' || p.dataset.type === f) ? '' : 'none';
                }
            });
        })(filters[i]);
    }

    // ===== testimonial slider (unchanged) =====
    var track = document.querySelector('.testi-track');
    var slides = document.querySelectorAll('.testi');
    var prev = document.getElementById('tprev');
    var next = document.getElementById('tnext');
    var index = 0;

    function show(i) {
        index = (i + slides.length) % slides.length;
        if (track) track.style.transform = 'translateX(-' + (index * 100) + '%)';
    }

    if (prev) prev.addEventListener('click', function () { show(index - 1); });
    if (next) next.addEventListener('click', function () { show(index + 1); });

    var auto = setInterval(function () { show(index + 1); }, 6000);

    [prev, next, track].forEach(function (el) {
        if (el) {
            el.addEventListener('mouseenter', function () { clearInterval(auto); });
            el.addEventListener('mouseleave', function () {
                auto = setInterval(function () { show(index + 1); }, 6000);
            });
        }
    });

    // ===== contact form (unchanged) =====
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var fd = new FormData(form);
            var name = fd.get('name');
            var btn = form.querySelector('button');
            btn.textContent = 'Sending...';
            setTimeout(function () {
                btn.textContent = 'Contact Me';
                alert('Thanks ' + name + '! Your message was received (demo).');
                form.reset();
            }, 900);
        });
    }
});