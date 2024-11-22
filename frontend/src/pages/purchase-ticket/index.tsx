import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "@/components";
import { purchaseTicketText } from "@/common/constant";

interface TrainData {
  trainNumber: string;
  name: string;
  ticketPrice: number;
  totalSeats: number;
  remainingSeats: number;
}

const PurchaseTicket: React.FC = () => {
  const { trainNumber } = useParams<{ trainNumber: string }>();
  const [train, setTrain] = useState<TrainData | null>(null);

  useEffect(() => {
    if (trainNumber) {
      fetch(`http://localhost:8082/api/trains?trainNumber=${trainNumber}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch train data");
          }
          return res.json();
        })
        .then((data) => setTrain(data))
        .catch((err) => {
          toast.error(err.message);
          console.error(err);
        });
    }
  }, [trainNumber]);

  if (!train) {
    return (
      <div className="text-center p-6">{purchaseTicketText.noTrainFound}</div>
    );
  }

  const { name, ticketPrice, totalSeats, remainingSeats } = train;

  const validationSchema = Yup.object({
    passengerName: Yup.string().required("Passenger name is required."),
    contactNumber: Yup.string()
      .matches(/^\d{10}$/, "Contact number must be 10 digits.")
      .required("Contact number is required."),
    ticketCount: Yup.number()
      .min(1, "At least 1 ticket must be purchased.")
      .max(remainingSeats, `Only ${remainingSeats} seats left.`)
      .required("Ticket count is required."),
  });

  // const handleFormSubmit = (values: {
  //   passengerName: string;
  //   contactNumber: string;
  //   ticketCount: number;
  // }) => {
  //   fetch(purchaseTicketText.ticketDataApi, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       trainNumber: trainNumber,
  //       passengerName: values.passengerName,
  //       contactNumber: values.contactNumber,
  //       ticketCount: values.ticketCount,
  //       totalCost: values.ticketCount * ticketPrice,
  //       remainingSeats: train.remainingSeats,
  //       trainName: train.name,
  //     }),
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(purchaseTicketText.failedToSave);
  //       }
  //       return res.json();
  //     })
  //     .then(() => {
  //       toast.success(purchaseTicketText.successfullyPurchase);
  //       setTrain((prevTrain) => ({
  //         ...prevTrain!,
  //         remainingSeats: prevTrain!.remainingSeats - values.ticketCount,
  //       }));
  //     })
  //     .catch((err) => {
  //       toast.error(err.message);
  //       console.error(err);
  //     });
  // };



  const handleFormSubmit = (values: {
    passengerName: string;
    contactNumber: string;
    ticketCount: number;
  }) => {
    const userId = localStorage.getItem("userId"); // Get userId from localStorage
    if (!userId) {
      toast.error("User not authenticated.");
      return;
    }
  
    fetch(purchaseTicketText.ticketDataApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId, 
        trainNumber: trainNumber,
        passengerName: values.passengerName,
        contactNumber: values.contactNumber,
        ticketCount: values.ticketCount,
        totalCost: values.ticketCount * ticketPrice,
        remainingSeats: train.remainingSeats,
        trainName: train.name,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(purchaseTicketText.failedToSave);
        }
        return res.json();
      })
      .then(() => {
        toast.success(purchaseTicketText.successfullyPurchase);
        setTrain((prevTrain) => ({
          ...prevTrain!,
          remainingSeats: prevTrain!.remainingSeats - values.ticketCount,
        }));
      })
      .catch((err) => {
        toast.error(err.message);
        console.error(err);
      });
  };
  
  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
        />
        <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">
          {purchaseTicketText.purchaseTicket} {trainNumber}
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-gray-700 text-lg mb-4">
            <strong>{purchaseTicketText.trainNumber}</strong> {trainNumber}
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>{purchaseTicketText.trainName}</strong> {name}
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>{purchaseTicketText.ticketPrice}</strong> ${ticketPrice}
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>{purchaseTicketText.totalSeats}</strong> {totalSeats}
          </p>
          <p className="text-gray-700 text-lg mb-4">
            <strong>{purchaseTicketText.remainingSeats}</strong>{" "}
            {remainingSeats}
          </p>
          <Formik
            initialValues={{
              passengerName: "",
              contactNumber: "",
              ticketCount: 1,
            }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, handleChange }) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="passengerName"
                    className="block text-gray-700 mb-2"
                  >
                    {purchaseTicketText.passengerName}
                  </label>
                  <Field
                    type="text"
                    name="passengerName"
                    id="passengerName"
                    className="w-full border rounded-md p-2"
                  />
                  <ErrorMessage
                    name="passengerName"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="contactNumber"
                    className="block text-gray-700 mb-2"
                  >
                    {purchaseTicketText.contactNumber}
                  </label>
                  <Field
                    type="text"
                    name="contactNumber"
                    id="contactNumber"
                    className="w-full border rounded-md p-2"
                  />
                  <ErrorMessage
                    name="contactNumber"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="ticketCount"
                    className="block text-gray-700 mb-2"
                  >
                    {purchaseTicketText.numberOfTickets}
                  </label>
                  <Field
                    type="number"
                    name="ticketCount"
                    id="ticketCount"
                    className="w-full border rounded-md p-2"
                    min="1"
                    max={remainingSeats}
                    value={values.ticketCount}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="ticketCount"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <p className="text-gray-700 text-lg mb-4">
                  <strong>{purchaseTicketText.totalCost}</strong> $
                  {values.ticketCount * ticketPrice}
                </p>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors mt-6"
                >
                  {purchaseTicketText.confirmPurchase}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default PurchaseTicket;
