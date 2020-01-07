import { ConnectionType } from '../enum/connection-type.enum';
import { LiveConnectionType } from '../enum/live-connection-type.enum';

export class Connection {
	public database: string;
	public host: string;
	public type: ConnectionType | LiveConnectionType;
	public user?: string;
	public password?: string;
	public port?: number;
}

export const cloneConnection = (connection: Connection, config?: { type?: ConnectionType | LiveConnectionType }): Connection => {
	const newConnection: Connection = new Connection();

	newConnection.database = connection.database;
	newConnection.host = connection.host;
	newConnection.type = config ? config.type : connection.type;
	newConnection.user = connection.user;
	newConnection.password = connection.password;
	newConnection.port = connection.port;

	return newConnection;
}