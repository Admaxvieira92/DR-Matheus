
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
  { label: 'Início', href: '#home' },
  { label: 'Serviços', href: '#servicos' },
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
    description: 'Lentes de resina ou porcelana para uma transformação estética completa e natural.',
    icon: <Sparkles className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'proteses',
    title: 'Próteses',
    description: 'Soluções protéticas personalizadas para devolver o conforto e a autoestima.',
    icon: <Stethoscope className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'protocolo',
    title: 'Protocolo',
    description: 'A solução fixa ideal para quem busca estabilidade total em próteses sobre implantes.',
    icon: <Layers className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1533226459173-75736141348f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bichectomia',
    title: 'Bichectomia',
    description: 'Harmonização facial através da redução das bochechas para um rosto mais definido.',
    icon: <Scissors className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'clareamento',
    title: 'Clareamentos',
    description: 'Técnicas avançadas para deixar seu sorriso iluminado e livre de manchas.',
    icon: <Smile className="w-6 h-6" />,
    imageUrl: 'https://sosorrisoodontologia.com.br/wp-content/uploads/2022/07/antes-e-depois-clareamento-dental-03-1024x1024.jpg'
  },
  {
    id: 'canal',
    title: 'Tratamento de Canal (Endodontia)',
    description: 'Tratamento especializado para salvar dentes e eliminar dores profundas.',
    icon: <Heart className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'pino-coroa',
    title: 'Pino e coroa',
    description: 'Reforço estrutural e estética para dentes comprometidos.',
    icon: <Crown className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1445527815219-ecbfec67492e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'restauracao',
    title: 'Restauração',
    description: 'Recuperação da forma e função do dente com materiais estéticos de alta durabilidade.',
    icon: <Activity className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'profilaxia',
    title: 'Profilaxia',
    description: 'Limpeza profissional preventiva para manutenção da saúde bucal.',
    icon: <Droplet className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1581594549595-35e6edca7577?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'extracoes',
    title: 'Extrações',
    description: 'Procedimentos cirúrgicos precisos para extrações necessárias e remoção de dentes comprometidos.',
    icon: <PlusCircle className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sisos',
    title: 'Sisos',
    description: 'Remoção especializada de terceiros molares com máximo conforto e segurança.',
    icon: <ChevronRight className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800'
  }
];

export const CONTACT_INFO = {
  name: 'Dr. Matheus Fernandes',
  address: 'R. Quintino Bocaiúva, 246 - St. Central, Anápolis - GO, 75023-057',
  phone: '(64) 99936-9549',
  whatsappUrl: 'https://wa.me/5564999369549',
  profileImage: 'https://lh3.googleusercontent.com/p/AF1QipN4etoznjFoTb9D5uz6Jvo2FBQPTtTsG-Pr4rw9=s680-w680-h510-rw'
};
