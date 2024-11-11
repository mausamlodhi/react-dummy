import { Form, Formik } from 'formik'
import { t } from 'i18next'
import { Col, Row } from 'react-bootstrap'
import { CommonButton } from 'components/UiElement'
import { AntTextArea } from 'components/Antd'
import validation from './validation'

function NotesForm({ notesModalType, addChannelNote, loading, noteData }) {
  return (
    <>
      <Formik
        initialValues={{
          description: noteData?.description || '',
          heading: noteData?.heading || ''
        }}
        onSubmit={addChannelNote}
        validationSchema={validation()}
        enableReinitialize
      >
        <Form>
          <Row>
            <Col lg='12'>
              <div className='form-group'>
                <div className='form-label-group'>
                  <label className='form-label' htmlFor='name'>
                    {t('text.notes.heading')}
                  </label>
                </div>
                <div className='form-control-wrap'>
                  <AntTextArea
                    id='heading'
                    className='form-control form-control-lg'
                    name='heading'
                    disabled={false}
                    variant='standard'
                    type='heading'
                    placeholder='Enter Heading'
                    icon=''
                  />
                </div>
              </div>
            </Col>
            <Col lg='12'>
              <div className='form-group'>
                <div className='form-label-group'>
                  <label className='form-label' htmlFor='description'>
                    {t('text.notes.description')}
                  </label>
                </div>
                <div className='form-control-wrap'>
                  <AntTextArea
                    id='description'
                    className='form-control form-control-lg'
                    name='description'
                    disabled={false}
                    variant='standard'
                    type='description'
                    placeholder='Enter Description'
                    length={500}
                  />
                </div>
              </div>
              <div className='d-flex justify-content-end mt-3'>
                <div>
                  <CommonButton
                    extraClassName='btn btn-lg btn-primary'
                    loading={loading}
                    htmltype='button'
                    type='submit'
                  >
                    {notesModalType === 'add'
                      ? t('text.common.submit')
                      : t('text.common.save')}
                  </CommonButton>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </Formik>
    </>
  )
}
export default NotesForm
