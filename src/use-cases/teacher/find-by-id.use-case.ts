import { ITeacherRepository } from "@/repositories/interfaces/teacher.repository.interface";

export class FindTeacherByIdUseCase {
  constructor(private readonly teacherRepository: ITeacherRepository) {}

  async handler(id: number) {
    return await this.teacherRepository.findById(id);
  }
}
