import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ITeacherRepository } from "@/repositories/interfaces/teacher.repository.interface";

export class DeleteTeacherUseCase {
  constructor(private readonly teacherRepository: ITeacherRepository) {}

  async handler(id: number) {
    const teacher = await this.teacherRepository.findById(id);
    if (!teacher) throw new ResourceNotFoundError(`Teacher ${id}`);

    return this.teacherRepository.delete(id);
  }
}
