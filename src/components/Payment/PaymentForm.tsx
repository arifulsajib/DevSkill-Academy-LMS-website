import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Course } from "../../models/course.model";
import { useCreateOrderMutation } from "../../Redux/features/api/ordersApiSlice";
import { Bounce, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../Redux/hooks/hook";
import { togglePaymentModal } from "../../Redux/features/toggle/modalSlice";

interface Props {
  course: Course | any;
}

const PaymentForm = ({ course }: Props) => {
  const dispatch = useAppDispatch();
  // toastify function
  const notify = (textToShow: string) => {
    toast(textToShow, {
      position: "top-right",
      autoClose: 4000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Bounce
    });
  };
  const stripe = useStripe();
  const elements = useElements();
  const [createOrder, { data: orderData, isLoading: orderLoading, error }] = useCreateOrderMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required"
    });
    if (error) {
      notify(error.message || "Something went wrong");
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      await createOrder({ courseId: course._id, payment_info: paymentIntent });
    }
  };

  useEffect(() => {
    if (orderData) {
      notify("Payment Successful");
      window.location.reload();
      dispatch(togglePaymentModal());
    }
    if (error) {
      if ("data" in error) {
        const errMsg = error as any;
        notify(errMsg.data.message);
      }
    }
  }, [orderData, error, dispatch, course._id]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" className="mb-3" />
      <PaymentElement id="payment-element" />
      <button disabled={!isLoading && !stripe && !elements} id="submit" className="btn btn-primary mt-3">
        <span id="button-text">{isLoading || orderLoading ? "Processing..." : "Pay Now- $" + course?.price}</span>
      </button>
    </form>
  );
};

export default PaymentForm;
