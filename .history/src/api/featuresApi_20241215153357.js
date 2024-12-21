import api from '../utils/api';

export const getFeatures = async () => {
    try {
      const response = await api.get('/active/features');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching features:', error);
      throw error;
    }
  };

export const getFeature = async (featureId) => {
    try {
      const response = await axios.get(`/active/features/${featureId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching feature:', error);
      throw error;
    }
};

// export const createFeature = async (featureData) => {
//     try {
//       const response = await axios.post(`/active/features`, featureData);
//       return response.data.data;
//     } catch (error) {
//       console.error('Error creating feature:', error);
//       throw error;
//     }
// };

// export const updateFeature = async (featureId, featureData) => {
//     try {
//       const response = await axios.put(`/active/features/${featureId}`, featureData);
//       return response.data.data;
//     } catch (error) {
//       console.error('Error updating feature:', error);
//         throw error;
//     }
// }
