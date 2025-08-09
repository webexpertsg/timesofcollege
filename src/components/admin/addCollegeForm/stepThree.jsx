import TocButton from '@/components/ui/atoms/tocButtom';
import TocInputWithLabel from '@/components/ui/atoms/tocInputWithLabel';
import TocRadioInput from '@/components/ui/atoms/tocRadio';
import React, { useState } from 'react';

const StepThree = ({ data, onNext, onPrevious }) => {
  const [selectedOption, setSelectedOption] = useState('optionA');
  const [highLights, setHighLights] = useState([
    { highParameter: "", highDetails: "" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ });
  }

  
  const handleClick = (e) => {
    setHighLights([...highLights, { highParameter: "", highDetails: "" }]);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onChangeData = [...highLights];
    onChangeData[i][name] = value;
    setHighLights(onChangeData);
  };

  const handleDelete = (i) => {
    const deleteData = [...highLights];
    deleteData.splice(i, 1);
    setHighLights(deleteData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex justify-between'>
        <h2 className='text-2xl mb-10 font-bold'>Step 3: Highlights</h2>
        <div className='flex gap-4'>     
          <TocButton type="button" className='pl-10 pr-10 h-10' onClick={() => onPrevious()}>Prev</TocButton>
          <TocButton type="submit" className='pl-10 pr-10 h-10'>Next</TocButton>
        </div>
      </div>      

      <div className="sm:col-span-4 pb-2">
        <label className="block text-left font-normal leading-6 text-gray-dark pb-1">
          Display Type :
        </label>

        <div className="flex gap-4">
        <TocRadioInput
          id="optionA"
          name="myOptions"
          value="Bullet Points"
          label="Bullet Points"
          checked={selectedOption === 'Bullet Points'}
          onChange={handleChange}
        />

        <TocRadioInput
          id="optionB"
          name="myOptions"
          value="Tabuller"
          label="Tabuller"
          checked={selectedOption === 'Tabuller'}
          onChange={handleChange}
        />
        </div>
      </div>


      {highLights.map((item, i) => (
        <>
          <div className="flex mb-2" key={`key-${i}`}>
            <div className="sm:col-span-4 px-2">
              <TocInputWithLabel 
                id="highParameter"
                name="highParameter"
                placeholder="Parameter"
                value={item.highParameter}
                onChange={(e) => handleChange(e, i)}
                className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-gray"
              />
            </div>
            <div className="sm:col-span-2 px-2">
              <TocInputWithLabel 
                id="highDetails"
                name="highDetails"
                placeholder="Use colons for bullet points"
                value={item.highDetails}
                onChange={(e) => handleChange(e, i)}
                className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-gray"
              />       
            </div>
            <div className="sm:col-span-2">
              {i === 0 && (
                <TocButton
                  type="button"
                  className='mt-2 pl-10 pr-10'
                  onClick={handleClick}
                >
                  Add
                </TocButton>
              )}
              {i !== 0 && (
                <TocButton
                  type="button"
                  className='bg-red-500 hover:bg-red-700 focus:ring-red-500 mt-2 pl-10 pr-10'
                  onClick={() => handleDelete(i)}
                >
                  Delete
                </TocButton>
              )}
            </div>
          </div>
        </>
      ))}

      <div className='flex gap-4 justify-end'>
        <TocButton type="button" className='pl-10 pr-10' onClick={() => onPrevious()}>Prev</TocButton>
        <TocButton type="submit" className='pl-10 pr-10'>Next</TocButton>
      </div>

    </form>
  );
};

export default StepThree;