import CampaignDetails from "@/views/admin/campaigns-details/CampaignDetails"

const CampaignDetailsPage = () => <CampaignDetails />

CampaignDetailsPage.acl = {
    action: 'read',
    permission: 'admin'
}
export default CampaignDetailsPage