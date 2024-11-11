import config from '../../config'

const Media = {
  userProfileImage: `${config.API_BASE_URL}/media/upload/user/image`,
  mediaUpload: (mediaFor, mediaType) =>
    `${config.API_BASE_URL}/media/upload/${mediaFor}/${mediaType}`
}
export default Media
