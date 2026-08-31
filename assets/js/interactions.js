/**
 * Iara Games — Interações (Atividade: JavaScript externo)
 * -----------------------------------------------------------------------
 * Este arquivo é carregado tanto pela Home (index.html) quanto pela
 * página "Todos os Jogos" (pages/jogos.html). Cada bloco de código só é
 * ativado se os elementos daquela página existirem no DOM, então o mesmo
 * arquivo funciona nas duas páginas sem gerar erros no console.
 *
 * Funcionalidades implementadas:
 *   1) Mapa "Explore jogos pelo Brasil" (Home) — clique no Estado atualiza
 *      o painel de jogos em destaque.
 *   2) Busca e ordenação da lista de jogos (Todos os Jogos).
 *   3) Validação em tempo real do formulário "Divulgue seus jogos" (Home).
 * -----------------------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", function () {
  initMapaInterativo();
  initFiltroEOrdenacaoDeJogos();
  initValidacaoFormularioDivulgacao();
});

/* ==========================================================================
   1) MAPA "EXPLORE JOGOS PELO BRASIL" — Home (index.html)
   --------------------------------------------------------------------------
   Problema de interação: os Estados do mapa SVG já mudavam de cor no hover,
   mas o clique não fazia nada (o href apontava para uma âncora interna
   inexistente) e o painel de "jogos em destaque" ao lado era sempre
   estático (fixo em "#1 em SP" e nos mesmos 4 jogos), então o usuário não
   tinha confirmação nenhuma de que o mapa era, de fato, interativo.

   Solução: ao clicar (ou ativar pelo teclado) um Estado, ele passa a ficar
   destacado em amarelo de forma persistente, e o painel de jogos em
   destaque é atualizado dinamicamente com o(s) jogo(s) daquele Estado.
   ========================================================================== */
