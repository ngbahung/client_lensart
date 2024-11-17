const BASE_URL = 'https://provinces.open-api.vn/api';

export const fetchCities = async () => {
  const response = await fetch(`${BASE_URL}/p`);
  const data = await response.json();
  return data.map(city => ({
    value: String(city.code),  // Convert to string to ensure consistency
    label: city.name
  }));
};

export const fetchDistricts = async (cityCode) => {
  const response = await fetch(`${BASE_URL}/p/${cityCode}?depth=2`);
  const data = await response.json();
  return data.districts.map(district => ({
    value: String(district.code),  // Convert to string to ensure consistency
    label: district.name
  }));
};

export const fetchWards = async (districtCode) => {
  const response = await fetch(`${BASE_URL}/d/${districtCode}?depth=2`);
  const data = await response.json();
  return data.wards.map(ward => ({
    value: String(ward.code),  // Convert to string to ensure consistency
    label: ward.name
  }));
};