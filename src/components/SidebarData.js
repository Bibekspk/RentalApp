import React from 'react';

import {
    ColumnsGap,
    PeopleFill,
    Building,
  
} from "react-bootstrap-icons";

export const SidebarData = [

  {
    title: 'Dashboard',
    path: '/admin',
    icon: <ColumnsGap />,
    cName: 'nav-text'
  },
  {
    title: 'Users',
    path: '/users',
    icon: <PeopleFill />,
    cName: 'nav-text'
  },
  {
    title: 'Rooms',
    path: '/rooms',
    icon: <Building />,
    cName: 'nav-text'
  },


];