/**
 * The IDatastore interface sets the minimum required querry functions any datastore should
 * have. The minimum CRUD functionality required is find, createPingLog, update and delete, one or
 * multiple.
 */
export interface IDatastore<T> {

    observe(callback: any): Promise<T & Array<T>>;

    getAll(): Promise<Array<T>>;

    getById(id: number | T): Promise<T | Array<T>>;

    create(model: T): Promise<T | Array<T>>;

    update(id: number | T, model: T): Promise<T | Array<T>>;

    delete(id: number | T): Promise<T>;

    deleteAll(): Promise<Array<T>>;
}
