import api from '../utils/api';

// get all brands
export const getBrands = async () => {
    try {
      const response = await api.get('active/brands');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  };

// Expected response structure from getBrands:
/*
{
  "data": [
    { "id": 1, "name": "RAYBAN" },
    { "id": 7, "name": "BOLON" },
    { "id": 8, "name": "JILL STUART" },
    { "id": 9, "name": "MERCURY" },
    { "id": 10, "name": "MOLSON" },
    { "id": 11, "name": "NEWBALANCE" },
    { "id": 12, "name": "POVINO" },
    { "id": 13, "name": "SEESON" }
    // ... other brands
  ]
}
*/

// get brand by id
export const getBrandById = async (id) => {
  try {
    const response = await api.get(`/active/brands/getById/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching brand:', error);
    throw error;
  }
}