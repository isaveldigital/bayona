const h=document.getElementById('header');window.addEventListener('scroll',()=>h&&h.classList.toggle('scrolled',scrollY>40));document.querySelectorAll('.faq-item').forEach(i=>i.querySelector('.faq-question')?.addEventListener('click',()=>{i.classList.toggle('active');const a=i.querySelector('.faq-answer');a.style.maxHeight=i.classList.contains('active')?a.scrollHeight+'px':0;}));


/* =========================================================
   SERVICIOS — PREMIUM CAROUSEL
========================================================= */

(function () {

    const track = document.getElementById("servicesTrack");
    const prev = document.getElementById("servicesPrev");
    const next = document.getElementById("servicesNext");
    const progress = document.getElementById("servicesProgress");

    if (!track || !prev || !next) return;


    const cards = Array.from(
        track.querySelectorAll(".service-card")
    );


    let currentIndex = 0;


    function getVisibleCards() {

        const width = window.innerWidth;

        if (width <= 680) {
            return 1.15;
        }

        if (width <= 1000) {
            return 2.15;
        }

        return 3.15;
    }


    function getStep() {

        if (!cards.length) return 0;

        const cardWidth =
            cards[0].getBoundingClientRect().width;

        const gap =
            parseFloat(
                getComputedStyle(track).gap
            ) || 0;

        return cardWidth + gap;
    }


    function getMaxIndex() {

        const visible =
            getVisibleCards();

        return Math.max(
            0,
            Math.ceil(cards.length - visible)
        );
    }


    function updateCarousel() {

        const step = getStep();

        const maxIndex =
            getMaxIndex();

        currentIndex =
            Math.max(
                0,
                Math.min(
                    currentIndex,
                    maxIndex
                )
            );


        track.style.transform =
            `translate3d(-${currentIndex * step}px, 0, 0)`;


        prev.disabled =
            currentIndex === 0;

        next.disabled =
            currentIndex >= maxIndex;


        if (progress) {

            const totalSteps =
                maxIndex || 1;

            const percentage =
                ((currentIndex + 1) /
                (totalSteps + 1)) * 100;

            progress.style.width =
                `${Math.min(100, percentage)}%`;
        }
    }


    next.addEventListener(
        "click",
        function () {

            const maxIndex =
                getMaxIndex();

            if (
                currentIndex <
                maxIndex
            ) {

                currentIndex++;

                updateCarousel();
            }
        }
    );


    prev.addEventListener(
        "click",
        function () {

            if (currentIndex > 0) {

                currentIndex--;

                updateCarousel();
            }
        }
    );


    window.addEventListener(
        "resize",
        updateCarousel
    );


    updateCarousel();

})();



/* =========================================================
   MÉTRICAS — CONTADOR ANIMADO
========================================================= */

const metricBlock =
    document.querySelector('.metrics-list');


if (metricBlock) {

    const metricObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;


                    const counters =
                        entry.target.querySelectorAll(
                            '[data-counter]'
                        );


                    counters.forEach(counter => {

                        const target =
                            parseInt(
                                counter.dataset.counter,
                                10
                            );


                        const suffix =
                            counter.dataset.suffix || "";


                        const duration = 1600;

                        const startTime =
                            performance.now();


                        function animateCounter(
                            currentTime
                        ) {

                            const elapsed =
                                currentTime -
                                startTime;


                            const progress =
                                Math.min(
                                    elapsed / duration,
                                    1
                                );


                            /*
                             * Easing suave:
                             * empieza rápido y desacelera
                             * al llegar al objetivo.
                             */

                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );


                            const value =
                                Math.floor(
                                    target * eased
                                );


                            counter.textContent =
                                value + suffix;


                            if (progress < 1) {

                                requestAnimationFrame(
                                    animateCounter
                                );

                            } else {

                                counter.textContent =
                                    target + suffix;
                            }
                        }


                        requestAnimationFrame(
                            animateCounter
                        );

                    });


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: .35
            }
        );


    metricObserver.observe(
        metricBlock
    );
}


/* =========================================================
   PROCESO — RUTA ANIMADA
========================================================= */

const processRoute =
    document.querySelector('.process-route');

const processProgress =
    document.querySelector('.process-path-progress');


