const url1 = 'https://jsonplaceholder.typicode.com/posts'

const postContainer = document.getElementById('posts')
let postMarkup = ''

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json charset=UTF-8'
        }
    })
        .then(response => response.json())
        .then(data => {
            data.map((post) => {
                postMarkup += `
                    <div class="post-item" id="post-${post.id}">
                        <h3>${post.title}</h3><br>
                        <p>${post.body}</p>
                        <div class="button-container">
                            <button>Curtir</button>
                            <button>Compartilhar</button>
                            <button>Comentar</button>
                        </div>
                    </div>
                `
            })
            // console.log(postMarkup)
            postContainer.innerHTML = postMarkup
        })
        .catch((err) => console.log(err))
}

// getPosts()