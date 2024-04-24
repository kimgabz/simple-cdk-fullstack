import { handler } from "../../../src/services/monitor/handler";

describe('Monitor lambda tests', () => {

  const fetchSpy = jest.spyOn(global, 'fetch');
  fetchSpy.mockImplementation(() => Promise.resolve({} as any));

  const context = {
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
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('makes requests for records in SnsEvents', async () => {
    await handler({
      Records: [{
        Sns: {
          Message: 'Test message'
        }
      }]
    } as any, context);

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(expect.any(String), {
      method: 'POST',
      body: JSON.stringify({
        "text": `Huston, we have a problem: Test message`
      })
    });
  });

  test('No sns records, no requests', async () => {
    await handler({
      Records: []
    } as any, context);

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});