if (processRoute && processProgress) {

    /*
     * Calculamos automáticamente la longitud
     * real de la ruta SVG.
     */

    const pathLength =
        processProgress.getTotalLength();


    processProgress.style.strokeDasharray =
        pathLength;

    processProgress.style.strokeDashoffset =
        pathLength;


    const processObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    /*
                     * Dibujar la ruta.
                     */

                    requestAnimationFrame(() => {

                        processProgress.style.strokeDashoffset =
                            '0';

                    });


                    /*
                     * Obtener los tres pasos.
                     */

                    const steps =
                        processRoute.querySelectorAll(
                            '.process-step'
                        );


                    /*
                     * Mostrar los pasos progresivamente.
                     */

                    steps.forEach((step, index) => {

                        setTimeout(() => {

                            step.classList.add(
                                'visible'
                            );

                        }, 500 + (index * 1800));

                    });


                    /*
                     * Activar cada paso progresivamente.
                     *
                     * 01 → 02 → 03
                     */

                    steps.forEach((step, index) => {

                        setTimeout(() => {

                            /*
                             * Quitamos el estado activo
                             * de los demás.
                             */

                            steps.forEach(item => {

                                item.classList.remove(
                                    'is-active'
                                );

                            });


                            /*
                             * Activamos el paso actual.
                             */

                            step.classList.add(
                                'is-active'
                            );


                        }, 900 + (index * 2100));

                    });



                    setTimeout(() => {

                        steps.forEach(step => {

                            step.classList.add(
                                'is-active'
                            );

                        });

                    }, 7200);


                    /*
                     * Ejecutar la animación
                     * solamente una vez.
                     */

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: .25
            }
        );


    processObserver.observe(
        processRoute
    );

}



// HEADER
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 40);
});


// MENÚ MÓVIL
const mobileMenu = document.getElementById('mobileMenu');
const menuToggle = document.getElementById('menuToggle');

if (mobileMenu && menuToggle) {

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

}


// FAQ
document.querySelectorAll('.faq-item').forEach(item => {

    item.querySelector('.faq-question')?.addEventListener('click', () => {

        item.classList.toggle('active');

        const ans = item.querySelector('.faq-answer');

        ans.style.maxHeight =
            item.classList.contains('active')
                ? ans.scrollHeight + 'px'
                : 0;

    });

});




/* =========================================================
   FORMULARIO DE CONTACTO → WHATSAPP
========================================================= */

const contactForm = document.getElementById('contactForm');

if (contactForm) {

    contactForm.addEventListener('submit', function(event) {

        event.preventDefault();


        /* ================================================
           DATOS DEL FORMULARIO
        ================================================ */

        const nombre =
            document.getElementById('contactNombre').value.trim();

        const empresa =
            document.getElementById('contactEmpresa').value.trim();

        const correo =
            document.getElementById('contactCorreo').value.trim();

        const telefono =
            document.getElementById('contactTelefono').value.trim();

        const servicio =
            document.getElementById('contactServicio').value;

        const mensaje =
            document.getElementById('contactMensaje').value.trim();


        /* ================================================
           VALIDACIÓN
        ================================================ */

        if (!nombre || !correo || !servicio) {

            alert(
                'Por favor completa tu nombre, correo electrónico y servicio de interés.'
            );

            return;
        }


        /* ================================================
           CONSTRUIR MENSAJE
        ================================================ */

        let whatsappMessage =
`Hola, soy ${nombre}.`;

        if (empresa) {

            whatsappMessage +=
`\n\nEmpresa: ${empresa}`;

        }

        whatsappMessage +=
`\nCorreo: ${correo}`;

        if (telefono) {

            whatsappMessage +=
`\nTeléfono: ${telefono}`;

        }

        whatsappMessage +=
`\n\nEstoy interesado(a) en: ${servicio}`;

        if (mensaje) {

            whatsappMessage +=
`\n\nQuisiera contarles lo siguiente:\n${mensaje}`;

        }

        whatsappMessage +=
`\n\nEnviado desde el sitio web de Bayona Cortes S.A.S.`;


        /* ================================================
           URL WHATSAPP
        ================================================ */

        const whatsappNumber = '573138084937';

        const whatsappURL =
            'https://wa.me/' +
            whatsappNumber +
            '?text=' +
            encodeURIComponent(whatsappMessage);


        /* ================================================
           ABRIR WHATSAPP
        ================================================ */

        window.open(
            whatsappURL,
            '_blank',
            'noopener,noreferrer'
        );

    });

}

