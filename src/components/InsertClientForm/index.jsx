import React from "react";
import { Button, Modal, Alert } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PropTypes } from "prop-types";

import { PropsReceiver } from "./components";

import "./InsertClientForm.scss";

const InsertClientForm = ({
  errUpLoading,
  onOpenInsertClientModal,
  insertCleintModal,
  handleSubmit,
  onCancelInsertCleintModal,
  initialValues,
  validationSchema,
  onSubmit,
  formRef,
  validation,
}) => {
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
        okText="Отправить"
        visible={insertCleintModal}
        onOk={handleSubmit}
        onCancel={onCancelInsertCleintModal}
        okButtonProps={{ disabled: !validation }}
      >
        <div className="header-form">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={formRef}
          >
            {({ isValid, dirty, errors, validateForm }) => (
              <Form>
                <div className="header-form__input">
                  <PropsReceiver
                    isValid={isValid}
                    dirty={dirty}
                    errors={errors}
                    validateForm={validateForm}
                  />
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
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};
InsertClientForm.propTypes = {
  errUpLoading: PropTypes.bool,
  onOpenInsertClientModal: PropTypes.func,
  insertCleintModal: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onCancelInsertCleintModal: PropTypes.func,
  initialValues: PropTypes.object,
  validationSchema: PropTypes.object,
  onSubmit: PropTypes.func,
  formRef: PropTypes.object,
  validation: PropTypes.bool,
};

export default InsertClientForm;
