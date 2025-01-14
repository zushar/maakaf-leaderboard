import React from 'react';
import Header from '../components/Header';
import ContributionsList from '../components/ContributionsList';
import LoadingState from '../components/LoadingState';
import ErrorDisplay from '../components/ErrorDisplay';
import { useLeaderboard } from '../actions/useLeaderboard';
import { addContributorsInsightsInsights } from '../actions/leaderboardFunctions';

const LeaderboardPage: React.FC = () => {
  const { leaderboard, loading, error } = useLeaderboard();

  if (loading) return <LoadingState />;
  if (error) return <ErrorDisplay message={error.message} />;
  if (!leaderboard) return <p className="text-center text-gray-600 mt-8">No profile data available</p>;

  const [allTimeData, lastMonthData, lastWeekData] = leaderboard.map(addContributorsInsightsInsights);

  return (
    <>
      <Header />
      <ContributionsList data={lastWeekData} key="lastWeek" isPaginated={false} />
      <ContributionsList data={lastMonthData} key="lastMonth" isPaginated={false} />
      <ContributionsList data={allTimeData} key="allTime" isPaginated={true} />
    </>
  );
};

export default LeaderboardPage;