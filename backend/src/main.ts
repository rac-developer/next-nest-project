import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('Products API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Prefijo global para la API
  app.setGlobalPrefix('api');
  // Importante, es lo que va a permitir al navegador hacer las consultas al backend sin bloquearlas
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
