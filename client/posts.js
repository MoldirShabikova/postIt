let postDisplay = document.querySelector(".feeds");
const submitPost = document.querySelector("#post-btn");
 const file = document.querySelector("#file");

const baseURL = `http://localhost:5000/api`;

const createPostCard = (posts) => {
    const newPostCard = document.createElement('div')
    newPostCard.classList.add('feed')
    newPostCard.innerHTML = `
        <div class="profile-photo">
                        <img src=${posts.profilePic} alt="">
                    </div>
                    <div class="ingo">
                        <h3>${posts.username}</h3>
                        <small>${posts.createdat}</small>
                        <p>${posts.content}</p>
                    </div>
                </div>
                <span class="edit">
                    <i class="uil uil-ellipsis-h"> </i>
                </span>
            </div>
            <div class="photo">
                <img src=${posts.image} alt="">
            </div>

            <div class="action-button">
                <div class="interaction-buttons">
                    <span><i class="uil uil-heart"></i></span>
                    <span><i class="uil uil-comment-dots"></i></span>
                    <span><i class="uil uil-share-alt"></i></span>

                </div>
                <div class="bookmark">
                    <span><i class="uil uil-bookmark-full"></i></span>
                </div>
            </div>
            <div class="liked-by">
                <span><img src="./assests/images/profile-10.jpg" alt=""></span>
                <span><img src="./assests/images/profile-4.jpg" alt=""></span>
                <span><img src="./assests/images/profile-15.jpg" alt=""></span>
                <p>Liked by <b>Ernest Achiever</b> and <b>2,300 others</b></p>
             </div>
             <div class="caption">
                <p><b>Lana Rose</b>Lorem ipsom dolor sit quisquam eius</p>
             </div>
             <div class="comments text-muted">View all 278 comments</div>
        </div>
    `;
  postDisplay.appendChild(newPostCard);
}

const displayPosts = (arr) => {
    arr.map((el) => {
        console.log(el)
        createPostCard(el)
    }
  
)}

const getAllPosts = () => {
    axios.get(`${baseURL}/posts`)
        .then((res) => {
            displayPosts(res.data)
        })
        .catch((err) => {
        console.log(err)
    })
}


const addPosts = (e) => {
e.preventDefault()
    postDisplay.innerHTML = ''
    const content = document.querySelector("#create-post");


    let bodyObj = {
      content: content.value,
      image: file.value,
      userid: 5
    };
    console.log(bodyObj)
    axios
      .post(`${baseURL}/addPost`, bodyObj)
      .then((res) => {
        displayPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
}

file.addEventListener("change", function () {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    document.querySelector("#image").src = reader.result;
  });

  reader.readAsDataURL(this.files[0]);
});

submitPost.addEventListener('click', addPosts)

getAllPosts();