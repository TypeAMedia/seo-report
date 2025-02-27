import Papa from 'papaparse'
import type { Domains } from '../types/data'
import type { Links } from '../types/data'
import type { Lighthouse } from '../types/data'

export async function getDomainsData(): Promise<Domains[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const response = await fetch(`${baseUrl}/data/data-Domains.csv`)
  const csvText = await response.text()

  const { data } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  })

  return data as Domains[]
}

export async function getLinksData(): Promise<Links[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const response = await fetch(`${baseUrl}/data/data-Links.csv`)
  const csvText = await response.text()

  const { data } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  })

  return data as Links[]
}

export async function getLighthouseData(): Promise<Lighthouse[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const response = await fetch(`${baseUrl}/data/data - Lighthouse.csv`)
  const csvText = await response.text()

  const { data } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  })

  return data as Lighthouse[]
}

