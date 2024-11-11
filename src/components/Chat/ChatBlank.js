import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ImageElement, ModalComponent, Input as TextInput } from '..'
import userRoutesMap from '../../routeControl/userRouteMap'

function ChatBlank() {
  const [notesModal, setNotesModal] = useState(false)
  const [newChatModalType, setnewChatModalType] = useState('')
  const hideNewChatModal = () => {
    setNotesModal(false)
    setTimeout(() => {
      setnewChatModalType('')
    }, 500)
  }
  const shownewChatModal = (type) => {
    setNotesModal(true)
    setnewChatModalType(type)
  }
  return (
    <>
      <div className='chatPage'>
        <aside className='chatAside'>
          <div className='chatAsideHead d-flex align-items-center'>
            <h3 className='chatAsideHead_heading mb-0'>Chat</h3>
          </div>
          <div className='chatAside_list'>
            <span className='noData font-bd h-100 d-flex align-items-center justify-content-center'>
              No Chat!
            </span>
          </div>
          <div className='plusIcon plusIcon-md'>
            <Link to='#' onClick={() => shownewChatModal('add')}>
              <em className='icon-plus' />
            </Link>
          </div>
        </aside>
        <div className='chatRight position-relative'>
          <div className='chatBox d-flex align-items-center'>
            <div className='newLoops text-center'>
              <h2 className='font-bd'>Welcome to Loopity!</h2>
              <p className='mb-0'> Here are some things to get going...</p>
              <ImageElement
                className='img-fluid image'
                source='create-more-loops.svg'
                alt='image'
              />
              <div className='text-center'>
                <Link
                  className='btn btn-primary btn-md flex-shrink-0 btn-mw-180'
                  onClick={document.body.click()}
                  to={userRoutesMap.CONTACT_LIST.path}
                >
                  Start Chatting
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* New Chat */}
      <ModalComponent
        backdrop
        show={notesModal}
        onHandleCancel={hideNewChatModal}
        size='md'
        title='New Chat'
        extraClassName='newChatModal'
        titleClassName='m-0'
      >
        {newChatModalType === 'add' || newChatModalType === 'edit' ? (
          <>
            {/* <Link to="#" className="link-primary flex-shrink-0 font-sb text-decoration-underline">Add Contact</Link> */}
            <div className='newUser_filter d-flex align-items-center '>
              <div className='searchBox'>
                <div className='form-group mb-0'>
                  <div className='form-control-wrap'>
                    <TextInput
                      className='form-control'
                      placeholder='Search'
                      type='text'
                      icon={
                        <div className='form-icon'>
                          <em className='icon-search' />
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <h6 className='newUser_heading font-sb'>Suggested</h6>
            <div className='newUser'>
              <div className='newUser_list'>
                <div className='user d-flex align-items-center'>
                  <div className='userImage position-relative'>
                    <div className='userAvatar flex-shrink-0'>
                      <ImageElement source='profile/profile01.jpg' alt='user' />
                    </div>
                    <span className='statusdot statusdot-available' />
                  </div>
                  <div className='user_info ms-2 ms-md-3 overflow-hidden'>
                    <h5 className='font-sb text-truncate mb-0'>
                      Linda Thompson
                    </h5>
                  </div>
                </div>
              </div>
              <div className='newUser_list'>
                <div className='user d-flex align-items-center'>
                  <div className='userImage position-relative'>
                    <div className='userAvatar flex-shrink-0'>
                      <ImageElement source='profile/profile03.jpg' alt='user' />
                    </div>
                    <span className='statusdot statusdot-away' />
                  </div>
                  <div className='user_info ms-2 ms-md-3 overflow-hidden'>
                    <h5 className='font-sb text-truncate mb-0'>
                      Brian Beaulieu
                    </h5>
                  </div>
                </div>
              </div>
              <div className='newUser_list'>
                <div className='user d-flex align-items-center'>
                  <div className='userImage position-relative'>
                    <div className='userAvatar flex-shrink-0'>
                      <ImageElement source='profile/profile09.jpg' alt='user' />
                    </div>
                    <span className='statusdot' />
                  </div>
                  <div className='user_info ms-2 ms-md-3 overflow-hidden'>
                    <h5 className='font-sb text-truncate mb-0'>
                      Florence Nickel
                    </h5>
                  </div>
                </div>
              </div>
              <div className='newUser_list'>
                <div className='user d-flex align-items-center'>
                  <div className='userImage position-relative'>
                    <div className='userAvatar flex-shrink-0'>
                      <ImageElement source='profile/profile06.jpg' alt='user' />
                    </div>
                    <span className='statusdot statusdot-available' />
                  </div>
                  <div className='user_info ms-2 ms-md-3 overflow-hidden'>
                    <h5 className='font-sb text-truncate mb-0'>Annei Posted</h5>
                  </div>
                </div>
              </div>
              <div className='newUser_list'>
                <div className='user d-flex align-items-center'>
                  <div className='userImage position-relative'>
                    <div className='userAvatar flex-shrink-0'>
                      <ImageElement source='profile/profile08.jpg' alt='user' />
                    </div>
                    <span className='statusdot statusdot-away' />
                  </div>
                  <div className='user_info ms-2 ms-md-3 overflow-hidden'>
                    <h5 className='font-sb text-truncate mb-0'>
                      Brian Beaulieu
                    </h5>
                  </div>
                </div>
              </div>
              <div className='newUser_list'>
                <div className='user d-flex align-items-center'>
                  <div className='userImage position-relative'>
                    <div className='userAvatar flex-shrink-0'>
                      <ImageElement source='profile/profile01.jpg' alt='user' />
                    </div>
                    <span className='statusdot statusdot-available' />
                  </div>
                  <div className='user_info ms-2 ms-md-3 overflow-hidden'>
                    <h5 className='font-sb text-truncate mb-0'>
                      Linda Thompson
                    </h5>
                  </div>
                </div>
              </div>
              <div className='newUser_list'>
                <div className='user d-flex align-items-center'>
                  <div className='userImage position-relative'>
                    <div className='userAvatar flex-shrink-0'>
                      <ImageElement source='profile/profile03.jpg' alt='user' />
                    </div>
                    <span className='statusdot statusdot-away' />
                  </div>
                  <div className='user_info ms-2 ms-md-3 overflow-hidden'>
                    <h5 className='font-sb text-truncate mb-0'>
                      Florence Nickel
                    </h5>
                  </div>
                </div>
              </div>
              <div className='newUser_list'>
                <div className='user d-flex align-items-center'>
                  <div className='userImage position-relative'>
                    <div className='userAvatar flex-shrink-0'>
                      <ImageElement source='profile/profile09.jpg' alt='user' />
                    </div>
                    <span className='statusdot' />
                  </div>
                  <div className='user_info ms-2 ms-md-3 overflow-hidden'>
                    <h5 className='font-sb text-truncate mb-0'>
                      Brian Beaulieu
                    </h5>
                  </div>
                </div>
              </div>
              <div className='newUser_list'>
                <div className='user d-flex align-items-center'>
                  <div className='userImage position-relative'>
                    <div className='userAvatar flex-shrink-0'>
                      <ImageElement source='profile/profile03.jpg' alt='user' />
                    </div>
                    <span className='statusdot statusdot-away' />
                  </div>
                  <div className='user_info ms-2 ms-md-3 overflow-hidden'>
                    <h5 className='font-sb text-truncate mb-0'>
                      Florence Nickel
                    </h5>
                  </div>
                </div>
              </div>
              <div className='newUser_list'>
                <div className='user d-flex align-items-center'>
                  <div className='userImage position-relative'>
                    <div className='userAvatar flex-shrink-0'>
                      <ImageElement source='profile/profile09.jpg' alt='user' />
                    </div>
                    <span className='statusdot' />
                  </div>
                  <div className='user_info ms-2 ms-md-3 overflow-hidden'>
                    <h5 className='font-sb text-truncate mb-0'>
                      Brian Beaulieu
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='notesModal_details'>
            <div className='user d-flex align-items-center'>
              <div className='userAvatar'>
                <ImageElement source='profile/profile04.jpg' alt='user' />
              </div>
              <div className='user_info d-flex align-items-center flex-wrap'>
                <h3 className='m-0 font-sb'>Melissa Sanders</h3>{' '}
                <p className='m-0'>Yesterday, 10:19</p>
              </div>
            </div>
            <h2 className='font-bd'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </h2>
            <p className='mb-0 font-sb'>
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        )}
      </ModalComponent>
    </>
  )
}

export default ChatBlank
