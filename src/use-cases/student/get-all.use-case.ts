import { IStudentRepository } from "@/repositories/interfaces/student.repository.interface";

export class GetAllStudentsUseCase {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async handler() {
    return await this.studentRepository.getAll();
  }
}
