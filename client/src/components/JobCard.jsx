import { motion } from 'framer-motion';
import { Calendar, Building2, MapPin, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

const JobCard = ({ job, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  const statusColors = {
    Applied: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Interview: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Offer: 'bg-green-500/20 text-green-400 border-green-500/30',
    Rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="glass-card p-5 group relative"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-dark-900 border border-slate-700 flex items-center justify-center font-bold text-xl text-primary-400 uppercase">
            {job.company.substring(0, 1)}
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">{job.position}</h3>
            <p className="text-slate-400 flex items-center gap-1 text-sm">
              <Building2 size={14} /> {job.company}
            </p>
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
          >
            <MoreVertical size={20} />
          </button>
          
          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-36 bg-dark-800 border border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden">
                <button 
                  onClick={() => { setShowMenu(false); onEdit(); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Edit size={14} /> Edit
                </button>
                <button 
                  onClick={() => { setShowMenu(false); onDelete(); }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 flex items-center gap-2">
            <Calendar size={16} /> Applied On
          </span>
          <span className="text-slate-200">
            {new Date(job.dateApplied).toLocaleDateString()}
          </span>
        </div>
        
        {job.interviewDate && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400 flex items-center gap-2">
              <MapPin size={16} /> Interview
            </span>
            <span className="text-primary-400 font-medium">
              {new Date(job.interviewDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[job.status]}`}>
          {job.status}
        </span>
        
        {job.notes && (
          <span className="text-xs text-slate-500 bg-dark-900 px-2 py-1 rounded-md max-w-[120px] truncate">
            {job.notes}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default JobCard;
