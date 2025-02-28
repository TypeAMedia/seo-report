import fs from 'fs'
import path from 'path'
import Papa from 'papaparse'
import type { Domains } from '../types/data'
import type { Links } from '../types/data'
import type { Lighthouse } from '../types/data'

export async function getDomainsData(): Promise<Domains[]> {
  try {
    // Read file from public directory during build time
    const filePath = path.join(process.cwd(), 'public/data/data-Domains.csv')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    const { data } = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
    })

    return data as Domains[]
  } catch (error) {
    console.error('Error reading Domains CSV:', error)
    return []
  }
}

export async function getLinksData(): Promise<Links[]> {
  try {
    const filePath = path.join(process.cwd(), 'public/data/data-Links.csv')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    const { data } = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
    })

    return data as Links[]
  } catch (error) {
    console.error('Error reading Links CSV:', error)
    return []
  }
}

export async function getLighthouseData(): Promise<Lighthouse[]> {
  try {
    const filePath = path.join(process.cwd(), 'public/data/data - Lighthouse.csv')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    
    const { data } = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
    })

    return data as Lighthouse[]
  } catch (error) {
    console.error('Error reading Lighthouse CSV:', error)
    return []
  }
}

