import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { execute, query } from "../helpers/dbHelper";

import { registerUser, loginUser, resetPassword } from "./userController";

jest.mock("../helpers/dbHelper", () => ({
  execute: jest.fn(),
  query: jest.fn(),
}));

describe("user controller", () => {
  //REGISTER A USER
  it("should register a user", async () => {
    // Arrange
    const req: any = {
      body: {
        email: "janedoe@gmail.com",
        fullname: "Jane Doe",
        username: "janedoe123",
        password: "12345678",
      },
    } as any;

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    // Mock the hashPass function to return a mock password
    jest
      .spyOn(bcrypt, "hash")
      .mockResolvedValueOnce("HashedPass@word123" as never);

    // Mock the execute function to simulate a successful registration
    (execute as jest.Mock).mockResolvedValue({});

    // Act
    await registerUser(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "user registered successfully",
    });
  });
});

describe("loginUser", () => {
  it("should login a user", async () => {
    // Arrange
    const reqLogin: any = {
      body: {
        email: "devngecu@gmail.com",
        password: "12345678",
      },
    };

    const resLogin: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the bcrypt compare function to simulate correct password
    jest.spyOn(bcrypt, "compare");

    // Mock the execute function to simulate a successful login
    (execute as jest.Mock).mockResolvedValueOnce({
      recordset: [
        {
          // id: "123",
          email: "devngecu@gmail.com",
          password: "hashedPassword",
        },
      ],
    });

    // Mock the jwt sign function to simulate token generation
    jest.spyOn(jwt, "sign").mockReturnValueOnce("mockToken" as never);

    // Act
    await loginUser(reqLogin, resLogin);

    // Assert
    expect(resLogin.status).toHaveBeenCalledWith(200);
    expect(resLogin.json).toHaveBeenCalledWith({
      message: "Logged in successfully",
      token: "mockToken",
    });
  });

  it("should handle login failure - incorrect password", async () => {
    // Arrange
    const reqLogin: any = {
      body: {
        email: "devngecu@gmail.com",
        password: "wrongPassword",
      },
    };

    const resLogin: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the bcrypt compare function to simulate incorrect password
    jest.spyOn(bcrypt, "compare");

    // Mock the execute function to simulate a user found
    (execute as jest.Mock).mockResolvedValueOnce({
      recordset: [
        {
          // id: "123",
          email: "devngecu@gmail.com",
          password: "hashedPassword",
        },
      ],
    });

    // Act
    await loginUser(reqLogin, resLogin);

    // Assert
    expect(resLogin.status).toHaveBeenCalledWith(401);
    expect(resLogin.json).toHaveBeenCalledWith({
      message: "Incorrect password",
    });
  });

  it("should handle login failure - email not found", async () => {
    // Arrange
    const reqLogin: any = {
      body: {
        email: "nonexistent@gmail.com",
        password: "12345678",
      },
    };

    const resLogin: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the execute function to simulate no user found
    (execute as jest.Mock).mockResolvedValueOnce({
      recordset: [],
    });

    // Act
    await loginUser(reqLogin, resLogin);

    // Assert
    expect(resLogin.status).toHaveBeenCalledWith(401);
    expect(resLogin.json).toHaveBeenCalledWith({
      message: "Email not found",
    });
  });
});

// describe("resetPassword", () => {
//   it("should reset user password", async () => {
//     // Arrange
//     const req: any = {
//       body: {
//         email: "devngecu@gmail.com",
//         resetToken: "ResetToken",
//         newPassword: "newPassword123",
//       },
//     } as any;

//     const res: any = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     } as any;

//     // Mock bcrypt hash function
//     jest
//       .spyOn(bcrypt, "hash")
//       .mockResolvedValueOnce("HashedNewPassword" as never);

//     // Mock execute function to simulate a successful password reset
//     (execute as jest.Mock).mockResolvedValueOnce({
//       rowsAffected: [1],
//       recordset: [{ message: "Password updated successfully" }],
//     });

//     // Act
//     await resetPassword(req, res);

//     // Assert
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       message: "Password reset successful.",
//     });

//     // Additional assertions
//     expect(bcrypt.hash).toHaveBeenCalledWith(
//       "newPassword123",
//       expect.any(Number)
//     );
//     expect(execute).toHaveBeenCalledWith("ResetPassword", {
//       email: "devngecu@gmail.com",
//       resetToken: "ResetToken",
//       newPassword: "HashedNewPassword",
//     });
//   });
// });




