---
title: 'Olá Mundo!'
date: 2025-10-20
permalink: /posts/pt-br/2025/10/hello-world/
language: pt-br
tags:
  - hello world
  - liquid
  - pt-br
---

Olá Mundo!

Nada mais justo que começar um blog com Hello World, padrão, arroz com feijão, mas isso sempre é importante.

Não vai ser um blog atualizado com frequência, nem gosto de escrever tanto assim, mas sim para servir de apoio às coisas extras que eu fizer durante minha vida.

Digo isso, mas só tenho ideia de um item a adicionar ao blog depois desse post.

Agora fica a dúvida entre fazer dois posts iguais, mas em inglês e português, ou então deixar um embaixo do outro. Ou uma terceira opção que seria arranjar alguma maneira do blog poder escolher qual texto mostrar ao usuário. Esse última depende de uma busca na internet para verificar se isso é possível.

----

Nem deu tempo de subir e já resolvi o problema que eu mesmo levantei acima.

Farei posts duplicados, mas um para cada idioma, e farei a separação deles pelo próprio site.

Como fiz isso?
---

Adicionei um novo item ao cabeçalho da postagem, com a informação de qual idioma estou escrevendo.

```md
---
title: 'Olá Mundo!'
date: 2025-10-20
permalink: /posts/pt-br/2025/10/olá-mundo/
language: pt-br
tags:
  - olamundo
  - introdução
  - pt-br
---
```

e depois, na página responsável por agrupar as postagens, limitei somente a adicionar as postagens daquele idioma.

{% raw %}
```liquid
{% for post in site.posts %}
  {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
  {% capture lang %}{{ post.language }}{% endcapture %}
  {% if year != written_year%}
    <h2 id="{{ year | slugify }}" class="archive__subtitle">{{ year }}</h2>
    {% capture written_year %}{{ year }}{% endcapture %}
  {% endif %}
  {% if lang == 'pt-br' %}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}
```
{% endraw %}

Finalmente, criei uma nova página para agrupar as páginas do outro idioma, e coloquei um link indo de uma página à outra, caso o usuário queira ler no outro idioma.

Foi uma abordagem bem mais fácil do que imaginei, agora o trabalho será somente escrever os dois textos, um em cada idioma.