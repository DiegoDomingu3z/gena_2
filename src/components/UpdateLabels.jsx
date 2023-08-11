import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import { removeLabel } from "../../store/Label/Thunks";


const UpdateLabels = () => {
    const [modal, setModal] = useState(false)
    const account = useSelector((state) => state.Account.account)
    const labels = useSelector((state) => state.Label.activeLabels)
    const dispatch = useDispatch()

    const deleteLabel = (labelName, id) => {
        let token = account.accessToken
        Swal.fire({
            title: `Delete ${labelName} label from Gena?`,
            text: "This will delete all orders that include this label",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(account.accessToken)
                Swal.fire(
                    'Deleted!',
                    `${labelName} label has been deleted`,
                    'success'
                )
                dispatch(removeLabel({ id, token }))
            }
        })
    }

    return (
        <div className="flex flex-col pt-20 pr-20 pl-20">
            <div className='flex items-end'>
                <div className='mr-auto'>
                    {labels.length > 0 ?
                        <h1 className='text-3xl font-medium font-genaPrimary'>({labels.length}) Labels in {labels[0].categoryName} / {labels[0].subCategoryName}</h1>
                        : null}
                </div>
            </div>
            <div className='mb-10 mt-5 border-t border-gray-300 rounded-full' />
            <div className="grid justify-items-center laptoplg:grid-cols-4 grid-cols-2 gap-8 max-h-[80rem] laptop:h-[37.5rem] overflow-auto pb-4 p-2 pr-10">
                {labels.length > 0 ?
                    labels.map((l) => (
                        <div className='bg-white w-full h-76 laptop:h-[26rem] rounded-lg drop-shadow-md font-genaPrimary' key={l._id}>
                            <div className='w-full h-[15rem] rounded-md justify-center flex items-center'>
                                <iframe src={`images/pdflabels/${l.categoryName}/${l.subCategoryName}/${l.fileName}`} width="100%" height="100%" className='rounded-t-md'></iframe>

                            </div>
                            <div className='p-4'>
                                <div className='text-end text-xs'>{l.docNum}</div>
                                <div className='text-center text-md text-gray-500 mb-5'>{l.name}</div>
                                <div className='text-center text-md font-semibold'>
                                    <span>Pack of {l.unitPack}</span>
                                </div>
                                <div className='text-center mt-3'>
                                    <button onClick={() => {
                                        if (account.privileges == 'admin' || account.privileges == 'printshop') {
                                            deleteLabel(l.name, l._id)
                                        }
                                    }} className='bg-[#e73b3b] px-3 py-1 rounded-lg w-full text-white mt-2 hover:bg-[#c04343] hover:scale-105 hover:shadow-md transition-all
                                     ease-in-out' >Delete Label</button></div>
                            </div>
                        </div>
                    )) : null}
            </div>
        </div>
    )
}

export default UpdateLabels;