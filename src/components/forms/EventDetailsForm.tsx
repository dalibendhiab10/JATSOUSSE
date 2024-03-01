"use client";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
interface FormData {
   name: string;
   email: string;
   phone: number;
   message: string;
   quantity: number; // Corrected from 'quatity' to 'quantity'
  }

const schema = yup
  .object({
    name: yup.string().required().label("Name"),
    email: yup.string().required().email().label("Email"),
    phone: yup
      .number()
      .transform((originalValue, originalObject) => {
        // Convert empty string to NaN
        return originalObject && originalObject.phone === ""
          ? NaN
          : originalValue;
      })
      .typeError("Phone number is required")
      .required("Phone must be a number"),
    message: yup.string().required().label("Message"),
    quatity: yup.number().required().label("quantity"),
  })
  .required();

const EventDetailsForm = () => {
  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const onSubmit = (data: FormData) => {
    console.log(data);
    const notify = () =>
      toast("Message sent successfully", { position: "top-center" });
    notify();
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="join-us-form form-style-two pt-15"
    >
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group ">
            <label htmlFor="name">Prenom</label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="form-control input-70s"
              placeholder="Your Name"
            />
            <p className="form_error">{errors.name?.message}</p>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="email">Nom</label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="form-control input-70s"
              placeholder="Email Address"
            />
            <p className="form_error">{errors.email?.message}</p>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="phone_number">Tel.</label>
            <input
              type="text"
              id="phone_number"
              {...register("phone")}
              className="form-control input-70s"
              placeholder="Phone Number"
            />
            <p className="form_error">{errors.phone?.message}</p>
          </div>
        </div>
       
        
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="phone_number">Email</label>
            <input
              type="text"
              id="phone_number"
              {...register("phone")}
              className="form-control input-70s"
              placeholder="Phone Number"
            />
            <p className="form_error">{errors.phone?.message}</p>
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group pt-10 mb-0">
            <button type="submit" className="cr-btn ml-5">
              Send us a message
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EventDetailsForm;
