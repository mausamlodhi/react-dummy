import React from 'react'
import { Link } from 'react-router-dom'

import { ImageElement, ModalComponent } from '../..'
import { Input as TextInput } from '../../Antd'

function ForwardFileModal(props) {
  const { isOpen, onClose } = props
  return (
    <ModalComponent
      backdrop
      show={isOpen}
      onHandleCancel={onClose}
      size='md'
      title='Forward'
      extraClassName='newChatModal newChatModal-sendfile'
      titleClassName='m-0'
    >
      <div className='newUser_filter d-flex align-items-center '>
        <div className='searchBox me-0'>
          <div className='form-group mb-0'>
            <div className='form-control-wrap'>
              <TextInput
                className='form-control'
                placeholder='Search Channel and People'
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
      <div className='userBox userBox-pin d-flex align-items-center justify-content-between w-100'>
        <div className='d-flex align-items-center'>
          <div className='userAvatar grey'>
            <span>MR</span>
          </div>
          <div className='userBox_content'>
            <h5 className='font-sb'>General</h5>
            <span>Michigan Rescue </span>
          </div>
        </div>
        <Link className='btn btn-md btn-info'>Send</Link>
      </div>
      <div className='userBox userBox-pin d-flex align-items-center justify-content-between w-100'>
        <div className='d-flex align-items-center'>
          <div className='userAvatar grey'>
            <span>MR</span>
          </div>
          <div className='userBox_content'>
            <h5 className='font-sb'>Search and rescue</h5>
            <span>Michigan Rescue </span>
          </div>
        </div>
        <Link className='btn btn-md btn-info'>Send</Link>
      </div>
      <div className='userBox userBox-pin d-flex align-items-center justify-content-between w-100'>
        <div className='d-flex align-items-center'>
          <div className='userAvatar grey'>
            <span>MR</span>
          </div>
          <div className='userBox_content'>
            <h5 className='font-sb'>Recovery</h5>
            <span>Michigan Rescue </span>
          </div>
        </div>
        <Link className='btn btn-md btn-info'>Send</Link>
      </div>
      <h6 className='newUser_heading font-sb mt-2 mt-md-3'>People</h6>
      <div className='newUser'>
        <div className='newUser_list d-flex align-items-center justify-content-between'>
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
          <Link className='btn btn-md btn-info'>Send</Link>
        </div>
        <div className='newUser_list d-flex align-items-center justify-content-between'>
          <div className='user d-flex align-items-center'>
            <div className='userImage position-relative'>
              <div className='userAvatar flex-shrink-0'>
                <ImageElement source='profile/profile08.jpg' alt='user' />
              </div>
              <span className='statusdot statusdot-away' />
            </div>
            <div className='user_info ms-2 ms-md-3 overflow-hidden'>
              <h5 className='font-sb text-truncate mb-0'>Brian Beaulieu</h5>
            </div>
          </div>
          <Link className='btn btn-md btn-info'>Send</Link>
        </div>
        <div className='newUser_list d-flex align-items-center justify-content-between'>
          <div className='user d-flex align-items-center'>
            <div className='userImage position-relative'>
              <div className='userAvatar flex-shrink-0'>
                <ImageElement source='profile/profile01.jpg' alt='user' />
              </div>
              <span className='statusdot statusdot-available' />
            </div>
            <div className='user_info ms-2 ms-md-3 overflow-hidden'>
              <h5 className='font-sb text-truncate mb-0'>Linda Thompson</h5>
            </div>
          </div>
          <Link className='btn btn-md btn-info'>Send</Link>
        </div>
      </div>
    </ModalComponent>
  )
}

export default ForwardFileModal
