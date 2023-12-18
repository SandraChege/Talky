CREATE or alter PROCEDURE getPostById
	@postID VARCHAR(255)
as

set nocount on;

begin
	SELECT 
    Posts.imageUrl, Posts.postContent, 
    Posts.isDeleted, Posts.created_at, 
    Posts.postID, Posts.userID,
    Users.fullname
    FROM Posts
    LEFT JOIN Users 
    ON Posts.userID = Users.userID  
	
    WHERE Posts.postID = @postID and Posts.isDeleted = 0
   
end;