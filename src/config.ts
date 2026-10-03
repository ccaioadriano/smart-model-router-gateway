import type { ChatGenerationParamsProvider } from "@openrouter/sdk/models";

console.assert(process.env.OPENROUTER_API_KEY, 'OPENROUTER_API_KEY is not set in .env file');

// Arquivo de configuração da aplicação, contendo as variáveis necessárias para a comunicação com a API do OpenRouter e outras configurações relevantes.

export type ConfigModel = {
    apiKey: string;
    port: number;
    httpReferer?: string;
    appTitle?: string;
    models?: string[];
    maxTokens?: number;
    temperature?: number;
    systemPrompt?: string;

    provider: ChatGenerationParamsProvider;
};

export const config: ConfigModel = {
    apiKey: process.env.OPENROUTER_API_KEY as string,
    httpReferer: '', // opcional
    appTitle: 'Smart Model Router Gateway', // opcional
    port: 3000,
    models: [
        'openai/gpt-oss-20b'
    ],
    maxTokens: 100,
    temperature: 0.2,
    systemPrompt: 'Você é um assistente que fornece respostas concisas e precisas às perguntas dos usuários.', // opcional
    provider: {
        sort: 'price'
    }
};