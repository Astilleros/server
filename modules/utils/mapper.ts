export interface IMapper<T> {
    toDomain(raw: any): T
    toPersistence(t: T): any
    toDTO(t: T): any
}