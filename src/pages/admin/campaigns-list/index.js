import CampaignsList from "@/views/admin/campaigns-list/CampaignsList"

const CampaignsListPage = () => <CampaignsList />

CampaignsListPage.acl = {
    action: 'read',
    permission: 'admin'
}
export default CampaignsListPage