import path from 'path'
import { buildFigmaConfig } from '@payloadcms/figma'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { en as adminLanguage } from '@payloadcms/translations/languages/en'
import { fileURLToPath } from 'url'
import { Admins } from './collections/Admins'
import { Media } from './collections/Media'
import { Folders } from './collections/Folders'
import { Tags } from './collections/Tags'
import { Users } from './collections/Users'
import { Spaces } from './collections/Spaces'
import { Resources } from './collections/Resources'
import { Bookings } from './collections/Bookings'
import { CommunityPosts } from './collections/CommunityPosts'
import { CommunityReplies } from './collections/CommunityReplies'
import { AdminAccessRequests } from './collections/AdminAccessRequests'
import { Reviews } from './collections/Reviews'
import { BookingSlots } from './collections/BookingSlots'
import { Transactions } from './collections/Transactions'
import { ServicePackages } from './collections/ServicePackages'
import { Promotions } from './collections/Promotions'
import { MaintenanceRecords } from './collections/MaintenanceRecords'
import { Disputes } from './collections/Disputes'
import { ProviderApplications } from './collections/ProviderApplications'
import { Portfolios } from './collections/Portfolios'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildFigmaConfig({
  admin: {
    user: Admins.slug,
    constrainWidth: true,
    dashboard: {
      widgets: [],
      defaultLayout: [
        { widgetSlug: 'activity', width: 'full' },
        { widgetSlug: 'collections', width: 'full' },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { en: adminLanguage },
  },
  collections: [
    Admins,
    Users,
    AdminAccessRequests,
    Media,
    Folders,
    Tags,
    Spaces,
    Resources,
    Bookings,
    BookingSlots,
    Transactions,
    ServicePackages,
    Promotions,
    MaintenanceRecords,
    Disputes,
    ProviderApplications,
    Portfolios,
    Reviews,
    CommunityPosts,
    CommunityReplies,
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  localization: {
    locales: [{ code: 'en', label: 'English' }],
    fallback: true,
    defaultLocale: 'en',
  },
  plugins: [mcpPlugin({})],
  figma: {},
})
