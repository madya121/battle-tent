import React from 'react';
import {
  default as CircularProgress,
  CircularProgressProps
} from '@material-ui/core/CircularProgress';

export interface LoadingIndicatorProps {
  size?: CircularProgressProps['size'];
}

export default function LoadingIndicator({ size }: LoadingIndicatorProps) {
  return (
    <CircularProgress size={size} />
  )
}
