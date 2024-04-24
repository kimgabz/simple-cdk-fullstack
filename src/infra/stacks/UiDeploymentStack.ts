import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { CloudFrontWebDistribution, Distribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { existsSync } from "fs";
import { join } from "path";

interface UiDeploymentStackProps extends StackProps {
  deploymentBucket: IBucket;
}

export class UiDeploymentStack extends Stack {

  constructor(scope: Construct, id: string, props: UiDeploymentStackProps) {
    super(scope, id, props);

    const uiDir = join(__dirname, '..', '..', '..', 'frontend', 'dist');

    if (existsSync(uiDir)) {
      new BucketDeployment(this, 'space-finder-ui-deployment', {
        destinationBucket: props.deploymentBucket,
        sources: [
          Source.asset(uiDir)
        ]
      });

      const originIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
      props.deploymentBucket.grantRead(originIdentity);

      const distribution = new Distribution(this, 'SpacesDistribution', {
        defaultRootObject: 'index.html',
        defaultBehavior: {
          origin: new S3Origin(props.deploymentBucket, {
            originAccessIdentity: originIdentity
          })
        }
      });

      new CfnOutput(this, 'space-ui-deploymentS3Url', {
        value: props.deploymentBucket.bucketWebsiteUrl
      });

      new CfnOutput(this, 'space-domain-name', {
        value: distribution.distributionDomainName
      });

    } else {
      console.warn('Ui directory not found: ' + uiDir)
    }

  }
}