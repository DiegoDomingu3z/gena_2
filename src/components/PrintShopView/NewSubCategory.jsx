import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllInCats } from "../../../store/Sub-Category/Thunks"
import { getCategory } from "../../../store/Category/Thunk"
import { FaMinusCircle, FaPenSquare } from "react-icons/fa";
const NewSubCategory = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const subCats = useSelector((state) => state.SubCategory.catSubCats)
    const category = useSelector((state) => state.Category.category)

    useEffect(() => {
        const { categoryId } = router.query
        dispatch(getAllInCats(categoryId))
        dispatch(getCategory(categoryId))
    }, [])

    return (
        <div className="">
            <div className={"flex flex-col p-20 pb-8"}>

                <div className='flex items-end border-b'>
                    <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary mb-2'>{category.name.toUpperCase()} | Sub-Categories</h1></div>
                </div>
            </div>
            <div className="  ">
                <div className={'flex flex-col items-center h-4/5 mx-20 bg-white justify-center  overflow-y-scroll'}>
                    {
                        subCats.length > 0 ?

                            subCats.map((s) => (
                                <div
                                    className={'md:w-11/12 w-4/5 self-center justify-self-center p-5 border-b hover:bg-gray-100 transition-all ease-in-out cursor-pointer flex justify-between'} key={s._id}>
                                    <span>{s.name}</span>
                                    <div>
                                        <button className="hover:scale-125 transition-all ease-in-out me-5"><FaPenSquare className="text-blue-500" /></button>
                                        <button className="hover:scale-125 transition-all ease-in-out ">
                                            <FaMinusCircle className="text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            ))
                            :
                            <div>No Sub - Categories in {category.name.toUpperCase()} </div>

                    }
                </div>
            </div>
        </div>
    )
}

export default NewSubCategory