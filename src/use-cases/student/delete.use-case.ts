import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { IStudentRepository } from "@/repositories/interfaces/student.repository.interface";

export class DeleteStudentUseCase {
  constructor(private readonly studentRepository: IStudentRepository) {}

  async handler(id: number) {
    const student = await this.studentRepository.findById(id);
    if (!student) throw new ResourceNotFoundError(`Student ${id}`);

    return this.studentRepository.delete(id);
  }
}
