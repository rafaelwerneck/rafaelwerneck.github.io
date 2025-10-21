---
title: 'Hello World'
date: 2025-10-20
permalink: /posts/en/2025/10/hello-world/
language: en
tags:
  - hello world
  - liquid
  - en
---

Hello World!

Nothing could be fairer than starting a computer science blog with "Hello World," a standard, "bread and butter" beginning, but it's always important to start.

This blog will not be updated frequently, I don't even like to write that much, but it will serve as a support for any extra project I work throughout my life.

I say that, but I only have one idea of what to add to the blog after this post.

Now the question is whether to create two identical posts, one in English and one in Brazilian Portuguese, or to place one text directly below the other. Or a third option, which would be finding some way for the blog to choose which text to display to the user. This last one depends on an internet search to see if it's possible.

----

I hadn't even finished uploading the text, and I had already fixed the problem that I created for myself.

I'll be doing double posts, one in each language, and only showing them in the correct language page.

How to do it?
---

I added a new field in the post's header with the language information.

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

Then, on the page responsible for compiling the posts, I filtered and selected only the posts matching that specific language:

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

Finally, I created a new page to compile the post from the other language. On each of these pages, I included a link to the corresponding page in the other language, just in case the user wants to switch.

It was easier than I imagined! Now the trouble will be writing two posts every time.