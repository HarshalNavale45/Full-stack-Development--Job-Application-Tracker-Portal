import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Briefcase, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { api, user } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get('/jobs');
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [api]);

  // Calculate stats
  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === 'Applied').length,
    interview: jobs.filter((j) => j.status === 'Interview').length,
    offer: jobs.filter((j) => j.status === 'Offer').length,
    rejected: jobs.filter((j) => j.status === 'Rejected').length,
  };

  const chartData = [
    { name: 'Applied', value: stats.applied, color: '#3b82f6' },
    { name: 'Interview', value: stats.interview, color: '#eab308' },
    { name: 'Offer', value: stats.offer, color: '#22c55e' },
    { name: 'Rejected', value: stats.rejected, color: '#ef4444' },
  ].filter(item => item.value > 0);

  const statCards = [
    { title: 'Total Applications', value: stats.total, icon: <Briefcase className="text-blue-500" size={24} />, bg: 'bg-blue-500/10' },
    { title: 'In Progress', value: stats.applied + stats.interview, icon: <Clock className="text-yellow-500" size={24} />, bg: 'bg-yellow-500/10' },
    { title: 'Offers Received', value: stats.offer, icon: <CheckCircle2 className="text-green-500" size={24} />, bg: 'bg-green-500/10' },
    { title: 'Rejected', value: stats.rejected, icon: <XCircle className="text-red-500" size={24} />, bg: 'bg-red-500/10' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name.split(' ')[0]}! 👋</h1>
        <p className="text-slate-400">Here's what's happening with your job applications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="glass-card p-6 flex items-center gap-4"
          >
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-slate-400 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Section */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6">Application Status Overview</h2>
          {jobs.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400">
              <p>No data to display yet.</p>
              <p className="text-sm mt-2">Add some jobs to see your stats!</p>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Recent Applications */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Applications</h2>
          {jobs.length === 0 ? (
            <div className="text-center text-slate-400 py-8">
              No recent applications found.
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.slice(0, 4).map((job) => (
                <div key={job._id} className="flex justify-between items-center p-4 rounded-lg bg-dark-900/50 border border-slate-800">
                  <div>
                    <h4 className="text-white font-medium">{job.position}</h4>
                    <p className="text-sm text-slate-400">{job.company}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    job.status === 'Applied' ? 'bg-blue-500/20 text-blue-400' :
                    job.status === 'Interview' ? 'bg-yellow-500/20 text-yellow-400' :
                    job.status === 'Offer' ? 'bg-green-500/20 text-green-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
