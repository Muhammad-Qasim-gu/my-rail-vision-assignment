import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/index";
import { trainDetailsText } from "@/common/constant";

interface TrainDetail {
  trainNumber: string;
  name: string;
  departureTime: string;
  arrivalTime: string;
  ticketPrice: number;
  totalSeats: number;
  image: string;
  remainingSeats: number;
}

export const TrainDetails: React.FC = () => {
  const { trainNumber } = useParams<{ trainNumber: string }>();
  const [train, setTrain] = useState<TrainDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchTrainData = async () => {
      if (!trainNumber) return;

      try {
        const response = await fetch(
          `http://localhost:8082/api/trains?trainNumber=${trainNumber}`
        );

        if (!response.ok) {
          throw new Error(trainDetailsText.failedError);
        }

        const data: TrainDetail = await response.json();
        setTrain(data);
        setLoading(false);
      } catch (error) {
        setError(trainDetailsText.setError);
        setLoading(false);
      }
    };

    fetchTrainData();
  }, [trainNumber]);

  if (loading) {
    return <div className="text-center p-6">{trainDetailsText.loading}</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">{error}</div>;
  }

  if (!train) {
    return (
      <div className="text-center p-6">{trainDetailsText.detailNotFound}</div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">
          {train.name} {trainDetailsText.details}
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6">
          {train.image && (
            <img
              src={train.image}
              alt={`${train.name} train`}
              className="w-full h-auto max-h-64 object-contain rounded-lg mb-6"
            />
          )}

          <p className="text-gray-700 text-lg mb-4">
            <strong>{trainDetailsText.trainNumber}</strong> {train.trainNumber}
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>{trainDetailsText.trainName}</strong> {train.name}
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>{trainDetailsText.departureTime}</strong>{" "}
            {train.departureTime}
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>{trainDetailsText.arrivalTime}</strong> {train.arrivalTime}
          </p>

          <p className="text-gray-700 text-lg mb-4">
            <strong>{trainDetailsText.ticketPrice}</strong> {train.ticketPrice}
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>{trainDetailsText.totalSeats}</strong> {train.totalSeats}
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>{trainDetailsText.remainginSeats}</strong>{" "}
            {train.remainingSeats}
          </p>
          <Link
            to={`${trainDetailsText.purchaseTicketLink}${train.trainNumber}`}
            className="block bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {trainDetailsText.purchaseTicket}
          </Link>

          <Link
            to="/home"
            className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {trainDetailsText.backToHome}
          </Link>
        </div>
      </div>
    </>
  );
};
