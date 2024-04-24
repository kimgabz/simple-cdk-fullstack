import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";

export async function postSpaces2(event: APIGatewayProxyEvent, ddbClient: DynamoDBClient): Promise<APIGatewayProxyResult> {
  const randomId = v4();
  const item = JSON.parse(event.body as string);
  item.id = randomId;

  const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

  const res = await ddbDocClient.send(new PutItemCommand({
    TableName: process.env.TABLE_NAME,
    // Item: {
    //   id: {
    //     S: randomId
    //   },
    //   location: {
    //     S: item.location
    //   }
    // }
    Item: item
  }));
  console.log(res);

  return {
    statusCode: 201,
    body: JSON.stringify({ id: randomId })
  }
}