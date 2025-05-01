import { useState, useEffect, useCallback, useRef } from "react";

export const usePaginatedUsers = (searchTerm) => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceRef = useRef(null);
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  // Debounce input
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // Fetch users from API page by page and append to allData
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://mark-back.onrender.com/api/user?page=${page}`);
      const json = await res.json();

      if (json.data.length === 0) {
        setHasMore(false);
        return;
      }

      setAllData((prev) => [...prev, ...json.data]);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  // Filter data based on search
  useEffect(() => {
    const filtered = allData.filter((user) =>
      user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setFilteredData(filtered);
  }, [debouncedSearch, allData]);

  // Fetch data when page changes
  useEffect(() => {
    if (hasMore) {
      fetchUsers();
    }
  }, [fetchUsers, hasMore]);
  

  return {
    data: filteredData,
    isLoading,
    error,
    hasMore,
    setPage,
    debounceRef,
  };
};
