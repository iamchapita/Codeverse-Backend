import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: "https://codeverse-frontend-eta.vercel.app//",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: "Content-Type, Accept",
		exposedHeaders: "Custom-Header",
		optionsSuccessStatus: 200,
		preflightContinue: false,
		credentials: true,
	});
	await app.listen(3000);
}
bootstrap();
