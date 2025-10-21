---
title: 'Nostalgiando and String Comparison'
date: 2025-10-21
permalink: /posts/en/2025/10/nostalgiando-string-comparison/
language: en
tags:
  - string comparison
  - Nostalgiando
  - javascript
  - similarity
  - Dice-Sørensen
  - en
---

During my undergrad, there was a Flash game that challenged players to guess the theme song of a cartoon, anime, or game based on the first 15 seconds of its audio. The game was called Nostalgiando. However, like almost everything made in Flash, [it no longer exists](https://www.clrn.org/why-did-adobe-flash-shut-down/ "Why did Adobe Flash shut down?").

Recently, though, I discovered a programmer on GitHub, [@PericleSavio](https://github.com/PericlesSavio/Nostalgiando "PericlesSavio's Nostalgiando"), who resurrected the game, now in JavaScript.

I don't know how to work with Flash, so I couldn't have worked on the original game. JavaScript isn't my strongest language, but at least it's something I can understand better, meaning I could contribute to this project.

Nostalgiando
---

First, let's better explain what the Nostalgiando game is.

In this game, the objective is to guess the name of the cartoon (or anime or game) from the soundtrack that is played, typically about 15 seconds of the media's opening theme. The media are older titles, designed to bring a feeling of nostalgia to the player. The original game had 50 cartoons for the player to guess, and I believe another 50 were added in a second version.

You can find more information in this [Globo.com (on Internet Archive)](https://web.archive.org/web/20071104094242/https://g1.globo.com/Noticias/Tecnologia/0,,MUL166680-6174,00-WEBGAME+HOMENAGEIA+DESENHOS+ANIMADOS.html "Webgame homenageia desenhos animados"), which shows just how old the game is, and in the YouTube video below, which is no longer even hosted on the original channel.

<iframe width="560" height="315" src="https://www.youtube.com/embed/O8BRVvyF9aE?si=1nYoCG8S5se5d81n" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[@PericleSavio](https://github.com/PericlesSavio/ "PericlesSavioś GitHub") resurrected this project in 2021, and I stumbled upon it around 2023. Having the project on GitHub made it possible for me to participate and extend the 16 songs he initially set up for each item.

String Comparison
---

And now we come to the main topic I planned for this post. One of Pericles' methods for checking the correct cartoon name is to compare the player's answer against a list of acceptable spellings. This generates an absurd number of combinations for some cartoons, such as Bobby's World:

`["BOBBY", "O FANTÁSTICO MUNDO DE BOBBY", "O MUNDO FANTÁSTICO DE BOBBY", "FANTÁSTICO MUNDO DE BOBBY", "MUNDO FANTÁSTICO DE BOBBY", "O MUNDO DE BOBBY", "MUNDO DE BOBBY", "BOBBY'S WORLD", "THE WORLD ACCORDING TO BOBBY", "BOBBYS WORLD"]`

This isn't ideal, neither for the game creator, who has to think of every possible spelling of the cartoon's name, nor for the player, who might get frustrated trying to guess at least one of the exact spellings created by the developer.

So, the solution I came up with was to use string matching for the answer validation. That way, if the player writes a name that is quite similar to the desired one, it indicates they have a good idea of what the cartoon's name is.

For this purpose, I selected the [Dice-Sørensen Coefficient](https://en.wikipedia.org/wiki/Dice-S%C3%B8rensen_coefficient "Wikipedia's page") to evaluate the similarity between the player's answer and the official solutions.

To calculate the similarity between the *answer* $$r$$ and the *solution* $$s$$, we first find the bigrams of the word:

```javascript
function getBigrams(str) {
  const bigrams = new Set();
  for (let i = 0; i < str.length - 1; i += 1) {
    bigrams.add(str.substring(i, i + 2));
  }
  return bigrams;
}
```

and store their quantities in $$n_r$$ and $$n_s$$.

Next, we apply the Dice-Sørensen Coefficient, which is defined as:

$$DS = \frac{2 \cdot n_i}{n_r + n_s}$$

where $$n_i$$ is the number of elements in the intersection between the bigrams of $$r$$ and $$s$$.

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

After calculating the coefficient for each of the solutions against the provided answer, we find the largest coefficient. If it is greater than a predefined threshold (I set it to 0.85 in the code), we accept the answer.

Thus, if the player's answer is $$r=\textrm{“BOBY”}$$, we will get the highest coefficient when comparing it against the solution $$s=\textrm{“BOBBY”}$$, with bigrams:

```
r = {'BO', 'OB', 'BY'}
s = {'BO', 'OB', 'BB', 'BY'}
n_r = 3
n_s = 4
n_i = 3
```

$$DS = \frac{2 * n_i}{n_r + n_s} = \frac{2 * 3}{3 + 4} = \frac{6}{7} = 0.8571$$

Therefore, this answer would be accepted by the game.

---

I haven't pushed my modifications to Pericles' original GitHub yet, but my version is available on my GitHub, and you can test your answers on my [Nostalgiando fork](https://rafaelwerneck.github.io/Nostalgiando/ "Werneck's Nostalgiando"), which includes a few more songs and the update described in this post.