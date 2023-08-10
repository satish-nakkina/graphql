


const axios = require('axios');

const REST_API_URL = 'https://api.coinstats.app/public/v1/coins';

exports.Query= {
    coins: async (_, { skip, limit, currency }) => {
      try {
        const response = await axios.get(REST_API_URL, {
          params: {
            skip,
            limit,
            currency,
          },
        });
        
        const coinsData = response.data.coins;
        
        const coins = coinsData.map((coin) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          price: coin.price,
        }));

        return coins;
      } catch (error) {
        throw new Error('Failed to fetch coins.');
      }
    },
};

