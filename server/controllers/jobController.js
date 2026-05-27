import asyncHandler from 'express-async-handler';
import Job from '../models/Job.js';

// @desc    Get jobs
// @route   GET /api/jobs
// @access  Private
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json(jobs);
});

// @desc    Set job application
// @route   POST /api/jobs
// @access  Private
const setJob = asyncHandler(async (req, res) => {
  const { company, position, status, interviewDate, notes } = req.body;

  if (!company || !position) {
    res.status(400);
    throw new Error('Please add company and position fields');
  }

  const job = await Job.create({
    company,
    position,
    status: status || 'Applied',
    interviewDate,
    notes,
    user: req.user.id,
  });

  res.status(201).json(job);
});

// @desc    Update job application
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job application not found');
  }

  // Make sure the logged in user matches the job user
  if (job.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedJob);
});

// @desc    Delete job application
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job application not found');
  }

  // Make sure the logged in user matches the job user
  if (job.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await job.deleteOne();

  res.status(200).json({ id: req.params.id });
});

export { getJobs, setJob, updateJob, deleteJob };
