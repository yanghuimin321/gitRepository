import type { CategoryTopItem } from '@/types/category'
import type { BannerItem } from '@/types/home'
import { http } from '@/utils/http'

/**
 * 分类-广告区域
 * @param distributionSite 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 */
export const getCategoryBannerAPI = (distributionSite = 2) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}

/**
 * 分类列表数据
 */
export const getCategoryTopAPI = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
