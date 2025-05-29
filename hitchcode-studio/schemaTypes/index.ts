import {type SchemaTypeDefinition} from 'sanity'
import post from './post.js'
import category from './category.js'

export const schemaTypes: SchemaTypeDefinition[] = [post, category]

export const schema: {types: SchemaTypeDefinition[]} = {
  types: schemaTypes,
}
