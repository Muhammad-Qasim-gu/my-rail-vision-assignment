import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components";
import { homeText } from "@/common/constant";

interface Train {
  _id: string;
  trainNumber: string;
  name: string;
  image: string;
  departureTime: string;
  arrivalTime: string;
  ticketPrice: number;
  totalSeats: number;
}

const HomePage: React.FC = () => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await fetch(homeText.trainDataApi);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Train[] = await response.json();
        setTrains(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTrains();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">
          {homeText.availableSeats}
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">{homeText.loading}</p>
        ) : error ? (
          <p className="text-center text-red-500">
            {homeText.error} {error}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trains.map((train) => (
              <div
                key={train._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src={train.image}
                  alt={train.name}
                  className="w-full h-48 sm:h-64 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-2xl font-semibold text-gray-700">
                    {train.name}
                  </h2>
                  <p className="text-gray-500 mb-4">
                    {homeText.trainNumber} {train.trainNumber}
                  </p>
                  <Link
                    to={`/train/${train.trainNumber}`}
                    className="block bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {homeText.viewDetail}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
