import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = 'ap-southeast-1';
process.env.TABLE_NAME = 'SpacesTable';

handler({
  httpMethod: "POST,",
  body: JSON.stringify({
    loaction: 'Cebu'
  }),
  headers: {},
  multiValueHeaders: {},
  isBase64Encoded: false,
  path: "",
  pathParameters: null,
  queryStringParameters: {
    id: 'asdfadsfadsf'
  },
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: {
    accountId: "",
    apiId: "",
    authorizer: undefined,
    protocol: "",
    httpMethod: "",
    identity: {
      accessKey: null,
      accountId: null,
      apiKey: null,
      apiKeyId: null,
      caller: null,
      clientCert: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      cognitoIdentityId: null,
      cognitoIdentityPoolId: null,
      principalOrgId: null,
      sourceIp: "",
      user: null,
      userAgent: null,
      userArn: null
    },
    path: "",
    stage: "",
    requestId: "",
    requestTimeEpoch: 0,
    resourceId: "",
    resourcePath: ""
  },
  resource: ""
}, {} as any);

//  ts-node test/launcher.ts