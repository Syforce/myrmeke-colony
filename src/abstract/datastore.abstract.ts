import { datastoreService } from '../service/datastore.service';
import { SchemaConfig } from '../config/schema/schema-config.model';
import { DynamicConnection } from '../service/dynamic-connection.component';
import { ISchemaService } from '../service/abstract/schema-service.interface';
import { ConnectionType } from '../config/enum/connection-type.enum';

export abstract class AbstractDatastore<T> {
	protected connection: DynamicConnection<T>;
	protected config: SchemaConfig;
	protected schemaService: ISchemaService;

	public readonly connectionType: ConnectionType;

	constructor(type: ConnectionType, config: SchemaConfig, schemaService: ISchemaService) {
		this.connectionType = type;
		this.config = config;
		this.schemaService = schemaService;
	}

	public getConfig(): SchemaConfig {
		return this.config;
	}

	/**
	 * Start creating the model when the connection is created.
	 */
	public abstract init(connection: DynamicConnection<any>): void;
}
