import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { NewsService } from "./news.service";
import { GetCurrentUserId, Public } from "src/common/decorators/auth";
import { News } from "./types";
import { NewsDto } from "./dto";
import { NewsDtoUpdate } from "./dto/news-update.dto";

@Controller("news")
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Public()
  @Get("/read")
  @HttpCode(HttpStatus.OK)
  read(@Body() body: { newsId: number }): Promise<News> {
    return this.newsService.read(body.newsId);
  }

  @Post("/create")
  @HttpCode(HttpStatus.OK)
  create(@Body() dto: NewsDto, @GetCurrentUserId() userId: number): Promise<News> {
    return this.newsService.create(dto, userId);
  }
  @Post("/update")
  @HttpCode(HttpStatus.OK)
  update(@Body() dto: NewsDtoUpdate, @GetCurrentUserId() userId: number): Promise<News> {
    return this.newsService.update(dto, userId);
  }
  @Post("/delete")
  @HttpCode(HttpStatus.OK)
  delete(@Body() dto: NewsDtoUpdate, @GetCurrentUserId() userId: number): Promise<News> {
    return this.newsService.delete(dto, userId);
  }
}
