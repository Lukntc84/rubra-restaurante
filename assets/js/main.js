/* Rubra · Brasa e Vinho
   Projeto fictício de portfólio · Design e código por Luccas Santana */
(function () {
  'use strict';

  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const WA = '5500900000000';
  const waLink = (msg) => 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
  const pic = (p) => 'assets/' + p;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const blank = { data: '', hora: '', pessoas: '2', nome: '', tel: '', obs: '' };

  const menu = [
      [
        { tag: 'Para dividir', name: 'Picanha na brasa', desc: 'Selada na lenha, fatiada na mesa, com farofa de alho.', price: 'R$ 98', img: 'img/picanha.webp' },
        { tag: 'Cozida devagar', name: 'Costela 12 horas', desc: 'Na brasa baixa desde a madrugada, com mandioca cremosa.', price: 'R$ 89', img: 'img/costela.webp' },
        { tag: 'Corte da casa', name: 'Ancho com chimichurri', desc: 'Bife de 400 g, chimichurri feito aqui e batatas.', price: 'R$ 112', img: 'img/ancho.webp' },
        { tag: 'Feita aqui', name: 'Linguiça artesanal', desc: 'Pernil com ervas, defumada na lenha. Serve duas pessoas.', price: 'R$ 46', img: 'img/linguica.webp' },
        { tag: 'Do mar', name: 'Polvo na lenha', desc: 'Com batata ao murro, páprica defumada e azeite.', price: 'R$ 124', img: 'img/polvo.webp' },
        { tag: 'Corte do açougueiro', name: 'Fraldinha na manteiga', desc: 'Fatiada fina, com manteiga de ervas e vinagrete.', price: 'R$ 86', img: 'img/fraldinha.webp' },
        { tag: 'Marinado 24h', name: 'Galeto na brasa', desc: 'Coxas e sobrecoxas no alho e limão, com farofa.', price: 'R$ 64', img: 'img/galeto.webp' },
        { tag: 'Para dois', name: 'Carré de cordeiro', desc: 'Costeletas seladas na lenha, batatas e hortelã.', price: 'R$ 132', img: 'img/cordeiro.webp' }
      ],
      [
        { tag: 'Clássico', name: 'Queijo coalho na brasa', desc: 'Tostado na chapa, com melaço de cana e orégano.', price: 'R$ 42', img: 'img/provoleta.webp' },
        { tag: 'Saindo do forno', name: 'Pão de alho da casa', desc: 'Fermentação natural com manteiga de alho assado.', price: 'R$ 28', img: 'img/pao-de-alho.webp' },
        { tag: 'No espeto', name: 'Coração na brasa', desc: 'Marinado no limão-cravo, com farofa crocante.', price: 'R$ 36', img: 'img/coracao.webp' },
        { tag: 'Da horta', name: 'Burrata e tomate tostado', desc: 'Tomates tostados na lenha e manjericão.', price: 'R$ 58', img: 'img/burrata.webp' },
        { tag: 'Crocante', name: 'Mandioca frita', desc: 'Palitos de mandioca com maionese de alho assado.', price: 'R$ 32', img: 'img/mandioca.webp' },
        { tag: 'Da costela', name: 'Bolinho de costela', desc: 'Seis unidades recheadas com a costela de 12 horas.', price: 'R$ 44', img: 'img/bolinho.webp' },
        { tag: 'Fresco', name: 'Carpaccio da casa', desc: 'Lâminas de filé, rúcula, parmesão e alcaparras.', price: 'R$ 52', img: 'img/carpaccio.webp' }
      ],
      [
        { tag: 'Da vó', name: 'Pudim de doce de leite', desc: 'Com calda queimada no maçarico.', price: 'R$ 29', img: 'img/pudim.webp' },
        { tag: 'Na brasa', name: 'Abacaxi com sorvete', desc: 'Caramelizado na lenha, canela e sorvete de creme.', price: 'R$ 32', img: 'img/abacaxi.webp' },
        { tag: 'Para dividir', name: 'Banana na lenha', desc: 'Banana-da-terra assada, doce de leite e castanha.', price: 'R$ 30', img: 'img/banana.webp' },
        { tag: 'Quentinho', name: 'Petit gâteau', desc: 'Bolo de chocolate com recheio cremoso e sorvete.', price: 'R$ 34', img: 'img/petit-gateau.webp' },
        { tag: 'Com goiabada', name: 'Cheesecake de goiaba', desc: 'Base de biscoito e calda de goiabada cascão.', price: 'R$ 31', img: 'img/cheesecake.webp' },
        { tag: 'Para dividir', name: 'Churros da casa', desc: 'Seis churros com açúcar, canela e doce de leite.', price: 'R$ 28', img: 'img/churros.webp' }
      ],
      [
        { tag: 'Assinatura', name: 'Negroni de cumaru', desc: 'Gim, vermute e bitter com cumaru tostado.', price: 'R$ 42', img: 'img/negroni.webp' },
        { tag: 'Brasileira', name: 'Caipirinha de limão-cravo', desc: 'Cachaça envelhecida e açúcar mascavo.', price: 'R$ 34', img: 'img/caipirinha.webp' },
        { tag: 'Sem álcool', name: 'Soda de hibisco', desc: 'Hibisco, gengibre e limão com água com gás.', price: 'R$ 18', img: 'img/soda.webp' },
        { tag: 'Clássico', name: 'Gin tônica', desc: 'Gim, tônica, limão-siciliano e zimbro.', price: 'R$ 36', img: 'img/gin-tonica.webp' },
        { tag: 'Gelado', name: 'Chope da casa', desc: 'Pilsen artesanal, 400 ml, servido bem gelado.', price: 'R$ 16', img: 'img/chopp.webp' },
        { tag: 'Sem álcool', name: 'Limonada suíça', desc: 'Limão batido com gelo, hortelã e açúcar.', price: 'R$ 14', img: 'img/limonada.webp' }
      ],
      [
        { tag: 'Taça R$ 38', name: 'Malbec da casa', desc: 'Argentino e encorpado, escolhido para os cortes da brasa.', price: 'R$ 168', img: 'img/malbec.webp' },
        { tag: 'Chile', name: 'Cabernet Sauvignon', desc: 'Vale do Maipo. Fruta escura e um toque de pimenta.', price: 'R$ 189', img: 'img/vinho-cabernet.webp' },
        { tag: 'Uruguai', name: 'Tannat reserva', desc: 'Taninos firmes que pedem costela e cordeiro.', price: 'R$ 214', img: 'img/vinho-tannat.webp' },
        { tag: 'Serra Gaúcha', name: 'Sauvignon Blanc', desc: 'Fresco e cítrico, vai bem com polvo e carpaccio.', price: 'R$ 142', img: 'img/vinho-branco.webp' },
        { tag: 'Provence', name: 'Rosé seco', desc: 'Leve e mineral, feito para o almoço de domingo.', price: 'R$ 158', img: 'img/vinho-rose.webp' },
        { tag: 'Para brindar', name: 'Espumante brut', desc: 'Método tradicional, da Serra Gaúcha.', price: 'R$ 129', img: 'img/espumante.webp' }
      ]
    ];
  const expData = [
      { label: 'Almoço de domingo', kicker: 'Toda semana', head: 'Almoço de domingo', items: [
        { tag: 'Rodízio', title: 'Rodízio da brasa', meta: 'Domingo · 12h às 17h · R$ 149 por pessoa', img: 'img/exp-tabua.webp', blob: 'blob-c', ratio: '1.35/1', w: '340px', k: '-1' },
        { tag: 'Para grupos', title: 'Mesa da família', meta: 'Até 12 pessoas · combine pelo WhatsApp', img: 'img/exp-mesa.webp', blob: 'blob-a', ratio: '1.35/1', w: '400px', k: '1' }
      ] },
      { label: 'Happy hour', kicker: 'Terça a sexta', head: 'Happy hour na brasa', items: [
        { tag: 'Das 17h às 19h', title: 'Petiscos na lenha', meta: 'Coalho, espetinhos e pão de alho', img: 'img/exp-petiscos.webp', blob: 'blob-b', ratio: '1.35/1', w: '340px', k: '-1' },
        { tag: 'Em dobro', title: 'Drinks em dobro', meta: 'Negroni, caipirinha e chope da casa', img: 'img/exp-drinks.webp', blob: 'blob-d', ratio: '1.35/1', w: '400px', k: '1' }
      ] },
      { label: 'Eventos', kicker: 'Salão reservado', head: 'Sua festa aqui', items: [
        { tag: 'Até 60 pessoas', title: 'Salão reservado', meta: 'Aniversários, confraternizações e jantares', img: 'img/exp-salao.webp', blob: 'blob-e', ratio: '1.35/1', w: '340px', k: '-1' },
        { tag: 'Sob medida', title: 'Menu com a chef', meta: 'Montado junto com você para a data', img: 'img/exp-chef.webp', blob: 'blob-c', ratio: '1.35/1', w: '400px', k: '1' }
      ] }
    ];
  const storyData = [
      { label: 'Fogo de lenha', title: 'Brasa baixa, sem chama alta.', text: 'Usamos eucalipto de reflorestamento. A brasa sela a carne sem pressa, do jeito que ela pede.', img: 'img/story-forno.webp', alt: 'Fogo aceso no forno a lenha' },
      { label: 'Carne de origem', title: 'Dois produtores, conhecidos pelo nome.', text: 'Compramos de fazendas do interior de São Paulo. Sabemos o pasto, o corte e o tempo de maturação de cada peça.', img: 'img/story-pecas.webp', alt: 'Peça de carne crua sobre a tábua' },
      { label: 'Feito na casa', title: 'Pão, linguiça e chimichurri saem da nossa cozinha.', text: 'As sobremesas também. Nada chega pronto de fora, e o cardápio muda um pouco a cada estação.', img: 'img/story-pao.webp', alt: 'Pães de fermentação natural' },
      { label: 'Nada se perde', title: 'Aparas viram caldo, o caldo vira molho.', text: 'E o calor que sobra da brasa assa o pão do dia seguinte.', img: 'img/story-caldo.webp', alt: 'Caldo fervendo na panela' }
    ];
  const fq = [
      { q: 'Precisa reservar?', a: 'No jantar e nos fins de semana, sim. No almoço de terça a sexta não tem reserva: a casa recebe por ordem de chegada.' },
      { q: 'Tem opção sem carne?', a: 'Tem. Burrata com tomate tostado, queijo coalho na brasa, mandioca frita e legumes na lenha. A cozinha também adapta as guarnições.' },
      { q: 'Posso levar meu vinho?', a: 'Pode, com taxa de rolha de R$ 40 por garrafa. Se preferir, a carta da casa tem seis rótulos, do espumante ao tannat.' },
      { q: 'Tem estacionamento?', a: 'Manobrista no jantar e convênio com o estacionamento ao lado no almoço.' },
      { q: 'Crianças e pets são bem-vindos?', a: 'Crianças sempre, e tem cadeirão. Pets ficam com você na varanda.' }
    ];

  const blobs = ['blob-a', 'blob-b', 'blob-c', 'blob-d', 'blob-e'];
  const tabNames = ['Brasa', 'Entradas', 'Sobremesas', 'Drinks', 'Vinhos'];
  const arrow = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"></path></svg>';

  /* ---------- entradas ao rolar ---------- */
  let io = null;
  const watch = (root) => {
    const els = $$('[data-rv]', root || document);
    if (reduce || !io) { els.forEach((el) => el.classList.add('in')); return; }
    els.forEach((el) => { if (!el.classList.contains('in')) io.observe(el); });
  };
  const replay = (els) => {
    if (reduce) return;
    els.forEach((el) => { el.style.transition = 'none'; el.classList.remove('in'); });
    void document.body.offsetWidth;
    els.forEach((el) => { el.style.transition = ''; });
    requestAnimationFrame(() => els.forEach((el) => el.classList.add('in')));
  };
  if (!reduce) {
    document.documentElement.classList.add('anim-on');
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px 8% 0px', threshold: 0 });
    }
  }

  /* ---------- vídeo do topo ---------- */
  const vid = $('#hero-vid');
  if (vid) {
    vid.muted = true;
    if (reduce) { vid.removeAttribute('autoplay'); vid.pause(); }
    else {
      const go = () => { if (!vid.paused) return; const p = vid.play(); if (p && p.catch) p.catch(() => {}); };
      go();
      vid.addEventListener('canplay', go);
      // Alguns navegadores só liberam o autoplay depois do primeiro gesto na página.
      ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach((ev) => window.addEventListener(ev, go, { once: true, passive: true }));
    }
  }

  /* ---------- cardápio ---------- */
  const tabsEl = $('#tabs');
  const car = $('#car');
  const dotsEl = $('#dots');
  const prev = $('#car-prev');
  const next = $('#car-next');
  let tab = 0;

  const renderTabs = () => {
    tabsEl.innerHTML = tabNames.map((label, i) =>
      '<button type="button" role="tab" class="tab" data-rv style="--d:' + (80 + i * 110) + 'ms" aria-selected="' + (tab === i) + '" data-i="' + i + '">' +
      esc(label) + ' <span class="badge">' + menu[i].length + '</span></button>').join('');
  };
  const renderDishes = () => {
    car.setAttribute('aria-label', 'Pratos: ' + tabNames[tab]);
    car.innerHTML = menu[tab].map((d, i) =>
      '<article class="dish">' +
        '<div class="shape ph ' + blobs[i % blobs.length] + '" style="animation-delay:' + (i * 110) + 'ms"><img class="fill" src="' + pic(d.img) + '" alt="' + esc(d.name) + '" loading="lazy" decoding="async"></div>' +
        '<div class="meta" style="display:flex;flex-direction:column;align-items:center;gap:10px;animation-delay:' + (i * 110 + 220) + 'ms">' +
          '<span class="ui tagp">' + esc(d.tag) + '</span>' +
          '<h3 class="disp" style="font-size:26px;line-height:.95;color:#ffffff">' + esc(d.name) + '</h3>' +
          '<p style="margin:0;font-size:14px;line-height:1.45;color:#ffc7c6;max-width:30ch">' + esc(d.desc) + '</p>' +
          '<div style="display:flex;align-items:center;gap:12px">' +
            '<a href="' + waLink('Olá! Quero pedir: ' + d.name + '.') + '" target="_blank" rel="noopener" class="btn btn-red btn-sm">Pedir ' + arrow + '</a>' +
            '<span class="disp" style="font-size:22px;line-height:1;color:#ffffff">' + esc(d.price) + '</span>' +
          '</div>' +
        '</div>' +
      '</article>').join('');
    dotsEl.innerHTML = menu[tab].map((_, i) => '<span class="dot" data-on="' + (i === 0) + '"></span>').join('');
    car.scrollLeft = 0;
    syncCar();
  };
  const step = () => { const it = $('.dish', car); return it ? it.getBoundingClientRect().width + 28 : 300; };
  const page = () => { const s = step(); return Math.max(s, Math.floor(car.clientWidth / s) * s); };
  const syncCar = () => {
    const max = car.scrollWidth - car.clientWidth;
    const atStart = car.scrollLeft < 4;
    const atEnd = car.scrollLeft > max - 4;
    const n = menu[tab].length;
    const i = atEnd ? n - 1 : Math.round(car.scrollLeft / step());
    $$('.dot', dotsEl).forEach((d, k) => d.setAttribute('data-on', String(k === i)));
    prev.disabled = atStart;
    next.disabled = atEnd;
  };
  tabsEl.addEventListener('click', (e) => {
    const b = e.target.closest('.tab');
    if (!b) return;
    tab = Number(b.dataset.i);
    $$('.tab', tabsEl).forEach((t, k) => t.setAttribute('aria-selected', String(k === tab)));
    renderDishes();
  });
  prev.addEventListener('click', () => car.scrollBy({ left: -page(), behavior: 'smooth' }));
  next.addEventListener('click', () => car.scrollBy({ left: page(), behavior: 'smooth' }));
  car.addEventListener('scroll', syncCar, { passive: true });
  window.addEventListener('resize', syncCar, { passive: true });
  let drag = null;
  car.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.target.closest('a,button')) return;
    drag = { x: e.clientX, s: car.scrollLeft };
    car.classList.add('dragging');
    car.setPointerCapture(e.pointerId);
  });
  car.addEventListener('pointermove', (e) => { if (drag) car.scrollLeft = drag.s - (e.clientX - drag.x); });
  const endDrag = () => { drag = null; car.classList.remove('dragging'); };
  car.addEventListener('pointerup', endDrag);
  car.addEventListener('pointercancel', endDrag);

  /* ---------- experiências ---------- */
  const nextDow = (dow) => { const d = new Date(); d.setDate(d.getDate() + ((dow - d.getDay() + 7) % 7 || 7)); return iso(d); };
  const iso = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const bookPrefill = [{ dow: 0, hora: '12:00' }, { dow: 5, hora: '19:00' }, {}];
  let exp = 0;
  const pillsEl = $('#exp-pills');
  const itemsEl = $('#exp-items');
  const renderExp = (animate) => {
    const x = expData[exp];
    pillsEl.innerHTML = expData.map((e, i) => '<button type="button" class="pill" aria-pressed="' + (i === exp) + '" data-i="' + i + '">' + esc(e.label) + '</button>').join('');
    $('#exp-kicker').textContent = x.kicker;
    $('#exp-head').textContent = x.head;
    itemsEl.innerHTML = x.items.map((it, n) =>
      '<div style="flex:1 1 260px;max-width:' + it.w + ';display:flex;flex-direction:column;align-items:center;gap:8px">' +
        '<div class="gimg" data-rv style="width:100%;--d:' + (n * 150) + 'ms;--r:' + (parseFloat(it.k) * 9) + 'deg"><div class="ph ' + it.blob + '" style="width:100%;aspect-ratio:' + it.ratio + '"><img class="fill" src="' + pic(it.img) + '" alt="' + esc(it.title) + '" loading="lazy" decoding="async"></div></div>' +
        '<span class="ui tagp" data-rv>' + esc(it.tag) + '</span>' +
        '<h3 class="disp" data-rv style="--d:80ms;font-size:clamp(24px,2.2vw,30px);line-height:.95;color:#ffffff">' + esc(it.title) + '</h3>' +
        '<span data-rv style="--d:140ms;font-size:13px;color:#ffc7c6">' + esc(it.meta) + '</span>' +
        '<a href="#reservas" class="btn btn-red btn-sm" data-rv data-book="' + n + '" style="--d:200ms">Reservar</a>' +
      '</div>').join('');
    if (animate) replay($$('[data-rv]', itemsEl).concat([$('#exp-kicker'), $('#exp-head').parentElement]));
    else watch(itemsEl);
  };
  pillsEl.addEventListener('click', (e) => {
    const b = e.target.closest('.pill');
    if (!b) return;
    exp = Number(b.dataset.i);
    renderExp(true);
  });
  itemsEl.addEventListener('click', (e) => {
    const a = e.target.closest('[data-book]');
    if (!a) return;
    const it = expData[exp].items[Number(a.dataset.book)];
    const pre = bookPrefill[exp];
    resetForm();
    if (pre.dow !== undefined) { setVal('data', nextDow(pre.dow)); fillSlots(); setVal('hora', pre.hora); }
    setVal('obs', it.title);
  });

  /* ---------- a casa ---------- */
  let story = 0;
  const storyTabs = $('#story-tabs');
  const renderStory = () => {
    storyTabs.innerHTML = storyData.map((s, i) =>
      '<button type="button" role="tab" class="spill" aria-selected="' + (i === story) + '" data-i="' + i + '">' + esc(s.label) + ' ' + arrow.replace('width="10" height="10"', 'width="12" height="12"') + '</button>').join('');
    const s = storyData[story];
    $('#story-title').textContent = s.title;
    $('#story-text').textContent = s.text;
    const img = $('#story-img');
    img.src = pic(s.img);
    img.alt = s.alt;
    const body = $('#story-body');
    body.classList.remove('fade-in'); void body.offsetWidth; body.classList.add('fade-in');
  };
  storyTabs.addEventListener('click', (e) => {
    const b = e.target.closest('.spill');
    if (!b) return;
    story = Number(b.dataset.i);
    renderStory();
  });

  /* ---------- dúvidas ---------- */
  let open = 0;
  const faqsEl = $('#faqs');
  const renderFaqs = () => {
    faqsEl.innerHTML = fq.map((f, i) =>
      '<div data-rv style="--d:' + (i * 120) + 'ms">' +
        '<h3 style="margin:0"><button type="button" class="faq-q" aria-expanded="' + (open === i) + '" aria-controls="faq-' + i + '" data-i="' + i + '">' + esc(f.q) +
        '<svg class="faq-ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg></button></h3>' +
        '<div id="faq-' + i + '" class="fade-in" style="padding:12px 18px 6px"' + (open === i ? '' : ' hidden') + '><p style="margin:0;font-size:15px;line-height:1.55;color:#ffc7c6">' + esc(f.a) + '</p></div>' +
      '</div>').join('');
  };
  faqsEl.addEventListener('click', (e) => {
    const b = e.target.closest('.faq-q');
    if (!b) return;
    const i = Number(b.dataset.i);
    open = open === i ? null : i;
    $$('.faq-q', faqsEl).forEach((q, k) => {
      q.setAttribute('aria-expanded', String(open === k));
      $('#faq-' + k).hidden = open !== k;
    });
  });

  /* ---------- reserva ---------- */
  const form = $('#res-form');
  const F = (k) => $('#r-' + k);
  const setVal = (k, v) => { F(k).value = v; };
  const today = iso(new Date());
  F('data').min = today;
  const dowOf = (s) => (s ? new Date(s + 'T12:00:00').getDay() : -1);
  const slotsFor = (s) => {
    const d = dowOf(s);
    if (d === 1) return [];
    if (d >= 2 && d <= 5) return ['19:00', '20:00', '21:00', '22:00'];
    return ['12:00', '13:00', '14:00', '15:00', '19:00', '20:00', '21:00'];
  };
  const fillSlots = () => {
    const sel = F('hora');
    const cur = sel.value;
    const v = F('data').value;
    const slots = slotsFor(v);
    const ph = !v ? 'Escolha o dia' : (slots.length ? 'Escolha' : 'Fechado');
    sel.innerHTML = '<option value="">' + ph + '</option>' + slots.map((h) => '<option value="' + h + '">' + h + '</option>').join('');
    if (slots.indexOf(cur) >= 0) sel.value = cur;
  };
  const showErr = (id, msg) => { const el = $('#' + id); el.textContent = msg || ''; el.hidden = !msg; };
  const setInvalid = (k, bad, descId) => {
    F(k).setAttribute('aria-invalid', String(!!bad));
    if (bad) F(k).setAttribute('aria-describedby', descId); else F(k).removeAttribute('aria-describedby');
  };
  const clearErrs = () => {
    ['data', 'hora', 'nome', 'tel'].forEach((k) => setInvalid(k, false));
    showErr('e-dh'); showErr('e-nome'); showErr('e-tel');
    $('#hint-dias').hidden = false;
  };
  const maskTel = (v) => {
    let d = String(v).replace(/\D/g, '');
    if (d.length > 11 && d.indexOf('55') === 0) d = d.slice(2);
    d = d.slice(0, 11);
    if (!d.length) return '';
    if (d.length <= 2) return '(' + d;
    if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
  };
  let prevTel = '';
  F('tel').addEventListener('input', (e) => {
    let raw = e.target.value;
    if (raw.length < prevTel.length && maskTel(raw) === prevTel) raw = prevTel.replace(/\D/g, '').slice(0, -1);
    prevTel = maskTel(raw);
    e.target.value = prevTel;
    setInvalid('tel', false); showErr('e-tel');
  });
  F('nome').addEventListener('input', () => { setInvalid('nome', false); showErr('e-nome'); });
  F('data').addEventListener('change', () => { fillSlots(); setInvalid('data', false); setInvalid('hora', false); showErr('e-dh'); $('#hint-dias').hidden = false; });
  F('hora').addEventListener('change', () => { setInvalid('hora', false); showErr('e-dh'); $('#hint-dias').hidden = false; });
  F('pessoas').addEventListener('change', () => {
    const mais = F('pessoas').value === 'mais';
    $('#e-pessoas').hidden = !mais;
    $('#hint-dias').hidden = mais;
  });
  const resetForm = () => {
    form.reset();
    prevTel = '';
    F('pessoas').value = '2';
    fillSlots();
    clearErrs();
    $('#e-pessoas').hidden = true;
    $('#res-done').hidden = true;
    form.hidden = false;
  };
  $('#res-again').addEventListener('click', () => { resetForm(); F('data').focus(); });
  let sending = false;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (sending) return;
    clearErrs();
    const f = {};
    ['data', 'hora', 'pessoas', 'nome', 'tel', 'obs'].forEach((k) => { f[k] = F(k).value; });
    const er = {};
    let dh = '';
    if (!f.data || !f.hora) { if (!f.data) er.data = 1; if (!f.hora) er.hora = 1; dh = 'Escolha a data e o horário da reserva.'; }
    if (f.data && f.data < today) { er.data = 1; dh = 'Escolha uma data a partir de hoje.'; }
    else if (f.data && dowOf(f.data) === 1) { er.data = 1; dh = 'Segunda a casa fecha. Escolha outro dia.'; }
    if (f.pessoas === 'mais') er.pessoas = 1;
    if (f.nome.trim().length < 2) er.nome = 'Diga o nome para a reserva.';
    if (f.tel.replace(/\D/g, '').length < 10) er.tel = 'Informe um WhatsApp com DDD.';
    if (Object.keys(er).length) {
      if (dh) { showErr('e-dh', dh); $('#hint-dias').hidden = true; }
      if (er.data) setInvalid('data', true, 'e-dh');
      if (er.hora) setInvalid('hora', true, 'e-dh');
      if (er.nome) { setInvalid('nome', true, 'e-nome'); showErr('e-nome', er.nome); }
      if (er.tel) { setInvalid('tel', true, 'e-tel'); showErr('e-tel', er.tel); }
      const first = ['data', 'hora', 'pessoas', 'nome', 'tel'].find((k) => er[k]);
      F(first).focus();
      return;
    }
    sending = true;
    $('#res-send').disabled = true;
    $('#res-send-label').textContent = 'Enviando…';
    setTimeout(() => {
      sending = false;
      $('#res-send').disabled = false;
      $('#res-send-label').textContent = 'Confirmar reserva';
      const first = f.nome.trim().split(/\s+/)[0];
      const p = f.data.split('-');
      $('#done-title').textContent = first ? 'Mesa pedida, ' + first + '!' : 'Mesa pedida!';
      $('#done-text').textContent = 'Reserva para ' + f.pessoas + (f.pessoas === '1' ? ' pessoa' : ' pessoas') + ' em ' + p[2] + '/' + p[1] + ', às ' + f.hora +
        (f.obs ? ' (' + f.obs + ')' : '') + '. A confirmação chega no WhatsApp ' + f.tel + ' em até uma hora.';
      form.hidden = true;
      $('#res-done').hidden = false;
      $('#done-title').focus();
    }, 1200);
  });

  /* ---------- newsletter ---------- */
  const news = $('#news-form');
  news.addEventListener('submit', (e) => {
    e.preventDefault();
    const el = $('#news');
    const v = el.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      showErr('e-news', v ? 'Esse e-mail parece incompleto. Confira e tente de novo.' : 'Digite seu e-mail para receber.');
      el.setAttribute('aria-invalid', 'true');
      el.setAttribute('aria-describedby', 'e-news');
      el.focus();
      return;
    }
    showErr('e-news');
    news.hidden = true;
    $('#news-done').hidden = false;
  });

  /* ---------- menu do celular ---------- */
  const burger = $('#burger');
  const menuEl = $('#menu-movel');
  const openMenu = () => {
    menuEl.hidden = false;
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-controls', 'menu-movel');
    document.documentElement.style.overflow = 'hidden';
    $('#menu-close').focus();
  };
  const closeMenu = (refocus) => {
    menuEl.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    if (refocus !== false) burger.focus({ preventScroll: true });
  };
  burger.addEventListener('click', openMenu);
  $('#menu-close').addEventListener('click', () => closeMenu());
  $$('.menu-link', menuEl).forEach((a) => a.addEventListener('click', () => closeMenu(false)));
  menuEl.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); closeMenu(); return; }
    if (e.key !== 'Tab') return;
    const f = $$('a[href], button', menuEl);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- movimento ligado à rolagem ---------- */
  const hero = $('#hero');
  const totop = $('#totop');
  const clamp = (v) => Math.max(0, Math.min(1, v));
  const scatter = $$('[data-sc="scatter"]');
  const drop = $$('[data-sc="drop"]');
  const pop = $$('[data-sc="pop"]');
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight || 800;
    const hr = hero.getBoundingClientRect();
    totop.hidden = !(hr.bottom < vh * 0.3);
    if (reduce) return;
    const p = clamp(-hr.top / (hr.height * 0.7));
    const cx = hr.left + hr.width / 2;
    const cy = hr.top + hr.height / 2;
    scatter.forEach((el) => {
      const k = parseFloat(el.dataset.k || '1');
      el.style.transform = '';
      const r = el.getBoundingClientRect();
      const vx = (r.left + r.width / 2) - cx;
      const vy = (r.top + r.height / 2) - cy;
      el.style.transform = 'translate(' + (vx * p * 0.9 * k).toFixed(1) + 'px,' + (vy * p * 0.5 * k - p * 120 * k).toFixed(1) + 'px) rotate(' + (p * 14 * (vx > 0 ? 1 : -1)).toFixed(2) + 'deg)';
      el.style.opacity = (1 - p * 0.35).toFixed(3);
    });
    drop.forEach((el) => {
      el.style.transform = 'translateY(' + (-p * 260).toFixed(1) + 'px) scale(' + (1 + p * 0.5).toFixed(3) + ') rotate(' + (-p * 20).toFixed(2) + 'deg)';
    });
    pop.forEach((el) => {
      const r = el.getBoundingClientRect();
      const q = clamp((vh - r.top) / (vh * 0.5));
      el.style.transform = 'translateY(' + ((1 - q) * 90).toFixed(1) + 'px) scale(' + (0.84 + 0.16 * q).toFixed(3) + ')';
    });
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /* ---------- início ---------- */
  renderTabs();
  renderDishes();
  renderExp(false);
  renderStory();
  renderFaqs();
  fillSlots();
  watch(document);
  update();
})();
