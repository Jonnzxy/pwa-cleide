// Navegação entre abas
const sidebarLinks = document.querySelectorAll('.sidebar nav ul li');
const sections = document.querySelectorAll('.dashboard-section');

sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Remove active de todos
    sidebarLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    // Esconde todas as seções
    sections.forEach(sec => sec.style.display = 'none');
    // Mostra a seção correspondente
    const sectionId = 'section-' + link.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    if (section) section.style.display = 'block';
    // Logout
    if (link.getAttribute('data-section') === 'sair') {
      localStorage.removeItem('userType');
      window.location.href = 'index.html';
    }
  });
});

// Exibir nome do lutador no header
const userNameEls = document.querySelectorAll('.user-name');
const nomeLutador = localStorage.getItem('nomeLutador') || 'Lutador';
userNameEls.forEach(el => el.textContent = nomeLutador);

// Perfil - salvar e exibir dados
const nomeEl = document.getElementById('perfil-nome');
const bioEl = document.getElementById('perfil-bio');
const arteEl = document.getElementById('perfil-arte');
const fotoEl = document.getElementById('foto-perfil');
const btnFoto = document.getElementById('btn-foto');
const inputFoto = document.getElementById('input-foto');
const btnSalvar = document.getElementById('salvar-perfil');

// Carregar perfil salvo
function carregarPerfil() {
  const perfil = JSON.parse(localStorage.getItem('perfilLutador') || '{}');
  nomeEl.textContent = nomeLutador;
  if (perfil.bio) bioEl.value = perfil.bio;
  if (perfil.arte) arteEl.value = perfil.arte;
  if (perfil.foto) fotoEl.src = perfil.foto;
}
carregarPerfil();

// Alterar foto
btnFoto.addEventListener('click', () => {
  inputFoto.click();
});
inputFoto.addEventListener('change', e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      fotoEl.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Salvar perfil
btnSalvar.addEventListener('click', () => {
  const perfil = {
    nome: nomeEl.textContent,
    bio: bioEl.value,
    arte: arteEl.value,
    foto: fotoEl.src
  };
  localStorage.setItem('perfilLutador', JSON.stringify(perfil));
  alert('Perfil salvo!');
});

// Permitir editar nome ao clicar
nomeEl.addEventListener('click', () => {
  const novoNome = prompt('Digite seu nome:', nomeEl.textContent);
  if (novoNome) {
    nomeEl.textContent = novoNome;
  }
});

// Filtro de academias na aba global
const barraPesquisaGlobal = document.getElementById('pesquisa-academia-global');
const academiasList = document.querySelector('.academias-list');
if (barraPesquisaGlobal && academiasList) {
  barraPesquisaGlobal.addEventListener('input', function() {
    const termo = barraPesquisaGlobal.value.toLowerCase();
    const cards = academiasList.querySelectorAll('.academia-card');
    cards.forEach(card => {
      const nome = card.querySelector('span').textContent.toLowerCase();
      if (nome.includes(termo)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
} 