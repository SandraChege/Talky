CREATE OR ALTER PROCEDURE fetchFollowers
    @followed_userID VARCHAR(255)
AS
BEGIN
    SELECT followerID
    FROM Followers
    WHERE followed_userID = @followed_userID;
END