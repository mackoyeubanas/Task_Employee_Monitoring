import axios from 'axios';

export const getStatistics = async () => {
    try {
        const res = await axios.get(`/api/v1/statistics`)
        if (res && res.status === 200 && res.data.status === 'success') return res.data.stats
    } catch (err) {
        return {
            status: 404,
            message: err.response.data.message
        }
    }
}