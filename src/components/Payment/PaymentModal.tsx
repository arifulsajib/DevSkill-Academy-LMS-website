import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks/hook";
import { getPaymentOpen, togglePaymentModal } from "../../Redux/features/toggle/modalSlice";
import { Course } from "../../models/course.model";
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from "../../Redux/features/api/ordersApiSlice";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import Loading from "../utils/Loading";

interface Props {
  disableClickOutside?: boolean;
  course: Course | any;
}

const PaymentModal = ({ disableClickOutside, course }: Props) => {
  // get redux state
  const dispatch = useAppDispatch();
  const openPayment = useAppSelector(getPaymentOpen);

  // show modal is open is true
  const modalClass = cn({
    "modal modal-middle": true,
    "modal-open": openPayment
  });

  // stripe payment
  const { data: config } = useGetStripePublishableKeyQuery();
  const [createPaymentIntent, { data: paymentIntentData }] = useCreatePaymentIntentMutation();

  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishableKey = config?.publishableKey;
      setStripePromise(loadStripe(publishableKey));
    }
    if (course) {
      const amount = Math.round(course.price * 100);
      createPaymentIntent({ amount });
    }
  }, [config, course, createPaymentIntent]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.clientSecret);
    }
  }, [paymentIntentData]);

  return (
    <div className={modalClass}>
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => {
            dispatch(togglePaymentModal());
          }}
        >
          ✕
        </button>

        <h3 className="text-lg font-bold text-center mb-3">Payment system</h3>
        {stripePromise && clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "night" }, loader: "always" }}>
            <PaymentForm course={course} />
          </Elements>
        ) : (
          <Loading />
        )}
      </div>
      {/* Modal close on outside click */}
      <label
        className="modal-backdrop"
        onClick={() => {
          !disableClickOutside && dispatch(togglePaymentModal());
        }}
      >
        Close
      </label>
    </div>
  );
};

export default PaymentModal;
