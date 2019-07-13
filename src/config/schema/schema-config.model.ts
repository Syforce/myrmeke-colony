import { SchemaFieldConfig } from '../schema/schema-field-config.model';

export interface SchemaConfig {
	name: string;
	fields: Array<SchemaFieldConfig>;
}