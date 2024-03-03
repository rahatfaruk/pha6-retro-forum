const postsListEl = document.getElementById('posts-list')

function renderPost(post) {
  const postHtml = `
    <div class="flex items-start gap-6 p-4 mb-4 rounded-md bg-gray-200">
      <!-- img-box -->
      <div class="relative w-20 h-20 border">
        <img src="${post.image}" class="w-full rounded-md" alt="">
        <!-- active-status: dot circle -->
        <span class="absolute -right-1 -top-1 inline-block w-4 h-4 rounded-full border ${post.isActive ? 'bg-green-700' : 'bg-red-700'}"></span>
      </div>
      <!-- content -->
      <div class="flex-1">
        <!-- top row -->
        <div class="flex gap-8">
          <p># ${post.category}</p>
          <p>Author: ${post.author.name}</p>
        </div>
        <h3 class="text-xl font-semibold py-2">${post.title}</h3>
        <p class="text-gray-500">${post.description}</p>
        <!-- others info -->
        <ul class="flex items-center gap-6 mt-3 pt-3 border-t border-dashed border-gray-400">
          <li>
            <i class="bi bi-chat-left-text"></i>
            <span>${post.comment_count}</span>
          </li>
          <li>
            <i class="bi bi-eye"></i> 
            <span>${post.view_count}</span>
          </li>
          <li>
            <i class="bi bi-clock"></i> 
            <span>${post.posted_time} min</span>
          </li>
          <li class="ml-auto">
            <button class="bg-green-400 px-2 py-1 rounded-full"> <i class="bi bi-envelope-open-fill hover:opacity-50"></i> </button>
          </li>
        </ul>
      </div>
    </div>
  `

  postsListEl.insertAdjacentHTML('beforeend', postHtml)
}

function showLoader(targetEl) {
  targetEl.innerHTML = `
    <div class='flex justify-center'>
      <div class="w-24 h-24 border-[5px] border-indigo-300 border-t-indigo-700 rounded-full animate-spin "></div>
    </div>
  `
}

function hideLoader(targetEl) {
  targetEl.innerHTML = ''
}

async function fetchData(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('Cust-Err: Data fetching failed!')
    }
    const data = await res.json()
    return {data, error: null}
  } catch(err) {
    return {data: null, error: err.message}
  }
} 

async function getAndRenderPosts(category) {
  postsListEl.innerHTML = ''
  showLoader(postsListEl)

  const {data, error} = await fetchData( `https://openapi.programming-hero.com/api/retro-forum/posts` + (category ? `?category=${category}` : '') )
  
  // {posts: Array(6), message: 'successfully fetched the posts'}
  // {status: false, data: Array(0)}
  
  if (data.posts) {
    const posts = data.posts 
    // hide loader after 2s; then render posts
    setTimeout(() => {
      hideLoader(postsListEl)
      posts.forEach(post => renderPost(post))
    }, 2000)
    
  } else {
    // hide loader after 2s; then render error
    setTimeout(() => {
      hideLoader(postsListEl)
      postsListEl.textContent = error || 'Data fetching failed! Wrong request link!'
    }, 2000)
  }



  return
  // if we get error, show error message; else render posts inside associate element 
  if(error || data.status !== false) {
    // hide loader after 2s; then render error
    setTimeout(() => {
      hideLoader(postsListEl)
      postsListEl.textContent = error || 'Data fetching failed!'
    }, 2000)
  } else {
    const posts = data.posts 
    // hide loader after 2s; then render posts
    setTimeout(() => {
      hideLoader(postsListEl)
      posts.forEach(post => renderPost(post))
    }, 2000)
  } 
  

}

// run these on page-load
window.addEventListener('DOMContentLoaded', () => {
  getAndRenderPosts()
})