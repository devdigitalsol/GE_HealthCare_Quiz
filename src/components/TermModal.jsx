export default function TermModal({ children, setTermModalOpen }) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40">
        <div className="max-w-md w-full mx-auto p-6 relative">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            {children}
            <div className="flex justify-center items-center  mt-6">
              <button
                className="btn w-full "
                onClick={() => setTermModalOpen(false)}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
