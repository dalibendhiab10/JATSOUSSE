"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import { redirect } from 'next/navigation'

const EventDetailsForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const [titleloading, setTitleLoading] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [DataToPass, setDataToPass] = useState({
    nom: "",
    prenom: "",
    email: "",
    phone: "",
  });
  let [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleQuantityChange = (type: string) => {
    if (type === "minus") {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    } else if (type === "plus") {
      if (quantity < 10) {
        setQuantity(quantity + 1);
      }
    }
  };

  const onSubmit = (data: Record<string, any>) => {
    handleShow();
    if (data) {
      setDataToPass(data as { nom: string; prenom: string; email: string; phone: string; });    }
  };

  const handleSubmitForm = function (e: any) {
    e.preventDefault();
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not available yet");
      return;
    }
    executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
      submitEnquiryForm(gReCaptchaToken);
    });
  };
  const submitEnquiryForm = async (gReCaptchaToken: string) => {
    setTitleLoading("Paiement en cours...");
    handleClose();
    setLoading(true);
    await axios({
      method: "post",
      url: "/api/CreateTransaction",
      data: {
        LastName: DataToPass.nom,
        FirstName: DataToPass.prenom,
        Email: DataToPass.email,
        Phone: DataToPass.phone,
        Qte: quantity,
        gRecaptchaToken: gReCaptchaToken,
      },
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // console.log(response.data);
        let i = 3;
        setTitleLoading(`redirection dans ${i} secondes ...`);
        const intervalId = setInterval(() => {
          i--;
          if (i >= 0) {
            setTitleLoading(`redirection dans ${i} secondes ...`);
          } else {
            // Clear the interval when the countdown is finished
            clearInterval(intervalId);
            // Perform the redirect
            window.location.href = response.data.Payurl;
            // Update the loading state
            setLoading(false);
          }
       }, 1000); // 1000 milliseconds = 1 second
      
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const RegexEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const validateEmail = (value: any) => {
    if (!value) return "Email est obligatoire";
    ///check email vality using regex
    if (!RegexEmail(value)) return "Email non Valide";
  };
  const validatePhone = (value: any) => {
    if (!value) return "Tel. est obligatoire";
    if (isNaN(value)) return "Phone must be a number";
    if (value > 99999999) return "numero de telephone invalide";
    return true;
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="join-us-form form-style-two pt-15"
      >
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group ">
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                {...register("prenom", { required: true })}
                className="form-control input-70s"
                placeholder="Prénom"
              />
              <p className="form_error">
                {errors.prenom && "prenom est obligatoire !"}
              </p>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                {...register("nom", { required: true })}
                className="form-control input-70s"
                placeholder="Nom"
              />
              <p className="form_error">
                {errors.nom && "Nom est obligatoire"}
              </p>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                {...register("email", {
                  validate: validateEmail,
                  required: true,
                })}
                className="form-control input-70s"
                placeholder="email@contact.com"
              />
              <p className="form_error">
              {errors.email && (errors.email.message ? String(errors.email.message) : "email est obligatoire")}
              
              </p>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label htmlFor="phone_number">N° de Téléphone</label>
              <input
                type="text"
                id="phone_number"
                {...register("phone", {
                  validate: validatePhone,
                  required: true,
                })}
                className="form-control input-70s"
                placeholder="N° de Téléphone"
              />
              <p className="form_error">
                {errors.phone && (errors.phone.message ? String(errors.phone.message) : "Tel est obligatoire")}

              </p>
            </div>
          </div>

          <div className="col-sm-6 ">
            <div className="form-group ">
              <label htmlFor="quantity">Nombre de Tickets.</label>

              <div className="input-group">
                <span className="input-group-btn">
                  <button
                    type="button"
                    className="btn btn-default btn-number qte-btnminus"
                    onClick={() => handleQuantityChange("minus")}
                    disabled={quantity === 1}
                  >
                    -
                  </button>
                </span>
                <input
                  id="quantity"
                  type="text"
                  name="quantity"
                  className="form-control input-number input-70s"
                  value={quantity}
                  readOnly
                  style={{ width: "50px" }}
                />
                <span className="input-group-btn">
                  <button
                    type="button"
                    className="btn btn-default btn-number qte-btnplus "
                    onClick={() => handleQuantityChange("plus")}
                    disabled={quantity === 10}
                  >
                    +
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group total">
              <label >Total.</label>
              <label style={{fontWeight:"bold",fontSize:"30px"}} >{quantity*10} DT</label>

            </div>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="form-control  checkout-btn">
            Valider La commande
          </button>
        </div>
        <Segment>
          <Dimmer active={loading}>
            <Loader size="large">{titleloading}</Loader>
          </Dimmer>
        </Segment>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          centered
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Validation de commande</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Nom & prenom : {DataToPass.prenom} {DataToPass.nom} <br />
            Email: {DataToPass.email} <br />
            Tel: {DataToPass.phone} <br />
            Nb. de Tickets : {quantity} <br />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              fermer
            </Button>
            <Button
              variant="secondary"
              onClick={handleSubmitForm}
              style={{
                color: "#03003A",
                backgroundColor: "#c2f915",
                border: "none",
              }}
            >
              Payer avec Konnect
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
};

export default EventDetailsForm;
