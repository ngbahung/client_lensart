import axios from 'axios';

const BASE_URL = 'https://provinces.open-api.vn/api/v2';

const publicApi = axios.create({
  baseURL: BASE_URL
});

export const fetchCities = async () => {
  try {
    const { data } = await publicApi.get('/p/');
    return data
      .map(city => ({
        value: String(city.code),
        label: city.name
          .replace('Tỉnh ', '')
          .replace('Thành phố ', 'TP. ')
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  } catch (error) {
    throw new Error('Failed to fetch cities');
  }
};

export const fetchDistricts = async (cityCode) => {
  try {
    const { data } = await publicApi.get(`/p/${cityCode}?depth=2`);
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
    const { data } = await publicApi.get(`/w/${districtCode}?depth=2`);
    // The new API returns ward data directly for /w/{code} endpoint
    // If data.wards exists (from district), use it; otherwise data is the ward itself
    const wards = data.wards || [data];
    return wards
      .map(ward => ({
        value: String(ward.code),
        label: ward.name
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  } catch (error) {
    throw new Error('Failed to fetch wards');
  }
};