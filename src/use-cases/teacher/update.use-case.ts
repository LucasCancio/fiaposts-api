import { UpdateTeacherDTO } from "@/dtos/teacher/update.dto";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ITeacherRepository } from "@/repositories/interfaces/teacher.repository.interface";
import { encryptPassword } from "@/utils/encrypt-password";

export class UpdateTeacherUseCase {
  constructor(private readonly teacherRepository: ITeacherRepository) {}

  async handler(id: number, dto: UpdateTeacherDTO) {
    const teacher = await this.teacherRepository.findById(id);

    if (!teacher) throw new ResourceNotFoundError(`Teacher ${id}`);

    teacher.password = !!dto.password?.length
      ? await encryptPassword(dto.password)
      : teacher.password;
    teacher.name = dto.name || teacher.name;
    teacher.email = dto.email || teacher.email;
    teacher.updatedAt = new Date();

    return this.teacherRepository.update(teacher);
  }
}
