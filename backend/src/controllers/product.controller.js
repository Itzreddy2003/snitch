import productModel from "../models/products.model.js";
import { uploadFile } from "../services/storage.services.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, priceAmount, priceCurrency } = req.body;

    if (
      [name, description, priceAmount, priceCurrency].some((field) => !field)
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "At least one image is required",
      });
    }

    const uploadedImages = await Promise.all(
      req.files.map((file) => uploadFile(file.buffer, file.originalname)),
    );

    const product = await productModel.create({
      name,
      description,
      seller: req.user._id,
      price: {
        amount: priceAmount,
        currency: priceCurrency,
      },
      images: uploadedImages.map((image) => ({
        url: image.url,
        alt: image.name,
      })),
    });

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getSellerProducts = async (req, res) => {
  console.log("Fetching products for seller:", req.user._id);
  const sellerId = req.user._id;

  try {
    const products = await productModel.find({ seller: sellerId });
    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found for this seller",
      });
    }
    return res.status(200).json({
      message: "Products retrieved successfully",
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
