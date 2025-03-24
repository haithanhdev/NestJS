import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common'
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove all fields that are not in the DTO with decorator
      forbidNonWhitelisted: true, //Nếu field không được khai báo với decorator trong DTO mà client truyền lên thì sẽ báo lỗi
      transform: true, // Tự động chuyển đổi dữ liệu sang kiểu được khai báo trong DTO
      transformOptions: { enableImplicitConversion: true }, //Chuyển dữ liệu ngầm định trong DTO
      exceptionFactory: (validationErrors) => {
        //customize message
        // console.log(validationErrors)
        return new UnprocessableEntityException(
          validationErrors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints as any).join(', '),
          })),
        )
      },
    }),
  )
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
