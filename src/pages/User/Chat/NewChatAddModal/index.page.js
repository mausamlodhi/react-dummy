import { useSelector } from "react-redux";
import { GlobalLoader, NoDataFound } from "components";
import {
  ImageElement,
  checkValidData,
  getFullName,
  statusFormatter,
} from "utils";
import { selectUserData } from "redux/AuthSlice/index.slice";

export default function NewChatAdd({
  handleSearch,
  newChatListDataLoading,
  newChatListData,
  setUserId,
}) {
  const userData = useSelector(selectUserData);

  return (
    <>
      {/* <Link to="#" className="link-primary flex-shrink-0 font-sb text-decoration-underline">Add Contact</Link> */}
      <div className="newUser_filter d-flex align-items-center ">
        <div className="searchBox">
          <div className="form-group mb-0">
            <div className="form-control-wrap">
              <input
                className="form-control text-dark"
                placeholder="Search"
                type="text"
                icon={
                  <div className="form-icon">
                    <em className="icon-search" />
                  </div>
                }
                onChange={(e) => handleSearch(e?.target?.value)}
              />
            </div>
          </div>
        </div>
      </div>
      {newChatListDataLoading ? (
        <GlobalLoader />
      ) : newChatListData?.length > 0 ? (
        <>
          {/* <h6 className="newUser_heading font-sb">Suggested</h6>
          <div className="newUser">
            <div className="newUser_list">
              <div className="user d-flex align-items-center">
                <div className="userImage position-relative">
                  <div className="userAvatar flex-shrink-0">
                    <ImageElement source="profile/profile01.jpg" alt="user" />
                  </div>
                  <span className="statusdot statusdot-available" />
                </div>
                <div className="user_info ms-2 ms-md-3 overflow-hidden">
                  <h5 className="font-sb text-truncate mb-0">Linda Thompson</h5>
                </div>
              </div>
            </div>
          </div> */}
          <h6 className="newUser_heading font-sb mt-2 mt-md-3">People</h6>

          <div className="newUser">
            {newChatListData?.length > 0 ? (
              newChatListData?.map((item, key) => {
                if (item?.id !== userData?.id)
                  return (
                    <div
                      className="newUser_list "
                      key={key}
                      onClick={() => {
                        setUserId(item?.id);
                      }}
                    >
                      <div className="user cursor-pointer d-flex align-items-center">
                        <div className="userImage position-relative">
                          <div className="userAvatar flex-shrink-0">
                            <ImageElement
                              previewSource={item?.profileImageUrl}
                              alt="user"
                            />
                          </div>
                          <span
                            className={statusFormatter(
                              item?.chatStatus?.status
                            )}
                          />
                        </div>
                        <div className="user_info ms-2 ms-md-3 overflow-hidden">
                          <h5 className="font-sb text-truncate mb-0">
                            {checkValidData(
                              getFullName(item?.firstName, item?.lastName)
                            )}
                          </h5>
                        </div>
                      </div>
                    </div>
                  );
              })
            ) : (
              <NoDataFound />
            )}
          </div>
        </>
      ) : (
        <div className="d-flex justify-content-center">
          {" "}
          <NoDataFound />
        </div>
      )}
    </>
  );
}
