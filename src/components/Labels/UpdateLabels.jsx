import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { removeLabel, updateJiraLabelPoints, updateSerialLabel } from "../../../store/Label/Thunks";
import { Button, Divider, Form, InputNumber, Modal, Switch } from 'antd'
const UpdateLabels = ({ serialModal, setSerialModal }) => {
  // ! SCOPED VARIABLES */
  const account = useSelector((state) => state.Account.account);
  const labels = useSelector((state) => state.Label.activeLabels);
  const [activeLabel, setActiveLabel] = useState(null)
  const dispatch = useDispatch();

  // ! SCOPED FUNCTIONS */
  const showModal = async (label) => {
    const { value: formValues } = await Swal.fire({
      title: `${label.name}`,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#579dff',
      cancelButtonColor: '#e73b3b',
      html: `
      <div class="flex justify-between items-center">
      <label
  class="inline-block ps-[0.15rem] hover:cursor-pointer"
  >Jira Points</label>
      <input id="points" class="swal2-input" type="number" value="${label?.jiraPoints}"/>
      </div>
  
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          'jiraPoints': document.getElementById("points").value,
        }
  }
    });
    if (formValues) {
      updateJiraPoints(formValues, label._id)
    }
  }

  const updateJiraPoints = (data, id) => {
    console.log(data)
    let token = account.accessToken;
    dispatch(updateJiraLabelPoints({token, id, data}))
  };





  const deleteLabel = (labelName, id) => {
    let token = account.accessToken;
    Swal.fire({
      title: `Delete ${labelName} label from Gena?`,
      text: "This will delete all orders that include this label",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", `${labelName} label has been deleted`, "success");
        dispatch(removeLabel({ id, token }));
      }
    });
  };

  return (
    <div className="flex flex-col pl-20 pr-20 pt-20 pb-4">
      <div className="flex items-end">
        <div className="mr-auto">
          {labels.length > 0 ? (
            <h1 className="text-3xl font-medium font-genaPrimary">
              ({labels.length}) Labels in {labels[0].categoryName} /{" "}
              {labels[0].subCategoryName}
            </h1>
          ) : null}
        </div>
      </div>
      <div className="mb-10 mt-5 border-t border-gray-300 rounded-full" />
      <div className="grid justify-items-center laptoplg:grid-cols-4 grid-cols-2 gap-8 max-h-[92rem] laptop:h-[37.5rem] overflow-auto pb-4 p-2 pr-10">
        {labels.length > 0
          ? labels.map((l) => (
              <div
                className="bg-white w-full h-88 laptop:h-[30rem] rounded-lg drop-shadow-md font-genaPrimary"
                key={l._id}
              >
                <div className="w-full h-[15rem] rounded-md justify-center flex items-center">
                  <iframe
                    src={`/api/getPdfs?categoryName=${l.categoryName}&subCategoryName=${l.subCategoryName}&fileName=${l.fileName}`}
                    width="100%"
                    height="100%"
                    className="rounded-t-md"
                  ></iframe>
                </div>
                <div className="p-4">
                  <div className="h-10">
                  <div className="text-end text-xs">{l.docNum}</div>
                  {l.jiraPoints ? 
                  <div className="text-end text-xs">Jira points: {l.jiraPoints}</div>
                  : null}
                  </div>
                  <div className="text-center text-md text-gray-500 mb-5">
                    {l.name}
                  </div>
                  <div className="text-center text-md font-semibold">
                    <span>Pack of {l.unitPack}</span>
                  </div>
                  <div className="text-center mt-3">
                    {labels[0].subCategoryName != "serial-numbers" ? (
                      <button
                        onClick={() => {
                          if (
                            account.privileges == "admin" ||
                            account.privileges == "printshop"
                          ) {
                            deleteLabel(l.name, l._id);
                          }
                        }}
                        className="bg-[#e73b3b] px-3 py-1 rounded-lg w-full text-white mt-2 hover:bg-[#c04343] hover:scale-105 hover:shadow-md transition-all
                                     ease-in-out"
                      >
                        Delete Label
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          setSerialModal({
                            labelId: l._id,
                            isOpen: true,
                          })
                        }
                        className="bg-[#d5c558] px-3 py-1 rounded-lg w-full text-white mt-2 hover:bg-[#c0ac2d] hover:scale-105 hover:shadow-md transition-all
                    ease-in-out"
                      >
                        Update Label
                      </button>
                    )}
                    <button className="bg-[#579DFF] px-3 py-1 rounded-lg w-full text-white mt-2 hover:bg-[#467ece] hover:scale-105 hover:shadow-md transition-all
                    ease-in-out" onClick={() => {
                      // updateJiraPoints(l.name, l._id, l?.jiraPoints)
                      setActiveLabel(l)
                      showModal(l)
                    }}>
                      Edit Jira Points
                    </button>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>

    </div>
  );
};

export default UpdateLabels;
