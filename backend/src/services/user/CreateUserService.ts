import prismaCliente  from "../../prisma";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({name, email, password}: UserRequest) {
    
    if(!email){
      throw new Error("Email incorret")
    }

    const userAlreadyExists = await prismaCliente.user.findFirst({
      where: {
        email:email
      }
    })

    if (userAlreadyExists){
      throw new Error("User already exists");
    }

    const user = await prismaCliente.user.create({
      data: {
        name: name,
        email:email,
        password: password
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })
    return user;
  }
}

export {CreateUserService}