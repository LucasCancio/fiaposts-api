import { CreateUserDTO } from "@/dtos/user/create.dto";
import { ResourceAlreadyExistsError } from "@/errors/resource-already-exists-error";
import { IStudentRepository } from "@/repositories/interfaces/student.repository.interface";
import { encryptPassword } from "@/utils/encrypt-password";

export class CreateStudentUseCase {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async handler(dto: CreateUserDTO) {
    const studentAlreadyExists = await this.studentRepository.findByEmail(
      dto.email
    );

    if (studentAlreadyExists) throw new ResourceAlreadyExistsError();

    dto.password = await encryptPassword(dto.password);

    return this.studentRepository.create(dto);
  }
}
