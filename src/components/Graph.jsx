export default function Graph({ priceData, handleOptionClick }) {
  return (
    <div className='w-16 flex flex-col items-center'>
      <div className='h-80 flex flex-col justify-end'>
        <p className='rotate-270 font-bold text-lg'>
          {priceData.totalPrice.toFixed(2)}$
        </p>
        <div
          className='w-8 mt-5 self-center'
          style={{
            height: 10 + priceData.totalPrice * 3,
            backgroundColor: priceData.isLowestPrice
              ? priceData.companyColor
              : '#94a3b8',
          }}
        ></div>
      </div>
      <div className='border border-black w-full'></div>
      <div className='flex flex-col items-center justify-center gap-2'>
        <img
          src={priceData.logoURL}
          alt='company logo'
          className='w-10 h-10 mt-2 landscape:rotate-270'
        />
        <div className='flex flex-col items-center justify-center gap-2 landscape:rotate-270 landscape:mt-6'>
          <p>{priceData.name}</p>
          <div className='flex flex-col gap-2 landscape:flex-row'>
            {priceData.storageRate.length &&
              priceData.storageRate.map(rate => (
                <button
                  key={rate.name}
                  onClick={() => handleOptionClick(priceData.storageRate, rate)}
                  className={
                    rate.isSelected
                      ? 'w-12 portrait:block text-xs font-semibold p-1 border shadow-inner shadow-slate-400 border-blue-600'
                      : 'w-12 portrait:block text-xs font-semibold p-1 border'
                  }
                >
                  {rate.name}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
