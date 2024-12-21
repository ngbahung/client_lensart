import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";

const EditProduct = ({ product, onClose, onUpdate }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [material, setMaterial] = useState("");
  const [shape, setShape] = useState("");
  const [brand, setBrand] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState([]);  // Change to array for multiple selections
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [loadingMaterials, setLoadingMaterials] = useState(false);
  const [shapes, setShapes] = useState([]);
  const [loadingShapes, setLoadingShapes] = useState(false);
  const [featuresList, setFeaturesList] = useState([]);
  const [loadingFeatures, setLoadingFeatures] = useState(false);
  const [productFeatures, setProductFeatures] = useState([]); // Add new state for product features

  // Thêm các hàm helper để kiểm tra loại category
  const isContactLens = (categoryId) => categoryId === "1"; // Tròng Kính
  const isEyeglassFrame = (categoryId) => categoryId === "1"; // Gọng Kính
  const isSunglasses = (categoryId) => categoryId === "2"; // Kính râm

  // Thay thế hàm shouldFieldsBeDisabled cũ
  const shouldFieldBeDisabled = (fieldType) => {
    if (!category) return true;
    if (loadingCategories) return true;

    switch (fieldType) {
      case 'shape':
      case 'material':
      case 'gender':
        return isContactLens(category);
      case 'features':
        return isEyeglassFrame(category);
      default:
        return false;
    }
  };

  // Cập nhật hàm xử lý thay đổi category
  const handleCategoryChange = (value) => {
    setCategory(value);

    // Reset các field tương ứng khi chuyển category
    if (isContactLens(value)) {
      setShape("");
      setMaterial("");
      setGender("");
    }
    if (isEyeglassFrame(value)) {
      setFeatures([]);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setStatus(product.status); // Now directly using 'active' or 'inactive'
      setCategory(product.category_id?.toString() || "");
      setMaterial(product.material_id?.toString() || ""); // Thay đổi cách set material
      setShape(product.shape_id?.toString() || ""); // Thay đổi cách set shape
      setBrand(product.brand_id?.toString() || ""); // Thay đổi cách set brand
      setGender(product.gender || "");
      setFeatures(product.features ? product.features.split(',') : []);
      setDescription(product.description || "");
      setPrice(product.price ? Math.round(product.price).toString() : "");
      setOfferPrice(product.offer_price ? Math.round(product.offer_price).toString() : "");
      fetchProductFeatures(product.id);
    }
  }, [product]);

  const handleSave = async () => {
    if (!isFormValid()) {
      setError("Please fill in required fields: Name, Category, Brand, and Price.");
      return;
    }
    
    setError("");
    setLoading(true);
    
    try {
      const productData = {
        name: name.trim(),
        status: status, // Now correctly passing 'active' or 'inactive'
        description: description.trim() || null,
        brand_id: brand,
        category_id: category,
        material_id: material || null,
        shape_id: shape || null,
        gender: gender || null,
        price: price,
        offer_price: offerPrice || null,
        features: features.length > 0 ? features : null,
      };
      
      const response = await axios.post(`http://localhost:8000/api/products/update/${product.id}`, productData);
      
      if (response.status === 200) {
        const success = await onUpdate();
        if (success) {
          alert("Product updated successfully!");
          onClose();
        } else {
          throw new Error("Failed to refresh product list");
        }
      } else {
        throw new Error(response.data.message || 'Failed to update product');
      }
    } catch (err) {
      const errorMessages = err.response?.data?.error 
        ? Object.values(err.response.data.error).flat().join(', ')
        : err.message || "Failed to update product";
      setError(errorMessages);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '');
    setPrice(value);
  };

  const handleOfferPriceChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '');
    setOfferPrice(value);
  };

  const handleFeatureChange = (featureId) => {
    setFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    );
  };

  const fetchFeatures = async () => {
    setLoadingFeatures(true);
    try {
      const response = await axios.get('http://localhost:8000/api/features');
      console.log('Features API Response:', response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setFeaturesList(response.data.data);
      } else if (Array.isArray(response.data)) {
        setFeaturesList(response.data);
      } else {
        console.error('Invalid features API response format:', response.data);
        throw new Error('Invalid features data format received');
      }
    } catch (error) {
      console.error('Error fetching features:', error);
      // Fallback data
      setFeaturesList([
        { id: 1, name: "Polarized" },
        { id: 2, name: "UV Protection" },
        { id: 3, name: "Anti-glare" },
        { id: 4, name: "Scratch-resistant" }
      ]);
      setError('Failed to load features. Using default values.');
    } finally {
      setLoadingFeatures(false);
    }
  };

  // Add validation function for required fields
  const isFormValid = () => {
    return (
      name.trim() &&
      status &&
      price.trim() &&
      category.trim() &&
      brand.trim() &&
      !loading
    );
  };

  // Helper function to check if fields should be disabled
  const shouldFieldsBeDisabled = !category;

  // Helper function for select boxes
  const SelectBox = ({ label, value, onChange, options, id, disabled }) => (
    <div className="mb-4 w-full">
      <label className="block text-gray-700 font-medium mb-2" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] appearance-none ${disabled
              ? "bg-gray-100 border-gray-300 cursor-not-allowed"
              : "bg-[#EFF9F9] border-[#55D5D2]"
            }`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option
              key={option.value || option}
              value={option.value || option}
            >
              {option.label || option}
            </option>
          ))}
        </select>
        <FaAngleDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${disabled ? 'text-gray-400' : 'text-gray-500'} pointer-events-none`} />
      </div>
    </div>
  );

  // Add function to fetch categories from API
  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await axios.get('http://localhost:8000/api/categories');
      console.log('API Response:', response.data); // Debug log

      if (response.data && Array.isArray(response.data.data)) {
        // Giả sử API trả về { categories: [ { id, name }, ... ] }
        setCategories(response.data.data);
      } else if (Array.isArray(response.data)) {
        // Nếu API trả về trực tiếp array
        setCategories(response.data);
      } else {
        console.error('Invalid API response format:', response.data);
        throw new Error('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback data khi có lỗi
      setCategories([
        { id: 1, name: "Sunglasses" },
        { id: 2, name: "Eyeglasses" },
        { id: 3, name: "Contact Lenses" }
      ]);
      setError('Failed to load categories. Using default values.');
    } finally {
      setLoadingCategories(false);
    }
  };

  // Add function to fetch brands from API
  const fetchBrands = async () => {
    setLoadingBrands(true);
    try {
      const response = await axios.get('http://localhost:8000/api/brands');
      console.log('Brands API Response:', response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setBrands(response.data.data);
      } else if (Array.isArray(response.data)) {
        setBrands(response.data);
      } else {
        console.error('Invalid brands API response format:', response.data);
        throw new Error('Invalid brands data format received');
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
      // Fallback data
      setBrands([
        { id: 1, name: "Ray-Ban" },
        { id: 2, name: "Oakley" },
        { id: 3, name: "Gucci" },
        { id: 4, name: "Prada" },
        { id: 5, name: "Other" }
      ]);
      setError('Failed to load brands. Using default values.');
    } finally {
      setLoadingBrands(false);
    }
  };

  // Add function to fetch materials from API
  const fetchMaterials = async () => {
    setLoadingMaterials(true);
    try {
      const response = await axios.get('http://localhost:8000/api/materials');
      console.log('Materials API Response:', response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setMaterials(response.data.data);
      } else if (Array.isArray(response.data)) {
        setMaterials(response.data);
      } else {
        console.error('Invalid materials API response format:', response.data);
        throw new Error('Invalid materials data format received');
      }
    } catch (error) {
      console.error('Error fetching materials:', error);
      // Fallback data
      setMaterials([
        { id: 1, name: "Metal" },
        { id: 2, name: "Plastic" },
        { id: 3, name: "Acetate" },
        { id: 4, name: "TR90" }
      ]);
      setError('Failed to load materials. Using default values.');
    } finally {
      setLoadingMaterials(false);
    }
  };

  // Add function to fetch shapes from API
  const fetchShapes = async () => {
    setLoadingShapes(true);
    try {
      const response = await axios.get('http://localhost:8000/api/shapes');
      console.log('Shapes API Response:', response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setShapes(response.data.data);
      } else if (Array.isArray(response.data)) {
        setShapes(response.data);
      } else {
        console.error('Invalid shapes API response format:', response.data);
        throw new Error('Invalid shapes data format received');
      }
    } catch (error) {
      console.error('Error fetching shapes:', error);
      // Fallback data
      setShapes([
        { id: 1, name: "Round" },
        { id: 2, name: "Square" },
        { id: 3, name: "Rectangle" },
        { id: 4, name: "Oval" },
        { id: 5, name: "Cat Eye" }
      ]);
      setError('Failed to load shapes. Using default values.');
    } finally {
      setLoadingShapes(false);
    }
  };

  // Sửa lại hàm fetchProductFeatures
  const fetchProductFeatures = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/product-features/getByProductId/${productId}`);
      console.log('Product Features Response:', response.data);

      if (response.data && response.data.data) {
        // Lấy mảng các feature_id từ productFeatures
        const featureIds = response.data.data.map(pf => parseInt(pf.feature_id));
        console.log('Extracted feature IDs:', featureIds); // Debug log
        setFeatures(featureIds);
      }
    } catch (error) {
      console.error('Error fetching product features:', error);
      setError('Failed to load product features');
    }
  };

  // Add useEffect to fetch categories and brands when component mounts
  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchMaterials();
    fetchShapes();
    fetchFeatures();
  }, []);

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Edit Product</h1>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-[#55D5D2]"
          >
            Back to List
          </button>
        </div>
        <div className="border-b border-gray-200"></div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="id">
          ID
        </label>
        <input
          type="text"
          id="id"
          className="w-1/2 px-4 py-2 border rounded-lg bg-gray-100 border-gray-300"
          value={product.id}
          disabled
          readOnly
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="status">
          Status
        </label>
        <div className="relative w-1/4">
          <select
            id="status"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2] appearance-none"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <FaAngleDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-4 gap-y-2 mt-10">
        <SelectBox
          label="Category"
          value={category} // category đang chứa category_id
          onChange={handleCategoryChange}
          options={[
            // Thêm một mảng options với value là id và label là name
            ...categories.map(cat => ({
              value: cat.id.toString(),
              label: cat.name
            }))
          ]}
          id="category"
          disabled={loadingCategories}
        />
        <SelectBox
          label="Material"
          value={material}
          onChange={setMaterial}
          options={[
            ...materials.map(m => ({
              value: m.id.toString(),
              label: m.name
            }))
          ]}
          id="material"
          disabled={shouldFieldBeDisabled('material')}
        />
        <SelectBox
          label="Shape"
          value={shape}
          onChange={setShape}
          options={[
            ...shapes.map(s => ({
              value: s.id.toString(),
              label: s.name
            }))
          ]}
          id="shape"
          disabled={shouldFieldBeDisabled('shape')}
        />
        <SelectBox
          label="Brand"
          value={brand} // brand đang chứa brand_id
          onChange={setBrand}
          options={[
            // Map brands để có cả value (id) và label (name)
            ...brands.map(b => ({
              value: b.id.toString(),
              label: b.name
            }))
          ]}
          id="brand"
          disabled={loadingBrands}
        />
        <SelectBox
          label="Gender"
          value={gender}
          onChange={setGender}
          options={["male", "female", "unisex"]}
          id="gender"
          disabled={shouldFieldBeDisabled('gender')}
        />
      </div>

      <div className={`mt-5 mb-4 ${shouldFieldBeDisabled('features') ? 'opacity-50 pointer-events-none' : ''}`}>
        <label className="block text-gray-700 font-medium mb-3">
          Features
        </label>
        <div className="flex flex-wrap gap-4">
          {loadingFeatures ? (
            <div>Loading features...</div>
          ) : (
            featuresList.map((feature) => {
              const isChecked = features.includes(parseInt(feature.id));
              console.log(`Feature ${feature.id} checked:`, isChecked); // Debug log
              return (
                <label key={feature.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleFeatureChange(parseInt(feature.id))}
                    className="w-4 h-4 text-[#55D5D2] border-gray-300 rounded focus:ring-[#55D5D2]"
                    disabled={shouldFieldBeDisabled('features')}
                  />
                  <span className={`text-gray-700 ${shouldFieldBeDisabled ? 'text-gray-400' : ''}`}>
                    {feature.name}
                  </span>
                </label>
              );
            })
          )}
        </div>
      </div>

      <div className="mb-4 mt-10">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
          Price
        </label>
        <input
          type="text"
          id="price"
          className="w-1/8 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={price}
          onChange={handlePriceChange}
          placeholder="Enter product price"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="offerPrice">
          Offer Price
        </label>
        <input
          type="text"
          id="offerPrice"
          className="w-1/8 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={offerPrice}
          onChange={handleOfferPriceChange}
          placeholder="Enter offer price (optional)"
        />
      </div>

      <div className="mb-10 col-span-3 mt-10">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55D5D2] bg-[#EFF9F9] border-[#55D5D2]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          rows="4"
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex">
        <button
          className={`w-1/7 py-2 px-4 rounded-[10px] shadow-md font-semibold ${isFormValid()
              ? "bg-teal-400 text-white hover:bg-teal-500"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          onClick={handleSave}
          disabled={!isFormValid()}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

EditProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    category_id: PropTypes.number,
    category: PropTypes.string,
    material_id: PropTypes.number,
    material: PropTypes.string,
    shape_id: PropTypes.number,
    shape: PropTypes.string,
    brand_id: PropTypes.number,
    brand: PropTypes.string,
    gender: PropTypes.string,
    features: PropTypes.string, // Change from feature to features
    description: PropTypes.string,
    price: PropTypes.number,
    offer_price: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  refreshProducts: PropTypes.func.isRequired,
};

export default EditProduct;
