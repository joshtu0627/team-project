import axios from 'axios';

const getData = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/story/show');
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
};

export default getData;