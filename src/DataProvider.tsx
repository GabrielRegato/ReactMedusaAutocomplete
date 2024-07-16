import { useState, useEffect } from "react";

// Interface to get data of the endpoint
interface University {
  country: string;
  name: string;
  alpha_two_code: string;
  "state-province": string | null;
  domains: string[];
  web_pages: string[];
}

// nterface to get the correct properties for the component
interface DataProviderProps {
  url: string;
  children: (data: University[]) => JSX.Element;
}

const DataProvider: React.FC<DataProviderProps> = ({ url, children }) => {
  // Save data from the endpoint
  const [data, setData] = useState<University[]>([]);
  // Save the error message
  const [error, setError] = useState<Error | null>(null);
  // Save the loading state
  const [loading, setLoading] = useState<boolean>(false);

  /*
This useEffect hook is used to fetch data from a URL. It runs after the component has rendered,
and will re-run only if the URL changes. This ensures that we fetch new data whenever the URL
is updated.
*/

  useEffect(() => {
    // Define an async function fetchData that will be called immediately
    const fetchData = async () => {
      try {
        // Set the loading state to true to indicate that data is being fetched
        setLoading(true);
        // Fetch data from the specified URL
        const response = await fetch(url);
        // Parse the response as JSON
        const jsonData = await response.json();
        // Set the data state to the fetched JSON data
        setData(jsonData);
      } catch (error) {
        // If an error occurs, set the error state to the caught error
        setError(error as Error);
      } finally {
        // Set the loading state to false
        setLoading(false);
      }
    };
    // Call the fetchData function immediately
    fetchData();
  }, [url]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{children(data)}</div>;
};

export default DataProvider;
