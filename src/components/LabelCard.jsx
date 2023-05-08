import React from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image';
const LabelCard = () => {
  const labels = useSelector((state) => state.Label.activeLabels)
  return (
    <div>

      {labels ?
        labels.map((l) => (
          <div className='bg-[#dfe8f6] w-full h-72 laptop:w-96 laptop:h-96 rounded-lg drop-shadow-md font-genaPrimary p-4'>
            <div className='w-full border border-black h-[15rem] rounded-md justify-center flex items-center'>
              <iframe src='pdflabels/3.35x2.3-Cards/Extra-Stock-Cards/ALL-3.35x2.3-Extra-Stock-Card-REG-DOC0419.pdf' ></iframe>

            </div>
            <div>{`${l.pdfPath}${l.categoryName}/${l.subCategoryName}/${l.fileName}`}</div>

          </div>
        ))


        : null}

    </div>
  )
}

export default LabelCard