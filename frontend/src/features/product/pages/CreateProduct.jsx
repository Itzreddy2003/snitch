import { useState, useRef, useCallback } from "react";
import { Link } from "react-router";
import {
    Tag,
    FileText,
    DollarSign,
    Euro,
    PoundSterling,
    JapaneseYen,
    IndianRupee,
    Globe,
    ImagePlus,
    X,
    ArrowRight,
    Package,
} from "lucide-react";

import { useProduct } from "../hooks/product.hook.js"
import { useNavigate } from "react-router";


const MAX_IMAGES = 7;

const currencies = ["USD", "EUR", "GBP", "JPY", "INR"];

const CurrencyIcon = ({ currency }) => {
    switch (currency) {
        case "EUR": return <Euro size={15} />;
        case "GBP": return <PoundSterling size={15} />;
        case "JPY": return <JapaneseYen size={15} />;
        case "INR": return <IndianRupee size={15} />;
        case "USD":
        default: return <DollarSign size={15} />;
    }
};

const CreateProduct = () => {
    const { handleCreateProduct } = useProduct();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        priceAmount: "",
        priceCurrency: "USD",
    });

    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addFiles = useCallback(
        (files) => {
            const remaining = MAX_IMAGES - images.length;
            const toAdd = Array.from(files).slice(0, remaining);
            const newImages = toAdd.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }));
            setImages((prev) => [...prev, ...newImages]);
        },
        [images.length]
    );

    const handleFileInput = (e) => {
        if (e.target.files?.length) {
            addFiles(e.target.files);
            e.target.value = "";
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.length) {
            addFiles(e.dataTransfer.files);
        }
    };

    const removeImage = (index) => {
        setImages((prev) => {
            URL.revokeObjectURL(prev[index].preview);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("name", formData.name);
        data.append("description", formData.description)
        data.append("priceAmount", formData.priceAmount);
        data.append("priceCurrency", formData.priceCurrency);

        images.forEach((image) => {
            data.append("images", image.file)
        })
        const result = await handleCreateProduct(data);

        if (result) {
            navigate("/seller/create-product")
        }
        console.log("reached")
    };

    return (
        <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4 sm:p-6 font-sans selection:bg-yellow-400 selection:text-black">
            <div className="w-full max-w-4xl rounded-2xl border border-zinc-800/80 bg-zinc-950 overflow-hidden shadow-2xl shadow-black">

                {/* Header */}
                <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-zinc-800/60">
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/" className="inline-flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-black text-sm">
                                S
                            </div>
                            <span className="font-black tracking-widest text-base text-white">
                                SNITCH<span className="text-yellow-400">.</span>
                            </span>
                        </Link>
                        <Link
                            to="/"
                            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            ← Back
                        </Link>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Package size={18} className="text-yellow-400" />
                        <div>
                            <h1 className="text-xl font-black text-white tracking-tight">
                                List a Product
                            </h1>
                            <p className="text-xs text-zinc-400">
                                Add your item to the SNITCH marketplace
                            </p>
                        </div>
                    </div>
                </div>

                {/* Two-column body */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12">

                    {/* LEFT — Form Fields */}
                    <div className="lg:col-span-7 px-6 sm:px-8 py-6 space-y-5 border-b lg:border-b-0 lg:border-r border-zinc-800/60">

                        {/* Product Name */}
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block">
                                Product Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                                    <Tag size={15} />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Oversized Cargo Jacket"
                                    required
                                    className="w-full pl-9 pr-3 py-2.5 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block">
                                Description
                            </label>
                            <div className="relative">
                                <div className="absolute top-2.5 left-3 pointer-events-none text-zinc-500">
                                    <FileText size={15} />
                                </div>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe your product — material, fit, condition..."
                                    required
                                    rows={4}
                                    className="w-full pl-9 pr-3 py-2.5 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                                />
                            </div>
                        </div>

                        {/* Price Amount + Currency */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block">
                                    Price
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                                        <CurrencyIcon currency={formData.priceCurrency} />
                                    </div>
                                    <input
                                        type="number"
                                        name="priceAmount"
                                        value={formData.priceAmount}
                                        onChange={handleChange}
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        required
                                        style={{ colorScheme: "dark" }}
                                        className="w-full pl-9 pr-3 py-2.5 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block">
                                    Currency
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                                        <Globe size={15} />
                                    </div>
                                    <select
                                        name="priceCurrency"
                                        value={formData.priceCurrency}
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-2.5 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-yellow-400 transition-colors appearance-none cursor-pointer"
                                    >
                                        {currencies.map((c) => (
                                            <option key={c} value={c} className="bg-zinc-900">
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — Images + Publish */}
                    <div className="lg:col-span-5 px-6 sm:px-8 py-6 flex flex-col gap-4">

                        {/* Image Upload */}
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                                    Images
                                </label>
                                <span className="text-[10px] text-zinc-600">
                                    {images.length} / {MAX_IMAGES}
                                </span>
                            </div>

                            {/* Drop Zone */}
                            {images.length < MAX_IMAGES && (
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`flex flex-col items-center justify-center gap-2 py-8 rounded-lg border-2 border-dashed cursor-pointer transition-colors ${isDragging
                                        ? "border-yellow-400 bg-yellow-400/5"
                                        : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                                        }`}
                                >
                                    <ImagePlus
                                        size={22}
                                        className={isDragging ? "text-yellow-400" : "text-zinc-500"}
                                    />
                                    <div className="text-center">
                                        <p className="text-xs text-zinc-400">
                                            Drop images here or{" "}
                                            <span className="text-yellow-400 font-semibold">browse</span>
                                        </p>
                                        <p className="text-[10px] text-zinc-600 mt-0.5">
                                            PNG, JPG, WEBP · Up to {MAX_IMAGES} images
                                        </p>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileInput}
                                        className="hidden"
                                    />
                                </div>
                            )}

                            {/* Image Previews */}
                            {images.length > 0 && (
                                <div className="grid grid-cols-3 gap-2 mt-1">
                                    {images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className="relative group aspect-square rounded-lg overflow-hidden border border-zinc-800"
                                        >
                                            <img
                                                src={img.preview}
                                                alt={`preview-${idx}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-zinc-300 hover:text-white"
                                            >
                                                <X size={11} />
                                            </button>
                                            {idx === 0 && (
                                                <span className="absolute bottom-1 left-1 text-[9px] uppercase tracking-widest font-bold bg-yellow-400 text-black px-1.5 py-0.5 rounded">
                                                    Cover
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Publish Button */}
                        <button
                            type="submit"
                            className="w-full py-2.5 px-4 border border-zinc-700 hover:border-yellow-400 bg-transparent text-zinc-300 hover:text-yellow-400 font-extrabold text-xs rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <span>Publish Product</span>
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <div className="px-6 sm:px-8 pb-5 text-center text-[10px] text-zinc-700 border-t border-zinc-900 pt-4">
                    &copy; {new Date().getFullYear()} SNITCH Inc. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
