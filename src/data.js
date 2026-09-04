import {
  Instagram,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';

// --- Data Models ---

export const TABS = ['Ventures', 'About', 'Experience', 'Tech Stack', 'Connect'];

export const ABOUT = {
  bio: "I'm a Data Science enthusiast with a passion for turning raw data into meaningful insights and intelligent systems. Over the years, I've explored machine learning, deep learning, and AI-driven applications, finding my sweet spot exactly where data meets intelligent decision-making.",
  location: 'Maharashtra, India',
  focus: ['Python', 'Machine Learning', 'Deep Learning', 'Data Viz', 'LLMs', 'Automation'],
  education: [
    {
      id: 1,
      degree: 'Bachelor of Technology (B.Tech) — Computer Science and Engineering',
      institution: 'Sant Gadge Baba Amravati University, Amravati, Maharashtra',
      duration: 'August 2023 – June 2026'
    },
    {
      id: 2,
      degree: 'Diploma in — Computer Engineering',
      institution: 'Government Polytechnic Arvi, Maharashtra',
      duration: 'July 2020 – April 2022 (78.77%)'
    },
    {
      id: 3,
      degree: 'Higher Secondary Certificate (HSC) — Science',
      institution: 'Model Junior College of Science and Arts, Karanja (Ghadge), Maharashtra',
      duration: 'June 2019 – June 2020 (60%)'
    }
  ]
};

export const EXPERIENCE = [
  {
    id: 1,
    role: 'Software Engineer Intern',
    company: 'Akola Police Cyber Cell',
    initials: 'AP',
    location: 'Akola, Maharashtra, India',
    duration: 'September 2025 – March 2026 (7 months)',
    tech: ['Node.js', 'Express', 'Security', 'Public Safety'],
    bullets: [
      'Software Development: Contributed to the development and maintenance of internal software solutions.',
      'Security Focus: Gained practical experience developing secure, reliable applications in a high-stakes public safety environment.'
    ]
  },
  {
    id: 2,
    role: 'Internship Trainee',
    company: 'Xenosis IT Solutions',
    initials: 'XI',
    location: 'Nagpur, Maharashtra, India',
    duration: 'May 2024 – July 2024 (3 months)',
    tech: ['Agile', 'SDLC', 'Version Control', 'Web Dev'],
    bullets: [
      'Project Contribution: Successfully completed a 3-month intensive training program, contributing to live or simulated projects by applying foundational software development principles.',
      'Team Collaboration: Worked directly with an agile team to learn best practices in software development lifecycle (SDLC), code reviews, and version control.'
    ]
  }
];

export const VENTURES = [
  {
    id: 1,
    title: 'Akola CopConnect — WhatsApp ChatBot',
    description: 'WhatsApp chatbot for faster cyber incident reporting.',
    link: 'https://github.com/mahesh-atx',
    cta: 'View GitHub profile'
  },
  {
    id: 2,
    title: 'SP-e Samvaad — Appointment Booking Portal',
    description: 'Police appointment booking portal with automated Meet invites.',
    link: 'https://akolapoliceevisit-code.github.io/SP-e-Sanvad/',
    cta: 'Visit site'
  }
];

export const TECH_STACK = [
  { name: 'Python', link: 'https://www.python.org/', icon: 'https://cdn.simpleicons.org/python', category: 'Languages' },
  { name: 'Pandas', link: 'https://pandas.pydata.org/', icon: 'https://cdn.simpleicons.org/pandas', category: 'Data' },
  { name: 'NumPy', link: 'https://numpy.org/', icon: 'https://cdn.simpleicons.org/numpy', category: 'Data' },
  { name: 'Scikit-learn', link: 'https://scikit-learn.org/', icon: 'https://cdn.simpleicons.org/scikitlearn', category: 'ML / DL' },
  { name: 'TensorFlow', link: 'https://www.tensorflow.org/', icon: 'https://cdn.simpleicons.org/tensorflow', category: 'ML / DL' },
  { name: 'PyTorch', link: 'https://pytorch.org/', icon: 'https://cdn.simpleicons.org/pytorch', category: 'ML / DL' },
  { name: 'MySQL', link: 'https://www.mysql.com/', icon: 'https://cdn.simpleicons.org/mysql', category: 'Data' },
  { name: 'Jupyter', link: 'https://jupyter.org/', icon: 'https://cdn.simpleicons.org/jupyter', category: 'Tools' },
  { name: 'GitHub', link: 'https://github.com/', icon: 'https://cdn.simpleicons.org/github', category: 'Tools' },
];

export const CONNECT_LINKS = [
  { name: 'Instagram', handle: '@___spike_07', link: 'https://www.instagram.com/___spike_07/', icon: Instagram },
  { name: 'GitHub', handle: '@mahesh-atx', link: 'https://github.com/mahesh-atx', icon: Github },
  { name: 'LinkedIn', handle: 'mahesh-dongare', link: 'https://www.linkedin.com/in/mahesh-dongare-117b8a264/', icon: Linkedin },
  { name: 'Email', handle: 'dongaremahesh10@gmail.com', link: 'mailto:dongaremahesh10@gmail.com', icon: Mail },
];

export const SOCIALS = [
  { link: 'https://www.instagram.com/___spike_07/', icon: Instagram, label: 'Visit Mahesh on Instagram' },
  { link: 'https://github.com/mahesh-atx', icon: Github, label: 'Visit Mahesh on GitHub' },
  { link: 'https://www.linkedin.com/in/mahesh-dongare-117b8a264/', icon: Linkedin, label: 'Visit Mahesh on LinkedIn' },
  { link: 'mailto:dongaremahesh10@gmail.com', icon: Mail, label: 'Copy email address' },
];
