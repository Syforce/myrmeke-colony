import { Observable, Subject } from 'rxjs';

import { Connection } from '../config/model/connection.model';
import { ConnectionType } from '../config/enum/connection-type.enum';
import { DynamicConnection } from './dynamic-connection.component';
import { AbstractDatastore } from "../abstract/datastore.abstract";

import { SchemaConfig } from '../config/schema/schema-config.model';
import { SchemaFieldConfig } from '../config/schema/schema-field-config.model';

export class DatastoreService {
    private readonly datastores = {};
    private readonly connectionMap = {};

    constructor() {
        console.log('Dev message: RegisterDatastoreService created');
    }

    public init(databases: Array<Connection>) {
        databases.forEach((item: Connection) => {
            const instance: DynamicConnection<any> = new DynamicConnection(item);

            instance.then((value) => {
                this.connectionMap[item.type] = instance;
                const keys: Array<string> = Object.keys(this.datastores);

                keys.forEach((key: string) => {
                    const datastore: AbstractDatastore<any> = this.datastores[key];

                    if (datastore.connectionType == item.type) {
                        datastore.init(instance);
                    }
                });
            }, (error) => {
                console.error('Database error detected in RegisterDatastoreService', error);
            });
        });
    }

    public getConnection(type: ConnectionType): DynamicConnection<any> {
        return this.connectionMap[type];
    }

    /**
     * Init singleton datastore instances
     */
    public initDatastores(classList: Array<any>) {
        classList.forEach((className) => {
            if (this.datastores[className.name]) {
                console.log(`Dev message: Datastore ${className.name} already registered`);
            } else {
                const instance: AbstractDatastore<any> = new className();

                this.datastores[className.name] = instance;
            }
        });

        this.mapDatastoreConfigs();
        this.prioritizeDependencies();
    }

    private mapDatastores = {};

    private mapDatastoreConfigs() {
        const keys: Array<string> = Object.keys(this.datastores);

        keys.forEach((key: string) => {
            const instance: AbstractDatastore<any> = this.datastores[key];
            this.mapDatastores[instance.getConfig().name] = instance;
        });
    }

    /**
     * Return singleton instance of datastore by given datastore type
     * @param datastoreType
     */
    public getDatastore(datastoreType: any): any {
        return this.datastores[datastoreType.name];
    }

    private localMap = {};

    private prioritizePeerDependencies(name: string) {
        if (this.localMap[name] === undefined) {
            const instance: AbstractDatastore<any> = this.mapDatastores[name];
            const fields: Array<SchemaFieldConfig> = instance.getConfig().fields;
            const localMap = {};

            let value: number = 0;

            fields.forEach((field: SchemaFieldConfig) => {
                if (field.relationalConfig) {
                    const name: string = field.relationalConfig.split('(')[0];

                    if (name != instance.getConfig().name) {
                        if (!localMap[name]) {
                            localMap[name] = true;
                            value += 1 + this.prioritizePeerDependencies(name);
                        }
                    }
                }
            });

            this.localMap[name] = value;
            return value;
        } else {
            return this.localMap[name];
        }
    }

    private prioritizeDependencies() {
        const keys: Array<string> = Object.keys(this.mapDatastores);

        keys.forEach((key: string) => {
            this.localMap[key] = this.prioritizePeerDependencies(key);
        });
    }
}

export const datastoreService: DatastoreService = new DatastoreService();