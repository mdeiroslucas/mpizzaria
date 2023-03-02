import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { Secret, sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({email, password}: AuthRequest ) {
    //verify if email exists
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    });

    if(!user || !user.password){
      throw new Error("User or password incorrect");
    }

    if (!password) {
      throw new Error("User or password incorrect");
    }

    //verify if password is correct
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch){
      throw new Error("User/password incorrect");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email
    },
    process.env.JWT_SECRET as Secret,
    {
      subject: user.id,
      expiresIn: '30d'
    }

    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    }
  }
}

export { AuthUserService }