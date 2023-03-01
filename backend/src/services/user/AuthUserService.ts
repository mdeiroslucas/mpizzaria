import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

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

    if(!user){
      throw new Error("User/password incorrect");
    }

    //verify if password is correct
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch){
      throw new Error("User/password incorrect");
    }


    return {ok: true}
  }
}

export { AuthUserService }