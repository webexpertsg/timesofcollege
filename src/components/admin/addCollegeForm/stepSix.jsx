import React, { useContext, useState } from 'react';
import axios from "axios";

import TocButton from '@/components/ui/atoms/tocButtom';
import TocNumberInputWithLabel from '@/components/ui/atoms/tocNumberInputWithLabel';


const StepSix = ({ data, onNext, onPrevious }) => {
    const [quantity, setQuantity] = useState(1)

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value)
    }

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext({ })
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-between'>
        <h2 className='text-2xl mb-10 font-bold'>Step 6: Rating</h2>
        <div className='flex gap-4'>     
          <TocButton type="button" className='pl-10 pr-10 h-10' onClick={() => onPrevious()}>Prev</TocButton>
          <TocButton type="submit" className='pl-10 pr-10 h-10'>Next</TocButton>
        </div>
      </div>

        <TocNumberInputWithLabel
            id="quantity"
            label="Ratting Academic"
            value={quantity}
            onChange={handleQuantityChange}
            max="10"
            placeholder="Enter quantity out of 100"
        />

        <TocNumberInputWithLabel
            id="quantity"
            label="Ratting Accommodation"
            value={quantity}
            onChange={handleQuantityChange}
            max="10"
            placeholder="Enter quantity out of 100"
        />

        <TocNumberInputWithLabel
            id="quantity"
            label="Ratting Faculty"
            value={quantity}
            onChange={handleQuantityChange}
            max="10"
            placeholder="Enter quantity out of 100"
        />

        <TocNumberInputWithLabel
            id="quantity"
            label="Ratting Infrastructure"
            value={quantity}
            onChange={handleQuantityChange}
            max="10"
            placeholder="Enter quantity out of 100"
        />

        <TocNumberInputWithLabel
            id="quantity"
            label="Ratting Placements"
            value={quantity}
            onChange={handleQuantityChange}
            max="10"
            placeholder="Enter quantity out of 100"
        />    

        <TocNumberInputWithLabel
            id="quantity"
            label="Ratting Social"
            value={quantity}
            onChange={handleQuantityChange}
            max="10"
            placeholder="Enter quantity out of 100"
        /> 

        <TocNumberInputWithLabel
            id="quantity"
            label="Ratting Throughout"
            value={quantity}
            onChange={handleQuantityChange}
            max="10"
            placeholder="Enter quantity out of 100"
        />                 


      <div className='flex gap-4 justify-end'>
        <TocButton type="button" className='pl-10 pr-10' onClick={() => onPrevious()}>Prev</TocButton>
        <TocButton type="submit" className='pl-10 pr-10'>Next</TocButton>
      </div>

    </form>
  );
};

export default StepSix;