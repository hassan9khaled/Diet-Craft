/* eslint-disable react/prop-types */

function AverageName({ AverageName, AverageNumber, icon, isPending }) {
  return (
    <div className="block w-full border border-gray-200 rounded-lg shadow-sm">
      <div className="flex flex-row items-center justify-between p-6 pb-2 space-y-0">
        <p className="text-sm font-normal tracking-tight text-gray-500 dark:text-white">
          {AverageName}
        </p>
        {icon}
      </div>
      <div className="p-6 pt-0">
        <p className="mb-2 text-2xl font-bold">
          {isPending ? (
            <span className="block spinner-mini-black"></span>
          ) : (
            AverageNumber
          )}
        </p>
      </div>
    </div>
  );
}

export default AverageName;
