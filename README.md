![Logo](assets/images/logo-iara-games.png)

# Iara Games

Iara Games é uma plataforma de venda de jogos desenvolvidos por brasileiros ou jogos ambientados no Brasil.

Informações a respeito da entrega do JavaScript no final da página.

 Site: https://mincatarina.github.io/Iara-Games/
## IDENTIDADE VISUAL
A identidade visual da Iara Games foi criada para representar a conexão entre tecnologia, games e brasilidade.

O conceito visual combina elementos modernos com referências culturais brasileiras, criando uma marca jovem, dinâmica e facilmente reconhecível.

### LOGOTIPO

![Logo](assets/images/logo-iara-games.png)

O logotipo da Iara Games foi desenvolvido de forma original, unindo a representação de uma cauda inspirada na personagem folclórica Iara com um controle de videogame, reforçando a conexão entre cultura brasileira e universo gamer.

Essa construção visual transmite:
- Modernidade
- Criatividade
- Tecnologia
- Identidade nacional


### PALETA DE CORES
As cores escolhidas foram definidas estrategicamente para fortalecer a identidade da plataforma:

| Cor             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| AMARELO | ![#FFCB20](https://dummyimage.com/50/FFCB200a192f/white?text=+) #FFCB20 |
| AZUL | ![#2550FF](https://dummyimage.com/50/2550FF/white?text=+) #2550FF |
| VERDE | ![#1AA108](https://dummyimage.com/50/1AA108/white?text=+) #1AA108 |

AMARELO — Representa criatividade, destaque e energia.

AZUL — Transmite inovação, tecnologia e conexão com o azul da bandeira brasileira.

VERDE — Simboliza brasilidade, diversidade e crescimento.

A combinação dessas cores cria uma identidade vibrante e moderna, alinhada à proposta da plataforma de valorizar jogos brasileiros.

### TIPOGRAFIA

A fonte principal utilizada é a Montserrat e Lexend.

Sua escolha foi baseada em características como:
- Fácil leitura
- Visual moderno
- Boa acessibilidade
- Clareza em diferentes tamanhos de tela

A tipografia fortalece a proposta tecnológica da plataforma e melhora a experiência de navegação do usuário.

## DESENVOLVIMENTO FRONT-END

### UTILIZAÇÃO DO BOOTSTRAP

O framework Bootstrap foi utilizado para estruturar e organizar o layout das páginas.

Entre os principais recursos utilizados estão:

- Containers responsivos
- Sistema de Grid
- Navbar
- Cards
- Responsividade com colunas adaptáveis
- Espaçamentos e alinhamentos utilitários

Esses recursos facilitaram o desenvolvimento de uma interface moderna, organizada e compatível com diferentes resoluções de tela.

### ACESSIBILIDADE

A interface utiliza uma paleta inspirada nas cores do Brasil, reforçando a proposta da plataforma de valorizar jogos desenvolvidos no país. O amarelo aparece como cor de destaque para ações importantes e elementos de navegação, criando contraste com o fundo escuro e ajudando a direcionar a atenção do usuário. Além de fortalecer a identidade visual da plataforma, essa escolha conecta o produto à cultura brasileira de forma sutil e reconhecível.

Durante o desenvolvimento, aplicamos boas práticas de acessibilidade para garantir melhor usabilidade e inclusão digital.

#### RECURSOS IMPLEMENTADOS

- Uso correto de tags semânticas
- Contraste adequado entre texto e fundo
- Navegação simples e intuitiva
- Textos alternativos para imagens
- Fontes legíveis
- Estrutura clara de conteúdo

## INTERATIVIDADE COM JAVASCRIPT

Nesta etapa, foi evoluido o mesmo repositório da sprint anterior, adicionando um arquivo JavaScript externo (`assets/js/interactions.js`) vinculado ao HTML já existente, sem refazer o que já havia sido feito.

Foram implementadas 3 funcionalidades interativas, cada uma resolvendo um problema de interação identificado anteriormente na Atividade de Reformulação:

### 1. Mapa "Explore jogos pelo Brasil" (Home)

**Problema:** o mapa SVG só reagia ao passar o mouse (hover), mas o clique não fazia nada — o link apontava para uma âncora interna inexistente — e o painel de "jogos em destaque" ao lado era sempre estático (fixo em "#1 em SP").

**Solução:** ao clicar em um Estado, o mesmo é destacado em amarelo de forma persistente e o painel lateral é atualizado dinamicamente: badge "#1 em [UF]", imagem principal e miniaturas passam a refletir os jogos daquele Estado. Estados sem jogos cadastrados mostram uma mensagem amigável com link para "Ver todos os jogos".

### 2. Busca e ordenação em "Todos os Jogos"

**Problema:** a página listava todos os jogos sem nenhum filtro, obrigando o usuário a rolar a página inteira e comparar manualmente para achar um jogo específico ou decidir pelo preço.

**Solução:** um campo de busca filtra os cards por nome em tempo real (a cada tecla digitada), e um seletor permite reordenar a lista por nome (A-Z / Z-A) ou preço (menor/maior), reaproveitando os mesmos cards do HTML sem recarregar a página. Quando a busca não encontra nada, uma mensagem "Nenhum jogo encontrado" é exibida.

### 3. Validação em tempo real do formulário "Divulgue seus jogos"

**Problema:** o formulário não dava nenhum retorno visual sobre o preenchimento correto dos campos, nem confirmação de que os dados foram enviados.

**Solução:** cada campo (nome, e-mail, telefone, região) é validado ao digitar e ao sair do campo, mostrando uma mensagem de erro específica (em vermelho) ou uma confirmação "Tudo certo!" (em verde). Ao enviar o formulário com todos os campos válidos, uma mensagem de confirmação é exibida na tela, sem recarregar a página.

### Como visualizar as novidades

1. Abra a Home e clique em qualquer Estado do mapa "Explore jogos pelo Brasil" para ver o painel de destaques mudar.
2. Role até o formulário "Deseja divulgar seus jogos na Iara Games?", preencha os campos e veja a validação acontecer em tempo real.
3. Acesse "Todos os Jogos" pelo menu **Loja**, digite algo no campo de busca e/ou troque a ordenação no seletor "Ordenar por".
