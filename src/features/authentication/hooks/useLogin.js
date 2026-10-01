"use client";

import { loginUser, resetAuthState } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useLogin = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { job } = useSelector((state) => state.jobs);
  const router = useRouter();

  const handleLogin = async (credentials) => {
    const resultAction = await dispatch(loginUser(credentials));

    if (loginUser.fulfilled.match(resultAction)) {
      const userRole = resultAction.payload.user.role;
      if (userRole === 'admin') {
        router.push('/admin/dashboard');
      } else if (userRole === 'employer') {
        router.push('/employer/dashboard');
      } else {
        console.log(job?._id)
        if (job?._id) {

          router.push(`/jobs/${job?._id}/application`);
        } else {
          router.push('/');
        }
      }
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  return { handleLogin, loading, error };
};

export default useLogin;