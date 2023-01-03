let postDisplay = document.querySelector("#display");
 
const baseURL = `http://localhost:5000/api/posts`;

const createPostCard = (posts) => {
    const newPostCard = document.createElement('section')
    newPostCard.innerHTML = `
    <img src=${posts}/>
    <p>${posts.username}</p>
    `
  postDisplay.appendChild(newPostCard);
}

const displayPosts = (arr) => {
    arr.map((el) => {
        console.log(el)
        createPostCard(el)
    }
  
)}

const getAllPosts = () => {
    axios.get(baseURL)
        .then((res) => {
            displayPosts(res.data)
        })
        .catch((err) => {
        console.log(err)
    })
}

postDisplay.innerHTML = `

`

getAllPosts()