-- SELECT * from Users

CREATE OR ALTER PROCEDURE updateUserDetails
@fullname VARCHAR(200),
@profileUrl VARCHAR(255),
@userID VARCHAR (200)
AS
BEGIN
    UPDATE Users
    SET fullname = @fullname, profileUrl = @profileUrl
    WHERE userID = @userID
END