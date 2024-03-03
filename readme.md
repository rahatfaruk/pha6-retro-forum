## About project:
  - **Retro Forum website**
  - My phero assignment 6. Built with html, tailwind, js. JS functionality focused (specially async await) mobile responsive website. Built by Rahat Faruk (me)
  - source repo: [B9A6-Retro-Forum](https://github.com/ProgrammingHero1/B9A6-Retro-Forum)
  - My private repo: https://github.com/Programming-Hero-Web-Course4/b9a6-retro-forum-rahatfaruk 
  - My live link: 

### How the app works (step by step):
  - get posts and render into ui:
    - show loader into *postsContainerEl*
    - fetch data (posts); 
    - for resolved data: we hide loader & make template for each post and render into *postsContainerEl*. 
    - when request link is incorrect, the *phero* api still resolve data but don't send `data.posts` array. So, we must consider that.
    - for error, we get error message; hide loader & render it into *postsContainerEl*