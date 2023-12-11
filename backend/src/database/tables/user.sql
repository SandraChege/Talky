CREATE TABLE Users (
    userID VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    fullname VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(255) DEFAULT 'user',
    profileUrl VARCHAR(255) NULL,
    isWelcomed BIT DEFAULT 0,
    isDeleted BIT DEFAULT 0,
    resetPassword BIT DEFAULT 0,
    OTP vARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM Users;
DROP TABLE users;
