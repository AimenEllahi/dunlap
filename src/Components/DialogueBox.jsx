function DialogueBox({ onClose, onPlay }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-80 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4 text-center">Do you want to play music?</h2>
        <div className="flex justify-center">
          <button
            className="bg-black text-white px-4 py-2 rounded mr-2 transition duration-300 ease-in-out border-none"
            onClick={() => {
              onPlay();
              onClose();
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-200 text-black px-4 py-2 rounded transition duration-300 ease-in-out border-none"
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
