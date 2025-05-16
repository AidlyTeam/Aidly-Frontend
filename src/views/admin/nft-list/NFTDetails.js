import { createNFT, getNFTById, updateNFT } from "@/store/admin/nft"
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Box,
  Typography,
  Grid,
} from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import EditedText from "@/components/EditedText/EditedText"

const NFTDetails = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { id } = router.query
  const isEdit = id !== 'new'

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageFile: null,
    isNft: true,
    sellerFee: 0,
    symbol: '',
    donationThreshold: 1
  })

  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    if (isEdit) {
      fetchNFTDetails()
    }
  }, [id])

  const fetchNFTDetails = async () => {
    try {
      const response = await dispatch(getNFTById(id)).unwrap()
      setFormData({
        name: response?.data?.name,
        description: response?.data?.description,
        isNft: true,
        sellerFee: response?.data?.sellerFee || 0,
        symbol: response?.data?.symbol || '',
        donationThreshold: response?.data?.donationThreshold || 1,
        imageFile: null
      })
      setPreviewUrl(response.imageUrl)
    } catch (error) {
      // toast.error('Failed to fetch NFT details')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const submitData = {
        ...formData,
        donationThreshold: Number(formData.donationThreshold)
      }
      if (isEdit) {
        await dispatch(updateNFT({ id, data: submitData })).unwrap().then((res) => {
          if (res.statusCode === 200) {
            router.push('/admin/nft-list')
          }
        })
      } else {
        await dispatch(createNFT(submitData)).unwrap()
        router.push('/admin/nft-list')
      }
    } catch (error) {
      // Handle error
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file
      }))
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h5" component="h1">
            {isEdit ? 'Edit NFT' : 'Create NFT'}
          </Typography>
        }
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <EditedText
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter name"
              />
            </Grid>
            <Grid item xs={12}>
              <EditedText
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter description"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <EditedText
                label="Seller Fee (%)"
                name="sellerFee"
                type="number"
                value={formData.sellerFee}
                onChange={handleChange}
                required
                placeholder="Enter seller fee percentage"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <EditedText
                label="Symbol"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                required
                placeholder="Enter token symbol"
              />
            </Grid>
            <Grid item xs={12}>
              <EditedText
                label="Donation Threshold"
                name="donationThreshold"
                type="number"
                value={formData.donationThreshold}
                onChange={handleChange}
                required
                placeholder="Enter how many donations needed to claim NFT"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" color="secondary.dark" fontWeight="bold" mb={1}>
                  Image
                </Typography>
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    sx={{
                      borderColor: 'secondary.main',
                      color: 'secondary.main',
                      '&:hover': {
                        borderColor: 'secondary.dark',
                        backgroundColor: 'rgba(99, 241, 249, 0.1)',
                      },
                    }}
                  >
                    Upload Image
                  </Button>
                </label>
                {previewUrl && (
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(45deg, rgba(0, 240, 255, 0.13), rgba(0, 240, 255, 0.27))",
                      border: "2px solid #00F0FF",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 1,
                      position: "relative",
                      overflow: "hidden",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          "linear-gradient(45deg, rgba(0, 240, 255, 0.07), rgba(0, 240, 255, 0.13))",
                        animation: "rotate 3s linear infinite",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: -50,
                        left: -50,
                        right: -50,
                        bottom: -50,
                        background:
                          "radial-gradient(circle, rgba(0, 240, 255, 0.13) 0%, transparent 70%)",
                        animation: "pulse 2s ease-in-out infinite",
                      },
                    }}
                  >
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: "contain",
                        position: "relative",
                        zIndex: 1,
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  {isEdit ? "Update" : "Create"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}

export default NFTDetails 