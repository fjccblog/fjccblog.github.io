import React from 'react';
import { useState, useEffect } from 'react';
import { AlbumBasicInfoData } from './AlbumBasicInfo/AlbumBasicInfoData';
import AlbumPlayer from './AlbumPlayer/AlbumPlayer';
import './Album.css';

function Album() {
  let allAlbumInfoContainer = document.querySelector('.allAlbumInfoContainer');
  let albumPlayerContainer = document.querySelector('.albumPlayerContainer');

  function filterAlbumByYear(year) {
    setCurrYearAlbums(AlbumBasicInfoData.filter((infoData)=>infoData.year === year))
    setIsAlbumPlayerActive(false);
  }

  function updateAldumData (albumData) {
    setCurrAlbumData(albumData);
    setIsAlbumPlayerActive(true);
  }

  function isAlbumRecent (currTime, albumTime) {
    return (((currTime.getTime() - new Date(albumTime).getTime()) / 1000) < (60 * 60 * 24 * 31)) ? true : false
  }

  //-------------------------
  let years = [];
  let yearSet = new Set();
  let [currYearAlbums, setCurrYearAlbums] = useState([]);

  let [currAlbumData, setCurrAlbumData] = useState([]);

  let [isAlbumPlayerActive, setIsAlbumPlayerActive] = useState(false);

  AlbumBasicInfoData.forEach((infoData) => {
    if (!(yearSet.has(infoData.year))) {
      yearSet.add(infoData.year)
    }
  })
  years = [...yearSet].sort((a,b)=>b-a);

  useEffect(()=>{
    filterAlbumByYear(years[0]);
  }, [])

  useEffect(()=> {
    if (isAlbumPlayerActive) {
      if (allAlbumInfoContainer) allAlbumInfoContainer.style.display = "none";
      if (albumPlayerContainer) albumPlayerContainer.style.display = "block";
    } else {
      if (allAlbumInfoContainer) allAlbumInfoContainer.style.display = "flex";
      if (albumPlayerContainer) albumPlayerContainer.style.display = "none";
    }
  }, [isAlbumPlayerActive])

  //------------------
  let currTime = new Date();

  return (
    <div className='albumPageContainer'>
      <div className='albumFilterYearContainer'>
      {years.map((year)=> {
        return (
          <span onClick={()=>filterAlbumByYear(year)} className='albumFilterYear'>{year} </span>
        )
      })}
      </div>
      <div className='allAlbumInfoContainer'>
        {currYearAlbums.map((albumInfo)=>{
          return (
            <div className='singleAlbumInfoContainer' onClick={() => updateAldumData(albumInfo.albumData)}>
              <img src={albumInfo.coverImgUrl} className='albumInfoImg'/>
              <div className='albumInfoDescription'>
                <strong className='albumInfoDescriptionName'>{albumInfo.albumName}</strong>
                <div className='albumInfoDescriptionUpdateAt'>
                  <div>
                    <div>
                      <span className='albumInfoUpdated'>Updated:</span> <span>{albumInfo.updatedAt} </span>
                      {isAlbumRecent(currTime, albumInfo.updatedAt) && <span className='albumNew'>New</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )})}
      </div>
      {currAlbumData.length !== 0 && isAlbumPlayerActive && <AlbumPlayer data={currAlbumData} />}
    </div>
  )
}

export default Album
