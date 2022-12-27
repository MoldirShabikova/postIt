let postDisplay = document.querySelector("#display");
 
const baseURL = `http://localhost:5000/api/posts`;

const getAllPosts = () => {
    axios.get(baseURL)
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
        console.log(err)
    })
}

getAllPosts()