import fetch from 'node-fetch';

type Maybe<T> = T | null | undefined;

export type DiscordWebhookPayload = {
    username: string;
    avatar_url: string;
    content: Maybe<string>;
    embeds?: Array<DiscordEmbed>;
};

export type DiscordEmbed = {
    title: string;
    description: string;
    url: string;
    color: number;
    author: {
        name: string;
        url: string;
        icon_url: string;
    };
    footer: {
        text: string;
    };
    timestamp: string;
};

/**
 * Send payload to discord webhook
 */
export async function sendToDiscordWebhook(
    url: string,
    payload: DiscordWebhookPayload,
) {
    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
    } catch (err) {
        console.error('Failed to send to discord: ', err);
    }
}
