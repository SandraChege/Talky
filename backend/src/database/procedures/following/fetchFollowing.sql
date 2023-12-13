CREATE OR ALTER PROCEDURE fetchFollowings
    @following_userID VARCHAR(255)
AS
BEGIN
    SELECT followerID
    FROM Followers
    WHERE following_userID = @following_userID;
END