# Fight App

Aplicativo PWA para promoção de atletas, academias e patrocinadores do mundo da luta.

## Funcionalidades
- Login e registro para Lutador, Academia e Patrocinador
- Dashboards exclusivos para cada tipo de usuário
- Perfil editável (foto, nome, bio, arte marcial/segmento)
- Feed de eventos, conquistas, patrocinadores, produtos
- Pesquisa de academias (para todos)
- **Cadastro de produtos pela academia**
- Logout seguro
- Visual moderno, responsivo e animado

## Exemplos de Login

### Lutador
- Qualquer e-mail e senha (simulação)

### Academias
| Nome           | E-mail              | Senha    | CNPJ                |
|----------------|---------------------|----------|---------------------|
| Dojo Samurai   | dojo@dojo.com       | dojo123  | 12.345.678/0001-95  |
| Gracie Barra   | gracie@barra.com    | barra123 | 98.765.432/0001-10  |
| Team Alpha     | alpha@team.com      | alpha123 | 11.222.333/0001-44  |

### Patrocinador
| Nome      | E-mail              | Senha      |
|-----------|---------------------|------------|
| Adidas    | adidas@adidas.com   | adidas123  |

## Como rodar localmente
1. Baixe ou clone este repositório
2. Abra o arquivo `index.html` no navegador
3. Faça login com um dos exemplos acima ou registre um novo usuário

## Banco de Dados
- O arquivo `banco_fightapp.sql` contém toda a estrutura do banco MySQL e exemplos de academias fictícias.
- As imagens das academias são URLs públicas (exemplo: https://i.imgur.com/1Q9Z1Zm.png).

## Observações
- Todas as informações de login são salvas no navegador (localStorage)
- O app funciona offline (PWA)
- Para resetar os dados, limpe o cache/localStorage do navegador

---
Desenvolvido para apresentação e testes rápidos. Qualquer dúvida, entre em contato! 