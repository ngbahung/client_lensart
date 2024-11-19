import axios from 'axios';

const BASE_URL = 'https://provinces.open-api.vn/api';

export const fetchCities = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/p`);
    return data
      .filter(city => !city.name.includes('Tỉnh'))
      .map(city => ({
        value: String(city.code),
        label: city.name
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  } catch (error) {
    throw new Error('Failed to fetch cities');
  }
};

export const fetchDistricts = async (cityCode) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/p/${cityCode}?depth=2`);
    return data.districts
      .map(district => ({
        value: String(district.code),
        label: district.name
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  } catch (error) {
    throw new Error('Failed to fetch districts');
  }
};

export const fetchWards = async (districtCode) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/d/${districtCode}?depth=2`);
    return data.wards
      .map(ward => ({
        value: String(ward.code),
        label: ward.name
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  } catch (error) {
    throw new Error('Failed to fetch wards');
  }
};