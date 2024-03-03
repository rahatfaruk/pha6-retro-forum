const postsListEl = document.getElementById('posts-list')
const latestPostsEl = document.getElementById('latest-posts')
const markedPostsListEl = document.getElementById('marked-posts-list')
const markedPostsCountEl = document.getElementById('marked-posts-counter')


let fetchedPosts = []
let markedPostsCount = 0

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
            <button class="mark-read-btn bg-green-400 px-2 py-1 rounded-full" data-post-id="${post.id}"> <i class="bi bi-envelope-open-fill hover:opacity-50"></i> </button>
          </li>
        </ul>
      </div>
    </div>
  `

  postsListEl.insertAdjacentHTML('beforeend', postHtml)
}

function renderLatestPost(post) {
  const postHtml = `
    <div class="max-w-sm text-center md:text-left border border-gray-400 p-4 rounded-md">
      <img src="${post.cover_image}" class="mb-4 rounded-lg w-full" alt="">
      <p><i class="bi bi-calendar-event"></i> <span>${post.author.posted_date ? post.author.posted_date : 'No publish date'}</span></p>
      <h3 class="font-bold text-lg mb-1 mt-2">${post.title}</h3>
      <p class="text-gray-700 mb-4">${post.description}</p>
      <!-- user -->
      <div class="flex items-center justify-center md:justify-normal gap-4">
        <img src="${post.profile_image}" class="rounded-full w-12 h-12" alt="">
        <div>
          <h4 class="text-lg">${post.author.name}</h4>
          <p class="text-gray-700 text-sm">${post.author.designation ? post.author.designation : 'Unknown'}</p>
        </div>
      </div>
    </div>
  `
  latestPostsEl.insertAdjacentHTML('beforeend', postHtml)
}

function renderMarkedPost(post) {
  const markedPostHtml = `
    <li class="flex justify-between gap-4 bg-white p-3 rounded-md">
      <h4 class="font-bold">${post.title}</h4>
      <p class="flex gap-2">
        <i class="bi bi-eye"></i>
        <span>${post.view_count}</span>
      </p>
    </li>
  `
  markedPostsListEl.insertAdjacentHTML('beforeend', markedPostHtml)
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

async function getAndRenderPosts( category) {
  postsListEl.innerHTML = ''
  showLoader(postsListEl)

  const {data, error} = await fetchData( `https://openapi.programming-hero.com/api/retro-forum/posts` + (category ? `?category=${category}` : '') )
  
  if (data.posts) {
    const posts = data.posts 
    fetchedPosts = posts
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
}

async function getAndRenderLatestPosts() {
  latestPostsEl.innerHTML = ''
  showLoader(latestPostsEl)
  const {data: posts, error} = await fetchData( `https://openapi.programming-hero.com/api/retro-forum/latest-posts` )
  console.log(posts, error);

  if (Array.isArray(posts)) {
    // hide loader after 2s; then render posts
    setTimeout(() => {
      hideLoader(latestPostsEl)
      posts.forEach(post => renderLatestPost(post))
    }, 2000)
    
  } else {
    // hide loader after 2s; then render error
    setTimeout(() => {
      hideLoader(latestPostsEl)
      latestPostsEl.textContent = error || 'Data fetching failed! Wrong request link!'
    }, 2000)
  }
}

// run these on page-load
window.addEventListener('DOMContentLoaded', () => {
  getAndRenderPosts()
  // getAndRenderLatestPosts()  
})

// capture mark-as-read btn click
postsListEl.addEventListener('click', e => {
  const markReadBtn = e.target.closest('.mark-read-btn')
  if (markReadBtn) {
    const selectedPostId = markReadBtn.dataset.postId
    const selectedPost = fetchedPosts.find(post => post.id.toString() === selectedPostId)

    // update marked-count
    markedPostsCount += 1
    markedPostsCountEl.textContent = markedPostsCount
    // render selected post into marked-list
    renderMarkedPost(selectedPost)

  }
})