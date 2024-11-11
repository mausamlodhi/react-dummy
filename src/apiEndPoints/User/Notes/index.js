const Notes = {
    getChannelNotes: (channelId)=>({
      url:`/channel/${channelId}/note`,
      method: "GET",
    }),
    addChannelNotes: (channelId)=> ({
        url: `/channel/${channelId}/note`,
        method: "POST",
    }),
    deleteChannelNotes: (channelId,noteId)=> ({
      url: `/channel/${channelId}/note/${noteId}`,
      method: "DELETE",
  }),
  updateChannelNotes: (channelId,noteId)=> ({
    url: `/channel/${channelId}/note/${noteId}`,
    method: "PUT",
}),
  };
  export default Notes;
  