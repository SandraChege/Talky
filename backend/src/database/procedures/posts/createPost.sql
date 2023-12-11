CREATE OR ALTER PROCEDURE createPost
(   @postID varchar(255) ,
	@postContent varchar(4000) ,	
	@imageUrl varchar(255)   
)
    
AS

BEGIN
    set nocount on;

    INSERT INTO Posts (postID, postContent, imageUrl)
    VALUES (@postID, @postContent, @imageUrl)
END

DROP PROCEDURE createPost