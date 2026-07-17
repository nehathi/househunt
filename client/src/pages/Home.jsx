import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import PropertyCard from "../components/PropertyCard";

const PAGE_SIZE = 9;
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "bedrooms", label: "Most Bedrooms" },
];

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const res = await api.get("/property");
      setProperties(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const cityOptions = useMemo(() => {
    const set = new Set(
      properties.map((p) => (p.location || "").split(",").pop().trim())
    );
    return ["All", ...Array.from(set).filter(Boolean).sort()];
  }, [properties]);

  const filtered = useMemo(() => {
    let list = [...properties];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (city !== "All") {
      list = list.filter((p) => p.location?.includes(city));
    }

    if (minPrice) {
      list = list.filter((p) => Number(p.price) >= Number(minPrice));
    }

    if (maxPrice) {
      list = list.filter((p) => Number(p.price) <= Number(maxPrice));
    }

    if (bedrooms !== "All") {
      if (bedrooms === "5+") {
        list = list.filter((p) => Number(p.bedrooms) >= 5);
      } else {
        list = list.filter((p) => Number(p.bedrooms) === Number(bedrooms));
      }
    }

    switch (sortBy) {
      case "price_low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "bedrooms":
        list.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      default:
        list.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
    }

    return list;
  }, [properties, search, city, minPrice, maxPrice, bedrooms, sortBy]);

  const visibleProperties = filtered.slice(0, visibleCount);

  const resetFilters = () => {
    setSearch("");
    setCity("All");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("All");
    setSortBy("newest");
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="container">
      <div className="hero-banner">
        <h1>Find Your Perfect Rental Home</h1>
        <p>{properties.length} properties available across {cityOptions.length - 1} cities</p>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search by title, area, or city..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
        />

        <select
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
        >
          {cityOptions.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All Cities" : c}
            </option>
          ))}
        </select>

        <select
          value={bedrooms}
          onChange={(e) => {
            setBedrooms(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
        >
          <option value="All">Any Bedrooms</option>
          <option value="1">1 BHK</option>
          <option value="2">2 BHK</option>
          <option value="3">3 BHK</option>
          <option value="4">4 BHK</option>
          <option value="5+">5+ BHK</option>
        </select>

        <input
          type="number"
          className="price-input"
          placeholder="Min ₹"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
        />

        <input
          type="number"
          className="price-input"
          placeholder="Max ₹"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button className="reset-btn" onClick={resetFilters}>
          Reset
        </button>
      </div>

      <div className="results-info">
        Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} results
      </div>

      {loading && <p className="loading-text">Loading properties...</p>}

      {!loading && filtered.length === 0 && (
        <p className="loading-text">No properties match your filters.</p>
      )}

      <div className="grid">
        {visibleProperties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>

      {visibleCount < filtered.length && (
        <div className="load-more-wrap">
          <button
            className="load-more-btn"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            Load More Properties
          </button>
        </div>
      )}
    </div>
  );
}
