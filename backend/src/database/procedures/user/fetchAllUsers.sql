CREATE OR ALTER PROCEDURE fetchAllUsers
AS 
BEGIN
    SELECT * FROM Users 
    WHERE isDeleted = 0
END