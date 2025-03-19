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