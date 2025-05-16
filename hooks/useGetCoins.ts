import axios from 'axios' 
import { useState } from 'react'

const useGetCoins = () => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState()
	const [error, setError] = useState()
	const fetchCoins = async ({ pageParam = 1 }: { pageParam: number }) => {
		setLoading(true)
		try {
			const { data } = await axios({
				url: `https://api.coinranking.com/v2/coins/trending`,
				headers: {
					accept: 'application/json',
					'x-access-token': 'coinranking3584f1ca7d4f9bbd2c1504538dc23c3472610e79ea383e85',
				},
				params: {
					offset: pageParam,
					limit: 50, // bu kerak — qaysi sahifa nechta element olishini belgilaydi
				},
			})
			setData(data.data.coins)
			// setTotal(data.stats.totalCoins)
		} catch (error: any) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	const refetch = async (page: number) => {
		await fetchCoins({ pageParam: page })
	}

	return { data, fetchCoins, refetch, loading, error }
}

export default useGetCoins
