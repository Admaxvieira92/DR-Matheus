import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Smile, 
  Droplet, 
  Crown,
  Scissors,
  Activity,
  Layers,
  Heart,
  PlusCircle,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { Service, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Início', href: '#topo' },
  { label: 'Serviços', href: '#tratamentos' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

export const SERVICES: Service[] = [
  {
    id: 'implantes',
    title: 'Implantes',
    description: 'Reabilitação oral definitiva para recuperar a função mastigatória e a estética do seu sorriso.',
    icon: <ShieldCheck className="w-6 h-6" />,
    imageUrl: 'https://odontolove.com.br/wp-content/uploads/2023/02/implante-dentario-em-altamira-protese-dentaria-fixa.jpeg'
  },
  {
    id: 'lentes',
    title: 'Lentes de Contato',
    description: 'Lentes de resina ou porcelana para uma transformation estética completa e natural.',
    icon: <Sparkles className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'proteses',
    title: 'Próteses',
    description: 'Soluções protéticas personalizadas para devolver o conforto e a autoestima.',
    icon: <Stethoscope className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800'
  }
];

export const CONTACT_INFO = {
  name: 'Dr. Matheus Fernandes',
  address: 'R. Quintino Bocaiúva, 246 - St. Central, Anápolis - GO, 75023-057',
  phone: '(64) 99936-9549',
  whatsappUrl: 'https://wa.me/5564999369549',
  profileImage: 'https://lh3.googleusercontent.com/p/AF1QipN4etoznjFoTb9D5uz6Jvo2FBQPTtTsG-Pr4rw9=s680-w680-h510-rw'
};