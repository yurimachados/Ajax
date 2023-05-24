
const url = 'https://api.github.com/users'
const main = document.getElementById('main')
const userInput = document.getElementById('username')
let text = ''

function getUser() {

    const user = userInput.value

    fetch(`${url}/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            text += `
                <div class="user-info">
                    <p>${data.name} possui ${data.public_repos} repositórios públicos no Github como ${data.login}<p><br>
                </div>
                `
            main.innerHTML = text
        })
        .catch((error) => console.error('Error: ', error.message || error))
}

document.querySelector('form').addEventListener('submit', (event) =>{
    event.preventDefault();
    getUser()
})