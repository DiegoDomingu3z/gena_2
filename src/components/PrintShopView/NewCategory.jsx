import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, removeCategory } from "../../../store/Category/Thunk";
import { FaMinusCircle, FaPenSquare } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { RingLoader } from "react-spinners"
const NewCategory = () => {
    const cats = useSelector((state) => state.Category.categories)
    const dispatch = useDispatch()
    const router = useRouter()


    const addCat = async (values) => {
        const token = await sessionStorage.getItem('accessToken')
        dispatch(addCategory({ values, token }))
    }

    const deleteCat = async (id, name) => {
        const token = await sessionStorage.getItem('accessToken')
        Swal.fire({
            title: `Remove ${name}?`,
            text: "All labels and sub-categories within this category will be deleted",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let timerInterval
                await Swal.fire({
                    title: `Deleting ${name}`,
                    html: 'This may take some time <br> <b></b> Seconds left.',
                    timer: 8000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)

                    }
                })
                dispatch(removeCategory({ id, token }))
            }
        })
    }


    const showSubCats = (id) => {
        const queryParams = {
            categoryId: id
        };
        router.push({
            pathname: "/SubCategory",
            query: queryParams,
        });
    }




    return (
        <div className="flex flex-col p-20 pb-8">
            <div className={""}>

                <div className='flex items-end'>
                    <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary'>Categories</h1></div>
                </div>
                <div className='mb-10 mt-5 border-t border-gray-300 rounded-full' />
            </div>
            <div className={'bg-white p-5 rounded-md shadow-md overflow-auto h-[90rem] laptop:h-[44rem]'}>
                <h1 className='text-xl font-medium mb-10'>Categories</h1>
                {
                    cats ?
                        cats.map((c) => (
                            <div onClick={() => showSubCats(c._id)}
                                className={'w-full p-5 border-b hover:bg-gray-100 transition-all ease-in-out cursor-pointer flex justify-between'} key={c._id}>
                                <span>{c.name}</span>
                                <div className="flex gap-5">
                                    <button className='text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full' onClick={(event) => {
                                        event.stopPropagation(); // Stop propagation here

                                    }}><FontAwesomeIcon icon={faPencil} /></button>
                                    <button className="text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full" onClick={(event) => {
                                        event.stopPropagation(); // Stop propagation here
                                        deleteCat(c._id, c.name);
                                    }}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        ))
                        :
                        <div className="mt-80 ">
                            <RingLoader color="#36d7b7" size={90} />
                        </div>
                }

            </div>
            <div className="flex flex-col mt-3 ">
                <Formik
                    initialValues={{
                        name: ''
                    }}
                    onSubmit={async (values) => {
                        addCat(values)
                        document.getElementById('catForm').reset()
                    }}>
                    {({ isSubmitting }) => (
                        <Form id="catForm">
                            <div className="md:w-6/12 w-2/5 self-center justify-self-center flex">
                                <Field name="name" id="name" type="text" className="bg-gray-50 border border-gray-300
                                     text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                     dark:focus:border-blue-500" placeholder="Category Name" required />
                                <button className="bg-blue-300 px-5 ms-5 rounded-lg" type="submit" disabled={isSubmitting}>Submit</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default NewCategory;