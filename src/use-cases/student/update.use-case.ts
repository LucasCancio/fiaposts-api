import { UpdateUserDTO } from "@/dtos/user/update.dto";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { IStudentRepository } from "@/repositories/interfaces/student.repository.interface";
import { encryptPassword } from "@/utils/encrypt-password";

export class UpdateStudentUseCase {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async handler(id: number, dto: UpdateUserDTO) {
    const student = await this.studentRepository.findById(id);

    if (!student) throw new ResourceNotFoundError(`Student ${id}`);

    student.password = !!dto.password?.length
      ? await encryptPassword(dto.password)
      : student.password;
    student.name = dto.name || student.name;
    student.email = dto.email || student.email;
    student.updatedAt = new Date();

    return this.studentRepository.update(student);
  }
}
