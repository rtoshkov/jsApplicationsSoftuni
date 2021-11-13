function attachEvents() {
    const btnLoadPosts = document.getElementById('btnLoadPosts');
    btnLoadPosts.addEventListener('click', onLoad);
    const selectDropdown = document.getElementById('posts');
    const btnViewPost = document.getElementById('btnViewPost');
    btnViewPost.addEventListener('click', onViewPost);
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');

    function fillOutDropdown(el){
        const elOption = document.createElement('OPTION');
        elOption.textContent = el.title;
        elOption.value = el.id;
        selectDropdown.appendChild(elOption);
    }

    async function onLoad(){
        const request = await fetch('http://localhost:3030/jsonstore/blog/posts');
        const posts = await request.json();
        Object.values(posts).forEach((el) => fillOutDropdown(el));
    }

    async function onViewPost(){
        const postID = selectDropdown.value;
        const [post,comment] = await Promise.all([
            getPosts(postID),
            getComments(postID)
        ])
        postTitle.textContent = post.title;
        postBody.textContent = post.body;
        displayComments(comment)
    }

    async function getPosts(id){
        const request = await fetch(`http://localhost:3030/jsonstore/blog/posts/${id}`);
        return await request.json();
    }

    async function getComments(id){
        const request = await fetch(`http://localhost:3030/jsonstore/blog/comments`);
        const data =  await request.json();
        return Object.values(data).filter((p) => p.postId === id);
    }

    function displayComments(comment){
        comment.forEach((c) => {
            const elLi = document.createElement('LI');
            elLi.textContent = c.text;
            postComments.appendChild(elLi);
        })
    }
}

attachEvents();