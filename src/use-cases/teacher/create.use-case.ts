import { CreateUserDTO } from "@/dtos/user/create.dto";
import { ResourceAlreadyExistsError } from "@/errors/resource-already-exists-error";
import { ITeacherRepository } from "@/repositories/interfaces/teacher.repository.interface";
import { encryptPassword } from "@/utils/encrypt-password";

export class CreateTeacherUseCase {
  constructor(private readonly teacherRepository: ITeacherRepository) {}

  async handler(dto: CreateUserDTO) {
    const teacherAlreadyExists = await this.teacherRepository.findByEmail(
      dto.email
    );

    if (teacherAlreadyExists) throw new ResourceAlreadyExistsError();

    dto.password = await encryptPassword(dto.password);

    return this.teacherRepository.create(dto);
  }
}
