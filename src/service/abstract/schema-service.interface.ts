import { SchemaConfig } from '../../config/schema/schema-config.model';
import { SchemaFieldType } from '../../config/enum/schema-field-type.enum';

export interface ISchemaService {
	
	generate(config: SchemaConfig): any;

	getFieldType(type: SchemaFieldType): any;
}