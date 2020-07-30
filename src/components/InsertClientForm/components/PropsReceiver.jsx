import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { cellActions } from "../../../redux/actions";

const PropsReceiver = ({ isValid, dirty, validateForm, errors }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (isValid === true && dirty === true && Object.keys(errors) < 1) {
      dispatch(cellActions.setValidation(true));
    } else {
      dispatch(cellActions.setValidation(false));
    }
  }, [isValid, dirty, errors]);

  useEffect(() => {
    (() => validateForm())();
  }, []);

  return null;
};

export default PropsReceiver;
