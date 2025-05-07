
import CampaignCategories from "@/views/profile/CampaignCategories"

const CampaignCategoriesPage = () => <CampaignCategories />

CampaignCategoriesPage.acl = {
    action: 'read',
    permission: 'home'
}
export default CampaignCategoriesPage