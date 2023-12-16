CREATE OR ALTER PROCEDURE getAllComments
(
    @postID VARCHAR(255)
)
	AS
SET NOCOUNT ON;
BEGIN
	SELECT * FROM Comments 
    WHERE postID = @postID and isDeleted = 0
END