import { IStudentRepository } from "@/repositories/interfaces/student.repository.interface";

export class FindStudentByIdUseCase {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async handler(id: number) {
    return await this.studentRepository.findById(id);
  }
}
