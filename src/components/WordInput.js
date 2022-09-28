
function WordInput({ word, bgColor = [] }) {
  return (
    <>
      <div className='flex-center'>
        { [1,2,3,4,5].map((e,i) => {
          return (
            <div className='letter-box flex-center' key={word+" "+e} style={{backgroundColor: bgColor[i], transition: '3s'}}> {word?.charAt(i) ? word.charAt(i) : ''} </div>
          )
        })}
      </div> 
    </>
  )
}

export default WordInput;