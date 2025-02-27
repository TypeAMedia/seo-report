export interface Domains {
  country: string
  target: string
  year: string
  month: string
  etv: string
  count: string
  category: string
  subcategory: string
}

export interface Links {
  country: string
  target: string
  year: string
  month: string
  new_referring_main_domains: string
  referring_main_domains: string
  category: string
  subcategory: string
  lcp: string
  cls: string
  fid: string
}

export interface Lighthouse {
  country: string, 
  "target domain": string, 
  year: string, 
  month: string, 
  LCP: string, 
  CLS: string, 
  FID: string,
  category: string,
  etv: string
}


export interface AverageData {
  name: string
  description: string
  color: string
  value: string
}

export interface TableHeader {
  icon: string, 
  name: string
}

