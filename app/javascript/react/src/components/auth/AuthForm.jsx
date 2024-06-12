import React, { useEffect, useState} from 'react';
import PropTypes from "prop-types";
import './authForm.css';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { signupSchema, signinSchema } from "../../schemas";
import { login, signup } from "../../features/auth/authThunks";
import { Link, useNavigate } from "react-router-dom";
import DemoUsers from "./DemoUsers";

const AuthForm = ({
  title = "",
  buttonText = "",
  message = "",
  inputFields = [],
  welcomeMsg = "",
  welcomeDetail = "",
  formType,
  showCheckbox = false,
  user_type = "",
}) => {
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { values, handleChange, handleSubmit, errors, touched, setFieldValue, handleBlur } = useFormik({
    initialValues: {
      ...inputFields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {}),
      user_type: user_type,
    },
    validationSchema: formType === "signin" ? signinSchema : signupSchema,
    onSubmit: (values, action) => {
      if (formType === "signin") {
        dispatch(login(values));
      } else if (formType === "signup") {
        dispatch(signup(values));
      }
      action.resetForm();
    },
  });

  useEffect(() => {
    console.log(isLogin)
    isLogin && navigate("/");
  }, [isLogin, navigate]);

  return (
    <div className="main">
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <h2>{title}</h2>
            {title === "Hello!" && (
              <p className="signin-desc">Sign in to your account</p>
            )}
          </div>
          <form className="auth-form" method="post" onSubmit={handleSubmit}>
            {inputFields.map((field) => (
              <div key={field.name} className="input-with-icon">
                <input
                  type={field.type}
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={field.placeholder}
                />
                <i className={field.iconClass} />
                {errors[field.name] && touched[field.name] ? (
                  <p className="validation-error">{errors[field.name]}</p>
                ) : null}
              </div>
            ))}
            {showCheckbox && (
              <div className="checkbox-container">
                <label htmlFor="qa" className="terms-conditions-label">
                  <input
                    type="checkbox"
                    name="user_type"
                    checked={values.user_type === "qa"}
                    onChange={() =>
                      setFieldValue(
                        "user_type",
                        values.user_type === "qa" ? "developer" : "qa"
                      )
                    }
                  />
                  <p className="term">QA?</p>
                </label>
              </div>
            )}
            <div className="signin-button-container">
              <input type="submit" value={buttonText} />
            </div>
          </form>
          {formType === "signin" && (
            <>
            <p onClick={() => setIsOpen(true)} className="text-blue-500">Demo Users</p>
            <Link to={"/signup"} className="auth-message">
              {message}
            </Link>
            </>
          )}
          {formType === "signup" && (
            <Link to={"/signin"} className="auth-message">
              {message}
            </Link>
          )}
        </div>
        <div className="welcomeback-section">
          <h3>{welcomeMsg}</h3>
          <p>{welcomeDetail}</p>
        </div>
      </div>
      <DemoUsers isOpen={isOpen} setIsOpen={() => setIsOpen(false)} />
    </div>
  );
};

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  formType: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  inputFields: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      iconClass: PropTypes.string.isRequired,
    })
  ).isRequired,
  showCheckbox: PropTypes.bool,
  welcomeMsg: PropTypes.string,
  welcomeDetail: PropTypes.string,
  user_type: PropTypes.string,
};

export default AuthForm;
