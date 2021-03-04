export const characters = {};

export const character = characters[0];

export const serverError = {
  message: 'Something went wrong',
  stack: ''
};

export const apiError = {
  // I removed the other stuff that is not important
  response: {
    status: 409,
    statusText: 'Conflict',
    headers: {},
    config: {},
    request: {},
    data: {code: 409, status: "We don't recognize the parameter id"}
  }
};
