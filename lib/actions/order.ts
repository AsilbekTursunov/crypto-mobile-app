import axios from 'axios'

export const fetchCoins = async ({ pageParam = 1 }) => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=${pageParam}`, {
    method: 'GET',
    headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-G7Uhr5kaudo3ZCw8LWEit8Mj' }
  }
  );
  return response.json();
};
//  key 8131d9ef-1369-4348-8588-5f68e1e09999

export const get100Coins = async () => {
  const coins = await axios
    .get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
    .then((response) => {
      // console.log("RESPONSE>>>", response.data);
      return response.data;
    })
    .catch((error) => {
      // console.log("ERROR>>>", error.message);
    });

  return coins;
};

export const getCoinData = async (id: string) => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
    method: 'GET',
    headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-G7Uhr5kaudo3ZCw8LWEit8Mj' }
  });
  return response.json();
};


export const getPrices = (id: string, days: number, setError: (value: boolean) => void) => {
  const prices = fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=${days}`, {
    method: 'GET',
    headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-G7Uhr5kaudo3ZCw8LWEit8Mj' }
  }
  )
    .then(res => res.json())
    .then((response) => {
      if (response) {
        // console.log(response)
        return response;
      }
    })
    .catch((e) => {
      console.log('error messge', e.message);
      if (setError) {
        setError(true);
      }
    });

  return prices;
};
const apikey = "pub_41555da7d1fc0b27580ff4737791628569728";
export const getNews = (value?: string) => {
  const prices = fetch(`https://newsdata.io//api/1/news?apikey=${apikey}&q=${value ? value : "cryptocurrency"}`)
    .then(res => res.json())
    .then((response) => {
      if (response) {
        return response;
      }
    })
    .catch((e) => {
      console.log('error messge', e.message);
    });

  return prices;
};
