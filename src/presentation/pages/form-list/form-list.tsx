import {
  Header,
  Sidebar,
  CardNavigation,
  Card,
  RightIcon
  // CodeSkeleton
} from '@/presentation/components'
import './form-list-styles.scss'

const FormList = () => {
  return (
    <div className='formListWrap'>
      <Sidebar />

      <main className='main'>
        <Header />

        <div className='content'>
          <CardNavigation />

          <div className='dataGrid'>
            <Card>
              <div className='dataGrid__header'>
                <div className='dataGrid__options'>
                  <div className='option active'>All Questionnaires (7)</div>
                  <div className='option'>Published (2)</div>
                  <div className='option'>Removed (1)</div>
                </div>

                <div className='dataGrid__actions'>
                  <a href='#'>Create Quiz</a>
                </div>
              </div>
              <div className='dataGrid__body'>
                <div className='separator'></div>
                <div className='table-responsive'>
                  {/* <CodeSkeleton></CodeSkeleton> */}

                  <table>
                    <thead className='d-none'>
                      <tr>
                        <th>Campaing</th>
                        <th>Status</th>
                        <th>Team</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>
                          <div className='column min-w-200px'>
                            <div className='color-panel'></div>
                            <strong className='text-dark'>
                              Happy Christmas
                            </strong>
                            <span className='p'>Created on 24 Dec 21</span>
                          </div>
                        </td>
                        <td className='table-td-center'>
                          <span className='badge badge-primary'>Published</span>
                        </td>
                        <td className='table-td-center'>
                          <div className='imageGroup min-w-180px'>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-1.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-15.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-8.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-26.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <div className='noneImage'>
                                <span className='char'>N</span>
                              </div>
                            </div>
                            <div className='imageCircle'>
                              <div className='moreImages'>
                                <span className='number'>+2</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='table-td-right'>
                          <div className='column min-w-180px p-l-0'>
                            <strong className='text-dark'>
                              03 Feb 22 - 14 Feb 22
                            </strong>
                            <span className='p'>Date range</span>
                          </div>
                        </td>
                        <td className='table-td-right'>
                          <button className='btn'>
                            <span>
                              <RightIcon fill='#8e887a' />
                            </span>
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className='column min-w-180px'>
                            <div className='color-panel'></div>
                            <strong className='text-dark'>
                              Happy Christmas
                            </strong>
                            <span className='p'>Created on 24 Dec 21</span>
                          </div>
                        </td>
                        <td className='table-td-center'>
                          <span className='badge badge-warning'>Paused</span>
                        </td>
                        <td className='table-td-center'>
                          <div className='imageGroup'>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-1.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-15.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-8.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-26.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <div className='noneImage'>
                                <span className='char'>N</span>
                              </div>
                            </div>
                            <div className='imageCircle'>
                              <div className='moreImages'>
                                <span className='number'>+2</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='table-td-right'>
                          <div className='column min-w-180px p-l-0'>
                            <strong className='text-dark'>
                              03 Feb 22 - 14 Feb 22
                            </strong>
                            <span className='p'>Date range</span>
                          </div>
                        </td>
                        <td className='table-td-right'>
                          <button className='btn'>
                            <span>
                              <RightIcon fill='#8e887a' />
                            </span>
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className='column min-w-180px'>
                            <div className='color-panel'></div>
                            <strong className='text-dark'>
                              Happy Christmas
                            </strong>
                            <span className='p'>Created on 24 Dec 21</span>
                          </div>
                        </td>
                        <td className='table-td-center'>
                          <span className='badge badge-primary'>Published</span>
                        </td>
                        <td className='table-td-center'>
                          <div className='imageGroup'>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-1.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-15.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-8.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-26.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <div className='noneImage'>
                                <span className='char'>N</span>
                              </div>
                            </div>
                            <div className='imageCircle'>
                              <div className='moreImages'>
                                <span className='number'>+2</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='table-td-right'>
                          <div className='column min-w-180px p-l-0'>
                            <strong className='text-dark'>
                              03 Feb 22 - 14 Feb 22
                            </strong>
                            <span className='p'>Date range</span>
                          </div>
                        </td>
                        <td className='table-td-right'>
                          <button className='btn'>
                            <span>
                              <RightIcon fill='#8e887a' />
                            </span>
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className='column min-w-180px'>
                            <div className='color-panel'></div>
                            <strong className='text-dark'>
                              Happy Christmas
                            </strong>
                            <span className='p'>Created on 24 Dec 21</span>
                          </div>
                        </td>
                        <td className='table-td-center'>
                          <span className='badge badge-success'>Reviewing</span>
                        </td>
                        <td className='table-td-center'>
                          <div className='imageGroup'>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-1.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-15.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-8.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-26.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <div className='noneImage'>
                                <span className='char'>N</span>
                              </div>
                            </div>
                            <div className='imageCircle'>
                              <div className='moreImages'>
                                <span className='number'>+2</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='table-td-right'>
                          <div className='column min-w-180px p-l-0'>
                            <strong className='text-dark'>
                              03 Feb 22 - 14 Feb 22
                            </strong>
                            <span className='p'>Date range</span>
                          </div>
                        </td>
                        <td className='table-td-right'>
                          <button className='btn'>
                            <span>
                              <RightIcon fill='#8e887a' />
                            </span>
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className='column min-w-180px'>
                            <div className='color-panel'></div>
                            <strong className='text-dark'>
                              Happy Christmas
                            </strong>
                            <span className='p'>Created on 24 Dec 21</span>
                          </div>
                        </td>
                        <td className='table-td-center'>
                          <span className='badge badge-success'>Reviewing</span>
                        </td>
                        <td className='table-td-center'>
                          <div className='imageGroup'>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-1.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-15.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-8.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-26.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <div className='noneImage'>
                                <span className='char'>N</span>
                              </div>
                            </div>
                            <div className='imageCircle'>
                              <div className='moreImages'>
                                <span className='number'>+2</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='table-td-right'>
                          <div className='column min-w-180px p-l-0'>
                            <strong className='text-dark'>
                              03 Feb 22 - 14 Feb 22
                            </strong>
                            <span className='p'>Date range</span>
                          </div>
                        </td>
                        <td className='table-td-right'>
                          <button className='btn'>
                            <span>
                              <RightIcon fill='#8e887a' />
                            </span>
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className='column min-w-180px'>
                            <div className='color-panel'></div>
                            <strong className='text-dark'>
                              Happy Christmas
                            </strong>
                            <span className='p'>Created on 24 Dec 21</span>
                          </div>
                        </td>
                        <td className='table-td-center'>
                          <span className='badge badge-success'>Reviewing</span>
                        </td>
                        <td className='table-td-center'>
                          <div className='imageGroup'>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-1.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-15.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-8.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-26.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <div className='noneImage'>
                                <span className='char'>N</span>
                              </div>
                            </div>
                            <div className='imageCircle'>
                              <div className='moreImages'>
                                <span className='number'>+2</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='table-td-right'>
                          <div className='column min-w-180px p-l-0'>
                            <strong className='text-dark'>
                              03 Feb 22 - 14 Feb 22
                            </strong>
                            <span className='p'>Date range</span>
                          </div>
                        </td>
                        <td className='table-td-right'>
                          <button className='btn'>
                            <span>
                              <RightIcon fill='#8e887a' />
                            </span>
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <div className='column min-w-180px'>
                            <div className='color-panel'></div>
                            <strong className='text-dark'>
                              Happy Christmas
                            </strong>
                            <span className='p'>Created on 24 Dec 21</span>
                          </div>
                        </td>
                        <td className='table-td-center'>
                          <span className='badge badge-success'>Published</span>
                        </td>
                        <td className='table-td-center'>
                          <div className='imageGroup'>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-1.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-15.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-8.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <img
                                src='https://preview.keenthemes.com/good/assets/media/avatars/150-26.jpg'
                                alt=''
                              />
                            </div>
                            <div className='imageCircle'>
                              <div className='noneImage'>
                                <span className='char'>N</span>
                              </div>
                            </div>
                            <div className='imageCircle'>
                              <div className='moreImages'>
                                <span className='number'>+2</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='table-td-right'>
                          <div className='column min-w-180px p-l-0'>
                            <strong className='text-dark'>
                              03 Feb 22 - 14 Feb 22
                            </strong>
                            <span className='p'>Date range</span>
                          </div>
                        </td>
                        <td className='table-td-right'>
                          <button className='btn'>
                            <span>
                              <RightIcon fill='#8e887a' />
                            </span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default FormList
