// src/components/DisplayPerson.tsx
import React from 'react';
import { ContributorsInsights } from '../actions/leaderboardFunctions'; // Adjust the import path based on your project

interface PersonPlace {
  data: ContributorsInsights['members'][number] & {
    loginUrl: string;
    projects_name_urls: string[];
  };
  place: number;
}

const DisplayPerson: React.FC<PersonPlace> = ({ data, place }) => {
  const insights = React.useMemo(() => {
    return Object.entries(data.insights)
      .filter(([key, value]) => value)
      .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));
  }, [data.insights]);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full">
      <div className="flex items-center px-4 py-3 bg-gray-900">
        <img
          className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
          src={data.avatar_url}
          alt="avatar"
          width={48}
          height={48}
        />
        <div className="ml-3 md:ml-4">
          <h2 className="text-lg md:text-xl font-semibold text-white">
            <a href={`https://github.com/${data.name}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {data.name}
            </a>
          </h2>
        </div>
      </div>
      <div className="px-4 py-3 md:px-6 md:py-4">
        <div className="mt-2 md:mt-4">
          <h3 className="text-gray-900 text-base md:text-lg font-semibold">Contributions</h3>
          <ul className="mt-1 md:mt-2 text-sm md:text-base text-gray-700">
            <li><strong>Additions:</strong> {data.stats.additions.toLocaleString()}</li>
            <li><strong>Deletions:</strong> {data.stats.deletions.toLocaleString()}</li>
            <li><strong>Commits:</strong> {data.stats.commits.toLocaleString()}</li>
          </ul>
        </div>
        <div className="mt-2 md:mt-4">
          <h3 className="text-gray-900 text-base md:text-lg font-semibold">Projects</h3>
          <ul className="mt-1 md:mt-2 text-sm md:text-base text-gray-700">
            {data.projects_names.slice(0, 3).map((project, index) => (
              <li key={index} className="truncate">{project.name}</li>
            ))}
            {data.projects_names.length > 3 && <li>+{data.projects_names.length - 3} more</li>}
          </ul>
        </div>
        <div className="mt-2 md:mt-4">
          <h3 className="text-gray-900 text-base md:text-lg font-semibold">Insights</h3>
          <ul className="mt-1 md:mt-2 text-sm md:text-base text-gray-700">
            {insights.slice(0, 3).map((insight, index) => (
              <li key={index} className="truncate">{insight}</li>
            ))}
            {insights.length > 3 && <li>+{insights.length - 3} more</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DisplayPerson;