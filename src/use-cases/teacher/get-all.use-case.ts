import { ITeacherRepository } from "@/repositories/interfaces/teacher.repository.interface";

export class GetAllTeachersUseCase {
  constructor(private readonly teacherRepository: ITeacherRepository) {}

  async handler() {
    return await this.teacherRepository.getAll();
  }
}
