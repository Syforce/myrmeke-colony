import { SchemaFieldConfig } from './schema-field-config.model';

export interface SchemaConfig {
	name: string;
	fields: Array<SchemaFieldConfig>;
	extends?: string;
	primaryKey?: Array<string>;
}