function initMapaInterativo() {
  const svg = document.getElementById("svg-map");
  if (!svg) return; // esta página não tem o mapa

  const featuredBox = document.getElementById("explore-featured");
  const badge = document.getElementById("explore-featured-badge");
  const featuredLink = document.getElementById("explore-featured-link");
  const featuredImg = document.getElementById("explore-featured-img");
  const thumbsBox = document.getElementById("explore-thumbs");
  const emptyMsg = document.getElementById("explore-empty");
  const hint = document.getElementById("explore-hint");

  // Base de jogos em destaque por Estado (chave = atributo "name" do SVG).
  // Em uma versão futura com back-end, estes dados viriam de uma API.
  const jogosPorEstado = {
    "São Paulo": {
      uf: "SP",
      featured: {
        nome: "Enigma do Medo",
        img: "assets/images/image-enigma-do-medo.jpg",
        link: "pages/pages-game/page-interna-enigma-do-medo.html",
      },
      thumbs: [
        { nome: "9 Kings", img: "assets/images/image-9kings.jpg", link: "pages/pages-game/page-interna-9-kings.html" },
        { nome: "Dandara", img: "assets/images/image-dandara.jpg", link: "pages/pages-game/page-interna-dandara.html" },
        { nome: "Sky Dust", img: "assets/images/image-sky-dust.jpg", link: "pages/pages-game/page-interna-sky-dust.html" },
      ],
    },
    "Distrito Federal": {
      uf: "DF",
      featured: {
        nome: "Hell Clock",
        img: "assets/images/image-hellclock.jpg",
        link: "pages/pages-game/page-interna-hell.clock.html",
      },
      thumbs: [
        { nome: "Two Strikes", img: "assets/images/image-two-strikes.jpg", link: "pages/jogos.html" },
        { nome: "Onikura", img: "assets/images/image-onikura.jpg", link: "pages/jogos.html" },
        { nome: "Fobia", img: "assets/images/image-fobia.jpg", link: "pages/jogos.html" },
      ],
    },
    "Minas Gerais": {
      uf: "MG",
      featured: {
        nome: "Dandara",
        img: "assets/images/image-dandara.jpg",
        link: "pages/pages-game/page-interna-dandara.html",
      },
      thumbs: [
        { nome: "Bloodless", img: "assets/images/image-bloodless.jpg", link: "pages/jogos.html" },
        { nome: "Asleep", img: "assets/images/image-asleep.png", link: "pages/jogos.html" },
        { nome: "Zueirama 2", img: "assets/images/image-zueirama-2.jpg", link: "pages/jogos.html" },
      ],
    },
    "Rio Grande do Sul": {
      uf: "RS",
      featured: {
        nome: "9 Kings",
        img: "assets/images/image-9kings.jpg",
        link: "pages/pages-game/page-interna-9-kings.html",
      },
      thumbs: [
        { nome: "Horizon Chase Turbo", img: "assets/images/image-horizon-chase.jpg", link: "pages/jogos.html" },
        { nome: "Lead the Dragon", img: "assets/images/image-lead-the-dragon.jpg", link: "pages/jogos.html" },
        { nome: "Mullet MadJack", img: "assets/images/image-mullet-madjack.jpg", link: "pages/jogos.html" },
      ],
    },
    "Rio de Janeiro": {
      uf: "RJ",
      featured: {
        nome: "Sky Dust",
        img: "assets/images/image-sky-dust.jpg",
        link: "pages/pages-game/page-interna-sky-dust.html",
      },
      thumbs: [
        { nome: "Aviãozinho do Tráfico", img: "assets/images/image-aviaozinho.jpg", link: "pages/jogos.html" },
        { nome: "Investigação Póstuma", img: "assets/images/image-investigacao-postuma.jpg", link: "pages/jogos.html" },
        { nome: "Sludge Life", img: "assets/images/image-sludge-life.jpg", link: "pages/jogos.html" },
      ],
    },
    "Bahia": {
      uf: "BA",
      featured: {
        nome: "Onikura",
        img: "assets/images/image-onikura.jpg",
        link: "pages/jogos.html",
      },
      thumbs: [
        { nome: "Cordels & Spells", img: "assets/images/image-cordels-&-spells.jpg", link: "pages/jogos.html" },
        { nome: "99 Vidas", img: "assets/images/image-99-vidas.jpg", link: "pages/jogos.html" },
        { nome: "A.I.L.A", img: "assets/images/image-aila.jpg", link: "pages/jogos.html" },
      ],
    },
    "Paraná": {
      uf: "PR",
      featured: {
        nome: "Moonleap",
        img: "assets/images/image-moonleap.jpg",
        link: "pages/jogos.html",
      },
      thumbs: [
        { nome: "Unsighted", img: "assets/images/image-unsighted.jpg", link: "pages/jogos.html" },
        { nome: "Fobia", img: "assets/images/image-fobia.jpg", link: "pages/jogos.html" },
        { nome: "Two Strikes", img: "assets/images/image-two-strikes.jpg", link: "pages/jogos.html" },
      ],
    },
  };

  const links = svg.querySelectorAll("a.estado");

  links.forEach(function (link) {
    // Impede a navegação para a âncora interna (ex: #tocantins) e trata
    // o clique como seleção do Estado.
    link.addEventListener("click", function (event) {
      event.preventDefault();
      selecionarEstado(link);
    });

    // Acessibilidade: o mapa passa a ser navegável e ativável pelo teclado.
    link.setAttribute("tabindex", "0");
    link.setAttribute("role", "button");
    link.setAttribute(
      "aria-label",
      "Ver jogos em destaque de " + link.getAttribute("name")
    );
    link.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selecionarEstado(link);
      }
    });
  });

  function selecionarEstado(linkEl) {
    const nomeEstado = linkEl.getAttribute("name");

    // Mantém o destaque amarelo apenas no Estado clicado.
    links.forEach(function (l) {
      l.classList.remove("estado--ativo");
    });
    linkEl.classList.add("estado--ativo");

    const dados = jogosPorEstado[nomeEstado];

    if (!dados) {
      if (hint) hint.textContent = nomeEstado + " selecionado — ainda sem jogos em destaque cadastrados.";
      if (featuredBox) featuredBox.classList.add("d-none");
      if (thumbsBox) thumbsBox.classList.add("d-none");
      if (emptyMsg) emptyMsg.classList.remove("d-none");
      return;
    }

    if (hint) hint.textContent = "Mostrando destaques de " + nomeEstado;
    if (emptyMsg) emptyMsg.classList.add("d-none");
    if (featuredBox) featuredBox.classList.remove("d-none");
    if (thumbsBox) thumbsBox.classList.remove("d-none");

    if (badge) badge.textContent = "#1 em " + dados.uf;
    if (featuredImg) {
      featuredImg.src = dados.featured.img;
      featuredImg.alt = "Imagem para Banner jogo " + dados.featured.nome;
    }
    if (featuredLink) featuredLink.href = dados.featured.link;

    if (thumbsBox) {
      thumbsBox.innerHTML = "";
      dados.thumbs.forEach(function (jogo) {
        const a = document.createElement("a");
        a.href = jogo.link;

        const img = document.createElement("img");
        img.src = jogo.img;
        img.alt = "Imagem para o Banner jogo " + jogo.nome;

        a.appendChild(img);
        thumbsBox.appendChild(a);
      });
    }
  }
}

