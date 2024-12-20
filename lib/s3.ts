import { S3 } from "@aws-sdk/client-s3";

export async function uploadToS3(
  file: File
): Promise<{ file_key: string; file_name: string }> {
  return new Promise((resolve, reject) => {
    try {
      if (
        !process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID ||
        !process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY ||
        !process.env.NEXT_PUBLIC_S3_BUCKET_NAME
      ) {
        throw new Error("S3 credentials are not set");
      }
      const s3 = new S3({
        region: process.env.NEXT_PUBLIC_S3_REGION!,
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      });
      const file_key =
        "uploads/" + Date.now().toString() + file.name.replace(" ", "-");
      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
        Body: file,
      };
      s3.putObject(params, () => {
        return resolve({
          file_key,
          file_name: file.name,
        });
      });
    } catch (error) {
      console.error("Cannot upload to S3:", error);
      reject(error);
    }
  });
}

export function getS3Url(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${file_key}`;
  return url;
}
