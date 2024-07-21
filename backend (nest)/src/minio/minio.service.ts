import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;
  private readonly bucketName: string;

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: "localhost",
      port: 9000,
      useSSL: false,
      accessKey: "minio",
      secretKey: "minio123",
    });
    this.bucketName = "images";
  }

  async createBucketIfNotExists() {
    const bucketExists = await this.minioClient.bucketExists(this.bucketName);
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName);
    }
  }

  async uploadFile(folder: string, file: Express.Multer.File) {
    const fileName = `${folder}/${file.originalname}`;

    await this.minioClient.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      file.size,
    );

    return 'http://localhost:9000/images/' + fileName;
  }

  async getFileUrl(fileName: string) {
    return await this.minioClient.presignedUrl('GET', this.bucketName, fileName)
  }

  async deleteFile(fileName: string) {
    console.log(fileName)
    await this.minioClient.removeObject(this.bucketName, fileName)
  }
}
