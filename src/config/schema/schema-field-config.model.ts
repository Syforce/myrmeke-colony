import { SchemaFieldType } from '../enum/schema-field-type.enum';

export interface SchemaFieldConfig {
    name: string;
    type: SchemaFieldType;
    length?: number;
    relationalConfig?: string;
}
