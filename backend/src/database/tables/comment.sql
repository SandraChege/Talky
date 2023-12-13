CREATE TABLE Comments (
    commentID VARCHAR(255) PRIMARY KEY,
    comment VARCHAR(255),
    userID VARCHAR(255),
    postID VARCHAR (255),
    isDeleted BIT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (postID) REFERENCES Posts(postID)
);

SELECT * FROM Comments;
DROP TABLE Comments;
