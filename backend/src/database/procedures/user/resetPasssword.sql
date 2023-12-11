CREATE OR ALTER  PROCEDURE resetPassword
	(@userID varchar(100),
    @password varchar(100))
as

set nocount on;

begin
	UPDATE Users
	SET 
	password = @password
	WHERE userID = @userID
end;