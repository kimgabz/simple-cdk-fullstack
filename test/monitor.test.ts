import { SNSEvent } from "aws-lambda";
import { handler } from "../src/services/monitor/handler";

const snsEvent: SNSEvent = {
  Records: [{
    Sns: {
      Message: 'This is a test',
      SignatureVersion: "",
      Timestamp: "",
      Signature: "",
      SigningCertUrl: "",
      MessageId: "",
      MessageAttributes: {},
      Type: "",
      UnsubscribeUrl: "",
      TopicArn: ""
    },
    EventVersion: "",
    EventSubscriptionArn: "",
    EventSource: ""
  }]
};

handler(snsEvent, {
  callbackWaitsForEmptyEventLoop: false,
  functionName: "",
  functionVersion: "",
  invokedFunctionArn: "",
  memoryLimitInMB: "",
  awsRequestId: "",
  logGroupName: "",
  logStreamName: "",
  getRemainingTimeInMillis: function (): number {
    throw new Error("Function not implemented.");
  },
  done: function (error?: Error | undefined, result?: any): void {
    throw new Error("Function not implemented.");
  },
  fail: function (error: string | Error): void {
    throw new Error("Function not implemented.");
  },
  succeed: function (messageOrObject: any): void {
    throw new Error("Function not implemented.");
  }
});

// ts-node test/monitor.test.ts