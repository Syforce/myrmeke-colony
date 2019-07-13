import { Connection } from '../config/model/connection.model';
import { ConnectionType } from '../config/enum/connection-type.enum';

export class DynamicConnection<T> {
	private connection: T;
	private connectionConfig: Connection;

	private static algorithms = {};

	constructor(connectionConfig: Connection) {
		this.connectionConfig = connectionConfig;
	}

	public then(resolve: (value) => void, reject?: (error) => void) {
		const type: ConnectionType = this.connectionConfig.type;
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

	public static addAlgorithm(type: ConnectionType, algorithm: (c: Connection) => Promise<any>) {
		DynamicConnection.algorithms[type] = algorithm;
	}

	private createInfluxConnection(): Promise<any> {
		// const Influx = require('influx');

		// const promise: Promise<any> = new Promise((resolve: Function, reject: Function) => {
		// 	const connection = new Influx.InfluxDB({
		// 		database: this.connectionConfig.url,
		// 		host: this.connectionConfig.host
		// 	});

		// 	connection.getDatabaseNames().then((names: Array<string>) => {
		// 		if (!names.includes(this.connectionConfig.url)) {
		// 			return connection.createDatabase(this.connectionConfig.url);
		// 		}
		// 	}).then(() => {
		// 		console.log('InfluxDB connection succeded');
		// 		resolve(connection);
		// 	}, (error) => {
		// 		console.error('InfluxDB connection failed', error);
		// 		reject(error);
		// 	});
		// });

		// return promise;

		return null;
	}

	private createPostgresConnection(): Promise<any> {
		// const Postgres = require('pg');

		// const promise: Promise<any> = new Promise((resolve: Function, reject: Function) => {
		// 	const connection = new Postgres.Pool({
		// 		user: 'postgres',
		// 		host: 'localhost',
		// 		database: 'arcana',
		// 		password: '...',
		// 		port: 5432
		// 	});

		// 	connection.connect().then((client) => {
		// 		client.release();
		// 		console.log('PostgreSQL connection succeded');
		// 		resolve(connection);
		// 	}, (error) => {
		// 		console.error('PostgreSQL connection failed', error);
		// 	});
		// });

		// return promise;

		return null;
	}
}