"use server";
import AWS, { S3 } from "aws-sdk";
import fs from "fs";
export async function downloadFromS3(file_key: string) {
  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    });

    const s3 = new S3({
      region: process.env.NEXT_PUBLIC_S3_REGION!,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
      },
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
    };

    const obj = await s3.getObject(params).promise();

    const file_name = `/tmp/${Date.now()}-${file_key}`;
    fs.writeFileSync(file_name, obj.Body as Buffer);

    return file_name;
  } catch (error) {
    console.error(error);
    return null;
  }
}