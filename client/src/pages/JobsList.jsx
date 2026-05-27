import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import JobModal from '../components/JobModal';
import JobCard from '../components/JobCard';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const { api } = useAuth();

  const fetchJobs = async () => {
    try {
      const { data } = await api.get('/jobs');
      setJobs(data);
    } catch (error) {
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [api]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      try {
        await api.delete(`/jobs/${id}`);
        setJobs(jobs.filter(job => job._id !== id));
        toast.success('Job deleted successfully');
      } catch (error) {
        toast.error('Failed to delete job');
      }
    }
  };

  const handleEdit = (job) => {
    setCurrentJob(job);
    setIsModalOpen(true);
  };

  const handleSave = async (jobData) => {
    try {
      if (currentJob) {
        // Edit
        const { data } = await api.put(`/jobs/${currentJob._id}`, jobData);
        setJobs(jobs.map(job => (job._id === data._id ? data : job)));
        toast.success('Job updated successfully');
      } else {
        // Create
        const { data } = await api.post('/jobs', jobData);
        setJobs([data, ...jobs]);
        toast.success('Job added successfully');
      }
      setIsModalOpen(false);
      setCurrentJob(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save job');
    }
  };

  // Apply filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Applications</h1>
          <p className="text-slate-400">Manage and track your job hunt progress.</p>
        </div>
        <button 
          onClick={() => { setCurrentJob(null); setIsModalOpen(true); }}
          className="btn-primary flex items-center gap-2 md:w-auto"
        >
          <Plus size={20} />
          Add Application
        </button>
      </div>

      <div className="glass-card p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search company or position..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative md:w-48">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <select
            className="input-field pl-10 appearance-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-20 glass-card">
          <p className="text-slate-400 mb-4">No applications found matching your criteria.</p>
          <button 
            onClick={() => { setCurrentJob(null); setIsModalOpen(true); }}
            className="text-primary-400 hover:text-primary-300 transition-colors"
          >
            + Add your first application
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredJobs.map((job) => (
              <JobCard 
                key={job._id} 
                job={job} 
                onEdit={() => handleEdit(job)}
                onDelete={() => handleDelete(job._id)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {isModalOpen && (
        <JobModal 
          job={currentJob} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSave} 
        />
      )}
    </motion.div>
  );
};

export default JobsList;
