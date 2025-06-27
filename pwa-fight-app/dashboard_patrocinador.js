// Navegação entre abas
const sidebarLinks = document.querySelectorAll('.sidebar nav ul li');
const sections = document.querySelectorAll('.dashboard-section');

sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebarLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    sections.forEach(sec => sec.style.display = 'none');
    const sectionId = 'section-' + link.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    if (section) section.style.display = 'block';
    if (link.getAttribute('data-section') === 'sair') {
      localStorage.removeItem('userType');
      window.location.href = 'index.html';
    }
  });
});

// Perfil - salvar e exibir dados
const nomeEl = document.getElementById('perfil-nome');
const bioEl = document.getElementById('perfil-bio');
const segmentoEl = document.getElementById('perfil-segmento');
const fotoEl = document.getElementById('foto-perfil');
const btnFoto = document.getElementById('btn-foto');
const inputFoto = document.getElementById('input-foto');
const btnSalvar = document.getElementById('salvar-perfil');

function carregarPerfil() {
  const perfil = JSON.parse(localStorage.getItem('perfilPatrocinador') || '{}');
  if (perfil.nome) nomeEl.textContent = perfil.nome;
  if (perfil.bio) bioEl.value = perfil.bio;
  if (perfil.segmento) segmentoEl.value = perfil.segmento;
  if (perfil.foto) fotoEl.src = perfil.foto;
}
carregarPerfil();

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

btnSalvar.addEventListener('click', () => {
  const perfil = {
    nome: nomeEl.textContent,
    bio: bioEl.value,
    segmento: segmentoEl.value,
    foto: fotoEl.src
  };
  localStorage.setItem('perfilPatrocinador', JSON.stringify(perfil));
  alert('Perfil salvo!');
});

nomeEl.addEventListener('click', () => {
  const novoNome = prompt('Digite o nome da marca:', nomeEl.textContent);
  if (novoNome) {
    nomeEl.textContent = novoNome;
  }
}); 