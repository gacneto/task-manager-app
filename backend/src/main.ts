import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('Documentação da API do Gerenciador de Tarefas')
    .setVersion('1.0')
    .addTag('auth', 'Operações de Autenticação') 
    .addTag('users', 'Operações de Usuários')   
    .addTag('tasks', 'Operações de Tarefas')   
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
