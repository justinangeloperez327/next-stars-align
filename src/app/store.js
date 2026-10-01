import applicationsReducer from '@features/applications/slices/applicationsSlice';
import authReducer from '@features/authentication/slices/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '@features/dashboard/slices/dashboardSlice';
import jobsReducer from '@features/jobs/slices/jobsSlice';
import profileReducer from '@features/profile/slices/profileSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      jobs: jobsReducer,
      auth: authReducer,
      applications: applicationsReducer,
      profile: profileReducer,
      dashboard: dashboardReducer,
    },
  });
