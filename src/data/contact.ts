export interface ContactInfo {
  iconName: 'Mail' | 'Phone'
  title: string
  value: string
  link: string
}

export interface SocialLink {
  iconName: 'Linkedin' | 'Github'
  name: string
  url: string
}

export const contactInfo: ContactInfo[] = [
  {
    iconName: 'Mail',
    title: 'Email',
    value: 'arunabhsaikia.official@gmail.com',
    link: 'mailto:arunabhsaikia.official@gmail.com'
  },
  {
    iconName: 'Phone',
    title: 'Phone',
    value: '+1 (312) 539-7699',
    link: 'tel:+13125397699'
  }
]

export const socialLinks: SocialLink[] = [
  { iconName: 'Linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/in/arsaikia/' },
  { iconName: 'Github', name: 'GitHub', url: 'https://github.com/arsaikia/' },
]
