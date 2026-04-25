import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Select, Card } from '../components/ui';
import {
  Package,
  Scale,
  Calendar,
  Tag,
  Info,
  CheckCircle,
  ArrowRight,
  Upload,
  AlertCircle,
} from 'lucide-react';

const categories = [
  { value: '', label: 'Select category' },
  { value: 'Vegetables', label: 'Vegetables' },
  { value: 'Fruits', label: 'Fruits' },
  { value: 'Bakery', label: 'Bakery' },
  { value: 'Dairy', label: 'Dairy' },
  { value: 'Grains', label: 'Grains' },
  { value: 'Prepared Foods', label: 'Prepared Foods' },
];

const units = [
  { value: 'kg', label: 'Kilograms (kg)' },
  { value: 'g', label: 'Grams (g)' },
  { value: 'liters', label: 'Liters (L)' },
  { value: 'ml', label: 'Milliliters (mL)' },
  { value: 'units', label: 'Units' },
  { value: 'boxes', label: 'Boxes' },
  { value: 'packs', label: 'Packs' },
];

const storageTypes = [
  { value: 'Room Temperature', label: 'Room Temperature' },
  { value: 'Refrigerated', label: 'Refrigerated' },
  { value: 'Frozen', label: 'Frozen' },
  { value: 'Dry Storage', label: 'Dry Storage' },
];

const CreateListing = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const { user, isAuthenticated } = useAuth();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: 'kg',
    price: '',
    originalPrice: '',
    expiryDate: '',
    description: '',
    storageType: 'Room Temperature',
    minOrderQuantity: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProductImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setProductImagePreview(reader.result);
    reader.readAsDataURL(file);

    setErrors((prev) => ({ ...prev, productImage: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.category) newErrors.category = 'Required';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Invalid';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Invalid';
    if (!formData.originalPrice || formData.originalPrice <= formData.price)
      newErrors.originalPrice = 'Must be higher';
    if (!formData.expiryDate) newErrors.expiryDate = 'Required';
    if (!formData.description.trim()) newErrors.description = 'Required';
    if (!productImage) newErrors.productImage = 'Image required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.category || !productImage)) return;
    if (step === 2 && (!formData.quantity || !formData.price)) return;
    setStep((s) => s + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      await addProduct({
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        vendorId: user?.id, // Use vendorId for backend mapping
        sellerName: user?.shopName,
        image: productImagePreview,
        available: true,
      });
      navigate('/my-products');
    } catch (error) {
      console.error("Error creating listing", error);
      alert("Failed to create product listing. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="pb-20">
      <div className="bg-indigo-600 text-white p-6 text-center">
        <h1 className="text-2xl font-bold">Create Listing</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-6">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">

            {step === 1 && (
              <>
                <Input name="name" label="Product Name" value={formData.name} onChange={handleChange} error={errors.name} />
                <Select name="category" label="Category" value={formData.category} onChange={handleChange} options={categories} />

                <input type="file" onChange={handleImageChange} />
                {errors.productImage && <p className="text-red-500 text-sm">{errors.productImage}</p>}
              </>
            )}

            {step === 2 && (
              <>
                <Input name="quantity" label="Quantity" type="number" value={formData.quantity} onChange={handleChange} />
                <Input name="price" label="Price" type="number" value={formData.price} onChange={handleChange} />
                <Input name="originalPrice" label="Original Price" type="number" value={formData.originalPrice} onChange={handleChange} />
              </>
            )}

            {step === 3 && (
              <>
                <Input name="expiryDate" type="date" label="Expiry Date" value={formData.expiryDate} onChange={handleChange} />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  placeholder="Description"
                />
              </>
            )}

            <div className="flex gap-2">
              {step > 1 && (
                <Button type="button" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}

              {step < 3 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" loading={isLoading}>
                  Submit
                </Button>
              )}
            </div>

          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateListing;