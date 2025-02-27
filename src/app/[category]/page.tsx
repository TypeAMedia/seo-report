import { categories } from '@/types/category'
import { notFound } from 'next/navigation'
import {
  getDomainsData,
  getLinksData,
  getLighthouseData,
} from '@/utils/csvParser'
import Circles from '@/components/Circles'
import { AverageData } from '@/types/data'
import { AccordionTable } from '@/components/AccordionTable'
import { TableHeader } from '@/types/data'
import * as d3 from 'd3'

interface Props {
  params: Promise<{
    category: string
  }>
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params
  const category = categories.find(
    (cat) => cat.path === `/${resolvedParams.category}`
  )

  const domainsData = await getDomainsData()
  const linksData = await getLinksData()
  const lighthouseData = await getLighthouseData()

  const categoryName = category?.name.toLowerCase() || null

  const foundCategoryDataDomains = domainsData.filter(
    (d) => d.category === categoryName
  )
  // SINGLE URL (Links Earned x 2) + Pages Added)) /  (SUM of all URLS ((Links Earned x 2) + Pages Added))*100

  const foundCategoryDataLinks = linksData.filter(
    (d) => d.category === categoryName
  )

  const foundCategoryDataLighthouse = lighthouseData.filter(
    (d) => d.category === categoryName
  )

  const commonDomains = foundCategoryDataDomains.filter((d) =>
    foundCategoryDataLinks.some((l) => l.target === d.target)
  )

  const joinedDomains = commonDomains.map((d) => {
    const foundLink = foundCategoryDataLinks.find((l) => l.target === d.target)

    const foundLighthouse = foundCategoryDataLighthouse.find((l) =>
      l['target domain'].includes(d.target)
    )
    return {
      ...d,
      ...foundLink,
      ...foundLighthouse,
    }
  })

  const sumLinksEarned = joinedDomains.reduce((acc, curr) => {
    return acc + Number(curr.referring_main_domains)
  }, 0)

  const sumPagesAdded = joinedDomains.reduce((acc, curr) => {
    return acc + Number(curr.count)
  }, 0)

  // SINGLE URL (Links Earned x 2) + Pages Added)) /  (SUM of all URLS ((Links Earned x 2) + Pages Added))*100

  const finalData = joinedDomains
    .map((d) => {
      return {
        ...d,
        seo_score:
          Math.round(
            ((Number(d.referring_main_domains) * 2 + Number(d.count)) /
              (sumLinksEarned * 2 + sumPagesAdded)) *
              100
          ) + 50,
      }
    })
    .filter((d) => d.country === 'UK')

  const tableHeaders: TableHeader[] = [
    {
      icon: '/icons/rank.svg',
      name: 'Rank',
    },
    {
      icon: '/icons/competitor.svg',
      name: 'Competitor',
    },
    {
      icon: '/icons/seoScore.svg',
      name: 'SEO Activity Score',
    },
  ]

  if (!category) {
    notFound()
  }

  // Sort and add rank to finalData
  const finalDataWithRank = finalData
    .sort((a, b) => b.seo_score - a.seo_score) // Sort by seo_score descending
    .map((item, index) => ({
      ...item,
      rank: index + 1, // Add rank (1-based index)
    }))

  const tabledata = finalDataWithRank.map((item) => {
    return {
      rank: item.rank,
      domain: item.target,
      seo_score: item.seo_score,
      pages_added: item.count,
      links_earned: item.referring_main_domains,
      lcp: item?.LCP,
      cls: item?.CLS,
      fid: item?.FID,
      etv: item?.etv,
    }
  })

  const formatNumber = d3.format(',')

  const averagePageAdded = formatNumber(
    Math.round(
      tabledata
        .filter((_d, i) => i < 10)
        .reduce((acc, curr) => {
          return acc + parseInt(curr.pages_added || '0')
        }, 0) / foundCategoryDataDomains.length
    )
  )

  const averageLinksTotal = formatNumber(
    Math.round(
      tabledata
        .filter((_d, i) => i < 10)
        .reduce((acc, curr) => {
          return acc + parseInt(curr.links_earned || '0')
        }, 0) / foundCategoryDataLinks.length
    )
  )

  const averageData: AverageData[] = [
    {
      name: 'Avg. page total',
      color: '#29CFA8',
      description: 'Average number of pages added to the website per month',
      value: averagePageAdded,
    },
    {
      name: 'Avg. Link total',
      color: '#F9BF18',
      description: 'Average number of links added to the website per month',
      value: averageLinksTotal,
    },
  ]

  return (
    <div className='mt-6 text-xl text-center'>
      <h1 className='text-2xl md:text-5xl'> {category.name} Industry Report</h1>
      <div className='mx-auto mb-4 w-full md:w-[50%] font-inter mt-6 px-4'>
        This report breaks down the top 50 competitors in {category.name} and
        how they perform over the most important keywords. Each competitor is
        ranked and assigned an SEO activity score.
      </div>
      <div className='mt-10 px-4 md:px-10 py-8 border-green w-[90%] md:w-[70%] mx-auto border-2 rounded-md'>
        <div className='text-xl md:text-3xl font-rubik'>
          Top 10 competitors summary
        </div>
        <div className='flex flex-col md:flex-row gap-10 md:gap-20 items-center justify-center mx-auto text-center mt-6'>
          {averageData.map((data) => {
            return (
              <Circles
                key={data.name}
                name={data.name}
                description={data.description}
                color={data.color}
                values={data.value.toString()}
              />
            )
          })}
        </div>
      </div>
      <div className='my-10 text-xl md:text-2xl font-rubik'>
        Top 50 competitors {category.name}
      </div>
      <div className='px-4 md:px-0'>
        <div className='overflow-x-auto w-full'>
          <div className='min-w-[800px] md:w-[60%] md:mx-auto'>
            <div className='bg-[#232B41] flex items-center gap-24 rounded-md px-16 py-6'>
              {tableHeaders.map((header) => (
                <div key={header.name} className='flex flex-col items-center'>
                  <img
                    className='w-10 h-10 md:w-14 md:h-14'
                    src={header.icon}
                    alt={header.name}
                  />
                  <div className='text-white text-lg md:text-xl mt-4 font-rubik'>
                    {header.name}
                  </div>
                </div>
              ))}
            </div>
            <AccordionTable
              data={tabledata
                .map((item) => ({
                  ...item,
                  pages_added: Number(item.pages_added),
                  links_earned: Number(item.links_earned || 0),
                  lcp: Number(item.lcp || 0),
                  cls: Number(item.cls || 0),
                  fid: Number(item.fid || 0),
                }))
                .filter((_item, index) => index <= 49)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate static paths for all categories
export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.path.slice(1),
  }))
}
