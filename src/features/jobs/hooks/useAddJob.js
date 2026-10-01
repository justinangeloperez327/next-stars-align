"use client";

import { useDispatch, useSelector } from 'react-redux';

import { createJob } from '../slices/jobsSlice';
import { useRouter } from 'next/navigation';

const useAddJob = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.jobs);

  const handleCreateJob = async (userData) => {
    const resultAction = await dispatch(createJob(userData));
    if (createJob.fulfilled.match(resultAction)) {
      router.push('/employer/jobs');
    } else {
      return false;
    }
    return true;
  };

  return { handleCreateJob, loading, error };
};

export default useAddJob;