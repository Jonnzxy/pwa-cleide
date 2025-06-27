// Alternância de abas
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const registerType = document.getElementById('register-type');
const registerFields = document.getElementById('register-fields');

// Função para aplicar máscara de CPF
function maskCPF(input) {
  input.addEventListener('input', function() {
    let v = input.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = v;
  });
}

// Função para aplicar máscara de CNPJ
function maskCNPJ(input) {
  input.addEventListener('input', function() {
    let v = input.value.replace(/\D/g, '');
    if (v.length > 14) v = v.slice(0, 14);
    v = v.replace(/(\d{2})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1/$2');
    v = v.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    input.value = v;
  });
}

loginTab.onclick = () => {
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
  loginForm.style.display = '';
  registerForm.style.display = 'none';
};

registerTab.onclick = () => {
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
  loginForm.style.display = 'none';
  registerForm.style.display = '';
};

// Função para validar CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

// Função para validar CNPJ
function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, '');
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;
  let t = cnpj.length - 2, d = cnpj.substring(t), d1 = parseInt(d.charAt(0)), d2 = parseInt(d.charAt(1)), calc = x => {
    let n = 0, y = 0;
    for (let i = t; i > 0; i--) {
      n += cnpj.charAt(t - i) * ((x + i) % 8 + 2);
    }
    return n % 11 < 2 ? 0 : 11 - n % 11;
  };
  if (calc(0) !== d1) return false;
  if (calc(1) !== d2) return false;
  return true;
}

// Campos dinâmicos de registro
registerType.onchange = () => {
  const tipo = registerType.value;
  let html = '';
  if (tipo === 'lutador') {
    html += '<label for="register-nome">Nome completo</label>';
    html += '<input type="text" id="register-nome" required placeholder="Digite seu nome completo" />';
    html += '<label for="register-cpf">CPF</label>';
    html += '<input type="text" id="register-cpf" required maxlength="14" placeholder="000.000.000-00" pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" />';
    html += '<label for="register-email">E-mail</label>';
    html += '<input type="email" id="register-email" required placeholder="Digite seu e-mail" />';
    html += '<label for="register-password">Senha</label>';
    html += '<input type="password" id="register-password" required placeholder="Crie uma senha" />';
  } else if (tipo === 'academia' || tipo === 'patrocinador') {
    html += '<label for="register-nome">Nome da empresa</label>';
    html += '<input type="text" id="register-nome" required placeholder="Digite o nome da empresa" />';
    html += '<label for="register-cnpj">CNPJ</label>';
    html += '<input type="text" id="register-cnpj" required maxlength="18" placeholder="00.000.000/0000-00" pattern="\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}" />';
    html += '<label for="register-email">E-mail</label>';
    html += '<input type="email" id="register-email" required placeholder="Digite o e-mail" />';
    html += '<label for="register-password">Senha</label>';
    html += '<input type="password" id="register-password" required placeholder="Crie uma senha" />';
  }
  registerFields.innerHTML = html;
  if (tipo === 'lutador') {
    const cpfInput = document.getElementById('register-cpf');
    if (cpfInput) maskCPF(cpfInput);
  } else if (tipo === 'academia' || tipo === 'patrocinador') {
    const cnpjInput = document.getElementById('register-cnpj');
    if (cnpjInput) maskCNPJ(cnpjInput);
  }
};

// Validação do formulário de registro
registerForm.onsubmit = function(e) {
  e.preventDefault();
  const tipo = registerType.value;
  let valido = true;
  let nome = '';
  if (tipo === 'lutador') {
    nome = document.getElementById('register-nome').value;
    const cpf = document.getElementById('register-cpf').value;
    if (!validarCPF(cpf)) {
      alert('CPF inválido!');
      valido = false;
    }
  } else if (tipo === 'academia' || tipo === 'patrocinador') {
    nome = document.getElementById('register-nome').value;
    const cnpj = document.getElementById('register-cnpj').value;
    if (!validarCNPJ(cnpj)) {
      alert('CNPJ inválido! Digite no formato 00.000.000/0000-00');
      valido = false;
    }
  }
  if (!document.getElementById('lgpd-consent').checked) {
    alert('Você deve concordar com a Política de Privacidade.');
    valido = false;
  }
  if (valido) {
    localStorage.setItem('userType', tipo);
    if (tipo === 'lutador') {
      localStorage.setItem('nomeLutador', nome);
      window.location.href = 'dashboard.html';
    } else if (tipo === 'academia') {
      window.location.href = 'dashboard_academia.html';
    } else if (tipo === 'patrocinador') {
      window.location.href = 'dashboard_patrocinador.html';
    }
    registerForm.reset();
    registerFields.innerHTML = '';
  }
};

// Validação do formulário de login
loginForm.onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const senha = document.getElementById('login-password').value;
  // Logins fictícios de academia
  const academias = [
    { email: 'dojo@dojo.com', senha: 'dojo123', nome: 'Dojo Samurai', cnpj: '12.345.678/0001-95' },
    { email: 'gracie@barra.com', senha: 'barra123', nome: 'Gracie Barra', cnpj: '98.765.432/0001-10' },
    { email: 'alpha@team.com', senha: 'alpha123', nome: 'Team Alpha', cnpj: '11.222.333/0001-44' }
  ];
  const academia = academias.find(a => a.email === email && a.senha === senha);
  if (academia) {
    localStorage.setItem('userType', 'academia');
    localStorage.setItem('nomeAcademia', academia.nome);
    localStorage.setItem('cnpjAcademia', academia.cnpj);
    window.location.href = 'dashboard_academia.html';
    loginForm.reset();
    return;
  }
  // Patrocinador exemplo
  if (email === 'adidas@adidas.com' && senha === 'adidas123') {
    localStorage.setItem('userType', 'patrocinador');
    window.location.href = 'dashboard_patrocinador.html';
    loginForm.reset();
    return;
  }
  // Default: lutador
  localStorage.setItem('userType', 'lutador');
  localStorage.setItem('nomeLutador', email.split('@')[0]);
  window.location.href = 'dashboard.html';
  loginForm.reset();
}; 