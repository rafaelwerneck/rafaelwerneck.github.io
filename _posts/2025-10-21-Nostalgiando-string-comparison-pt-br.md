---
title: 'Nostalgiando e Comparação de Strings'
date: 2025-10-21
permalink: /posts/pt-br/2025/10/nostalgiando-string-comparison/
language: pt-br
comments: true
tags:
  - string comparison
  - Nostalgiando
  - javascript
  - similarity
  - Dice-Sørensen
  - pt-br
---

Durante minha graduação, existia um jogo em Flash que desafiava o jogador a adivinhar a música de um desenho, anime ou jogo pelo som de seus primeiros 15 segundos, chamado Nostalgiando. Mas, como praticamente tudo feito em Flash, ele [não existe mais](https://www.clrn.org/why-did-adobe-flash-shut-down/ "Why did Adobe Flash shut down?").

Porém, recentemente descobri um programador no GitHub, [@PericleSavio](https://github.com/PericlesSavio/Nostalgiando "Nostalgiando do PericlesSavio") que ressuscitou o jogo, agora em JavaScript.

Eu não sei mexer em Flash, então não conseguiria mexer no jogo original. Javascript não é meu forte, mas pelo menos é algo que eu já consigo entender melhor, então eu poderia colaborar nesse projeto.

Nostalgiando
---

Primeiro, vamos explicar melhor o que é o jogo Nostalgiando.

Nesse jogo, o objetivo é advinhar o nome do desenho (ou anime ou jogo) pela trilha sonora que é tocada, normalmente uns 15 segundos da abertura da mídia. São mídias antigas, para que a música traga essa sensação de nostalgia ao jogador. O jogo original tinha 50 desenhos para o jogador descobrir os nomes, e creio que depois foram adicionados outros 50 desenhos numa segunda versão do jogo.

Maiores informações nesse link da [Globo.com (no Internet Archive)](https://web.archive.org/web/20071104094242/https://g1.globo.com/Noticias/Tecnologia/0,,MUL166680-6174,00-WEBGAME+HOMENAGEIA+DESENHOS+ANIMADOS.html "Webgame homenageia desenhos animados"), para ver quão velho é o jogo, e no vídeo do YouTube abaixo, que nem mais hospedado no canal original está.

<iframe width="560" height="315" src="https://www.youtube.com/embed/O8BRVvyF9aE?si=1nYoCG8S5se5d81n" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Em 2021, o [@PericleSavio](https://github.com/PericlesSavio/ "GitHub do PericlesSavio") ressuscitou esse projeto e eu topei por ele por volta de 2023. Tendo o projeto no GitHub, seria possível eu participar e incrementar as 16 músicas em cada item que ele já montou inicialmente.

Comparação de Strings
---

E vamos ao tópico que eu pensei para esse post. Pois um dos métodos no código do Pericles para acertar o nome do desenho, é ele ser igual a uma lista de possíveis escritas do desenho, o que gera um conjunto absurdo de combinações para alguns desenhos, como, por exemplo, O Fantástico Mundo de Bobby:

`["BOBBY", "O FANTÁSTICO MUNDO DE BOBBY", "O MUNDO FANTÁSTICO DE BOBBY", "FANTÁSTICO MUNDO DE BOBBY", "MUNDO FANTÁSTICO DE BOBBY", "O MUNDO DE BOBBY", "MUNDO DE BOBBY", "BOBBY'S WORLD", "THE WORLD ACCORDING TO BOBBY", "BOBBYS WORLD"]`

Isso não é interessante nem para quem elabora o jogo, que teria de pensar em diferentes escritas para o a lembrança do nome do desenho, e nem para quem joga, que se frustaria ao tentar acertar pelo menos uma das escritas que o dono do jogo elaborou.

Então a solução que eu pensei foi em usar uma comparação de strings para a resposta do jogo, assim, caso o jogador já escreva um nome bem próximo do desejado, quer dizer que ele tem bastante ideia do que é o nome do desenho.

Para isso, eu selecionei o [Coeficiente de Dice-Sørensen](https://en.wikipedia.org/wiki/Dice-S%C3%B8rensen_coefficient "Página da Wikipedia em inglês") para avaliar a similaridade entre a resposta do jogador e as respostas do jogo.

Para calcular a similaridade entre a *resposta* $$r$$ e a *solução* $$s$$, primeiro encontramos os bigramas da palavra:

```javascript
function getBigrams(str) {
  const bigrams = new Set();
  for (let i = 0; i < str.length - 1; i += 1) {
    bigrams.add(str.substring(i, i + 2));
  }
  return bigrams;
}
```

e sua quantidade de elementos para guardar em $$n_r$$ e $$n_s$$.

Depois, aplicamos o Coeficiente de Dice-Sørensen, que é definido por:

$$DS = \frac{2 * n_i}{n_r + n_s}$$

sendo $$n_i$$ o número de elementos na intersecção entre os bigramas de $$r$$ e $$s$$.

```javascript
function intersect(set1, set2) {
  return new Set([...set1].filter((x) => set2.has(x)));
}

function diceCoefficient(str1, str2) {
  /* Returns a number between 0 and 1, where 1 means the strings are identical
  and 0 means they have no bigrams in common.
  More info: https://en.wikipedia.org/wiki/Sørensen–Dice_coefficient
  Example:
  diceCoefficient('night', 'nacht') // 0.25
  */
  const bigrams1 = getBigrams(str1.toLowerCase());
  const bigrams2 = getBigrams(str2.toLowerCase());
  return (2 * intersect(bigrams1, bigrams2).size) / (bigrams1.size + bigrams2.size);
}
```

Após calcular o coeficiente para cada uma das soluções contra a resposta fornecida, podemos achar o maior coeficiente, e se for maior que um limiar pré-definido (no código considerei 0.85), aceitamos a resposta.

Assim, caso a resposta do jogador seja $$r=\textrm{“BOBY”}$$, teremos o maior coeficiente considerando a solução $$s=\textrm{“BOBBY”}$$ com bigramas

```
r = {'BO', 'OB', 'BY'}
s = {'BO', 'OB', 'BB', 'BY'}
n_r = 3
n_s = 4
n_i = 3
```

$$DS = \frac{2 * n_i}{n_r + n_s} = \frac{2 * 3}{3 + 4} = \frac{6}{7} = 0.8571$$

Logo, essa resposta seria aceita pelo jogo.

---

Ainda não fiz o push das minhas modificações para o GitHub original do Pericles, mas a minha versão está disponível no meu GitHub e vocês podem conferir suas respostas no meu [Nostalgiando](https://rafaelwerneck.github.io/Nostalgiando/ "Versão local do Nostalgiando") com algumas músicas a mais e essa atualização descrita no post.