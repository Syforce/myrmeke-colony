import { Connection } from '../config/model/connection.model';
import { ConnectionType } from '../config/enum/connection-type.enum';

export class DynamicConnection<T> {
	private connection: T;
	private connectionConfig: Connection;

	constructor(connectionConfig: Connection) {
		this.connectionConfig = connectionConfig;
	}

	public then(resolve: (value) => void, reject?: (error) => void) {
		const type: ConnectionType = this.connectionConfig.type;
		let promise: Promise<any>;

		switch (type) {
			case ConnectionType.MONGO_DB: {
				promise = this.createMongoConnection();
				break;
			}
			case ConnectionType.INFLUX_DB: {
				promise = this.createInfluxConnection();
				break;
			}
			case ConnectionType.POSTGRES: {
				promise = this.createPostgresConnection();
				break;
			}
		}

		promise.then((value) => {
			this.connection = value;
			resolve(value);
		}, (error) => {
			reject(error);
		});
	}

	public getConnection(): T {
		return this.connection;
	}

	private createMongoConnection(): Promise<any> {
		// const Mongoose = require('mongoose');

		// const promise: Promise<any> = new Promise((resolve: Function, reject: Function) => {
		// 	Mongoose.createConnection(`mongodb://${this.connectionConfig.host}/${this.connectionConfig.url}`, {
		// 		useNewUrlParser: true
		// 	}).then((connection: T) => {
		// 		console.log('MongoDB connection succeded');
		// 		resolve(connection);
		// 	}, (error) => {
		// 		console.error('MongoDB connection failed', error);
		// 		reject(error);
		// 	});
		// });

		// return promise;

		return null;
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