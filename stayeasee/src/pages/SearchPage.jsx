import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const query = new URLSearchParams(useLocation().search).get('query');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700">
        Search Results for: <span className="underline">{query}</span>
      </h2>
      {/* You can integrate filtered stays here */}
    </div>
  );
};

export default SearchPage;
