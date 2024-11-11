import { UserAuth } from '../../../apiEndPoints'
import { logger } from '../../../utils'
import APIrequest from '../../axios'

export const UserAuthServices = {
  userLogin: async (bodyData) => {
    try {
      const payload = {
        ...UserAuth.accountLogin,
        bodyData
      }
      const res = await APIrequest(payload)
      return res
    } catch (error) {
      logger(error)
      throw error
    }
  },

  userVerify: async (bodyData) => {
    try {
      const payload = {
        ...UserAuth.accountVerify,
        bodyData
      }
      const res = await APIrequest(payload)
      return res
    } catch (error) {
      logger(error)
      throw error
    }
  },

  userSignUp: async (bodyData) => {
    try {
      const payload = {
        ...UserAuth.accountSignUp,
        bodyData
      }
      const res = await APIrequest(payload)
      return res
    } catch (error) {
      logger(error)
      throw error
    }
  },

  updateUserProfile: async (bodyData, id) => {
    try {
      const payload = {
        ...UserAuth.updateProfile(id),
        bodyData
      }
      const res = await APIrequest(payload)
      return res
    } catch (error) {
      logger(error)
      throw error
    }
  },

  userLogout: async () => {
    try {
      const payload = {
        ...UserAuth.accountLogout
      }
      const res = await APIrequest(payload)
      return res
    } catch (error) {
      logger(error)
      throw error
    }
  },
  updateUserPhoneNumber: async (bodyData) => {
    try {
      const payload = {
        ...UserAuth.updatePhoneNumber,
        bodyData
      }
      const res = await APIrequest(payload)
      return res
    } catch (error) {
      logger(error)
      throw error
    }
  },
  otpVerify: async (bodyData) => {
    try {
      const payload = {
        ...UserAuth.verifyOtp,
        bodyData
      }
      const res = await APIrequest(payload)
      return res
    } catch (error) {
      logger(error)
      throw error
    }
  }
}
