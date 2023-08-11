import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addSubCategory, getAllInCats, removeSubCat, updateSubCat } from "../../../store/Sub-Category/Thunks"
import { getCategory } from "../../../store/Category/Thunk"
import { FaMinusCircle, FaPenSquare } from "react-icons/fa";
import { Field, Form, Formik } from "formik"
import { RingLoader } from "react-spinners"
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"

const NewSubCategory = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const subCats = useSelector((state) => state.SubCategory.catSubCats)
    const category = useSelector((state) => state.Category.category)
    const [triggerFetch, setTriggerFetch] = useState(false)
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
                    timer: 4000,
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

    const updateSubCats = async (id, name) => {
        const token = sessionStorage.getItem('accessToken')
        const { value: newName } = await Swal.fire({
            title: `Update ${name}'s name?`,
            html: `This will update all necessary data`,
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            inputValue: name,
            inputValidator: (value) => {
                if (!value) {
                    return 'If You are not changing the name, please press cancel'
                }
            },
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update'
        })
        if (newName) {
            let timerInterval
            let seconds = await Math.floor(Math.random() * 8) + 1;
            const milliseconds = await seconds * 1000;
            await Swal.fire({
                title: `Updating Department: <b>${name} </b> to <b>${newName}</b>`,
                html: 'This may take a couple of seconds, system is changing multiple account information with new data <br> <b></b>',
                timer: milliseconds,
                timerProgressBar: true,
                allowOutsideClick: () => {
                    const popup = Swal.getPopup()
                    popup.classList.remove('swal2-show')
                    setTimeout(() => {
                        popup.classList.add('animate__animated', 'animate__headShake')
                    })
                    setTimeout(() => {
                        popup.classList.remove('animate__animated', 'animate__headShake')
                    }, 500)
                    return false
                },
                didOpen: () => {
                    dispatch(updateSubCat({ token, id, newName }))
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
            setTriggerFetch(!triggerFetch)
        }
    }

    const goSeeAllLabels = (id) => {
        const { categoryId } = router.query
        const queryParams = {
            categoryId: categoryId,
            subCategoryId: id
        };
        router.push({
            pathname: "/AllLabels",
            query: queryParams,
        });
    }


    useEffect(() => {
        const { categoryId } = router.query
        if (categoryId) {
            dispatch(getAllInCats(categoryId))
            dispatch(getCategory(categoryId))
        }
    }, [router.query, triggerFetch])

    return (
        <div>
            <div className="flex flex-col p-20">
                <div className={""}>

                    <div className='flex items-end'>
                        <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary'>{category.name} | Sub-Categories</h1></div>
                    </div>
                    <div className='mb-10 mt-5 border-t border-gray-300 rounded-full' />
                </div>
                <div className='bg-white p-5 rounded-md shadow-md overflow-auto h-[90rem] laptop:h-[44rem]'>
                    <h1 className='text-xl font-medium mb-10'>Sub Categories</h1>

                    <div className={''}>
                        {
                            subCats.length > 0 ?

                                subCats.map((s) => (
                                    <div
                                        onClick={() => goSeeAllLabels(s._id)}
                                        className={'w-full p-5 border-b hover:bg-gray-100 transition-all ease-in-out cursor-pointer flex justify-between'} key={s._id}>
                                        <span>{s.name}</span>
                                        <div className="flex gap-5">
                                            <button className="text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full"
                                                onClick={(event) => {
                                                    updateSubCats(s._id, s.name)
                                                    event.stopPropagation();
                                                }
                                                }>

                                                <FontAwesomeIcon icon={faPencil} /></button>
                                            <button className="text-[#233043] hover:bg-[#233043] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full"
                                                onClick={(event) => {
                                                    removeSubCategory(s._id, s.name)
                                                    event.stopPropagation();
                                                }
                                                } >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                                :
                                <div className="flex justify-center">
                                    {category.name ?
                                        <div className="mt-60 text-lg font-bold antialiased">No Sub - Categories in  {category.name}</div>
                                        :
                                        <div className="mt-60 ">
                                            <RingLoader color="#36d7b7" size={90} />
                                        </div>}
                                </div>

                        }
                    </div>
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