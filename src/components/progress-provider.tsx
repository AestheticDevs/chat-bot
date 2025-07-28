'use client';
 
import { ProgressProvider as BProgressProvider } from '@bprogress/next/app';
 
const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <BProgressProvider 
      height="4px"
      color="#2e30bf"
      options={{ showSpinner: true }}
      shallowRouting
    >
      {children}
    </BProgressProvider>
  );
};
 
export default ProgressProvider;
