import Fastfy from "fastify";
import { OpenRouterService } from "./openRouterService.ts";


// Cria um servidor para definir as rotas
// Foi adicionado uma injeção de dependência para o OpenRouterService, que é uma classe que encapsula a lógica de comunicação com a API do OpenRouter.
// Isso permite que o servidor utilize os métodos dessa classe para gerar respostas baseadas em prompts recebidos nas requisições.
export const createServer = (openRouterService: OpenRouterService) => {
    const app = Fastfy({
        logger: true,
    });

    app.post("/chat", {
        schema: {
            body: {
                type: "object",
                required: ["question"],
                properties: {
                    question: { type: "string", minLength: 5 },
                },
            }
        }
    }, async (request, reply) => {
        try {
            const { question } = request.body as { question: string; };
            const aswer = await openRouterService.generate(question);
            reply.send({ answer: aswer });
        } catch (error) {
            reply.status(500).send({ error: "Aconteceu um erro na requisição." });
        }

    });
    return app;
}