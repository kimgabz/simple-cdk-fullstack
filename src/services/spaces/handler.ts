// import { v4 } from 'uuid';
// import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
// const s3Client = new S3Client({});
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  APIGatewayProxyEvent, APIGatewayProxyResult, Context
} from "aws-lambda";
import { postSpaces } from "./PostSpaces";
import { getSpaces } from "./GetSpaces";
import { updateSpace } from "./UpdateSpace";
import { JsonError, MissingFieldError } from "../util/Validator";
import { deleteSpace } from "./DeleteSpace";
import { addCorsHeader } from "../util/other";
import { captureAWSv3Client, getSegment } from "aws-xray-sdk-core";

// const ddbClient = new DynamoDBClient({});
const ddbClient = captureAWSv3Client(new DynamoDBClient({}))

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  // const command = new ListBucketsCommand({});
  // const res = await s3Client.send(command);
  // const listBucketsResult = res.Buckets;

  let res: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify({})
  };

  const subSeg = getSegment()!.addNewSubsegment('MyLongCall')
  await new Promise(resolve => { setTimeout(resolve, 3000) });
  subSeg.close();

  const subSeg2 = getSegment()!.addNewSubsegment('MyLongCall')
  await new Promise(resolve => { setTimeout(resolve, 500) })
  subSeg2.close();

  try {
    switch (event.httpMethod) {
      case 'GET':
        res = await getSpaces(event, ddbClient);
        break;
      case 'POST':
        res = await postSpaces(event, ddbClient);
        break;
      case 'PUT':
        res = await updateSpace(event, ddbClient);
        break;
      case 'DELETE':
        res = await deleteSpace(event, ddbClient);
        console.log(res);
        break;
      default:
        break;
    }
    addCorsHeader(res);
    return res;
  } catch (error) {
    if (error instanceof JsonError || error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: error.message
      }
    } else if (error instanceof Error) {
      // If error is an instance of Error, it has a 'message' property
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify(error.message)
      };
    } else {
      // Handle other types of errors here
      console.error('Unknown error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify('An unknown error occurred')
      };
    }
  }
}

export { handler }
