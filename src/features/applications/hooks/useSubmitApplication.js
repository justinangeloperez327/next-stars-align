"use client";

import { useDispatch, useSelector } from 'react-redux';

import { createApplication } from '../slices/applicationsSlice';
import { useRouter } from 'next/navigation';

const useSubmitApplication = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.applications);

  const handleApplicationSubmit = async (formData, jobId) => {
    const resultAction = await dispatch(createApplication(formData));
    if (createApplication.fulfilled.match(resultAction)) {
      const applicationId = resultAction.payload._id;
      router.push(`/jobs/${jobId}/application/${applicationId}/success`);
    } else {
      return false;
    }
    return true;
  };

  return { handleApplicationSubmit, loading, error };
};

export default useSubmitApplication;