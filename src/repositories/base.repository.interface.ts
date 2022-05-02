export interface IBaseRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T>;
  create(item: Partial<T>): Promise<T>;
  update(id: number, item: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
  deleteAll(): Promise<void>;
}
