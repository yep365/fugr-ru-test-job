import React, { useState, useRef } from "react";
import { Button, Modal, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { cellActions } from "../../redux/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./InsertClientForm.scss";

const InsertClientForm = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const { errUpLoading } = useSelector(({ cell }) => cell);
  const [insertCleintModal, setInsertCleintModal] = useState(false);
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const USstateRegExp = /^((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))$/;
  const USzipRegExp = /^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/;
  const fitstCapital = /^[A-Z][a-z0-9_-]{3,19}$/;

  const validationSchema = Yup.object({
    id: Yup.number("Только числа").required("Обязательно"),
    firstName: Yup.string()
      .matches(fitstCapital, "Должно начинаться с Заглавной буквы")
      .required("Обязательно"),
    lastName: Yup.string()
      .matches(fitstCapital, "Должно начинаться с Заглавной буквы")
      .required("Обязательно"),
    email: Yup.string().email("Email указан неверно").required("Обязательно"),
    phone: Yup.string()
      .matches(phoneRegExp, "Номер телфона указан неверно!")
      .required("Обязательно"),
    address: Yup.object({
      streetAddress: Yup.string()
        .matches(fitstCapital, "Должно начинаться с Заглавной буквы")
        .required("Обязательно"),
      city: Yup.string()
        .matches(fitstCapital, "Должно начинаться с Заглавной буквы")
        .required("Обязательно"),
      state: Yup.string()
        .matches(USstateRegExp, "Штат указан неверно!")
        .required("Обязательно"),
      zip: Yup.string()
        .matches(USzipRegExp, "ZIP-код США указан неверно!")
        .required("Обязательно"),
    }),
    description: Yup.string().required("Обязательно"),
  });
  const initialValues = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
      streetAddress: "",
      city: "",
      state: "",
      zip: "",
    },
    description: "",
  };
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };
  const onCancelInsertCleintModal = () => {
    setInsertCleintModal(false);
  };
  const onSubmit = (values) => {
    dispatch(cellActions.setNewUserUpload(values));
    setInsertCleintModal(false);
  };
  const onOpenInsertClientModal = () => {
    setInsertCleintModal(true);
    dispatch(cellActions.setUpLoadingErr(false));
  };

  return (
    <>
      {errUpLoading && (
        <Alert
          message="Ошибка отправки, проверьте id на уникальность"
          type="error"
        />
      )}
      <Button size="middle" onClick={onOpenInsertClientModal}>
        Внести клиента в базу
      </Button>
      <Modal
        title="Создать нового клиента"
        visible={insertCleintModal}
        onOk={handleSubmit}
        onCancel={onCancelInsertCleintModal}
      >
        <div className="header-form">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={formRef}
          >
            <Form>
              <div className="header-form__input">
                <label htmlFor="id">Id</label>
                <Field
                  type="text"
                  id="id"
                  name="id"
                  placeholder="Должен быть уникалным"
                />
                <ErrorMessage name="id" />
              </div>
              <div className="header-form__input">
                <label htmlFor="firstName">FirstName</label>
                <Field type="text" id="firstName" name="firstName" />{" "}
                <ErrorMessage name="firstName" />
              </div>
              <div className="header-form__input">
                <label htmlFor="lastName">LastName</label>
                <Field type="text" id="lastName" name="lastName" />{" "}
                <ErrorMessage name="lastName" />
              </div>
              <div className="header-form__input">
                <label htmlFor="email">Email</label>
                <Field type="text" id="email" name="email" />{" "}
                <ErrorMessage name="email" />
              </div>
              <div className="header-form__input">
                <label htmlFor="phone">Phone</label>
                <Field type="text" id="phone" name="phone" />
                <ErrorMessage name="phone" />
              </div>
              <div className="header-create-client__address">
                <div className="header-form__input">
                  <label htmlFor="streetAddress">Street Address</label>
                  <Field
                    type="text"
                    id="streetAddress"
                    name="address.streetAddress"
                  />
                  <ErrorMessage name="address.streetAddress" />
                </div>
                <div className="header-form__input">
                  <label htmlFor="city">City</label>
                  <Field type="text" id="city" name="address.city" />
                  <ErrorMessage name="address.city" />
                </div>
                <div className="header-form__input">
                  <label htmlFor="state">State</label>
                  <Field type="text" id="state" name="address.state" />
                  <ErrorMessage name="address.state" />
                </div>
                <div className="header-form__input">
                  <label htmlFor="zip">Zip</label>
                  <Field type="text" id="zip" name="address.zip" />
                  <ErrorMessage name="address.zip" />
                </div>
              </div>
              <div className="header-form__input">
                <label htmlFor="description">Description</label>
                <Field type="text" id="description" name="description" />
                <ErrorMessage name="description" />
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default InsertClientForm;
