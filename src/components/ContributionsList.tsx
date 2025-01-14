import React, { useState } from 'react';
import { ContributorsInsights, mapMembers, formatSinceAndUntil } from '../actions/leaderboardFunctions';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DisplayPerson from './DisplayPerson'; // Adjust path if necessary

interface ContributionsListProps {
  data: ContributorsInsights;
  isPaginated: boolean;
}

const ContributionsList: React.FC<ContributionsListProps> = ({ data, isPaginated }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const mappedData = React.useMemo(() => {
    return data.members.map(mapMembers).filter(p => !p.name.includes('[bot]') && p.score);
  }, [data.members]);

  const totalPages = Math.ceil(mappedData.length / itemsPerPage);
  const currentData = isPaginated
    ? mappedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : mappedData;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    document.getElementById(data.stat)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-inter container mx-auto p-4 bg-gray-600" id={data.stat}>
      <div className="flex flex-col md:flex-row justify-center items-center mb-4 space-y-2 md:space-y-0">
        <h4 className="text-center text-white text-xl md:text-2xl font-bold">
          {data.stat === 'allTimes' ? 'All Times' : data.stat === 'lastMonth' ? 'Last Month' : 'Last Week'}
        </h4>
        <h4 className="text-gray-300 text-center md:ml-10 text-sm md:text-base">{formatSinceAndUntil(data.since, data.until)}</h4>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentData.map((data, ind) => (
          <li key={data.node_id}>
            <DisplayPerson data={data} place={isPaginated ? (currentPage - 1) * itemsPerPage + ind + 1 : ind + 1} />
          </li>
        ))}
      </ul>
      {isPaginated && totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 md:px-4 md:py-2 mr-2 bg-sky-600 text-white rounded disabled:bg-gray-400"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="px-2 py-1 md:px-4 md:py-2 bg-white rounded text-sm md:text-base">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 md:px-4 md:py-2 ml-2 bg-sky-600 text-white rounded disabled:bg-gray-400"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};


const MemoizedContributionsList = React.memo(ContributionsList);

export default MemoizedContributionsList;
