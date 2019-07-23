import { ConnectionType } from '../enum/connection-type.enum';

export class Connection {
	public url: string;
	public host: string;
	public type: ConnectionType;
	public user?: string;
	public password?: string;
	public portn?: number;
}