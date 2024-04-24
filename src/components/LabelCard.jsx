import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { addToBasket } from "../../store/Orders/thunks";
const { PDFDocument } = require("pdf-lib");
import Swal from "sweetalert2";
import handleViewport from "react-in-viewport";

const IframeBlock = (props) => {
  const { inViewport, forwardedRef, src, alwaysRendered } = props;
  const shouldRender = inViewport || alwaysRendered.includes(src._id);
  return (
    <iframe
      scrolling="no"
      id={src._id}
      ref={forwardedRef}
      src={
        shouldRender
          ? `/api/getPdfs?categoryName=${src.categoryName}&subCategoryName=${src.subCategoryName}&fileName=${src.fileName}`
          : ""
      }
      width="100%"
      height="100%"
      className="rounded-t-md"
    ></iframe>
  );
};
export const ViewportBlock = handleViewport(IframeBlock);

const LabelCard = ({
  setToggleCartCanvas,
  toggleCartCanvas,
  setRender,
  render,
}) => {
  const labels = useSelector((state) => state.Label.activeLabels);
  const dispatch = useDispatch();
  const [labelOptions, setLabelOptions] = useState([]);
  const [getBufferCalled, setGetBufferCalled] = useState(false);
  const [alwaysRenderedIframes, setAlwaysRenderedIframes] = useState([]);
  const [currentFetch, setCurrentFetch] = useState({});
  // const [showFields, setShowFields] = useState(false);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    labels.forEach((l) => {
      l.fields.forEach((f) => {
        if (f.name === "AREA") {
          fetch(
            `/api/getPdfs?categoryName=${l.categoryName}&subCategoryName=${l.subCategoryName}&fileName=${l.fileName}`
          )
            .then((res) => res.arrayBuffer())
            .then(async (data) => {
              try {
                const pdfDoc = await PDFDocument.load(data);
                const form = pdfDoc.getForm();
                const fieldNames = form
                  .getFields()
                  .map((field) => field.getName());

                if (fieldNames.includes("AREA")) {
                  const dropdown = form.getDropdown("AREA");
                  const options = dropdown.getOptions();
                  let filtered = [];
                  for (let i = 0; i < options.length; i++) {
                    if (!filtered.includes(options[i])) {
                      filtered.push(options[i]);
                    } else {
                      continue;
                    }
                  }
                  setLabelOptions(options);
                }
              } catch (error) {
                console.error("Error loading PDF document:", error);
              }
            });
        }
      });
    });
  }, [labels]);




  const handleEnterViewport = (iframeId) => {
    if (!alwaysRenderedIframes.includes(iframeId)) {
      setAlwaysRenderedIframes((prev) => [...prev, iframeId]);
    }
  };

  useEffect(() => {
    setAlwaysRenderedIframes([]);
  }, [labels]);

  const toast = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      iconColor: "white",
      customClass: {
        popup: "colored-toast",
        container: "addToCartToast",
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    await Toast.fire({
      icon: "success",
      title: "Added to Cart!",
    });
  };

  return (
    <div className="grid justify-items-center laptoplg:grid-cols-4 grid-cols-2 gap-8 max-h-[80rem] laptop:h-[37.5rem] overflow-auto pb-4 p-2 pr-10">
      {labels.length > 0
        ? labels.map((l, index) => {
            let vals = l.fields.reduce((acc, curr, i) => {
              acc[curr.name] = curr.value || "";
              return acc;
            }, {
              showFields: false
            });
            vals["qty"] = "";
            return (
              <Formik
                key={l._id}
                initialValues={vals}
                onSubmit={async (values, helpers) => {
                  const { qty, ...newValues } = values;
                  delete values.qty;
                  delete values.showFields;
                  let id = l._id;
                  let finalArr = [];
                  for (const property in newValues) {
                    let obj = {
                      name: property,
                      text: newValues[property],
                    };
                    finalArr.push(obj);
                  }
                  await dispatch(addToBasket({ finalArr, qty, id }));
                  setRender(!render);
                  toast();
                  helpers.resetForm();
                }}
              >
                {({ isSubmitting, values, setFieldValue }) => (
                  <Form id={l._id} key={index}>
                    <div className="bg-white w-full h-76 laptop:h-auto rounded-lg drop-shadow-md font-genaPrimary">
                      <div className="w-full h-[15rem] rounded-md justify-center flex items-center">
                        <ViewportBlock
                          key={l._id}
                          alwaysRendered={alwaysRenderedIframes}
                          src={l}
                          onEnterViewport={() => handleEnterViewport(l._id)}
                        />
                      </div>
                      <div className="px-4 pt-4 pb-2">
                        <div className="font-medium">{l.docNum}</div>
                        <div className=" text-gray-500 text-sm">
                          {l.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          <span>Pack of {l.unitPack}</span>
                        </div>
                        <div className="h-[1px] w-full bg-gray-200 mt-3"></div>
                        <div className="mt-3">
                          <div className="text-gray-400 font-light w-full cursor-pointer flex gap-2 items-center" onClick={() =>
                            setFieldValue("showFields", !values.showFields)
                          }>
                            <svg className="w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.2 21C6.07989 21 5.51984 21 5.09202 20.782C4.71569 20.5903 4.40973 20.2843 4.21799 19.908C4 19.4802 4 18.9201 4 17.8V6.2C4 5.07989 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V7M8 7H14M8 15H9M8 11H12M11.1954 20.8945L12.5102 20.6347C13.2197 20.4945 13.5744 20.4244 13.9052 20.2952C14.1988 20.1806 14.4778 20.0317 14.7365 19.8516C15.0279 19.6486 15.2836 19.393 15.7949 18.8816L20.9434 13.7332C21.6306 13.0459 21.6306 11.9316 20.9434 11.2444C20.2561 10.5571 19.1418 10.5571 18.4546 11.2444L13.2182 16.4808C12.739 16.96 12.4994 17.1996 12.3059 17.4712C12.1341 17.7123 11.9896 17.9717 11.8751 18.2447C11.7461 18.5522 11.6686 18.882 11.5135 19.5417L11.1954 20.8945Z" stroke="#6b7280" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            <span>{values.showFields ? "Hide" : "Show"} fields</span>
                            <svg className={`w-7 ml-auto transition-all ease-in-out ${values.showFields ? "" : "rotate-90"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.0686 9H7.9313C7.32548 9 7.02257 9 6.88231 9.1198C6.76061 9.22374 6.69602 9.37967 6.70858 9.53923C6.72305 9.72312 6.93724 9.93731 7.36561 10.3657L11.4342 14.4343C11.6322 14.6323 11.7313 14.7313 11.8454 14.7684C11.9458 14.8011 12.054 14.8011 12.1544 14.7684C12.2686 14.7313 12.3676 14.6323 12.5656 14.4343L16.6342 10.3657C17.0626 9.93731 17.2768 9.72312 17.2913 9.53923C17.3038 9.37967 17.2392 9.22374 17.1175 9.1198C16.9773 9 16.6744 9 16.0686 9Z" stroke="#6b7280" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                          </div>
                        </div>
                        <div className={`transition-all overflow-hidden ease-in-out ${values.showFields ? "max-h-[600px]" : "max-h-[0px]"}`} key={l._id}>
                          <div className="flex flex-col">
                          <label className="label pb-[2px] label-text-alt font-medium uppercase text-gray-500" htmlFor={l.docNum}>Quantity <span className="lowercase text-gray-500 font-light text-sm">(Max: {l.maxOrderQty})</span></label>
                          <Field
                            className="input mb-2 input-bordered rounded-md focus:outline-none input-sm w-20" type="number" max={l.maxOrderQty}
                          placeholder={`Qty`} name="qty" required key={l.docNum} id={l.docNum} min="1"/>
                          </div>
                        {l.isKanban ?
                          l.fields.map((f) => {
                            if (f.name === 'AREA') {
                              return (
                                <div key={f._id} className={f.type === 'checkbox' ? 'flex gap-5' : ''}>
                                  <label htmlFor={f.name} className="label label-text-alt uppercase text-gray-500 font-medium pb-[2px]">{f.name}</label>
                                  <Field component="select"
                                    className="input input-bordered rounded-md w-full max-w-xs input-sm focus:outline-none" name={f.name} id={f.name} type={f.type} key={f._id} required >
                                    {labelOptions.length > 0 ?
                                      labelOptions.map((o, index) => (
                                        <option key={index} id={o} name={o} value={o}>{o}</option>
                                      )) : null}
                                  </Field>
                                </div>

                              )

                            } else {

                              return (
                                <div key={f._id} className={f.type === 'checkbox' ? 'flex gap-5 mt-1' : 'mt-1'}>
                                  <div className={`${f.type === 'checkbox' ? 'flex items-center gap-3' : ""}`}>
                                  <label htmlFor={f.name} className={`label-text-alt uppercase text-gray-500 font-medium pb-[2px] ${f.type === 'checkbox' ? "order-2" : ""}`}>{f.name}</label>
                                    <Field className={`${f.type === 'checkbox' ? 'checkbox rounded-md' : 'input rounded-md input-bordered w-full max-w-xs input-sm focus:outline-none'}`} 
                                       name={f.name} id={f.name} type={f.type} key={f._id} required={f.type === 'checkbox' ? false : false} />
                                  </div>
                                </div>
                              )
                            }
                          })
                          : null
                        }

                      </div>
                      <div className={`mt-3 overflow-hidden transition-all ease-in-out ${values.showFields ? "max-h-[500px]" : "max-h-[0px]"}`}><button className='btn w-full btn-sm' type='submit' disabled={isSubmitting}>Add to Order</button></div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

          )
        })


        : null}
    </div>
  );
};

export default LabelCard;
