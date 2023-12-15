CREATE TABLE likes (
    likeID VARCHAR(255) PRIMARY KEY,
    userID VARCHAR(255) ,
    postID VARCHAR(255) ,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

 FOREIGN KEY (userID) REFERENCES Users(userID),
 FOREIGN KEY (postID) REFERENCES Posts(postID),


);