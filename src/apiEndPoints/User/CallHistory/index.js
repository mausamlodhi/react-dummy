const CallHistory = {
    getCallHistory : (channelId)=>({
        url : `/channel/${channelId}/call-history`,
        method : "GET"
    }),
    updateCallHistory : (channelId)=>({
        url : `/channel/${channelId}/call-history`,
        method : "PATCH"
    }),
    deleteCallHistory : (id)=>({
        url : `/channel/call-history/${id}`,
        method : "DELETE"
    })
}
export default CallHistory;