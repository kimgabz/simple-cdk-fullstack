import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { JsonError } from "./Validator";
import { randomUUID } from "crypto";
// import { v4 } from "uuid";

export function createRandomId() {
  // return v4();
  return randomUUID();
}

export function addCorsHeader(arg: APIGatewayProxyResult) {
  if (!arg.headers) {
    arg.headers = {}
  }
  arg.headers['Access-Control-Allow-Origin'] = '*';
  arg.headers['Access-Control-Allow-Methods'] = '*';
}

export function parseJSON(arg: string | null) {
  try {
    // (arg !== null ? JSON.parse(arg) : null)
    return JSON.parse(arg!);
  } catch (error) {
    if (error instanceof Error) {
      // If error is an instance of Error, it has a 'message' property
      throw new JsonError(error.message);
    } else if (typeof error === 'string') {
      // If error is a string, assume it's an error message
      throw new JsonError(error);
    } else {
      // Handle other types of errors here
      throw new JsonError("An unknown error occurred");
    }
  }
}

export function hasAdminGroup(event: APIGatewayProxyEvent) {
  const groups = event.requestContext.authorizer?.claims['cognito:groups'];
  if (groups) {
    return (groups as string).includes('admins');
  }
  return false;
}