import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Ministry.css';

function Ministry() {
  const history = useHistory();

  const childMinistryImg = 'https://lh3.googleusercontent.com/pw/AP1GczOEWY-bnN9pzMZGUmNV1AK83BdHHWeeNMIBopOXoZVWuJcK0jtxLRQpPxltjJKJjPQ4RgA9A-bgltQUcDHF1FHn_hINJLYe1PHovJxNiA-9tRkOJ-k=w1920-h1080';
  const juniorHighMinistryImg = 'https://lh3.googleusercontent.com/pw/ABLVV84llKTkTRweF5u4KRWjP0pYPLulTUmYqskokDXf2Y5kAfLuRWDZB533U5vgfdWJ5bTCJnlcwUZWwIJUJ6RhlDggtN06qzN4TexAxpkXuNwg_k9oa8Y=w1920-h1080'
  const campusMinistryImg = 'https://lh3.googleusercontent.com/pw/ABLVV84llKTkTRweF5u4KRWjP0pYPLulTUmYqskokDXf2Y5kAfLuRWDZB533U5vgfdWJ5bTCJnlcwUZWwIJUJ6RhlDggtN06qzN4TexAxpkXuNwg_k9oa8Y=w1920-h1080'
  const sportMinistryImg = 'https://lh3.googleusercontent.com/pw/ABLVV84llKTkTRweF5u4KRWjP0pYPLulTUmYqskokDXf2Y5kAfLuRWDZB533U5vgfdWJ5bTCJnlcwUZWwIJUJ6RhlDggtN06qzN4TexAxpkXuNwg_k9oa8Y=w1920-h1080'
  const seniorMinistryImg = 'https://lh3.googleusercontent.com/pw/ABLVV84llKTkTRweF5u4KRWjP0pYPLulTUmYqskokDXf2Y5kAfLuRWDZB533U5vgfdWJ5bTCJnlcwUZWwIJUJ6RhlDggtN06qzN4TexAxpkXuNwg_k9oa8Y=w1920-h1080'

  function redirectJuniorMinistry () { history.push("/ministry/juniorHigh") }
  function redirectSportMinistry () { history.push("/ministry/sport") }

  return (
    <div className='container-common'>
      <div></div>
      <h1 className='txt-center fontFMSong'>外展事工</h1>

      <div className='ministryIntroDiv fontFMSong'>

        <Link to='ministry/children'>
        <div className='childMinistryDiv introDiv'>
          <div className='ministryIntroImgDiv'><img src={ childMinistryImg } alt='child ministry Img'/></div>
          <div className='pad15p'>
            <h3 className='txt-center'>儿童事工</h3>
            <div>这是一个句子的总结，之后需要被替换</div>
          </div>
        </div>
        </Link>

        <div onClick={()=>redirectJuniorMinistry()} className='juniorHighMinistryDiv introDiv'>
          <div className='ministryIntroImgDiv'><img src={ juniorHighMinistryImg } alt='junior high ministry Img'/></div>
          <div className="pad15p">
            <h3 className='txt-center'>初高中生事工</h3>
            <div>这是一个句子的总结，之后需要被替换</div>
          </div>
        </div>

        <Link to='/ministry/campus'>
        <div className='campusMinistryDiv introDiv'>
          <div className='ministryIntroImgDiv'><img src={ campusMinistryImg } alt='campus ministry Img'/></div>
          <div className="pad15p">
            <h3 className='txt-center'>校园事工</h3>
            <div>这是一个句子的总结，之后需要被替换</div>
          </div>
        </div>
        </Link>

        <div onClick={()=>redirectSportMinistry()} className='sportMinistryDiv introDiv'>
          <div className='ministryIntroImgDiv'><img src={ sportMinistryImg } alt='sport ministry Img'/></div>
          <div className="pad15p">
            <h3 className='txt-center'>体育事工</h3>
            <div>这是一个句子的总结，之后需要被替换</div>
          </div>
        </div>

        <Link to='/ministry/senior'>
        <div className='seniorMinistryDiv introDiv'>
          <div className='ministryIntroImgDiv'><img src={ seniorMinistryImg } alt='senior ministry Img'/></div>
          <div className="pad15p">
            <h3 className='txt-center'>长者事工</h3>
            <div>这是一个句子的总结，之后需要被替换</div>
          </div>
        </div>
        </Link>

      </div>

    </div>
  )
}

export default Ministry
