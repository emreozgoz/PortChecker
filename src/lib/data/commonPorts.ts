// src/lib/data/commonPorts.ts

import { CommonPort } from '@/lib/types/port.types';

export const COMMON_PORTS: CommonPort[] = [
  // Web Development
  { port: 3000, service: 'React/Next.js Dev', protocol: 'tcp', description: 'Default React/Next.js development server', category: 'development' },
  { port: 3001, service: 'Alternative Dev Server', protocol: 'tcp', description: 'Common alternative for dev servers', category: 'development' },
  { port: 4200, service: 'Angular Dev', protocol: 'tcp', description: 'Angular CLI development server', category: 'development' },
  { port: 5173, service: 'Vite Dev', protocol: 'tcp', description: 'Vite development server', category: 'development' },
  { port: 8000, service: 'Python Dev', protocol: 'tcp', description: 'Python SimpleHTTPServer', category: 'development' },
  { port: 8080, service: 'HTTP Alternative', protocol: 'tcp', description: 'Common HTTP alternative port', category: 'development' },
  { port: 8888, service: 'Jupyter Notebook', protocol: 'tcp', description: 'Jupyter Notebook server', category: 'development' },

  // Web Servers
  { port: 80, service: 'HTTP', protocol: 'tcp', description: 'Hypertext Transfer Protocol', category: 'web' },
  { port: 443, service: 'HTTPS', protocol: 'tcp', description: 'HTTP Secure', category: 'web' },
  { port: 8443, service: 'HTTPS Alternative', protocol: 'tcp', description: 'Alternative HTTPS port', category: 'web' },

  // Databases
  { port: 3306, service: 'MySQL', protocol: 'tcp', description: 'MySQL database server', category: 'database' },
  { port: 5432, service: 'PostgreSQL', protocol: 'tcp', description: 'PostgreSQL database server', category: 'database' },
  { port: 27017, service: 'MongoDB', protocol: 'tcp', description: 'MongoDB database server', category: 'database' },
  { port: 6379, service: 'Redis', protocol: 'tcp', description: 'Redis key-value store', category: 'database' },
  { port: 1433, service: 'MS SQL', protocol: 'tcp', description: 'Microsoft SQL Server', category: 'database' },
  { port: 9042, service: 'Cassandra', protocol: 'tcp', description: 'Apache Cassandra', category: 'database' },

  // Backend Services
  { port: 5000, service: 'Flask/General', protocol: 'tcp', description: 'Flask default port / General backend', category: 'development' },
  { port: 4000, service: 'GraphQL/Express', protocol: 'tcp', description: 'Common GraphQL server port', category: 'development' },
  { port: 9000, service: 'API Server', protocol: 'tcp', description: 'Common API server port', category: 'development' },

  // Other Services
  { port: 22, service: 'SSH', protocol: 'tcp', description: 'Secure Shell', category: 'other' },
  { port: 21, service: 'FTP', protocol: 'tcp', description: 'File Transfer Protocol', category: 'other' },
  { port: 25, service: 'SMTP', protocol: 'tcp', description: 'Simple Mail Transfer Protocol', category: 'email' },
  { port: 587, service: 'SMTP Submission', protocol: 'tcp', description: 'Email message submission', category: 'email' },
  { port: 110, service: 'POP3', protocol: 'tcp', description: 'Post Office Protocol v3', category: 'email' },
  { port: 143, service: 'IMAP', protocol: 'tcp', description: 'Internet Message Access Protocol', category: 'email' },
];

export const getPortInfo = (port: number): CommonPort | undefined => {
  return COMMON_PORTS.find(p => p.port === port);
};

export const getPortsByCategory = (category: string): CommonPort[] => {
  return COMMON_PORTS.filter(p => p.category === category);
};

export const searchPorts = (query: string): CommonPort[] => {
  const lowerQuery = query.toLowerCase();
  return COMMON_PORTS.filter(p =>
    p.service.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.port.toString().includes(lowerQuery)
  );
};
