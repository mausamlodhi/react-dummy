import { Master } from "../../../apiEndPoints";
import { logger } from "../../../utils";
import APIrequest from "../../axios";

export const AdminMasterServices = {
    getClaimType: async (queryParams) => {
        try {
            const payload = {
                ...Master.getClaim,
                queryParams
            };
            const res = await APIrequest(payload);
            return res;
        } catch (error) {
            logger(error);
            throw error;
        }
    },
    addCalimType : async(bodyData)=> {
        try {
            const payload = {
                ...Master.addClaim,
                bodyData
            };
            const res = await APIrequest(payload);
            return res;
        } catch (error) {
            logger(error);
            throw error;
        }
    },
    editCalimType : async(bodyData,id)=> {
        try {
            const payload = {
                ...Master.editClaim(id),
                bodyData
            };
            const res = await APIrequest(payload);
            return res;
        } catch (error) {
            logger(error);
            throw error;
        }
    },
    deleteCalimType : async(id)=> {
        try {
            const payload = {
                ...Master.deleteClaim(id),
            };
            const res = await APIrequest(payload);
            return res;
        } catch (error) {
            logger(error);
            throw error;
        }
    },
    createCategory : async(bodyData)=>{
        try{
            const payload = {
                ...Master.createCategory,
                bodyData
            }
            const res = await APIrequest(payload);
            return res;
        }catch(error){
            logger(error);
            throw error;
        }
    },  
    getCategoryList : async(queryParams)=>{
        try{
            const payload = {
                ...Master.getCategory,
                queryParams
            }
            const res = await APIrequest(payload);
            return res;
        }catch(error){
            logger(error);
            throw error;
        }
    },
    updateCategory : async(bodyData,categoryId)=>{
        try{
            const payload = {
                ...Master.updateCategory(categoryId),
                bodyData
            }
            const res = await APIrequest(payload);
            return res;
        }catch(error){
            logger(error);
            throw error;
        }
    },
    deleteCategory : async(categoryId)=>{
        try{
            const payload = {
                ...Master.deleteCategory(categoryId),
            }
            const res = await APIrequest(payload);
            return res;
        }catch(error){
            logger(error);
            throw error;
        }
    }
}