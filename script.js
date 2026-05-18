$(document).ready(function () {

    // ---- Modo Oscuro ----
    const body = $('body');
    const btnIcon = $('#btnDarkMode i');

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.addClass('dark-mode');
        btnIcon.removeClass('fa-moon').addClass('fa-sun');
    }

    $('#btnDarkMode').click(function (e) {
        e.preventDefault();
        body.toggleClass('dark-mode');

        if (body.hasClass('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            btnIcon.removeClass('fa-moon').addClass('fa-sun');
        } else {
            localStorage.setItem('darkMode', 'disabled');
            btnIcon.removeClass('fa-sun').addClass('fa-moon');
        }
    });

    // ---- Array de Esculturas ----
    const rawSculptures = [
        { src: "img/cerezas_rojas.jpeg", alt: "Cerezas Rojas Brillantes", categoria: "Frutas" },
        { src: "img/buho_madera.jpeg", alt: "Búho tallado en madera", categoria: "Animales" },
        { src: "img/corazones_derretidos.jpeg", alt: "Corazones estilo goteo", categoria: "Abstracto" },
        { src: "img/figuras_humanoides.jpeg", alt: "Figuras humanas entrelazadas", categoria: "Humanoides" },
        { src: "img/manzanas_rojas.jpeg", alt: "Manzanas de la pasión", categoria: "Frutas" },
        { src: "img/figuras_humanoides2.jpeg", alt: "Figuras humanas entrelazadas", categoria: "Humanoides" },
        { src: "img/abstracta.jpeg", alt: "Figura azul", categoria: "Abstracto" },
        { src: "img/abstracta2.jpeg", alt: "Figura humanoide y corazón", categoria: "Abstracto" },
        { src: "img/abstracta3.jpeg", alt: "Manzanas para guardar", categoria: "Utilitario" },
        { src: "img/abstracta4.jpeg", alt: "Corazones humanos", categoria: "Abstracto" },
        { src: "img/abstracta5.jpeg", alt: "Mesa de noche", categoria: "Muebles" },
        { src: "img/abstracta6.jpeg", alt: "Mesa de licores", categoria: "Muebles" },
        { src: "img/abstracta7.jpeg", alt: "Manzanas para guardar", categoria: "Utilitario" },
        { src: "img/buho_madera2.jpeg", alt: "Búho tallado en madera (variación)", categoria: "Animales" },
        { src: "img/cerezas_doradas.jpeg", alt: "Cerezas doradas brillantes", categoria: "Frutas" },
        { src: "img/cerezas_plateada.jpeg", alt: "Cerezas plateadas decorativas", categoria: "Frutas" },
        { src: "img/cerezas_rojas2.jpeg", alt: "Par de cerezas rojas", categoria: "Frutas" },
        { src: "img/cerezas_rojas3.jpeg", alt: "Cerezas rojas de colección", categoria: "Frutas" },
        { src: "img/cerezas_verde.jpeg", alt: "Cerezas verdes llamativas", categoria: "Frutas" },
        { src: "img/corazones2.jpeg", alt: "Corazones decorativos", categoria: "Abstracto" },
        { src: "img/corazones3.jpeg", alt: "Escultura de corazones", categoria: "Abstracto" },
        { src: "img/dulce.jpeg", alt: "Escultura en forma de dulce", categoria: "Abstracto" },
        { src: "img/figuras_humanoides3.jpeg", alt: "Figura humana estilizada", categoria: "Humanoides" },
        { src: "img/figuras_humanoides4.jpeg", alt: "Escultura de figura humana", categoria: "Humanoides" },
        { src: "img/figuras_humanoides5.jpeg", alt: "Figura humana abstracta", categoria: "Humanoides" },
        { src: "img/figuras_humanoides6.jpeg", alt: "Escultura humanoide en madera", categoria: "Humanoides" },
        { src: "img/figuras_humanoides7.jpeg", alt: "Pareja de figuras humanas", categoria: "Humanoides" },
        { src: "img/frutas.jpeg", alt: "Arreglo de frutas talladas", categoria: "Frutas" },
        { src: "img/frutas2.jpeg", alt: "Conjunto de frutas decorativas", categoria: "Frutas" }
    ];

    let sculptures = rawSculptures.map(function (item, index) {
        return {
            id: index + 1,
            src: item.src,
            alt: item.alt,
            categoria: item.categoria || "General"
        };
    });

    // ---- Algoritmo Fisher-Yates para barajar ----
    function mezclarArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    mezclarArray(sculptures);

    // ---- Renderizar Galería ----
    $.each(sculptures, function (index, item) {
        const imageElement = `
            <img src="${item.src}" 
                 alt="${item.alt}" 
                 data-id="${item.id}" 
                 data-categoria="${item.categoria}" 
                 class="masonry-item img-fluid">
        `;
        $('#gallery-container').append(imageElement);
    });

    // ---- Intersection Observer para Fade-in ----
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    const imageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                $(entry.target).addClass('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    $('.masonry-item').each(function () {
        imageObserver.observe(this);
    });

    // ---- Lightbox ----
    $(document).on('click', '.masonry-item', function () {
        const imageSrc = $(this).attr('src');
        $('#lightbox-image').attr('src', imageSrc);
        $('#custom-lightbox').addClass('active');
    });

    $(document).on('click', '#custom-lightbox', function () {
        $(this).removeClass('active');
        setTimeout(() => {
            $('#lightbox-image').attr('src', '');
        }, 300);
    });
});