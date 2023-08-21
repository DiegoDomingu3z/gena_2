import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import Layout from '~/components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import NewMaterial from '~/components/PrintShopView/NewMaterial'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { updateMaterial } from '../../store/Material/Thunks';
import { getMaterials } from '../../store/Material/Thunks';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'



const materials = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.Account.account)
  const router = useRouter()
  const [modal, setModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [materialsArray, setMaterialsArray] = useState([]);
  const [individualMatCard, setIndividualMatCard] = useState([]);

  const toggleModal = (material) => {
    setActiveCategory(material)
    setModal((modal) => !modal)
  }


  const fetchMaterials = async () => {
      const materials = await dispatch(getMaterials());
      const materialsArray = materials.payload;
      const sortedMaterials = [...materialsArray].sort((a, b) => a.name.localeCompare(b.name));
      setMaterialsArray(sortedMaterials);
      const mappedMaterials = sortedMaterials.map((material) => {
        return <MaterialCard key={material._id} material={material} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />;
      });

      setIndividualMatCard(mappedMaterials);
  };

  const MaterialCard = ({ material, activeCategory, setActiveCategory }) => {
    const materialName = material.name
      return (
        <div className='border-b-gray border-b mb-10 flex pb-1'>
            <div className='mr-auto'>{materialName}</div>
            <div className=''>
              <button onClick={() => toggleModal(materialName)} className={`text-[#233043] hover:bg-[#ff9800] hover:text-white transition-all ease-in-out w-7 h-7 rounded-full`}><FontAwesomeIcon icon={faPencil} /></button>
            </div>
        </div>
    )
}

  useEffect(() => {
    fetchMaterials();
  }, []);
  // useEffect(() => {
  //   if (account.privileges != 'admin') {
  //     router.push('/home')
  //   }
  // }, [])
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
      timer: 1500,
      timerProgressBar: true
    })
    await Toast.fire({
      icon: 'success',
      title: 'Material Added!'
    })
  }
  const failureToast = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      iconColor: 'orange',
      customClass: {
        popup: 'colored-toast',
        container: 'addToCartToast',
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
    await Toast.fire({
      icon: 'warning',
      title: 'Material Already Exists!'
    })
  }

  const dataForSubmission = {
    name: ''
  }


  const MaterialModal = () => {
    return (
      <div className='fixed left-0 w-screen h-screen laptop:h-screen bg-slate-400 bg-opacity-80 z-40 backdrop-blur-sm flex justify-center items-center'>
        <div className='bg-[#f7f9fc] w-3/5 laptop:w-2/5 h-[35rem] rounded-lg px-10 py-5 flex flex-col'>
        <button onClick={() => {
          setModal(!modal)
        }} className='text-2xl self-end hover:bg-[#233043] rounded-full h-8 w-8 hover:text-white transition-all ease-in-out'><FontAwesomeIcon icon={faXmark} /></button>
        <h1 className='font-medium mb-12'>Update Material '<span className='text-orange-500'>{activeCategory}</span>'</h1>
        <div className='flex flex-col gap-5 items-center w-full'>
          <h2>New Name:</h2>
          <Formik
            initialValues={{
                name: activeCategory,
                categoryToUpdate: activeCategory
            }}
            onSubmit={async (values) => {
              const token = sessionStorage.getItem('accessToken');
              const foundMatch = materialsArray.some(v => v.name.toLowerCase() == values.name.toLowerCase())
              if(!foundMatch){
                dispatch(updateMaterial({token, values}))
                fetchMaterials();
                toggleModal(!modal);
                successToast()
                helpers.resetForm();
                return
              }
              failureToast();
            }}
            >
            {({ isSubmitting }) => (
                <Form className="space-y-4 md:space-y-6 w-full" >
                    <div className='flex w-full flex-col gap-5'>
                      <Field type="text" name="name" id="newMaterial" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="e.g. 'PWD'" required="" />
                      <button type='submit' disabled={isSubmitting} className="w-full transition-all ease-in-out hover:scale-105 text-white bg-[#1baded] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">submit</button>
                    </div>
                </Form>
            )}
          </Formik>
        </div>
        </div>
      </div>
    )
  }
  return (
      <Layout title={"Gena | New Material"}>
        {modal && <MaterialModal />}
        <NewMaterial activeCategory={activeCategory} setActiveCategory={setActiveCategory} modal={modal} setModal={setModal} materialsArray={materialsArray} individualMatCard={individualMatCard} fetchMaterials={fetchMaterials} />
      </Layout>
  )
}

export default materials