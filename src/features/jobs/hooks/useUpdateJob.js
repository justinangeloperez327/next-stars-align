"use client";

import { useDispatch, useSelector } from 'react-redux';

import { updateJob } from '../services/jobsService';
import { useRouter } from 'next/navigation';

const useUpdateJob = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.jobs);

  const handleUpdateJob = async (jobId, job) => {
    const resultAction = await dispatch(updateJob(jobId, job));
    if (updateJob.fulfilled.match(resultAction)) {
      router.push('/employer/jobs');
    } else {
      return false;
    }
  };

  return { handleUpdateJob, loading, error };
};

export default useUpdateJob;