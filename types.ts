
// Import React to provide access to the React namespace for type definitions
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
}

export interface NavLink {
  label: string;
  href: string;
}