import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS,
    methods: ["GET","POST","PUT","DELETE"],
    preflightContinue: true,
    credentials: true
  });
  await app.listen(3000);
}
bootstrap();
