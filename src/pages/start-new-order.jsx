import React, { useEffect, useState } from 'react'
import Layout from '~/components/Layout'
import LabelCard from '~/components/LabelCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../store/Category/Thunk'
import { Formik, Field } from 'formik'
import { getAllSubCats } from '../../store/Sub-Category/Thunks'
import { getLabels } from '../../store/Label/Thunks'


const startNewOrder = () => {
  const dispatch = useDispatch()
  const cats = useSelector((state) => state.Category.categories)
  const subCats = useSelector((state) => state.SubCategory.subCats)
  const [activeSubCats, setActiveSubCats] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeSubCategoryId, setActiveSubCategoryId] = useState(null)
  const filterSubCats = (event) => {
    let id = event.target.value
    let cat = cats.filter(c => c._id == id)
    setActiveCategory(cat[0]._id)
    let filteredSubCats = subCats.filter(c => c.categoryId == id)
    setActiveSubCats(filteredSubCats)
  }

  const singleSubCat = (event) => {
    let id = event.target.value
    console.log(id)
    setActiveSubCategoryId(id)
  }

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getAllSubCats())
  }, [])

  useEffect(() => {
    if (activeCategory && activeSubCategoryId) {
      console.log(activeCategory, activeSubCategoryId, "IN EFFECT")
      dispatch(getLabels({ activeCategory, activeSubCategoryId }))
    }
  }, [activeCategory, activeSubCategoryId])

  return (
    <Layout title={"Gena | New Order"}>
      <div className={"flex flex-col p-20"}>
        <div className='flex items-end'>
          <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary'>Labels</h1></div>
          <div className='flex justify-end items-end gap-5 w-2/5'>
            <FontAwesomeIcon className='p-3 rounded-full drop-shadow-sm bg-[#233042] text-white' icon={faMagnifyingGlass} />
            <input name='labelSearch' type="text" className='laptop:w-2/4 w-4/5 drop-shadow-md bg-white text-[#233042] rounded-md h-10 transition-all ease-in-out outline-none focus:drop-shadow-lg focus:translate-y-10 focus:w-4/5 p-5' placeholder='Type name of label here' />
          </div>
        </div>
        <div className='mb-10 mt-5 border-t border-gray-300 rounded-full' />
        <div className=' items-center justify-around mb-5'>
          <Formik initialValues={{
            categoryId: '',
            subCategoryId: ''
          }}

          >
            <div className='flex items-center justify-around'>
              <Field onChange={filterSubCats} value={activeCategory} type="text" component="select" name="categoryId" className='bg-gray-50 border border-gray-300
                                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/5 p-2.5
                                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                        dark:focus:border-blue-500'>
                <option selected disabled value=''>Select Category</option>
                {cats ?
                  cats.map((c) => (
                    <option id={c._id} key={c._id} value={c._id}>{c.name}</option>
                  )) : null
                }
              </Field>
              <Field onChange={singleSubCat} value={activeSubCategoryId} type="text" component="select" name="subCategoryId" className='bg-gray-50 border border-gray-300
                                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/5 p-2.5
                                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                        dark:focus:border-blue-500'>
                <option selected disabled value=''>Select Sub-Category</option>
                {activeSubCats ?
                  activeSubCats.map((a) => (
                    <option key={a._id} value={a._id} id={a._id}>{a.name}</option>
                  ))
                  :
                  null}
              </Field>
            </div>
          </Formik>
        </div>
        <div className='grid w-full h-full'>
          <LabelCard />
        </div>
      </div>
    </Layout>
  )
}

export default startNewOrder