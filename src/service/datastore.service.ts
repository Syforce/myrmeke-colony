import { Observable, Subject } from 'rxjs';

import { Connection } from '../config/model/connection.model';
import { ConnectionType } from '../config/enum/connection-type.enum';
import { DynamicConnection } from './dynamic-connection.component';

export class DatastoreService {
	private connectionSubject: Subject<DynamicConnection<any>> = new Subject<DynamicConnection<any>>();
	private connectionMap = {};

	public connectionObservable: Observable<DynamicConnection<any>> = this.connectionSubject.asObservable();

	public init(databases: Array<Connection>) {
		databases.forEach((item: Connection) => {
			const instance: DynamicConnection<any> = new DynamicConnection(item);

			instance.then((value) => {
				this.connectionMap[item.type] = instance;
				this.connectionSubject.next(instance);
			}, (error) => {
				console.error('Database error detected in DatastoreService');
			});
		});
	}

	public getConnection(type: ConnectionType): DynamicConnection<any> {
		return this.connectionMap[type];
	}
}

export const datastoreService: DatastoreService = new DatastoreService();