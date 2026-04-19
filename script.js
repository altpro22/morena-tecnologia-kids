const LORENA_DATA = { titulo: "INNOVACION TECNOLOGICA" };

const CONFIG = { 
    // TELÉFONO ACTUALIZADO MORENA AGUASCALIENTES
    whatsapp: "524499135909", 
    youtube: "https://www.youtube.com/@morenaSInacional", 
    facebook: "https://www.facebook.com/MorenaSiOficial", 
    sitioWeb: "https://morena.si/", 
    // ENLACE PARA EL QR (SITIO OFICIAL)
    mapa: "https://morena.si/", 
    allowedExt: ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG'] 
};

// LOS LINKS DE JUEGOS Y RECURSOS SE MANTIENEN PARA LA DEMO TÉCNICA
const JUEGOS_DATA = [
    { nombre: "GATO", link: "http://morena-triangulo.surge.sh/", img: "GATO" },
    { nombre: "MEMORAMA", link: "https://morena-memorama.surge.sh/", img: "MEMORAMA" },
    { nombre: "ASOCIACIÓN", link: "http://morena-asocia.surge.sh/", img: "ASOCIA" },
    { nombre: "ROMPECABEZAS", link: "https://morena-rompecabezas.surge.sh/", img: "ROMPECABEZAS" }
];

const VIDEOS_DATA = [
    { nombre: "TABLAS", link: "https://fantastic-belekoy-cecbb9.netlify.app/", img: "TABLAS DE MULTIPLICAR" },
    { nombre: "NUMEROS", link: "https://www.youtube.com/watch?v=jqdPhxAmwkE", img: "AGUA" },
    { nombre: "INGLÉS", link: "https://iframe.mediadelivery.net/play/423537/66bc7e7a-0fea-4a65-b0dc-09fdd99439a0", img: "INGLES" },
    { nombre: "FESTIVOS", link: "https://warm-cocada-270990.netlify.app/", img: "DIAS FESTIVOS" }
];

const OTROS_DATA = [
    { nombre: "IA PRESENTACIÓN", link: "https://drive.google.com/file/d/1AQbeIUWh2tig9JYp56jZwchLKEuA0uvw/view?usp=sharing", img: "INTELIGENCIAS ARTIFICIALES" },
    { nombre: "RADIO VALORES", link: "https://vocaroo.com/1t0OqK3Qgkoo", img: "VALORES" },
    { nombre: "DINOSAURIOS", link: "https://drive.google.com/file/d/1IEvRqCCDH961DtwKxPM8IQBMgzs4wSFF/view", img: "DINOSAURIOS" },
    { nombre: "ARTE PLANEACIÓN", link: "https://drive.google.com/file/d/1WtcpRg3xFpdZoIHV7CeEpuTq4v1nDImx/view?usp=sharing", img: "ARTE" }
];

document.addEventListener('DOMContentLoaded', () => {
    // ACTUALIZACIÓN DINÁMICA DE TEXTOS Y LINKS
    const titleElem = document.getElementById('lorena-title');
    if(titleElem) titleElem.textContent = LORENA_DATA.titulo;
    
    if(document.getElementById('link-yt')) document.getElementById('link-yt').href = CONFIG.youtube;
    if(document.getElementById('link-web')) document.getElementById('link-web').href = CONFIG.sitioWeb;
    if(document.getElementById('link-wa')) document.getElementById('link-wa').href = `https://wa.me/${CONFIG.whatsapp}`;
    
    // WHATSAPP DIRECTO EN EL MODAL DE CONTACTO
    if(document.getElementById('link-wa-direct')) {
        document.getElementById('link-wa-direct').href = `https://wa.me/${CONFIG.whatsapp}`;
    }

    // GENERACIÓN DEL QR HACIA EL SITIO DE MORENA
    const qrImg = document.getElementById('qr-code-img');
    if(qrImg) {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(CONFIG.mapa)}&color=691310`;
    }

    renderInteractiveGrid('grid-fotos-cliente', JUEGOS_DATA);
    renderInteractiveGrid('grid-reconocimientos', VIDEOS_DATA);
    renderInteractiveGrid('grid-clientes-fotos', OTROS_DATA);
});

function tryLoadAnyExt(baseName, callback) {
    let extIdx = 0;
    const tryNext = () => {
        if (extIdx >= CONFIG.allowedExt.length) {
            callback('assets/imagenes/logo.png');
            return;
        }
        const path = `assets/imagenes/${baseName}${CONFIG.allowedExt[extIdx]}`;
        const img = new Image();
        img.onload = () => callback(path);
        img.onerror = () => { extIdx++; tryNext(); };
        img.src = path;
    };
    tryNext();
}

function renderInteractiveGrid(containerId, dataArray) {
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = '';
    dataArray.forEach(item => {
        const div = document.createElement('div');
        div.className = 'premium-photo-item';
        const imgElement = document.createElement('img');
        tryLoadAnyExt(item.img, (src) => { imgElement.src = src; });
        div.appendChild(imgElement);
        div.onclick = () => { playClick(); window.open(item.link, '_blank'); };
        container.appendChild(div);
    });
}

function showAppContent(type) {
    playClick();
    const layer = document.getElementById('dynamic-content-layer');
    if(layer) {
        layer.style.display = 'flex';
        document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
        const target = document.getElementById(type + '-pane');
        if(target) target.style.display = 'flex';
    }
}

function closeAppContent() { 
    playClick(); 
    const layer = document.getElementById('dynamic-content-layer');
    if(layer) layer.style.display = 'none'; 
}

function openMarketing() { 
    playClick(); 
    const modal = document.getElementById('marketing-modal');
    if(modal) modal.style.display = 'flex'; 
}

function closeMarketing() { 
    const modal = document.getElementById('marketing-modal');
    if(modal) modal.style.display = 'none'; 
}

function playClick() { 
    const snd = document.getElementById('sndFxClick'); 
    if (snd) { snd.currentTime = 0; snd.play().catch(()=>{}); } 
}

async function shareExperienceRobust() { 
    playClick(); 
    try { 
        await navigator.share({
            title: 'IA PARA NIÑOS | MORENA AGUASCALIENTES', 
            text: 'Innovación tecnológica para Aguascalientes',
            url: window.location.href
        }); 
    } 
    catch(e) { 
        navigator.clipboard.writeText(window.location.href);
        alert("¡Enlace copiado al portapapeles!"); 
    } 
}