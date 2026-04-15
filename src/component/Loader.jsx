const Loader = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        <p className="text-gray-700 text-sm font-medium">Loading, please wait...</p>
      </div>
    </div>
  )
}

export default Loader