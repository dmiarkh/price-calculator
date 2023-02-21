import { graphData } from './graphData'
import { useState, useEffect } from 'react'
import Graph from './components/Graph'

function App() {
  const [priceData, setPriceData] = useState(graphData)
  const [inputData, setInputData] = useState({ storage: 0, transfer: 0 })
  const [optionChanged, setOptionChanged] = useState(false)

  useEffect(() => {
    setPriceData(prevData => {
      const calculatedPriceData = calculatePrice(prevData, inputData)
      const lowestPrice = findLowestPrice(calculatedPriceData)

      return calculatedPriceData.map(companyInfo => ({
        ...companyInfo,
        isLowestPrice: companyInfo.totalPrice === lowestPrice,
      }))
    })
  }, [inputData, optionChanged])

  function handleInputChange(event) {
    setInputData(prevData => {
      return event.target.value > 1000 || event.target.value < 0
        ? prevData
        : {
            ...prevData,
            [event.target.name]: event.target.value,
          }
    })
  }

  function handleOptionClick(storageRate, rate) {
    setOptionChanged(prevValue => !prevValue)
    setPriceData(prevData =>
      prevData.map(companyInfo => {
        if (companyInfo.storageRate === storageRate) {
          return {
            ...companyInfo,
            storageRate: companyInfo.storageRate.map(option => {
              return option.name === rate.name
                ? { ...option, isSelected: true }
                : { ...option, isSelected: false }
            }),
          }
        }
        return companyInfo
      })
    )
  }

  return (
    <main className='w-fit mx-auto flex flex-col landscape:flex-col-reverse'>
      <div className='flex portrait:justify-around landscape:rotate-90'>
        {priceData.map(companyInfo => (
          <Graph
            key={companyInfo.name}
            priceData={companyInfo}
            inputData={inputData}
            handleOptionClick={handleOptionClick}
          />
        ))}
      </div>
      <div className='my-4 flex flex-col gap-4 items-center landscape:flex-row'>
        <fieldset>
          <div className='flex gap-2'>
            <label
              htmlFor='storage'
              className="after:content-['GB'] after:absolute after:ml-16"
            >
              Storage:
            </label>
            <input
              className='w-14 '
              type='number'
              name='storage'
              value={inputData.storage}
              onChange={handleInputChange}
            />
          </div>
          <input
            className='w-60'
            type='range'
            name='storage'
            id='storage'
            min={0}
            max={1000}
            step={1}
            value={inputData.storage}
            onChange={handleInputChange}
          />
        </fieldset>
        <fieldset>
          <div className='flex gap-2'>
            <label
              htmlFor='transfer'
              className="after:content-['GB'] after:absolute after:ml-16"
            >
              Transfer:
            </label>
            <input
              className='w-14'
              type='number'
              name='transfer'
              value={inputData.transfer}
              onChange={handleInputChange}
            />
          </div>
          <input
            className='w-60'
            type='range'
            name='transfer'
            id='transfer'
            min={0}
            max={1000}
            step={1}
            value={inputData.transfer}
            onChange={handleInputChange}
          />
        </fieldset>
      </div>
    </main>
  )
}

function findLowestPrice(data) {
  let currentLowestPrice = Number.MAX_SAFE_INTEGER

  for (const companyObj of data) {
    if (companyObj.totalPrice < currentLowestPrice) {
      currentLowestPrice = companyObj.totalPrice
    }
  }
  return currentLowestPrice
}

function calculatePrice(data, inputValues) {
  return data.map(companyInfo => {
    let storageAmount = inputValues.storage
    let transferAmount = inputValues.transfer

    if (companyInfo.freePlan) {
      storageAmount =
        storageAmount <= companyInfo.freePlan
          ? 0
          : storageAmount - companyInfo.freePlan
      transferAmount =
        transferAmount <= companyInfo.freePlan
          ? 0
          : transferAmount - companyInfo.freePlan
    }

    let storageRate
    if (companyInfo.storageRate.length) {
      for (const rate of companyInfo.storageRate) {
        if (rate.isSelected) {
          storageRate = rate.price
        }
      }
    } else {
      storageRate = companyInfo.storageRate
    }

    const storagePrice = storageAmount * storageRate
    const transferPrice = transferAmount * companyInfo.transferRate
    let totalPrice = storagePrice + transferPrice

    if (companyInfo.minPayment && totalPrice <= companyInfo.minPayment) {
      totalPrice = companyInfo.minPayment
    }

    if (companyInfo.maxPayment && totalPrice >= companyInfo.maxPayment) {
      totalPrice = companyInfo.maxPayment
    }

    return {
      ...companyInfo,
      totalPrice: totalPrice,
    }
  })
}

export default App
