//logo import
import Logo from '../components/Logo'
//styled-component import
import Wrapper from '../assets/wrappers/LandingPage'
//react imports
import { Link } from 'react-router-dom'
//bootstap imports
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
//icon imports
import { IoPerson } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
//data imports from utils 
import landingData from '../utils/LandingPageData';
//component imports
import Footer from '../components/Footer';
//image imports
import { BgVector, LandingImg } from '../assets/images/landing-images';

const Landing = () => {
    return (
        <Wrapper>
            <Navbar>
                <Container>
                    <Navbar.Brand href="#home">
                        <Logo className="d-inline-block align-top logo" />
                    </Navbar.Brand>
                    <Link to='/login' >
                        <Button variant="primary" ms-auto>
                            <span className='icon'><IoPerson /></span>Login
                        </Button>
                    </Link>
                </Container>
            </Navbar>

            <section className='landing-page'>
                <Container className='banner'>

                    <h1>A platform that provides <span>a comprehensive accounting system</span> for businesses that are growing</h1>
                    <img className='landing-img' src={LandingImg} alt="" />
                </Container>

            </section>

            <section>

                <div className='subcontent right-subcontent'>

                    <div className='right-subcontent-bg'></div>
                    <div className='right-sub-content'>
                        <h2>{landingData[0].title}</h2>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[0].content1}</p>
                        </div>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[0].content2}</p>
                        </div>
                    </div>

                    <img className="right-subcontent-img2" src={BgVector} alt="" />
                    <img className="right-subcontent-img" src={landingData[0].img} alt="" />
                </div>

                <div className='subcontent'>

                    <div className='left-subcontent-bg'></div>
                    <div className='left-sub-content'>
                        <h2>{landingData[1].title}</h2>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[1].content1}</p>
                        </div>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[1].content2}</p>
                        </div>


                    </div>
                    {/* </div> */}
                    <img className="left-subcontent-img2" src={BgVector} alt="" />
                    <img className="left-subcontent-img" src={landingData[1].img} alt="" />

                </div>

                <div className='subcontent right-subcontent'>

                    <div className='right-subcontent-bg'></div>
                    <div className='right-sub-content'>
                        <h2>{landingData[2].title}</h2>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[2].content1}</p>
                        </div>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[2].content2}</p>
                        </div>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[2].content3}</p>
                        </div>
                    </div>
                    {/* </div> */}

                    <img className="right-subcontent-img2" src={BgVector} alt="" />
                    <img className="right-subcontent-img" src={landingData[2].img} alt="" />
                </div>

                <div className='subcontent'>

                    <div className='left-subcontent-bg'></div>
                    <div className='left-sub-content'>
                        <h2>{landingData[3].title}</h2>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[3].content1}</p>
                        </div>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[3].content2}</p>
                        </div>


                    </div>
                    {/* </div> */}
                    <img className="left-subcontent-img2" src={BgVector} alt="" />
                    <img className="left-subcontent-img" src={landingData[3].img} alt="" />

                </div>

                <div className='subcontent right-subcontent'>

                    <div className='right-subcontent-bg'></div>
                    <div className='right-sub-content'>
                        <h2>{landingData[4].title}</h2>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[4].content1}</p>
                        </div>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[4].content2}</p>
                        </div>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[4].content3}</p>
                        </div>
                    </div>
                    {/* </div> */}

                    <img className="right-subcontent-img2" src={BgVector} alt="" />
                    <img className="right-subcontent-img" src={landingData[4].img} alt="" />
                </div>


                <div className='subcontent'>

                    <div className='left-subcontent-bg'></div>
                    <div className='left-sub-content'>
                        <h2>{landingData[5].title}</h2>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[5].content1}</p>
                        </div>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[5].content2}</p>
                        </div>
                    </div>
                    {/* </div> */}
                    <img className="left-subcontent-img2" src={BgVector} alt="" />
                    <img className="left-subcontent-img" src={landingData[5].img} alt="" />

                </div>

                <div className='subcontent right-subcontent'>

                    <div className='right-subcontent-bg'></div>
                    <div className='right-sub-content'>
                        <h2>{landingData[6].title}</h2>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[6].content1}</p>
                        </div>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[6].content2}</p>
                        </div>
                    </div>
                    {/* </div> */}

                    <img className="right-subcontent-img2" src={BgVector} alt="" />
                    <img className="right-subcontent-img" src={landingData[6].img} alt="" />
                </div>

                <div className='subcontent'>

                    <div className='left-subcontent-bg'></div>
                    <div className='left-sub-content'>
                        <h2>{landingData[7].title}</h2>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[7].content1}</p>
                        </div>

                        <div className='bullet'>
                            <MdOutlineKeyboardArrowRight />
                            <p>{landingData[7].content2}</p>
                        </div>
                    </div>
                    {/* </div> */}
                    <img className="left-subcontent-img2" src={BgVector} alt="" />
                    <img className="left-subcontent-img" src={landingData[7].img} alt="" />

                </div>



            </section>

            <section>
                <Footer />
            </section>
        </Wrapper>
    )
}
export default Landing