import React, { useEffect, useState, useCallback } from 'react'
import { Formik, Field, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getMaterials } from '../../../store/Material/Thunks'
import { getCategories } from '../../../store/Category/Thunk'
import { getAllSubCats } from '../../../store/Sub-Category/Thunks'
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useDropzone } from 'react-dropzone';
import { createLabelInfo, findLabelFields, uploadPdf } from '../../../store/Label/Thunks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from 'antd'
import Swal from 'sweetalert2'
const NewLabel = () => {
    const dispatch = useDispatch()
    const material = useSelector((state) => state.Material)
    const category = useSelector((state) => state.Category)
    const subCategory = useSelector((state) => state.SubCategory)
    // const labelFields = useSelector((state) => state.Label.labelFields)
    const [activeSubCats, setActiveSubCats] = useState([])
    const [activeCategory, setActiveCategory] = useState(null)
    const [inputValues, setInputValues] = useState(['']);
    const [fieldTypes, setFieldTypes] = useState([''])
    const [isChecked, setIsChecked] = useState(false);
    const [isBulkChecked, setBulkCheck] = useState(false);
    const [isSerialCheck, setSerialCheck] = useState(false)
    const [startingSerial, setSerialNum] = useState(null);
    const [files, setFiles] = useState([])
    const [docNum, setDocNum] = useState('')
    const [fields, setFields] = useState([])
    const [name, setName] = useState('')
    const [customName, setCustomName] = useState('')
    const [labelName, setLabelNames] = useState([])
    const token = useSelector((state) => state.Account.accessToken)

    const onDrop = useCallback(acceptedFiles => {
        let fileIndex = acceptedFiles[0]
        setFiles(prevFiles => [...prevFiles, fileIndex])

    }, [files])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    useEffect(() => {
        if (files.length > 0 && files.length < 2) {
            nameGeneratorForLabel(files[0].name, material.materials)
            let docNum = files[0].name.slice(files[0].name.length - 11, files[0].name.length - 4);
            setDocNum(docNum)
            const formData = new FormData();
            formData.append("pdf", files[0])
            dispatch(findLabelFields(formData)).then((res) => {
                const labelFields = res.payload
                if (labelFields.length > 0) {
                    let check = 0
                    for (let i = 0; i < labelFields.length; i++) {
                        const fieldSet = labelFields[i];
                        const fieldName = fieldSet.name.toUpperCase()
                        if (fieldName.includes('SERIAL')) {
                            check++
                        }
                    }
                    if (check > 0) {
                        return
                    } else {
                        setFields(labelFields)
                        setIsChecked(true)
                    }
                }
            }).catch((err) => {

            })

        }
    }, [files])


    const nameGeneratorForLabel = (inputString, materialArrr) => {
        const mainName = inputString.slice(0, -11);  // Remove the last 11 characters
        const mainNameWithoutHyphens = mainName.replace(/-/g, ' ');  // Remove hyphens

        // Convert excluded substrings to lowercase
        const lowercaseExcluded = materialArrr.map(substring => substring.name.toLowerCase());

        // Generate two different options for the main name
        const options = [];
        for (let i = 0; i < 2; i++) {
            let check = checkString(mainNameWithoutHyphens.toLowerCase(), lowercaseExcluded, i)
            options.push(check)
        }
        setLabelNames(options)
    }

    const checkString = (inputString, substringArray, i) => {
        let modifiedString = inputString;

        substringArray.forEach(substring => {
            if (modifiedString.includes(substring)) {
                modifiedString = modifiedString.replace(new RegExp(substring, 'gi'), '');
            }
        });
        if (i == 0) {
            const words = modifiedString.split(' ');
            words.shift(); // Remove the first word
            modifiedString = words.join(' ');
            let trimmedString = modifiedString.replace(/\s+$/, '')
            return trimmedString;
        }
        let trimmedString = modifiedString.replace(/\s+$/, '')
        return trimmedString;
    }


    const handleBulkCheckBoxChange = () => {
        setBulkCheck(!isBulkChecked)
        if (isBulkChecked == true && files.length == 2) {
            let newFile = files
            newFile.splice(1, 1)
            setFiles(newFile)
        }
    }

    const handleSerialCheckChange = () => {
        setSerialCheck(prevSerialCheck => !prevSerialCheck)
        setSerialNum(null)
    }

    useEffect(() => {
        if (isSerialCheck) {
            Swal.fire({
                title: 'Starting Serial Number',
                input: 'number',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Save',
                showLoaderOnConfirm: true,
                preConfirm: (number) => {
                    return number
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    setSerialNum(result.value)
                    console.log(result.value)

                }
            })
        }
    }, [isSerialCheck])

    const handleNameChange = (e) => {
        setCustomName('')
        setName(e)
    }

    const handleCustomNameChange = (e) => {
        setCustomName(e)
    }



    const filterSubCats = (event) => {
        setActiveSubCats('')
        let id = event.target.value
        let cat = category.categories.filter(c => c._id == id)
        setActiveCategory(cat[0]._id)
        let filteredSubCats = subCategory.subCats.filter(c => c.categoryId == id)
        console.log(filteredSubCats, activeSubCats)
        filteredSubCats ? setActiveSubCats(filteredSubCats) : setActiveSubCats('')
    }

    const deleteLabels = () => {
        setLabelNames([])
        setName('')
        setCustomName('')
        document.getElementById('newLabelForm').reset()
        setFiles([])
        setBulkCheck(false)
        setFields([])
        setDocNum('')
    }


    const pushFiles = () => {
        return new Promise((resolve) => {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                formData.append("pdf", file);
            }
            resolve(formData);
        });
    };


    const submitLabelInfo = async (values) => {
        let bulkFile;
        if (files.length > 1) {
            bulkFile = files[1].name
        } else {
            bulkFile = null
        }
        let data = {
            fields: fields,
            maxOrderQty: values.maxOrderQty,
            name: customName == '' ? name : customName,
            docNum: docNum,
            fileName: files[0].name,
            bulkFileName: bulkFile,
            isKanban: isChecked,
            isBulkLabel: isBulkChecked,
            unitPack: values.unitPack,
            materialTypeId: values.materialTypeId,
            categoryId: activeCategory,
            subCategoryId: values.subCategoryId,
            isSerial: isSerialCheck,
        }
        if (isSerialCheck == true) {
            data.currentSerialNum = parseInt(startingSerial)
        }
        console.log(data)
        const formData = await pushFiles()
        dispatch(createLabelInfo({ data, formData }));
    }


    useEffect(() => {
        const token = sessionStorage.getItem('accessToken')
        dispatch(getMaterials(token))
        dispatch(getCategories())
        dispatch(getAllSubCats())

    }, [null])

    const successToast = async () => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          iconColor: 'white',
          customClass: {
            popup: 'colored-toast',
            container: 'addToCartToast',
          },
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        })
        await Toast.fire({
          icon: 'success',
          title: 'Label Added!'
        })
      }

    return (
        <div className={"flex flex-col p-20"}>
            <div className='flex items-end'>
                <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary'>Create A New Label</h1></div>
            </div>
            <div className='mb-10 mt-5 border-t border-gray-300 rounded-full' />
            <div className={'flex gap-10 flex-col items-center overflow-auto h-[90rem] laptop:h-[44.5rem] pb-5'}>
                <div className={'laptop:w-3/5 w-4/5 self-center justify-self-center bg-white rounded-xl p-5 drop-shadow-lg'}>
                    <Formik
                        initialValues={{
                            labelName: '',
                            fields: inputValues,
                            maxOrderQty: 1,
                            docNum: docNum,
                            fileName: '',
                            isKanban: isChecked,
                            isBulkLabel: isBulkChecked,
                            unitPack: 1,
                            materialTypeId: '',
                            categoryId: '',
                            subCategoryId: '',
                            customName: ''
                        }}
                        onSubmit={async (values) => {
                            submitLabelInfo(values)
                            document.getElementById('newLabelForm').reset()
                            deleteLabels()
                            setFields([])
                            setFiles([])
                            setInputValues([''])
                            setIsChecked(false)
                            setBulkCheck(false)
                            successToast();
                        }}
                    >
                        {({ isSubmitting, values, setFieldValue }) => (
                            <Form id='newLabelForm'>
                                <div className='flex justify-around gap-8'>
                                    <div className='grow'>
                                        <label htmlFor='firstName' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Label Name <span className='text-red-500'>*</span></label>
                                        <Field value={name} name="labelName" onChange={(e) => handleNameChange(e.target.value)} type="text" component="select" id="labelName" className="bg-gray-50 border border-gray-300
                                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                        dark:focus:border-blue-500" placeholder="Label Name" required >
                                            {labelName.length > 0 ?
                                                labelName.map((l) => (
                                                    <option value={l}>{l}</option>
                                                )) : null}
                                            {files.length > 0 ?
                                                <option value="custom" className='text-gray-500'>Input Custom Name</option>
                                                :
                                                <option>INSERT LABEL</option>
                                            }
                                        </Field>
                                        {name == 'custom' && (
                                            <Field value={customName} onChange={(e) => handleCustomNameChange(e.target.value)} name="customName" type="text"
                                                className=" mt-3 bg-gray-50 border border-gray-300
                                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                        dark:focus:border-blue-500" placeholder="Custom Name" />
                                        )}
                                    </div>
                                    <div className='grow'>
                                        <label htmlFor="docNum" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Document Number <span className='text-red-500'>*</span></label>
                                        <Field onChange={setDocNum} value={docNum} type="text" name="docNum" id="docNum" placeholder="Doc #" className="bg-gray-50 border
                                        border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                        dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                    </div>
                                    <div className='grow'>
                                        <label htmlFor="maxOrderQty" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Order Qty <span className='text-red-500'>*</span></label>
                                        <Field type="number" name="maxOrderQty" id="maxOrderQty" placeholder="Max #" className="bg-gray-50 
                                        border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                        dark:focus:ring-blue-500 dark:focus:border-blue-500 " required />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-8 mt-10'>
                                    <div className=''>
                                        <label htmlFor='unitPack' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Units Per Pack <span className='text-red-500'>*</span></label>
                                        <Field type="number" name="unitPack" id="unitPack" className="bg-gray-50 border border-gray-300
                                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700
                                        dark:border-gray-600 dark:placeholder-gray-400
                                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" placeholder="#" required />
                                    </div>
                                    <div className=''>
                                        <label htmlFor="materialTypeId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Material Type <span className='text-red-500'>*</span></label>
                                        <Field component='select' name="materialTypeId" id="materialTypeId" className="bg-gray-50 border border-gray-300
                                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700
                                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" required >
                                            <option className='text-gray-600' selected>SELECT MATERIAL</option>
                                            {material.materials ?
                                                material.materials.map((m) => (
                                                    <option value={m._id} key={m._id}>
                                                        {m.name}
                                                    </option>

                                                ))
                                                : null}
                                        </Field>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-8 mt-10'>

                                    <div className=''>
                                        <label htmlFor="materialType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name<span className='text-red-500'>*</span></label>
                                        <Field onChange={filterSubCats} value={activeCategory} component='select' name="categoryId" id="categoryId" className="bg-gray-50 border border-gray-300
                                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700
                                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" required >
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
                                    <div className=''>
                                        <label htmlFor='unitPack' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sub-Category Name<span className='text-red-500'>*</span></label>
                                        <Field component='select' disabled={activeSubCats.length == 0 && true} name="subCategoryId" id="subCategoryId" className="bg-gray-50 border border-gray-300
                                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700
                                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" required >
                                            <option className='text-gray-600'  >SELECT SUB-CATEGORY</option>
                                            {activeSubCats.length > 0 ?
                                                activeSubCats.map((a) => (
                                                    <option value={a._id} key={a._id}>
                                                        {a.name}
                                                    </option>

                                                )) :
                                                    <option value="Select Sub-Category">
                                                        Select Category First
                                                    </option>
                                            }



                                        </Field>
                                    </div>
                                </div>
                                <div className='flex justify-around gap-8 mt-10'>
                                    <div className='grow'>
                                        <div className='flex'>
                                            {fields.length > 0 ?

                                                <div className='flex'>
                                                    <div className='me-3'>Form Fillable:</div>
                                                    <Tooltip placement='top' title={fields.map((f) => (`Field Name: (${f.name}) Type: (${f.type.toUpperCase()}) `))}
                                                    >
                                                        <button>
                                                            <FontAwesomeIcon className='text-[#28aeeb]' icon={faFileCircleCheck} />
                                                        </button>
                                                    </Tooltip>

                                                </div>


                                                : null
                                            }
                                        </div>
                                        {/* <div className=''>
                                            {isChecked ?
                                                <div className='mt-3'>
                                                    <div className='w-36'>
                                                        <label className='flex gap-2'>Field Names: <span>{inputValues.length}</span> <button onClick={handleAddInput} type='button'><FaPlusCircle /></button ></label>
                                                    </div>
                                                    {inputValues.map((value, index) => {
                                                        return (

                                                            <div key={index} className='flex'>
                                                                <Field onChange={(event) => handleInputChange(index, event.target.value)}
                                                                    type='text' name={`fields[${index}]`} key={index} value={value} placeholder='PDF Field Name' className="mt-3 bg-gray-50 border border-gray-300
                                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/5 p-2.5 dark:bg-gray-700
                                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                                                                <Field onChange={(event) => handleFieldType(index, event.target.value)} name={`fields${index}`} component='select'
                                                                    className="mt-3 bg-gray-50 ms-3.5 border border-gray-300
                                                                    text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-2/12 p-2.5 dark:bg-gray-700
                                                                    dark:border-gray-600 dark:placeholder-gray-400
                                                                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                                    <option className='' value="" disabled selected>Select Type</option>
                                                                    <option value="text">text</option>
                                                                    <option value="checkbox">checkbox</option>
                                                                </Field>
                                                                <button type='button' onClick={() => handleDeleteInput(index)} className='ms-5 mt-3 text-red-500'><FaMinusCircle /></button>
                                                            </div>
                                                        )
                                                    })}

                                                </div> : null}

                                        </div> */}
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
                                                {isBulkChecked == true ?
                                                    <div className='grow flex mb-5'>
                                                        <label htmlFor="isBulkLabel" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Serial Number Label?</label>
                                                        <Field onClick={handleSerialCheckChange} type='checkbox' name='isSerialChecked' className='h-4 ms-5 w-4 text-primary-600 focus:outline outline-2 outline-offset-2 rounded-md' />
                                                        {startingSerial && isSerialCheck ?
                                                            <div className='ms-3'>{startingSerial}</div> : null}
                                                    </div>
                                                    : null}
                                                <iframe src={URL.createObjectURL(files[0])} frameborder="0" key={files[0]} ></iframe>
                                                {
                                                    files.length < 2 ?
                                                        <div className='mt-8'>Label to Print</div> :
                                                        <div className='mt-8'>Label to Display</div>
                                                }
                                            </div>


                                            : <div className='grow mt-5'>
                                                <div className="flex">
                                                    <div className="extraOutline p-4 bg-white w-max em-auto rounded-lg" {...getRootProps()}>
                                                        <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg" >
                                                            <svg className="text-[#28aeeb] w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                                            <div className="input_field flex flex-col w-max mx-auto text-center">
                                                                <label>
                                                                    <input className="text-sm cursor-pointer w-36 hidden" type="file" {...getInputProps()} formEncType="multipart/form-data" />
                                                                    <div className="text bg-[#28aeeb] text-white border border-gray-300 rounded 
                                                        font-semibold cursor-pointer p-1 px-3 hover:bg-[#3095c4]">Select</div>
                                                                </label>

                                                                <div className="title text-[#28aeeb] uppercase">or drop files here</div>
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
                                                        <div className='block mb-4 text-md font-medium text-gray-900 dark:text-white mt-7'>Label to Print</div>
                                                    </div>
                                                    : <div className='grow mt-8'>
                                                        <div class="flex">
                                                            <div class="extraOutline p-4 bg-white w-max em-auto rounded-lg" {...getRootProps()}>
                                                                <div class="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg" >
                                                                    <svg class="text-[#28aeeb] w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                        viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                                                    <div class="input_field flex flex-col w-max mx-auto text-center">
                                                                        <label>
                                                                            <input class="text-sm cursor-pointer w-36 hidden" type="file" formEncType="multipart/form-data" {...getInputProps()} />
                                                                            <div class="text bg-[#28aeeb] text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-[#3095c4]">Select</div>
                                                                        </label>

                                                                        <div class="title text-[#28aeeb] uppercase">or drop files here</div>
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
                                <div className='text-end'><button className='bg-[#28aeeb] p-2 px-5 rounded-lg text-white' type='submit' >submit</button></div>
                            </Form>
                        )}

                    </Formik>
                </div>
            </div>

        </div >
    )
}

export default NewLabel;