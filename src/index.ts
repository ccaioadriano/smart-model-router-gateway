import { createServer } from './server.ts';
import { config } from './config.ts';
import { OpenRouterService } from './openRouterService.ts';

// Start da aplicação, criando uma instância do OpenRouterService com a configuração definida e iniciando o servidor Fastify.

const openRouterService = new OpenRouterService(config);
const app = createServer(openRouterService);

app.listen({ port: config.port ?? 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});