import defaultSettings from '@/settings'

const title = defaultSettings.title || 'baby-courses-admin'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
