import {
  appName, appVersion, appDescription, appAuthor, appEnv
} from '../config/app';
import { getCharacterIds, getCharacterById, getCharacterSchema } from './characters';

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: appVersion,
    title: appName,
    description: appDescription,
    termsOfService: '',
    contact: appAuthor,
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: `${appEnv} API server`,
    }
  ],
  tags: [
    {
      name: 'Marvel Characters'
    }
  ],
  paths: {
    '/characters': {
      get: getCharacterIds
    },
    '/characters/{id}': {
      get: getCharacterById
    }
  },
  components: {
    schemas: {
      identificationNumber: {
        type: 'integer',
        description: 'Identification number',
        example: 1009146
      },
      name: {
        type: 'string',
        example: 'John Doe'
      },
      text: {
        type: 'string',
        example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      Error: {
        type: 'object',
        properties: {
          code: {
            type: 'integer'
          },
          message: {
            type: 'string'
          },
          trace: {
            type: 'string'
          },
        }
      },
      ...getCharacterSchema
    }
  }
};
