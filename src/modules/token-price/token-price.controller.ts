import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TokenPriceService } from "./token-price.service";
import { TokenPriceChartDto } from "./dto/token-price.dto";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";
import { NetworkQueryDto } from "@utils/dto/chain-query.dto";

@ApiTags("Token Price")
@Controller("token-price")
export class TokenPriceController {
  constructor(private readonly tokenPriceService: TokenPriceService) {}
  @Get("/chart")
  @CacheTTL(300)
  @UseInterceptors(CacheInterceptor)
  getTokenPriceChart(@Query() data: TokenPriceChartDto) {
    return this.tokenPriceService.getTokenPriceChart(data);
  }

  @Get("")
  @CacheTTL(60)
  @UseInterceptors(CacheInterceptor)
  getLastPrice(@Query() query: NetworkQueryDto) {
    return this.tokenPriceService.getLatestPrice(query.network);
  }
}
