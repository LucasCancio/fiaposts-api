import { ITeacherRepository } from "@/repositories/interfaces/teacher.repository.interface";
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error";
import { LoginDTO } from "@/dtos/auth/login.dto";
import { compare } from "bcryptjs";
import { IStudentRepository } from "@/repositories/interfaces/student.repository.interface";

export class LoginUseCase {
  constructor(
    private readonly teacherRepository: ITeacherRepository,
    private readonly studentRepository: IStudentRepository
  ) {}

  async handler(dto: LoginDTO) {
    const user = dto.isTeacher
      ? await this.teacherRepository.findByEmail(dto.email)
      : await this.studentRepository.findByEmail(dto.email);

    if (!user) throw new InvalidCredentialsError();

    const doestPasswordMath = await compare(dto.password, user.password);

    if (!doestPasswordMath) throw new InvalidCredentialsError();

    return user;
  }
}
