CREATE or alter PROCEDURE getPostById
	@postID VARCHAR(255)
as

set nocount on;

begin
	select *  from Posts  
	
    where postID = @postID and isDeleted = 0
   
end;