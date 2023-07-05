import { BadRequestException, Injectable, InternalServerErrorException, MethodNotAllowedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { News } from "./types";
import { NewsDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NewsDtoUpdate } from "./dto/news-update.dto";

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}


  async read(id: number): Promise<News> {
    const news = await this.prisma.news.findFirst({
      where: {
        id
      },
    });
    return news;
  }
  
  async create(dto: NewsDto, userId: number): Promise<News> {
    const news = await this.prisma.news
      .create({
        data: {
          title: dto.title,
          description: dto.description,
          userId,
        },
      })
      .catch(error => {
        throw error;
      });

    return news;
  }
  async update(dto: NewsDtoUpdate, userId: number): Promise<News> {
    try {
        const news = await this.prisma.news.findFirst({
            where: {
                id: dto.newsId,
                userId
            }
        })
        if(!news){
            throw new MethodNotAllowedException('У вас недостаточно прав')
        } else {
            return this.prisma.news.update({
              where: {
                id: dto.newsId,
                userId
              },
              data: {
                  title: dto.title,
                  description: dto.description
              },
            });
        }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new BadRequestException("Credentials incorrect");
        }
      }

      if(error instanceof MethodNotAllowedException) {
        throw error;
      }

      throw new InternalServerErrorException();
    }
  }
  async delete(dto: NewsDtoUpdate, userId: number): Promise<News> {
    try {
        const news = this.prisma.news.findFirst({
            where: {
                id: dto.newsId,
                userId
            }
        })
        if(!news){
            throw new Error('У вас недостаточно прав')
        } else {
            return this.prisma.news.delete({
              where: {
                id: dto.newsId,
                userId: userId
              },
            });
        }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new BadRequestException("Credentials incorrect");
        }
      }
      if(error instanceof MethodNotAllowedException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
