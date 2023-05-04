import { Formik, Field, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, removeCategory } from "../../../store/Category/Thunk";
import { FaMinusCircle, FaPenSquare } from "react-icons/fa";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
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
            text: "All labels within this folder will be deleted",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeCategory({ id, token }))
                let timerInterval
                Swal.fire({
                    title: `Deleting ${name}`,
                    html: 'This make take some time <br> <b></b> Seconds left.',
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
        <div className="">
            <div className={"flex flex-col p-20 pb-8"}>

                <div className='flex items-end border-b'>
                    <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary mb-2'>Categories</h1></div>
                </div>
            </div>
            <div className={'flex flex-col items-center justify-center bg-white mx-20 h-[44rem] pt-72 overflow-y-scroll'}>
                {
                    cats ?
                        cats.map((c) => (
                            <div onClick={() => showSubCats(c._id)}
                                className={'md:w-11/12 w-4/5 self-center justify-self-center p-5 border-b hover:bg-gray-100 transition-all ease-in-out cursor-pointer flex justify-between'} key={c._id}>
                                <span>{c.name}</span>
                                <div>
                                    <button className="hover:scale-125 transition-all ease-in-out me-5"><FaPenSquare className="text-blue-500" /></button>
                                    <button className="hover:scale-125 transition-all ease-in-out " onClick={() => deleteCat(c._id, c.name)}>
                                        <FaMinusCircle className="text-red-500" />
                                    </button>
                                </div>
                            </div>
                        ))
                        : null
                }

            </div>
            <div className="flex flex-col px-20 mt-3 ">
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