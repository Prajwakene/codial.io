
{
    //method to submit the data for the new post using AJAX
    let createpost =function(){
        let newPostForm = $('#new-post-form');

        // after submititing it  should not get submit by it self for that we are doing the preventDefault
        newPostForm.submit(function(e){
            e.preventDefault();

            //submitting manually
            $.ajax({
                type:'post',          
                url:'/posts/create',
                //serialize will convert the form  data into JSON 
                data:newPostForm.serialize(),
                success:function(data){
                    let  newPost = newPostDom(data.data.post);
                    $(`#posts-list-container>ul`).prepend(newPost)
                    //space before .
                    deletePost($(' .delete-post-button', newPost))
                }, error: function(error){
                    console.log(error.responseText);
                    
                }

            });
        });
    }

    //method to create the post in DOM

    let newPostDom = function(post){
        //copy all code  from _post.ejs and paste in the backticks below
        return $(`<li id="post-${post._id}">
        <p>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}"> X </a>
            </small>

            ${ post.content}
            <br>
            <small>
                ${ post.user.name}
            </small>
        </p>
        <!-- //creatin gfrom for the comment -->
        <div class="post-comments">
            
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type here to add comments">
                    <!-- now sending the the id of post to which comments need to be added  -->
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add comments">
             
                <% } %>
                <!-- Showing the comments -->
                <div class="post=comment-list">
                    <ul id="post-comments-${post._id}">

    
                    </ul>
                </div>
        </div>
    </li>`)
    }

//method to delete a post from DOM
let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.prependDefault();
        $.ajax({
            type:'get',
            //to get the value of the href in the a tag
            url:$(deleteLink).prop('href'),
            success:function(data){
                $(`#post-${data.post_id}`).remove();
            },error:function(error){
                console.log(error.responseText);
            }
        });
    })
} 




    createpost();
}   