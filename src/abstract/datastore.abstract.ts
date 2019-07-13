import { Subscription } from 'rxjs';

import { datastoreService } from '../service/datastore.service';
import { SchemaConfig } from '../config/schema/schema-config.model';
import { DynamicConnection } from '../service/dynamic-connection.component';
import { ISchemaService } from '../service/abstract/schema-service.interface';

export abstract class AbstractDatastore<T> {
	private initSubscription: Subscription;

	protected connection: DynamicConnection<T>;
	protected config: SchemaConfig;
	protected schemaService: ISchemaService;

	constructor(config: SchemaConfig, schemaService: ISchemaService) {
		this.config = config;
		this.schemaService = schemaService;

		this.checkConnection();
		this.initSubscription = datastoreService.connectionObservable.subscribe((connection: DynamicConnection<T>) => {
			this.checkConnection();
		});
	}

	/**
	 * Start creating the model when the connection is created.
	 */
	protected abstract init(): void;

	protected abstract getConnection(): DynamicConnection<T>;

	private checkConnection() {
		if (!this.connection) {
			this.connection = this.getConnection();
		}

		if (this.connection) {
			this.init();
			this.unsubscribe();
		}
	}

	/**
	 * Unsubscribe the connection with the database observable.
	 * It uses a timeout so that the subscription can be created before destroying,
	 * in case of an instant Observable.
	 */
	private unsubscribe() {
		setTimeout(() => {
			this.initSubscription && this.initSubscription.unsubscribe();
		});
	}
}