import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addSubCategory, getAllInCats, removeSubCat } from "../../../store/Sub-Category/Thunks"
import { getCategory } from "../../../store/Category/Thunk"
import { FaMinusCircle, FaPenSquare } from "react-icons/fa";
import { Field, Form, Formik } from "formik"
import { RingLoader } from "react-spinners"
import Swal from "sweetalert2";
const NewSubCategory = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const subCats = useSelector((state) => state.SubCategory.catSubCats)
    const category = useSelector((state) => state.Category.category)

    const removeSubCategory = async (id, name) => {
        const token = await sessionStorage.getItem('accessToken')
        Swal.fire({
            title: `Remove ${name}?`,
            text: "All labels within this sub-category will be deleted",
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
                dispatch(removeSubCat({ id, token }))
            }
        })
    }


    useEffect(() => {
        const { categoryId } = router.query
        if (categoryId) {
            dispatch(getAllInCats(categoryId))
            dispatch(getCategory(categoryId))
        }
    }, [router.query])

    return (
        <div className="">
            <div className={"flex flex-col p-20 pb-8"}>

                <div className='flex items-end border-b'>
                    <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary mb-2'>{category.name} | Sub-Categories</h1></div>
                </div>
            </div>
            <div className="  ">
                <div className={'flex flex-col items-center h-4/5 mx-20 bg-white h-[44rem]  overflow-y-scroll'}>
                    {
                        subCats.length > 0 ?

                            subCats.map((s) => (
                                <div
                                    className={'md:w-11/12 w-4/5 self-center justify-self-center p-5 border-b hover:bg-gray-100 transition-all ease-in-out cursor-pointer flex justify-between'} key={s._id}>
                                    <span>{s.name}</span>
                                    <div>
                                        <button className="hover:scale-125 transition-all ease-in-out me-5"><FaPenSquare className="text-blue-500" size={20} /></button>
                                        <button className="hover:scale-125 transition-all ease-in-out ">
                                            <FaMinusCircle className="text-red-500" size={20} onClick={() => removeSubCategory(s._id, s.name)} />
                                        </button>
                                    </div>
                                </div>
                            ))
                            :
                            <div>
                                {category.name ?
                                    <div className="mt-60 text-lg font-bold antialiased">No Sub - Categories in  {category.name}</div>
                                    :
                                    <div className="mt-80 ">
                                        <RingLoader color="#36d7b7" size={90} />
                                    </div>}
                            </div>

                    }
                </div>
                <div className="flex flex-col px-20 mt-3 ">
                    <Formik
                        initialValues={{
                            name: ''
                        }}
                        onSubmit={async (values) => {
                            const { categoryId } = router.query
                            const token = await sessionStorage.getItem('accessToken')
                            dispatch(addSubCategory({ values, categoryId, token }))
                            document.getElementById('subCategoryFrom').reset()
                        }}
                    >
                        {({ isSubmitting }) => (

                            <Form id="subCategoryForm"
                            >
                                <div className="md:w-6/12 w-2/5 self-center justify-self-center flex">
                                    <Field name='name' id='name' type="text" className="bg-gray-50 border border-gray-300
                                     text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                     dark:focus:border-blue-500" placeholder="Sub-Category Name" />
                                    <button className="bg-blue-300 px-5 ms-5 rounded-lg" type="submit" disabled={isSubmitting}>Submit</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default NewSubCategory