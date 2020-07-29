import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cellActions } from "../redux/actions";
import * as Yup from "yup";

import { InsertClientForm as InsertClientFormBase } from "../components";

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
  const onSubmit = (values, { resetForm }) => {
    dispatch(cellActions.setNewUserUpload(values));
    setInsertCleintModal(false);
    resetForm({});
  };
  const onOpenInsertClientModal = () => {
    setInsertCleintModal(true);
    dispatch(cellActions.setUpLoadingErr(false));
  };
  return (
    <>
      <InsertClientFormBase
        formRef={formRef}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
        onCancelInsertCleintModal={onCancelInsertCleintModal}
        handleSubmit={handleSubmit}
        insertCleintModal={insertCleintModal}
        onOpenInsertClientModal={onOpenInsertClientModal}
        errUpLoading={errUpLoading}
      />
    </>
  );
};

export default InsertClientForm;
