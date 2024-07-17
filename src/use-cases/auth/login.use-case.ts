import { ITeacherRepository } from "@/repositories/interfaces/teacher.repository.interface";
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error";
import { LoginDTO } from "@/dtos/auth/login.dto";
import { compare } from "bcryptjs";

export class LoginUseCase {
  constructor(private readonly teacherRepository: ITeacherRepository) {}

  async handler(dto: LoginDTO) {
    const user = await this.teacherRepository.findByEmail(dto.email);

    if (!user) throw new InvalidCredentialsError();

    const doestPasswordMath = await compare(dto.password, user.password);

    if (!doestPasswordMath) throw new InvalidCredentialsError();

    return user;
  }
}