/* ==========================================================================
   2) BUSCA E ORDENAÇÃO — "Todos os Jogos" (pages/jogos.html)
   --------------------------------------------------------------------------
   Problema de interação: a lista com todos os jogos não tinha nenhum
   filtro, obrigando o usuário a rolar a página inteira e comparar os
   jogos manualmente para achar o que queria ou decidir pelo preço.

   Solução: um campo de busca por nome (filtra em tempo real, a cada
   tecla digitada) e um seletor de ordenação (nome A-Z/Z-A, menor e
   maior preço), que reordenam os cards já existentes no HTML sem
   precisar recarregar a página.
   ========================================================================== */
function initFiltroEOrdenacaoDeJogos() {
  const grid = document.getElementById("jogos-grid");
  if (!grid) return; // esta página não é a lista de jogos

  const buscaInput = document.getElementById("busca-jogos");
  const ordenarSelect = document.getElementById("ordenar-jogos");
  const semResultado = document.getElementById("jogos-sem-resultado");
  const contador = document.getElementById("jogos-resultado-count");

  // Lê os dados de cada card a partir dos atributos data-name/data-price
  // (adicionados no HTML) e guarda a coluna (wrapper) inteira, que é o
  // elemento realmente reordenado/escondido no grid.
  const itens = Array.from(grid.querySelectorAll(".game-card")).map(function (card) {
    return {
      wrapper: card.parentElement,
      nome: card.dataset.name || "",
      preco: parseFloat(card.dataset.price) || 0,
    };
  });

  function aplicarFiltroEOrdenacao() {
    const termo = (buscaInput.value || "").trim().toLowerCase();
    const ordenacao = ordenarSelect.value;

    let listaFiltrada = itens.filter(function (item) {
      return item.nome.toLowerCase().includes(termo);
    });

    switch (ordenacao) {
      case "nome-az":
        listaFiltrada.sort(function (a, b) {
          return a.nome.localeCompare(b.nome, "pt-BR");
        });
        break;
      case "nome-za":
        listaFiltrada.sort(function (a, b) {
          return b.nome.localeCompare(a.nome, "pt-BR");
        });
        break;
      case "preco-menor":
        listaFiltrada.sort(function (a, b) {
          return a.preco - b.preco;
        });
        break;
      case "preco-maior":
        listaFiltrada.sort(function (a, b) {
          return b.preco - a.preco;
        });
        break;
      default:
        // "relevancia" mantém a ordem original do HTML
        break;
    }

    // Esconde tudo e depois reexibe/reordena só o que combina com a busca.
    itens.forEach(function (item) {
      item.wrapper.classList.add("d-none");
    });

    listaFiltrada.forEach(function (item) {
      grid.appendChild(item.wrapper);
      item.wrapper.classList.remove("d-none");
    });

    if (semResultado) {
      semResultado.classList.toggle("d-none", listaFiltrada.length > 0);
    }

    if (contador) {
      const total = listaFiltrada.length;
      contador.textContent =
        total + (total === 1 ? " jogo encontrado" : " jogos encontrados");
    }
  }

  buscaInput.addEventListener("input", aplicarFiltroEOrdenacao);
  ordenarSelect.addEventListener("change", aplicarFiltroEOrdenacao);

  aplicarFiltroEOrdenacao(); // exibe o contador já na carga da página
}

