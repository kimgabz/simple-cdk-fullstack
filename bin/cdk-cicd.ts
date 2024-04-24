import * as cdk from 'aws-cdk-lib';
import { CdkCicdStack } from '../src/cicd/cicd-stack';

const app = new cdk.App();
new CdkCicdStack(app, 'CdkCicdStack', {
});

app.synth();