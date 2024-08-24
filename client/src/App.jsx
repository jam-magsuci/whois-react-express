// Libraries
import { Formik, Field, Form } from "formik";
import { useState } from "react";
import axios from "axios";

// Components
import WhoisTable from "./components/WhoisTable";

// Styles / Images
import searchIcon from "./assets/search-icon.png";
import loadingIcon from "./assets/loading.svg";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState({});
  return (
    <div className="flex flex-col items-center mx-[30px] gap-y-[15px] my-[60px]">
      {/* logo & header */}
      <img src={searchIcon} className="w-[180px]" />
      <h1 className="font-extralight font-sans text-[40px] sm:text-[60px] text-stone-800 text-center">
        Jam's Whois Lookup
      </h1>

      {/* form */}
      <Formik
        initialValues={{ domainName: "", requestedData: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.domainName) {
            errors.domainName = "Domain name required";
          }

          if (!values.requestedData) {
            errors.requestedData = "Requested data required";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setIsLoading(true);

          try {
            const data = JSON.stringify({
              domainName: values.domainName,
              requestedData: values.requestedData,
            });

            const config = {
              method: "post",
              maxBodyLength: Infinity,
              url: `${import.meta.env.VITE_API_URL}/lookup`,
              headers: {
                "Content-Type": "application/json",
              },
              data: data,
            };
            const result = await axios.request(config);
            setResults((prevData) => ({
              ...prevData,
              ...result.data,
              requestedData: values.requestedData,
              domainName: values.domainName,
            }));
            setSubmitting(false);
            setIsLoading(false);
          } catch (error) {
            console.error("There was an error!", error);
          }

          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          //   setIsLoading(false);
          //   setResults((prevData) => ({
          //     ...prevData,
          //     requestedData: values.requestedData,
          //   }));
          // }, 3000);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-row flex-wrap sm:flex-nowrap gap-x-[10px] items-center justify-center gap-[15px]">
              <input
                type="text"
                name="domainName"
                onChange={handleChange}
                onBlur={handleBlur}
                // value={values.email}
                placeholder="Enter domain name"
                className="border-2 border-[#ccc] rounded-[15px] p-[15px] w-full sm:w-[380px]"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-[30px] py-[15px] px-[40px] bg-[#bbf49b] w-full sm:w-auto"
              >
                Submit
              </button>
            </div>

            <div
              role="group"
              aria-labelledby="my-radio-group"
              className="flex flex-row gap-x-[30px] mt-[10px] flex-wrap "
            >
              <label className="flex flex-row gap-x-[3px]">
                <Field type="radio" name="requestedData" value="domain" />
                Domain Information
              </label>
              <label className="flex flex-row gap-x-[3px]">
                <Field type="radio" name="requestedData" value="contact" />
                Contact Information
              </label>
            </div>
            <div className="italic text-red-600 mt-[15px]">
              <p>
                {errors.domainName && touched.domainName && errors.domainName}
              </p>
              <p>{errors.requestedData}</p>
            </div>
          </Form>
        )}
      </Formik>

      {/* results */}
      {isLoading && (
        <img src={loadingIcon} className="w-[60px] fill-cyan-800" />
      )}

      {JSON.stringify(results) != "{}" && <WhoisTable data={results} />}
    </div>
  );
}
