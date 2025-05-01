import React, { useState } from "react";
import { usePaginatedUsers } from "./hooks/usePaginatedUsers";
import UserTable from "./components/UserTable";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState([]);

  const {
    data,
    isLoading,
    error,
    hasMore,
    setPage,
    debounceRef,
  } = usePaginatedUsers(searchTerm);

  return (
    <div className="app-container">
      <h1 className="title">Users</h1>

      <div className="search-bar-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or email..."
          className="search-bar"
        />
      </div>


      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      <UserTable
        data={data}
        sorting={sorting}
        setSorting={setSorting}
        hasMore={hasMore}
        setPage={setPage}
        debounceRef={debounceRef}
      />
    </div>
  );
};

export default App;
