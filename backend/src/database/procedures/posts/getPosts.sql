CREATE or alter PROCEDURE getPosts
	
as

set nocount on;

begin
	select *  from Posts 
    where isDeleted = 0
   
end;