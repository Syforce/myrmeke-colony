/**
 * The IDatastore interface sets the minimum required querry functions any datastore should
 * have. The minimum CRUD functionality required is find, create, update and delete, one or
 * multiple.
 */
export interface IDatastore<T> {

	observe(callback: any): Promise<T & Array<T>>;

	getAll(): Promise<Array<T>>;

	getById(id: string | T): Promise<T>;

	create(model: T): Promise<T>;
}