/* ==========================================================================
   3) VALIDAÇÃO DO FORMULÁRIO "DIVULGUE SEUS JOGOS" — Home (index.html)
   --------------------------------------------------------------------------
   Problema de interação: o formulário não dava nenhum retorno visual
   sobre se um campo estava preenchido corretamente, nem confirmação de
   que os dados haviam sido enviados — o usuário só saberia que algo
   estava errado (ou certo) depois de tentar enviar, sem saber qual campo
   corrigir.

   Solução: cada campo é validado em tempo real (a cada tecla/alteração e
   ao sair do campo), mostrando uma mensagem de erro específica ou uma
   confirmação visual. No envio, se tudo estiver certo, o usuário recebe
   uma mensagem de confirmação visível na tela.
   ========================================================================== */
function initValidacaoFormularioDivulgacao() {
  const form = document.getElementById("form-divulga-games");
  if (!form) return; // esta página não tem o formulário

  const nome = document.getElementById("nome-usuario");
  const email = document.getElementById("email-usuario");
  const telefone = document.getElementById("tel-usuario");
  const regiao = document.getElementById("regiao-usuario");
  const feedback = document.getElementById("form-feedback");

  const campos = [nome, email, telefone, regiao].filter(Boolean);

  // Uma função de validação por campo. Cada uma retorna null (campo ok)
  // ou uma string com a mensagem de erro a ser exibida.
  const validadores = {
    "nome-usuario": function (input) {
      const valor = input.value.trim();
      if (valor.length === 0) return "Digite seu nome completo.";
      if (valor.length < 5) return "O nome precisa ter pelo menos 5 caracteres.";
      if (!valor.includes(" ")) return "Digite nome e sobrenome.";
      return null;
    },
    "email-usuario": function (input) {
      const valor = input.value.trim();
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (valor.length === 0) return "Digite seu e-mail.";
      if (!regexEmail.test(valor)) return "Digite um e-mail válido (ex: nome@email.com).";
      return null;
    },
    "tel-usuario": function (input) {
      const valor = input.value.trim();
      if (valor.length === 0) return null; // telefone é opcional
      const digitos = valor.replace(/\D/g, "");
      if (digitos.length < 10 || digitos.length > 11) {
        return "Digite um telefone válido, com DDD.";
      }
      return null;
    },
    "regiao-usuario": function (input) {
      if (!input.value) return "Selecione sua Região.";
      return null;
    },
  };

  function validarCampo(input) {
    const validar = validadores[input.id];
    if (!validar) return true;

    const erro = validar(input);
    const msgEl = document.getElementById("msg-" + input.id);

    input.classList.remove("is-valid", "is-invalid");
    if (msgEl) msgEl.classList.remove("field-msg--erro", "field-msg--ok");

    if (erro) {
      input.classList.add("is-invalid");
      if (msgEl) {
        msgEl.textContent = erro;
        msgEl.classList.add("field-msg--erro");
      }
      return false;
    }

    // Campo opcional (ex: telefone) e ainda vazio: não é nem erro nem
    // sucesso, então não mostramos nenhuma borda/mensagem de "Tudo certo!".
    if (input.value.trim().length === 0) {
      return true;
    }

    input.classList.add("is-valid");
    if (msgEl) {
      msgEl.textContent = "Tudo certo!";
      msgEl.classList.add("field-msg--ok");
    }
    return true;
  }

  campos.forEach(function (campo) {
    const eventoDigitacao = campo.tagName === "SELECT" ? "change" : "input";
    campo.addEventListener(eventoDigitacao, function () {
      validarCampo(campo);
    });
    campo.addEventListener("blur", function () {
      validarCampo(campo);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const resultados = campos.map(validarCampo);
    const formularioValido = resultados.every(Boolean);

    if (!feedback) return;

    if (!formularioValido) {
      feedback.textContent = "Verifique os campos destacados antes de enviar.";
      feedback.classList.remove("d-none", "form-feedback--ok");
      feedback.classList.add("form-feedback--erro");
      return;
    }

    // Não há back-end conectado nesta atividade: simulamos o envio e damos
    // retorno imediato ao usuário, sem recarregar a página.
    feedback.textContent =
      "Dados enviados! Nossa equipe vai analisar seu jogo em breve.";
    feedback.classList.remove("d-none", "form-feedback--erro");
    feedback.classList.add("form-feedback--ok");

    form.reset();
    campos.forEach(function (campo) {
      campo.classList.remove("is-valid", "is-invalid");
      const msgEl = document.getElementById("msg-" + campo.id);
      if (msgEl) {
        msgEl.textContent = "";
        msgEl.classList.remove("field-msg--erro", "field-msg--ok");
      }
    });
  });
}
