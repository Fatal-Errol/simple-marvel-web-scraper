export const getCharacterIds = {
  tags: [ 'Marvel Characters' ],
  description: 'Returns all the Marvel character ids in a JSON array of numbers.',
  operationId: 'getCharacterIds',
  security: [
    {
      bearerAuth: []
    }
  ],
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Characters'
          }
        }
      }
    },
    500: {
      description: 'Unhandled server error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error'
          },
          example: {
            code: 500,
            message: 'Something went wrong',
            trace: null
          }
        }
      }
    },
  }
};

export const getCharacterById = {
  tags: [ 'Marvel Characters' ],
  description: 'Returns more details for the Marvel Character ID',
  operationId: 'getCharacterById',
  security: [
    {
      bearerAuth: []
    }
  ],
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Marvel Character ID',
      schema: {
        $ref: '#/components/schemas/identificationNumber'
      },
      required: true,
      type: 'integer'
    }
  ],
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Character'
          }
        }
      }
    },
    404: {
      description: 'Character not found',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error'
          },
          example: {
            code: 404,
            message: 'We couldn\'t find that character',
            trace: null
          }
        }
      }
    },
    409: {
      description: 'Invalid ID',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error'
          },
          example: {
            code: 409,
            message: 'We don\'t recognize the parameter id',
            trace: null
          }
        }
      }
    },
    500: {
      description: 'Unhandled server error',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Error'
          },
          example: {
            code: 500,
            message: 'Something went wrong',
            trace: null
          }
        }
      }
    },
  }
};

export const getCharacterSchema = {
  Character: {
    type: 'object',
    properties: {
      id: {
        $ref: '#/components/schemas/identificationNumber'
      },
      name: {
        $ref: '#/components/schemas/name'
      },
      description: {
        $ref: '#/components/schemas/text'
      },
    }
  },
  Characters: {
    type: 'array',
    items: {
      type: 'integer'
    },
    example: [ 63194, 81194, 22194 ]
  }
};
