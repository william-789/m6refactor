import axios from "axios";
const axiosFest = axios.create({
  baseURL: "https://upfest.site",
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVwc2swcTk1NmowODRAaXNjdGUtaXVsLnB0IiwiaWF0IjoxNjk2MDI4MjM2LCJleHAiOjE3Mjc1NjQyMzZ9.60Wv7SpiaTIUeQBmPiPrZzKYocNeH4y7jsMU3jIAOYw',
  },
})
export default axiosFest;

const baseImgLink = "https://upfest.site/public/"
export { baseImgLink }
