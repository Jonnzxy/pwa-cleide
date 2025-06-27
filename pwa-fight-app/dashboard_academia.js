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
const arteEl = document.getElementById('perfil-arte');
const fotoEl = document.getElementById('foto-perfil');
const btnFoto = document.getElementById('btn-foto');
const inputFoto = document.getElementById('input-foto');
const btnSalvar = document.getElementById('salvar-perfil');

function carregarPerfil() {
  const perfil = JSON.parse(localStorage.getItem('perfilAcademia') || '{}');
  if (perfil.nome) nomeEl.textContent = perfil.nome;
  if (perfil.bio) bioEl.value = perfil.bio;
  if (perfil.arte) arteEl.value = perfil.arte;
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
    arte: arteEl.value,
    foto: fotoEl.src
  };
  localStorage.setItem('perfilAcademia', JSON.stringify(perfil));
  alert('Perfil salvo!');
});

nomeEl.addEventListener('click', () => {
  const novoNome = prompt('Digite o nome da academia:', nomeEl.textContent);
  if (novoNome) {
    nomeEl.textContent = novoNome;
  }
});

// Filtro de academias na barra de pesquisa dos alunos
const barraPesquisa = document.getElementById('pesquisa-academia');
const alunosList = document.querySelector('.alunos-list');
barraPesquisa.addEventListener('input', function() {
  const termo = barraPesquisa.value.toLowerCase();
  const cards = alunosList.querySelectorAll('.aluno-card');
  cards.forEach(card => {
    const nome = card.querySelector('span').textContent.toLowerCase();
    if (nome.includes(termo)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
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

// Produtos - adicionar e exibir
const btnAddProduto = document.getElementById('btn-add-produto');
const formProduto = document.getElementById('form-produto');
const produtosList = document.getElementById('produtos-list');

btnAddProduto.addEventListener('click', () => {
  formProduto.style.display = formProduto.style.display === 'none' ? 'block' : 'none';
});

function renderProdutos() {
  const produtos = JSON.parse(localStorage.getItem('produtosAcademia') || '[]');
  produtosList.innerHTML = '';
  produtos.forEach(prod => {
    const div = document.createElement('div');
    div.className = 'produto-card';
    div.innerHTML = `
      <img src="${prod.img}" alt="${prod.nome}" />
      <span>${prod.nome}</span>
      <span style="color:#fff;font-size:0.95rem;">${prod.desc}</span>
      <span style="color:#ffb300;font-weight:700;">R$ ${prod.preco}</span>
      <button disabled>Comprar</button>
    `;
    produtosList.appendChild(div);
  });
}
renderProdutos();

formProduto.addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('produto-nome').value;
  const desc = document.getElementById('produto-desc').value;
  const preco = document.getElementById('produto-preco').value;
  const imgInput = document.getElementById('produto-img');
  const produtos = JSON.parse(localStorage.getItem('produtosAcademia') || '[]');
  if (imgInput.files && imgInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      produtos.push({ nome, desc, preco, img: evt.target.result });
      localStorage.setItem('produtosAcademia', JSON.stringify(produtos));
      renderProdutos();
      formProduto.reset();
      formProduto.style.display = 'none';
    };
    reader.readAsDataURL(imgInput.files[0]);
  } else {
    produtos.push({ nome, desc, preco, img: 'imagens/kimono.png' });
    localStorage.setItem('produtosAcademia', JSON.stringify(produtos));
    renderProdutos();
    formProduto.reset();
    formProduto.style.display = 'none';
  }
}); 