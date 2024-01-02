import axios from 'axios';

const postData = async (picUrl, purchaseUrl) => {
    try {
    const nowTime = new Date();
      const response = await axios.post(picUrl, purchaseUrl, nowTime);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error; 
    }
  };
  
  export default postData;