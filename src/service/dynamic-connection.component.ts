import { Connection, cloneConnection } from '../config/model/connection.model';
import { ConnectionType } from '../config/enum/connection-type.enum';
import { LiveConnectionType, upgradeConnectionType } from '../config/enum/live-connection-type.enum';

export class DynamicConnection<T> {
	private connection: T;
	private connectionConfig: Connection;

	private static algorithms = {};

	constructor(connectionConfig: Connection) {
		this.connectionConfig = connectionConfig;
	}

	public then(resolve: (value) => void, reject?: (error) => void) {
		const type: ConnectionType | LiveConnectionType = this.connectionConfig.type;
		const algorithm: (c: Connection) => Promise<T> = DynamicConnection.algorithms[type];

		if (algorithm) {
			algorithm(this.connectionConfig).then((value) => {
				this.connection = value; 
				resolve(value);
			}, (error) => {
				reject(error);
			});
		} else {
			console.log('The algorithm for the provided database was not loaded');
		}
	}

	public getConnection(): T {
		return this.connection;
	}

	public convertToLive(): Promise<any> {
		const type: LiveConnectionType = upgradeConnectionType(this.connectionConfig.type);
		const config: Connection = cloneConnection(this.connectionConfig, { type });
		const algorithm: (c: Connection) => Promise<T> = DynamicConnection.algorithms[type];

		if (algorithm) {
			return algorithm(config);
		} else {
			console.log('The algorithm for the provided database was not loaded');
			return null;
		}
	}

	public static addAlgorithm(type: ConnectionType | LiveConnectionType, algorithm: (c: Connection) => Promise<any>) {
		DynamicConnection.algorithms[type] = algorithm;
	}
}
