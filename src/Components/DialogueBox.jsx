function DialogueBox({ onClose, onPlay }) {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white w-[90vw]  md:w-[40rem] p-14 rounded-lg shadow-lg '>
        <h2 className='text-xl md:text-4xl mb-4 text-center'>
          Do you want to play music?
        </h2>
        <div className='flex justify-center mt-5'>
          <button
            className='bg-black text-xl text-white px-6 py-2 rounded mr-2 transition duration-300 ease-in-out border-none'
            onClick={() => {
              onPlay();
              onClose();
            }}
          >
            Yes
          </button>
          <button
            className='bg-gray-200 text-xl text-black px-6 py-2 rounded transition duration-300 ease-in-out border-none'
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DialogueBox;
