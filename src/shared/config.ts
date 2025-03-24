import { plainToInstance } from 'class-transformer'
import { IsNumber, IsString, validateSync } from 'class-validator'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'
config({
  path: path.resolve('.env'),
})
//Kiểm tra xem đã có file .env hay chưa?
if (!fs.existsSync(path.resolve('.env'))) {
  console.log('File .env not exist')
  //Ngừng ứng dụng
  process.exit(1)
}

class ConfigSchema {
  @IsString()
  DATABASE_URL: string
  @IsNumber()
  PORT: number
  @IsString()
  ACCESS_TOKEN_SECRET: string
  @IsString()
  ACCESS_TOKEN_EXPIRES_IN: string
  @IsString()
  REFRESH_TOKEN_SECRET: string
  @IsString()
  REFRESH_TOKEN_EXPIRES_IN: string
}
// console.log(process.env)
const configServer = plainToInstance(ConfigSchema, process.env, {
  enableImplicitConversion: true,
})
const errorArray = validateSync(configServer)
if (errorArray.length > 0) {
  console.log('Các giá trị khai báo trong file .env không hợp lệ')
  const errors = errorArray.map((eitem) => {
    return {
      property: eitem.property,
      constraints: eitem.constraints,
      value: eitem.value,
    }
  })
  throw errors
}
// console.log(configServer)
const envConfig = configServer
export default envConfig
