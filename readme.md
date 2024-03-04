## About project:
  - **Retro Forum website**
  - My phero assignment 6. JS functionality focused (specially async await) mobile responsive website. 
  - Built with html, tailwind, js. Built by Rahat Faruk (me)
  - source repo: [B9A6-Retro-Forum](https://github.com/ProgrammingHero1/B9A6-Retro-Forum)
  - My private repo: https://github.com/Programming-Hero-Web-Course4/b9a6-retro-forum-rahatfaruk 
  - My live link: 

### Case study:
I have created custom loader using tailwind. Marked-as-read functionality implemantation was hard. I solved by using *postId* of clicked btn & global *allPosts* var which was required to avoid extra data fetching. I also have to show loader for at least 2s. So, I used setTimeout before rendering data.

### How the app works (step by step):
  - get posts and render into ui (on page load):
    - show loader (for 2 sec) into *postsContainerEl* before data fething start. use settimeout for 2s to wait before rendering data 
    - fetch data (posts); 
    - for resoved or reject, hide loader
    - for resolved data: make template for each post and render into *postsContainerEl*. Also update local *allPosts* variable to apply mark-as-read functionality.
    - when request link is incorrect, the *phero* api still resolve data but don't send `data.posts` array. So, we must consider that.
    - for error, we get error message; render it into *postsContainerEl*

  - mark-as-read btn work:
    - make sure of the btn click. I checked using className
    - get *postId* from clicked btn
    - find associate post form local *allPosts* var using *postId* which updates every time data is fetched.
    - update *markReadCounter*; create and render markedPostTemplate into associate list.

  - search post by category:
    - get search-query when user submit the form
    - fetch posts usign that query.
    - update *allPosts* var and *allPostsList* UI.

  - latest post:
    - exactly like get-all-posts functionality