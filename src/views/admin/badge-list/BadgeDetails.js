import { createBadge, getBadgeById, updateBadge } from "@/store/admin/badge"
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Box,
  Typography,
  Grid,
  InputAdornment,
} from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import EditedText from "@/components/EditedText/EditedText"

const BadgeDetails = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { id } = router.query
  const isEdit = id !== 'new'

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    donationThreshold: 1,
    imageFile: null
  })

  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    if (isEdit) {
      fetchBadgeDetails()
    }
  }, [id])

  const fetchBadgeDetails = async () => {
    try {
      const response = await dispatch(getBadgeById(id)).unwrap()
      setFormData({
        name: response?.data?.name,
        description: response?.data?.description,
        donationThreshold: response?.data?.threshold,
        imageFile: null
      })
      setPreviewUrl(response.imageUrl)
    } catch (error) {
      // toast.error('Failed to fetch badge details')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEdit) {
        await dispatch(updateBadge({ id, data: formData })).unwrap().then((res) => {
          if (res.statusCode === 200) {
            router.push('/admin/badge-list')
          }
        })
      } else {
        await dispatch(createBadge(formData)).unwrap()

      }
    } catch (error) {
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
            {isEdit ? 'Edit Badge' : 'Create Badge'}
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
                placeholder="Enter badge name"
              />
            </Grid>
            <Grid item xs={12}>
              <EditedText
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter badge description"
                multiline
                rows={4}
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
                placeholder="Enter donation threshold"
              // endAdornment={
              //   <InputAdornment position="start">$</InputAdornment>
              // }
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" color="secondary.dark" fontWeight="bold" mb={1}>
                  Badge Image
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
                      alt="Badge preview"
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

export default BadgeDetails 