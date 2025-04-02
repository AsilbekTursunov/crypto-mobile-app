import { TextInputProps } from "react-native";

declare interface InputFieldProps extends TextInputProps {
  label?: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}


declare interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string; // ISO Date format (e.g., "2025-01-20T09:11:54.494Z")
  atl: number;
  atl_change_percentage: number;
  atl_date: string; // ISO Date format
  roi: null | {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string; // ISO Date format
}


declare interface CoinDetails {
  id: string,
  name: string,
  symbol: string,
  image: string,
  desc: string,
  price_change_percentage_24h: number,
  total_volume: number,
  current_price: number,
  market_cap: number,
}

declare type Chart = [number, number, number, number, number]

declare interface IChart {
  market_caps: Chart[] 
  prices: Chart[] 
  total_volumes: Chart[] 
}

declare interface NewArticle {
  ai_org?: string;
  ai_region?: string;
  ai_tag?: string;
  article_id: string;
  category: string[];
  content?: string;
  country: string[];
  creator: string[];
  description: string;
  duplicate: boolean;
  image_url: string;
  keywords: string[];
  language: string;
  link: string;
  pubDate: string;
  pubDateTZ: string;
  sentiment?: string;
  sentiment_stats?: string;
  source_icon: string;
  source_id: string;
  source_name: string;
  source_priority: number;
  source_url: string;
  title: string;
  video_url?: string | null;
};
interface IUser {
  email: string,
  id: string,
  image: string,
  username: string,
  createdAt?: string
}

interface Coin {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  listedAt: number;
  tier: number;
  change: string;
  rank: number;
  sparkline: string[];
  lowVolume: boolean;
  coinrankingUrl: string;
  "24hVolume": string;
  btcPrice: string;
  contractAddresses: string[];
}
