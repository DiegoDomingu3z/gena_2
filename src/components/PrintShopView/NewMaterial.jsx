import React from 'react'
import { Formik, Field, Form } from 'formik'
import { useState, useEffect } from 'react';
import { createNewMaterial, getMaterials } from '../../../store/Material/Thunks';
import { useDispatch } from 'react-redux'

const NewMaterial = () => {
    const dispatch = useDispatch();
    const [individualMatCard, setIndividualMatCard] = useState([]);

    const fetchMaterials = async () => {
        const materials = await dispatch(getMaterials());
        const materialsArray = materials.payload;
        const mappedMaterials = materialsArray.map((material) => {
          return <MaterialCard key={material._id} material={material} />;
        });
  
        setIndividualMatCard(mappedMaterials);
      };
  
    useEffect(() => {
      fetchMaterials();
    }, []);

  const MaterialCard = ({ material }) => {
      return (
        <div className='border-b-gray border-b mb-10'>
            {material.name}
        </div>
    )
}


  return (
      <div className={"flex flex-col pt-20 pr-20 pl-20"}>
      <div className='flex items-end'>
          <div className='mr-auto'><h1 className='text-3xl font-medium font-genaPrimary'>Create A New Material</h1></div>
      </div>
      <div className='mb-10 mt-5 border-t border-gray-300 rounded-full' />
      <div className={'flex gap-10 flex-col items-center overflow-auto h-[90rem] laptop:h-[44.5rem] pb-5'}>
          <div className={'laptop:w-3/5 w-4/5 self-center justify-self-center bg-white rounded-xl p-5 drop-shadow-lg'}>
          <Formik
                        initialValues={{
                            name: ''
                        }}
                        onSubmit={async (values, helpers) => {
                            const token = sessionStorage.getItem('accessToken');
                            dispatch(createNewMaterial({token, values}))
                            fetchMaterials();
                            helpers.resetForm();
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form id='newLabelForm'>
                                <div className='flex justify-around gap-8'>
                                    <div className='grow'>
                                        <label htmlFor='name' className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">New Material Name</label>
                                        <Field type="text" name="name" id="materialName" className="bg-gray-50 border border-gray-300
                                        text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                        dark:focus:border-blue-500" placeholder='e.g. "Plutonium"' required />
                                    </div>
                                    
                                </div>
                                <div className='w-full'><button className='bg-[#28aeeb] w-full transition-all ease-in-out hover:scale-[101%] mt-5 p-2 px-5 rounded-lg text-white' type='submit' >submit</button></div>
                            </Form>
                        )}

                    </Formik>
                    <div className='mt-20'>
                        <div className='text-xl font-medium'>
                            Materials
                        </div>
                        <div className='mb-10 mt-5 border-t border-gray-300 rounded-full' />
                        <div>
                            {individualMatCard}
                        </div>
                    </div>
          </div>
      </div>
    </div>
  )
}

export default NewMaterial