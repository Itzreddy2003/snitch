import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { useProduct } from "../hooks/product.hook";
import {
  Plus,
  Package,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Loader2,
  Tag,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const Dashboard = () => {
  const { handleGetSellerProducts } = useProduct();
  const sellerProducts = useSelector((state) => state.product.sellerProducts);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    const fetchProducts = async () => {
      await handleGetSellerProducts();
    };

    fetchProducts();
  }, []);

  const productsList = sellerProducts?.products || [];

  // Summary Metrics
  const totalProducts = productsList.length;
  const totalValue = productsList.reduce((acc, curr) => {
    const price = parseFloat(curr.priceAmount) || 0;
    return acc + price;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 flex flex-col items-center justify-center p-6 font-sans selection:bg-yellow-400 selection:text-black">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
          <p className="text-xs uppercase tracking-widest font-semibold text-zinc-400">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full p-6 rounded-2xl border border-zinc-800/80 bg-zinc-950 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto">
            <AlertCircle size={22} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Failed to load dashboard</h2>
            <p className="text-xs text-zinc-400 mt-1">{error}</p>
          </div>
          <button
            onClick={() => handleGetSellerProducts()}
            className="w-full py-2.5 px-4 border border-zinc-700 hover:border-yellow-400 bg-transparent text-zinc-300 hover:text-yellow-400 font-extrabold text-xs rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-4 sm:p-8 font-sans selection:bg-yellow-400 selection:text-black">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header & Navbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link to="/" className="inline-flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-black text-sm">
                  S
                </div>
                <span className="font-black tracking-widest text-base text-white">
                  SNITCH<span className="text-yellow-400">.</span>
                </span>
              </Link>
              <span className="text-zinc-600 text-sm">/</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-yellow-400">
                Seller Hub
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white pt-1">
              Inventory & Products
            </h1>
          </div>

          <Link
            to="/seller/create-product"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-700 hover:border-yellow-400 bg-transparent text-zinc-200 hover:text-yellow-400 text-xs font-bold transition-all shadow-sm group"
          >
            <Plus size={16} className="text-yellow-400 group-hover:scale-110 transition-transform" />
            <span>Add New Product</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-zinc-800/80 bg-zinc-950/80 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Total Listed
              </p>
              <h3 className="text-2xl font-black text-white mt-1">
                {totalProducts}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-yellow-400">
              <Package size={18} />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-zinc-800/80 bg-zinc-950/80 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Catalog Value
              </p>
              <h3 className="text-2xl font-black text-white mt-1">
                ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-yellow-400">
              <DollarSign size={18} />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-zinc-800/80 bg-zinc-950/80 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Status
              </p>
              <h3 className="text-2xl font-black text-emerald-400 mt-1 flex items-center gap-1.5 text-lg">
                Active Seller
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400">
              <TrendingUp size={18} />
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
              Your Products ({totalProducts})
            </h2>
          </div>

          {productsList.length === 0 ? (
            /* Empty State */
            <div className="p-12 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 flex items-center justify-center">
                <Tag size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">No products added yet</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm">
                  Start adding items to your store to build your product catalog and reach buyers.
                </p>
              </div>
              <Link
                to="/seller/create-product"
                className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-yellow-400 hover:underline"
              >
                <span>Create your first listing</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            /* Product List Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {productsList.map((product) => {
                const imageUrl =
                  typeof product.images?.[0] === "string"
                    ? product.images[0]
                    : product.images?.[0]?.url || product.images?.[0]?.secure_url;

                return (
                  <div
                    key={product._id}
                    className="group rounded-2xl border border-zinc-800/80 bg-zinc-950 overflow-hidden hover:border-zinc-700 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      {/* Thumbnail or Fallback */}
                      <div className="aspect-[4/3] bg-zinc-900 relative overflow-hidden border-b border-zinc-800/60">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-700">
                            <Package size={32} />
                          </div>
                        )}
                        <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-yellow-400 tracking-wider uppercase border border-zinc-800">
                          {product.priceCurrency || "USD"} {product.priceAmount}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-1.5">
                        <h3 className="font-bold text-sm text-white line-clamp-1 group-hover:text-yellow-400 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                          {product.description || "No description provided."}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-4 py-3 border-t border-zinc-900/80 flex items-center justify-between text-[11px] text-zinc-500 bg-zinc-950/40">
                      <span className="uppercase tracking-wider text-[10px] text-zinc-400 font-semibold">
                        In Stock
                      </span>
                      <span className="inline-flex items-center gap-1 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer">
                        View details <ExternalLink size={12} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;