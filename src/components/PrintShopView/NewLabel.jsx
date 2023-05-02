import React, { useEffect, useState, useCallback } from 'react'
import { Formik, Field, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getMaterials } from '../../../store/Material/Thunks'
import { getCategories } from '../../../store/Category/Thunk'
import { getAllSubCats } from '../../../store/Sub-Category/Thunks'
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useDropzone } from 'react-dropzone';

const NewLabel = () => {
    const dispatch = useDispatch()
    const material = useSelector((state) => state.Material)
    const category = useSelector((state) => state.Category)
    const subCategory = useSelector((state) => state.SubCategory)
    const [activeSubCats, setActiveSubCats] = useState([])
    const [activeCategory, setActiveCategory] = useState(null)
    const [inputValues, setInputValues] = useState(['']);
    const [isChecked, setIsChecked] = useState(false);
    const [isBulkChecked, setBulkCheck] = useState(false);
    const [files, setFiles] = useState([])

    const onDrop = useCallback(acceptedFiles => {
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles])
    }, [files])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleBulkCheckBoxChange = () => {
        setBulkCheck(!isBulkChecked)
        if (isBulkChecked == true && files.length == 2) {
            let newFile = files
            newFile.splice(1, 1)
            setFiles(newFile)
            console.log(files)
        }
    }
    const handleAddInput = () => {
        setInputValues([...inputValues, '']);
    };

    const handleDeleteInput = (index) => {
        setInputValues(prev => prev.filter((_, i) => i !== index));
    }


    const handleInputChange = (index, value) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
    };


    const filterSubCats = (event) => {
        let id = event.target.value
        let cat = category.categories.filter(c => c._id == id)
        setActiveCategory(cat[0]._id)
        let filteredSubCats = subCategory.subCats.filter(c => c.categoryId == id)
        setActiveSubCats(filteredSubCats)
    }

    const deleteLabels = () => {
        setFiles([])
        setBulkCheck(false)
    }


    useEffect(() => {
        const token = sessionStorage.getItem('accessToken')
        dispatch(getMaterials(token))
        dispatch(getCategories())
        dispatch(getAllSubCats())
    }, [null])

    return (
        <div>
            <div className='bg-[#7490b9] h-20'>
                <h1 className='text-center pt-6 text-white text-2xl font-bold'>New Label Dashboard</h1>
            </div>
            <div className={'flex gap-10 flex-col items-center justify-center'}>
                <div className={'md:w-11/12 w-4/5 self-center justify-self-center bg-white rounded-xl p-5 drop-shadow-lg mt-10'}>
                    <Formik
                        initialValues={{
                            labelName: '',
                            fields: inputValues,
                            maxOrderQty: 1,
                            docNum: '',
                            fileName: '',
                            isKanban: isChecked,
                            isBulkLabel: isBulkChecked,
                            unitPack: 1,
                            materialTypeId: '',
                            categoryId: '',
                            subCategoryId: ''
                        }}>
                        <Form>
                            <div className='flex justify-around gap-8'>
                                <div className='grow'>
                                    <label htmlFor='firstName' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Label Name: <span className='text-red-500'>*</span></label>
                                    <Field type="text" name="labelName" id="labelName" className="bg-gray-50 border border-gray-300
                                     text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                       dark:focus:border-blue-500" placeholder="label name..." required="" />
                                </div>
                                <div className='grow'>
                                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Document Number: <span className='text-red-500'>*</span></label>
                                    <Field type="text" name="docNum" id="docNum" placeholder="Doc#" className="bg-gray-50 border
                                     border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                     block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                      dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className='grow'>
                                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Order Qty: <span className='text-red-500'>*</span></label>
                                    <Field type="number" name="maxOrderQty" id="maxOrderQty" placeholder="max#" className="bg-gray-50 
                                    border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                    dark:focus:ring-blue-500 dark:focus:border-blue-500 " required="" />
                                </div>
                            </div>
                            <div className='flex justify-around gap-8 mt-10'>
                                <div className='grow'>
                                    <label htmlFor='unitPack' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Units Per Pack <span className='text-red-500'>*</span></label>
                                    <Field type="text" name="unitPack" id="unitPack" className="bg-gray-50 border border-gray-300
                                     text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                     dark:border-gray-600 dark:placeholder-gray-400
                                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="#..." required="" />
                                </div>
                                <div className='grow'>
                                    <label htmlFor="materialType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Material Type <span className='text-red-500'>*</span></label>
                                    <Field component='select' name="materialTypeId" id="materialTypeId" className="bg-gray-50 border border-gray-300
                                     text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" >
                                        {material.materials ?
                                            material.materials.map((m) => (
                                                <option value={m._id} key={m.id}>
                                                    {m.name}
                                                </option>

                                            ))
                                            : null}
                                    </Field>
                                </div>
                            </div>
                            <div className='flex justify-around gap-8 mt-10'>

                                <div className='grow'>
                                    <label htmlFor="materialType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name<span className='text-red-500'>*</span></label>
                                    <Field onChange={filterSubCats} value={activeCategory} component='select' name="categoryId" id="materialTypeId" className="bg-gray-50 border border-gray-300
                                     text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" >
                                        <option className='text-gray-600' disabled selected>SELECT CATEGORY</option>
                                        {category.categories ?
                                            category.categories.map((c) => (
                                                <option value={c._id} key={c._id}>
                                                    {c.name}
                                                </option>

                                            ))
                                            : null}
                                    </Field>
                                </div>
                                <div className='grow'>
                                    <label htmlFor='unitPack' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sub-Category Name<span className='text-red-500'>*</span></label>
                                    <Field component='select' name="materialTypeId" id="materialTypeId" className="bg-gray-50 border border-gray-300
                                     text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" >
                                        <option className='text-gray-600' disabled selected>SELECT SUB-CATEGORY</option>
                                        {activeSubCats.length > 0 ?
                                            activeSubCats.map((a) => (
                                                <option value={a._id} key={a._id}>
                                                    {a.name}
                                                </option>

                                            )) :

                                            subCategory.subCats.map((s) => (
                                                <option value={s._id} key={s._id}>
                                                    {s.name}
                                                </option>
                                            ))
                                        }



                                    </Field>
                                </div>
                            </div>
                            <div className='flex justify-around gap-8 mt-10'>
                                <div className='grow'>
                                    <div className='flex'>
                                        <label htmlFor="isKanban" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Form Fillable?</label>
                                        <Field onClick={handleCheckboxChange} type='checkbox' name='isKanban' className='h-4 ms-5 w-4 text-primary-600 focus:outline outline-2 outline-offset-2 rounded-md' />
                                    </div>
                                    <div>
                                        {isChecked ?
                                            <div className='mt-3'>
                                                <div>
                                                    <label className='flex gap-2'>Field Names: <span>{inputValues.length}</span> <button onClick={handleAddInput}><FaPlusCircle /></button ></label>
                                                </div>
                                                {inputValues.map((value, index) => {
                                                    return (

                                                        <div key={index} className='flex'>
                                                            <Field onChange={(event) => handleInputChange(index, event.target.value)}
                                                                type='text' name={`fields[${index}]`} value={value} placeholder='PDF Field Name' className="mt-3 bg-gray-50 border border-gray-300
                                     text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-2/5 p-2.5 dark:bg-gray-700
                                     dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                                                            <button onClick={() => handleDeleteInput(index)} className='ms-5 mt-3 text-red-500'><FaMinusCircle /></button>
                                                        </div>
                                                    )
                                                })}

                                            </div> : null}

                                    </div>
                                </div>

                            </div>
                            <div>
                                {files.length > 0 ?
                                    <div className='border-t-4 mt-2'><button onClick={deleteLabels} className='mt-3 bg-red-500 p-1 px-3 rounded-md text-white'>Remove Labels</button></div> : null}
                                <div className='flex justify-between gap-8  '>
                                    {files.length > 0 ?
                                        <div className='mt-5'>
                                            <div className='grow flex mb-5'>
                                                <label htmlFor="isBulkLabel" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Bulk Label?</label>
                                                <Field onClick={handleBulkCheckBoxChange} type='checkbox' name='isBulkLabel' className='h-4 ms-5 w-4 text-primary-600 focus:outline outline-2 outline-offset-2 rounded-md' />
                                            </div>
                                            <iframe src={URL.createObjectURL(files[0])} frameborder="0" key={files[0]} ></iframe>
                                            {
                                                files.length < 2 ?
                                                    <div className='mt-8'>Label to Print</div> :
                                                    <div className='mt-8'>Label to Display</div>
                                            }
                                        </div>


                                        : <div className='grow mt-5'>
                                            <div class="flex">
                                                <div class="extraOutline p-4 bg-white w-max em-auto rounded-lg" {...getRootProps()}>
                                                    <div class="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg" >
                                                        <svg class="text-indigo-500 w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                                        <div class="input_field flex flex-col w-max mx-auto text-center">
                                                            <label>
                                                                <input class="text-sm cursor-pointer w-36 hidden" type="file" {...getInputProps()} />
                                                                <div class="text bg-indigo-600 text-white border border-gray-300 rounded 
                                                    font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Select</div>
                                                            </label>

                                                            <div class="title text-indigo-500 uppercase">or drop files here</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div >
                                                </div>
                                            </div>
                                        </div>}
                                    {isBulkChecked == true ?
                                        <div>
                                            {files.length > 1 ?

                                                <div className='mt-20'>

                                                    <iframe src={URL.createObjectURL(files[1])} frameborder="0" ></iframe>
                                                    <div className='block mb-2 text-md font-medium text-gray-900 dark:text-white mt-7 mb-4'>Label to Print</div>
                                                </div>
                                                : <div className='grow mt-8'>
                                                    <div class="flex">
                                                        <div class="extraOutline p-4 bg-white w-max em-auto rounded-lg" {...getRootProps()}>
                                                            <div class="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg" >
                                                                <svg class="text-indigo-500 w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                                                <div class="input_field flex flex-col w-max mx-auto text-center">
                                                                    <label>
                                                                        <input class="text-sm cursor-pointer w-36 hidden" type="file"  {...getInputProps()} />
                                                                        <div class="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Select</div>
                                                                    </label>

                                                                    <div class="title text-indigo-500 uppercase">or drop files here</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div >
                                                        </div>
                                                    </div>

                                                </div>}
                                        </div>

                                        : null}


                                </div>
                            </div>
                        </Form>

                    </Formik>
                </div>
            </div>

        </div >
    )
}

export default NewLabel;