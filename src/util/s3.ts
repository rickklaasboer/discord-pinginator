import {GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import type {Readable} from 'stream';

const {S3_BUCKET} = process.env;

const s3Client = new S3Client({});

/**
 * Converts readable stream to string
 *
 * @see https://github.com/aws/aws-sdk-js-v3/issues/1877
 */
export async function streamToString(stream: Readable): Promise<string> {
    return new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () =>
            resolve(Buffer.concat(chunks).toString('utf-8')),
        );
    });
}

/**
 * Write to s3
 */
export async function writeToS3<T extends Record<string, unknown>>(
    key: string,
    value: T,
): Promise<void> {
    try {
        const cmd = new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: key,
            Body: JSON.stringify(value),
        });
        await s3Client.send(cmd);
    } catch (err) {
        console.error(err);
    }
}

/**
 * Read from s3
 */
export async function readFromS3<T = unknown>(key: string): Promise<T> {
    try {
        const cmd = new GetObjectCommand({
            Bucket: S3_BUCKET,
            Key: key,
        });
        const {Body} = await s3Client.send(cmd);
        const stringBody = await streamToString(Body as Readable);

        return JSON.parse(stringBody) as T;
    } catch (err) {
        console.error('getHashFromS3', err);
        throw err;
    }
}
