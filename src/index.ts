import {sendToDiscordWebhook} from './util/discord';
import {readFromS3, writeToS3} from './util/s3';

type JsonDatabaseFile = {
    [key: string]: {
        day: number;
        content: string;
        avatar_url: string;
        username: string;
    };
};

const {WEBHOOK_URL} = process.env;

const DATABASE_FILE_KEY = 'pinginator.json';

/**
 * Lambda handler
 */
export async function handler(): Promise<void> {
    try {
        const s3Response = await readFromS3<JsonDatabaseFile>(
            DATABASE_FILE_KEY,
        );

        for (const [key, value] of Object.entries(s3Response)) {
            const {day, avatar_url, content, username} = value;

            await sendToDiscordWebhook(WEBHOOK_URL ?? '', {
                avatar_url,
                username,
                content: content.replace('%day%', String(day)),
            });

            s3Response[key] = {...value, day: day + 1};
        }

        await writeToS3<JsonDatabaseFile>(DATABASE_FILE_KEY, s3Response);
    } catch (err) {
        console.error(err);
    }
}
