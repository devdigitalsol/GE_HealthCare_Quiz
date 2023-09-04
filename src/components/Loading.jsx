export default function Loading({ isLoading }) {
  if (isLoading)
    return (
      <div className="fixed top-0 left-0 z-10 text-white flex items-center justify-center h-full w-full bg-black/30">
        Loading ...
      </div>
    );
}
