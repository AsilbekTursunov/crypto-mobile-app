import { NewArticle } from "@/types";

export const settingCoinObject = (data: any, setCoin: (data: any) => void) => {
  setCoin({
    id: data.id,
    name: data.name,
    symbol: data.symbol,
    image: data.image.large,
    desc: data.description.en,
    price_change_percentage_24h: data.market_data.price_change_percentage_24h,
    total_volume: data.market_data.total_volume.usd,
    current_price: data.market_data.current_price.usd,
    market_cap: data.market_data.market_cap.usd,
  });
};
export const settingnewbject = (data: NewArticle, setCoin: (data: any) => void) => {
  setCoin({
    id: data.article_id,
    name: data.title,
    image: data.image_url,
    desc: data.description,
    data: data.pubDate,
    link: data.link,
  });
};
