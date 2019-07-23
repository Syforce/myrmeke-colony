import { ConnectionType } from '../enum/connection-type.enum';

export class Connection {
	public database: string;
	public host: string;
	public type: ConnectionType;
	public user?: string;
	public password?: string;
	public port?: number;
}