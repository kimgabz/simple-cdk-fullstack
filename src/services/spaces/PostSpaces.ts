import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { validateAsSpaceEntry } from "../util/Validator";
import { createRandomId, parseJSON } from "../util/other";

export async function postSpaces(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
  // const randomId = v4();
  // const item = JSON.parse(event.body as string);
  const randomId = createRandomId();
  const item = parseJSON(event.body);
  item.id = randomId;
  validateAsSpaceEntry(item);

  const res = await ddbClient.send(new PutItemCommand({
    TableName: process.env.TABLE_NAME,
    // Item: {
    //   id: {
    //     S: randomId
    //   },
    //   location: {
    //     S: item.location
    //   }
    // }
    Item: marshall(item)
  }));
  console.log(res);

  return {
    statusCode: 201,
    body: JSON.stringify({ id: randomId })
  }
}