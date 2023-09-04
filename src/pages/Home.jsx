import { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import PicModal from "./../components/PicModal";
import TermModal from "../components/TermModal";
import { AppContext } from "../context";

const validationSchema = Yup.object().shape({
  radiologistname: Yup.string().required("Doctor name is required"),
  emailId: Yup.string().email().required("Email Id is required"),
  specialty: Yup.string().required("Doctor speciality is required"),
  GEEmployeeName: Yup.string().required("Employee name is required"),
  city: Yup.string().required("Doctor speciality is required"),
  hospital: Yup.string().required("Doctor Clinic / Hospital Name is required"),
  photo: Yup.mixed().when({
    is: null,
    then: Yup.mixed().required(),
    otherwise: Yup.mixed().notRequired(),
  }),
  termsAndCondition: Yup.boolean().oneOf([true], "Accept terms and conditions"),
});
export default function Home() {
  const { setInfo } = useContext(AppContext);
  const [openModal, setOpenModal] = useState({});
  const [termModalOpen, setTermModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="px-6">
      <h4 className="text-primary text-xl text-center mb-2">
        Enter Your Details
      </h4>

      <Formik
        initialValues={{
          radiologistname: "",
          emailId: "",
          specialty: "",
          GEEmployeeName: "",
          city: "",
          hospital: "",
          photo: null,
          termsAndCondition: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(val) => {
          setInfo(val);
          navigate("/story");
        }}
      >
        {({
          handleBlur,
          handleSubmit,
          errors,
          isValid,
          dirty,
          handleChange,
          setFieldValue,
          values,
        }) => (
          <>
            <Form
              onSubmit={handleSubmit}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-lg overflow-hidden space-y-2"
            >
              <div className="form-group">
                <Field
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  id="radiologistname"
                  name="radiologistname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="radiologistname"
                  component="div"
                  className="text-red-600 text-center text-xs"
                />
              </div>
              <div className="form-group">
                <Field
                  type="text"
                  className="form-control"
                  placeholder="Your Email ID"
                  id="emailId"
                  name="emailId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="emailId"
                  component="div"
                  className="text-red-600 text-center text-xs"
                />
              </div>
              <div className="form-group">
                <Field
                  as="select"
                  id="specialty"
                  name="specialty"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Specialty</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Technician">Technician</option>
                </Field>

                <ErrorMessage
                  name="specialty"
                  component="div"
                  className="text-red-600 text-center text-xs"
                />
              </div>
              <div className="form-group">
                <Field
                  type="text"
                  className="form-control"
                  placeholder="Your City"
                  id="city"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-600 text-center text-xs"
                />
              </div>
              <div className="form-group">
                <Field
                  type="text"
                  className="form-control"
                  placeholder="Hospital"
                  id="hospital"
                  name="hospital"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="hospital"
                  component="div"
                  className="text-red-600 text-center text-xs"
                />
              </div>
              <div className="form-group">
                <Field
                  type="text"
                  className="form-control"
                  placeholder="GE Employee Name"
                  id="GEEmployeeName"
                  name="GEEmployeeName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="GEEmployeeName"
                  component="div"
                  className="text-red-600 text-center text-xs"
                />
              </div>
              <div
                className="btn text-center"
                onClick={() => {
                  setOpenModal({
                    show: true,
                    setFieldValue: setFieldValue,
                  });
                }}
              >
                YOUR PHOTO
              </div>
              <div className="space-x-2 text-center">
                <input
                  type="checkbox"
                  name="termsAndCondition"
                  id="termsAndCondition"
                  onChange={handleChange}
                />
                <span className="text-sm">
                  I have read and agree to the{" "}
                  <span
                    className="underline text-primary"
                    onClick={() => setTermModalOpen(true)}
                  >
                    terms and conditions.
                  </span>
                </span>
                <ErrorMessage
                  name="termsAndCondition"
                  component="div"
                  className="text-red-600 text-center text-xs"
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn w-full">
                  SUBMIT
                </button>
              </div>
            </Form>
          </>
        )}
      </Formik>
      {termModalOpen && (
        <TermModal setTermModalOpen={setTermModalOpen}>
          <div className="center-content-flex flex-col gap-4 text-sm">
            <h4 className="text-primary text-xl mb-1">Terms & Conditions</h4>
            <p>
              By clicking here, you are agreeing to receive marketing emails,
              newsletters and other promotional communications from GE
              Healthcare from time to time.
              <br />
              <br />
              You have a right to withdraw your consent at any time, by{" "}
              <a
                href="https://landing1.gehealthcare.com/UnsubscribePage.html?mkt_unsubscribe=1"
                className="text-primary break-all font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                clicking here.
              </a>
              We may still continue to send you service-related and other
              non-promotional communications. For more information relating to
              our privacy practices, we invite you to review our{" "}
              <a
                href="https://www.gehealthcare.com/about/privacy/privacy-policy?showPopup=false"
                className="text-primary break-all font-semibold "
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy.
              </a>
            </p>
          </div>
        </TermModal>
      )}
      <PicModal
        show={openModal.show}
        setShow={setOpenModal}
        setFieldValue={openModal.setFieldValue}
      />
    </div>
  );
}
