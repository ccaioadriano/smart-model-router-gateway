import { OpenRouter } from "@openrouter/sdk";
import { config, type ConfigModel } from "./config.ts";
import { type ChatGenerationParamsProvider } from "@openrouter/sdk/models";



// Classe responsável por encapsular a lógica de comunicação com a API do OpenRouter.
export class OpenRouterService {
    private client: OpenRouter;
    private config: ConfigModel;

    constructor(configOverride: ConfigModel) {
        this.config = configOverride ?? config;
        this.client = new OpenRouter({
            apiKey: this.config.apiKey,
            xTitle: this.config.appTitle,
        })
    }

    async generate(prompt: string) {
        const response = await this.client.chat.send({
            model: this.config.models?.[0],
            messages: [
                { role: "system", content: this.config.systemPrompt ?? 'You are a helpful assistant that provides concise and accurate answers to user questions.' },
                { role: "user", content: prompt }
            ],
            temperature: this.config.temperature ?? 0.2,
            stream: false,

            provider: this.config.provider as ChatGenerationParamsProvider['provider'],

        })

        const answer = response.choices[0]?.message?.content ?? '';

        return {
            'model': this.config.models?.[0],
            'answer': answer
        };
    }
}