// Person tabs: #thanachai / #khunanon, synced with the URL hash
const panels = [...document.querySelectorAll('.panel')];
const tabs = [...document.querySelectorAll('.tab')];
const cta = document.getElementById('nav-cta');
const ctaTarget = { thanachai: '#thanachai-certs', khunanon: '#khunanon-work' };

function show(id, animate) {
  if (!ctaTarget[id]) id = 'thanachai';
  panels.forEach((p) => {
    p.hidden = p.id !== id;
    p.classList.toggle('enter', animate && p.id === id);
  });
  tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === id)));
  cta.href = ctaTarget[id];
}

function fromHash(animate) {
  const hash = location.hash.slice(1);
  // a section anchor (e.g. #khunanon-work) belongs to the panel that contains it
  const owner = document.getElementById(hash)?.closest('.panel');
  show(owner ? owner.id : 'thanachai', animate);
}

tabs.forEach((t) => t.addEventListener('click', (e) => {
  e.preventDefault();
  history.pushState(null, '', '#' + t.dataset.tab);
  show(t.dataset.tab, true);
  window.scrollTo({ top: 0 });
}));
window.addEventListener('hashchange', () => fromHash(true));
fromHash(false);

// Image viewer for certificates and activity photos
const viewer = document.getElementById('viewer');
const body = viewer.querySelector('.viewer-body');
const caption = viewer.querySelector('.viewer-caption');

document.querySelectorAll('.tile').forEach((tile) => tile.addEventListener('click', () => {
  const img = tile.querySelector('.crop').cloneNode(true);
  img.classList.remove('frame');
  img.setAttribute('role', 'img');
  img.setAttribute('aria-label', tile.dataset.caption);
  body.replaceChildren(img);
  caption.textContent = tile.dataset.caption;
  viewer.showModal();
}));
viewer.querySelector('[data-close]').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', (e) => { if (e.target === viewer) viewer.close(); });
