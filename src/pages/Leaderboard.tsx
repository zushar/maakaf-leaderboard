import { useLeaderboard }  from '../actions/useLeaderboard';
import { ContributorsInsights, addContributorsInsightsInsights, formatSinceAndUntil, mapMembers } from '../actions/leaderboardFunctions';

const LeaderboardPage: React.FC = () => {
 const { leaderboard, loading, error } = useLeaderboard();

 if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!leaderboard) return <p>No profile data</p>;

  const [data1, data2, data3] = leaderboard;
  const contributors = addContributorsInsightsInsights(data1);
  const contributors2 = addContributorsInsightsInsights(data2);
  const contributors3 = addContributorsInsightsInsights(data3);

  return (
    <>
      <div className="sticky top-0 bg-gray-600 z-10 shadow-md text-gray-400">
      <h3 className="text-2xl font-bold text-center">Our Contributions In Maakaf</h3>
        <div className="font-bold flex flex-row justify-center p-2">
          <a href={"#allTimes"} className="transition duration-300 group px-4">
            <span>{"All Times Contribution"}</span>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600" />
          </a>
          <a href={"#lastMonth"} className="transition duration-300 group px-4">
            <span>{"Last Month Contribution"}</span>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600" />
          </a>
          <a href={"#lastWeek"} className="transition duration-300 group px-4">
            <span>{"Last Week Contribution"}</span>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600" />
          </a>
        </div>
      </div>
      <ContributionsList data={contributors3} key={`contributors3`} />
      <ContributionsList data={contributors2} key={`contributors2`} />
      <ContributionsList data={contributors} key={`contributors`} />
    </>
  )
};

interface PersonPlace {
  data: ContributorsInsights['members'][number] & {
    loginUrl: string;
    projects_name_urls: string[];
  };
  place: number;
}

const ContributionsList: React.FC<{ data: ContributorsInsights }> = ({ data }) => {
  const mappedData = data.members.map(mapMembers).filter(p => !p.name.includes('[bot]'));

  return (
    <div className="font-inter container mx-auto p-4 bg-gray-600" id={data.stat === "allTimes" ? "allTimes" : data.stat === "lastMonth" ? "lastMonth" : "lastWeek"}>
      <div className="flex flex-row justify-center">
        <h4 className='text-center'>{data.stat === "allTimes" ? "All Times" : data.stat === "lastMonth" ? "Last Month" : "Last Week"}</h4>
        <h4 className="text-gray-400 mb-4 text-center ml-10">{formatSinceAndUntil(data.since, data.until)}</h4>
      </div>
      <ul className="grid grid-cols-3 gap-2">
        {mappedData.filter(p => p.score).map((data, ind) => (
          <li key={data.node_id}>
            <DisplayPerson2 data={data} place={ind + 1} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const DisplayPerson2: React.FC<PersonPlace> = ({ data, place }) => {
  const insights = Object.entries(data.insights)
    .filter(([key, value]) => value)
    .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden h-full ">
      <div className="flex items-center px-6 py-4 bg-gray-900">
        <img className="h-12 w-12 rounded-full object-cover" src={data.avatar_url} alt="avatar" width={48} height={48} />
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-white mr-3"><a href={`https://github.com/${data.name}`} target="_blank" rel="noopener noreferrer">{data.name}</a></h2>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="mt-4">
          <h3 className="text-gray-900 text-lg font-semibold">Contributions</h3>
          <ul className="mt-2 text-gray-700">
            <li><strong>Additions:</strong> {data.stats.additions.toLocaleString()}</li>
            <li><strong>Deletions:</strong> {data.stats.deletions.toLocaleString()}</li>
            <li><strong>Commits:</strong> {data.stats.commits.toLocaleString()}</li>
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-gray-900 text-lg font-semibold">Projects Contributions</h3>
          <ul className="mt-2 text-gray-700">
            {data.projects_names.map((project, index) => (
              <li key={index}>{project.name}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-gray-900 text-lg font-semibold">Insightful Contributions</h3>
          <ul className="mt-2 text-gray-700">
            {insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;