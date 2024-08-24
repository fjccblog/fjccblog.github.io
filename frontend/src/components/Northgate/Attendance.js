import React, {useState, useEffect, useRef} from 'react';
import OpenModalButton from '../../context/OpenModalButton';
import AttendanceReasonModal from './AttendanceReasonModal';


import './Attendance.css'


function Attendance( {peopleData} ) {


  // ----------- step 1 -----------
  // store room number (5-digit, 4 digit for room number, 1 to identify person)
  // and hour, minute, second as a string of cookie
  // -> perhaps use alphbet to shorter length
  // set expire date in 3 months
  // ----------- step 2 -----------
  // for display, destructure cookie into object
  // get order/time from cookie
  // ----------- step 3 -----------
  // store in Google Excels (every check-in record? or submit at the end)
  // duplicate "template" sheet into new record for the day
  // check the box that correspongding to room number
  // open modal to ask for reason that can't join

  //------------ need to implement -------------
  // options for reason can't join
  // excel part
  // add new person -> maybe need to reformat structure,
  // -> since the array/object won't be stored once the website is refresh

  // ------------ features in mind -------------
  // sort by room number (default) and sort by time (done)
  // copy and paste names
  // drag and drop for admin override (?)
  // view old cookie

  // =============== variable define ===================
  let NGPeopleArr = Object.entries(peopleData).sort((a,b)=>a[0] - b[0])
  const scriptUrl = process.env.REACT_APP_ATTENDANCE_SCRIPT_URL;


  // ================ function definition ==============
  const getTimeNow = () => {
    // return time in this pattern ['8/9/2024', '10:28:19 AM']
    let timeNowInMS= new Date().getTime();
    let readableTime = new Date(timeNowInMS); //Fri Aug 09 2024 10:31:17 GMT-0700 (Pacific Daylight Time)
    let localTime = readableTime.toLocaleString('en-US', {timeZone:"America/Los_Angeles"}) //8/9/2024, 10:28:19 AM
    let localTimeArr = localTime.split(",");
    return localTimeArr
  }

  const getCookieExpireTime = () => {
    let now = new Date();
    let time = now.getTime();
    let expireTime = time + 1000*60*60*24*7*4;
    now.setTime(expireTime);
    return ';expires='+now.toUTCString()+';path=/fjccWebsite'
  }

  const CookieArr = (data) => {
    // should be sorted by room number
    let checkedInArr = [];
    let tempObj = {}

    let dataKeyArr = Object.keys(data).sort((a,b)=>a - b);
    // based on exisitng residents first
    for (let i = 0; i < dataKeyArr.length; i++) {
      let room = dataKeyArr[i];
      let name = data[room]['CHN_Name'];
      // checkedInArr.push([room, name, "order", "timestamp"])
      tempObj[room] = [room, name, Infinity, "timestamp"];
    }
    // add new from cookieVal, and update order and timestamp
    let cookieArr = cookieVal.split("-")
    // console.log("arr", cookieArr)
    for (let i = 0; i < cookieArr.length - 1; i++) {
      let [room, time, AMPM] = cookieArr[i].split(' ');
      if (room.startsWith("New")) {
        let [currName, currRoom] = room.split("R")
        currName = currName.slice(3);
        room = currRoom;
        tempObj[room] = [room, "name", Infinity, "timestamp"];
        tempObj[room][1] = currName;
      }
      // console.log(tempObj[room])
      if (room >= 99900) tempObj[room][2] = '已到'
      else tempObj[room][2] = i + 1; // update order
      tempObj[room][3] = time + AMPM; // update timestamp
    }
    checkedInArr = Object.values(tempObj);
    // console.log("before sort", checkedInArr)
    checkedInArr = checkedInArr.sort((a,b)=> a[0] - b[0]);
    console.log("after sort", checkedInArr)
    return checkedInArr
  }

  const submitTime = (room, isNewPerson=false, newName) => {
    // let currTime = getTimeNow()
    // store time/order(2 digit) and room number in cookie
    // show time / order next to name
    // check box in excels
    if (cookieVal.indexOf(room) === -1) {
      if (isNewPerson) room = "New" + newName + "R" + room;
      let newCookie = cookieVal + room + getTimeNow()[1] + "-"
      setCookieVal(newCookie)
      document.cookie = `${"NG"+currDateTime[0]}=${newCookie}` + getCookieExpireTime();
    }
    // document.cookie = `${"NG"+getTimeNow()[0]}=${attendanceCookie.split("=")[1] + "02990 8:56:48 PM-02997 8:56:48 PM-"}`

  }

  const handleSubmit = (e) =>{
    // e.preventDefault()
    // fetch(scriptUrl, {method: 'POST', body: new FormData(formRef.current)})
    // .then(res => {
    //   if (res.okay)
    //     console.log("SUCCESSFULLY SUBMITTED")
    // })
    // .catch(err => console.log(err))
  }

  const clearAttendance = () => {
    let currCookieDate = "NG"+currDateTime[0];
    let currAttendanceCookie = document.cookie.split("; ").find(element => element.startsWith("NG"+getTimeNow()[0]));
    if (currAttendanceCookie !== undefined) {
      document.cookie = `${currCookieDate}=`+ getCookieExpireTime();
    }
    setCookieVal("")
  }

  const addNewAttendancePerson = () => {
    if (newPersonName !== "" && Number(newPersonRoom) < 2000 && Number(newPersonOrder) > 0) {
      // add 0 in front for room number if less than 1000
      // let newRoom = Number(newPersonRoom) < 1000 ? '0'+ newPersonRoom : newPersonRoom;
      let newRoom = newPersonRoom.padStart(4, '0');
      // console.log(newRoom, cookieObj[newRoom+"0"])
      // assume max people of each room is two people, set identify number to 0 for first person, else 1
      if (peopleData[newRoom+"0"] === undefined) newRoom = newRoom + '0'
      else newRoom = newRoom+'1';

      // NGPeople[newRoom] = [newPersonName, "EnglishNamse"] -> problem object info won't stay after refresh
      submitTime(newRoom, true, newPersonName);
      setNewPersonName("")
      setNewPersonOrder("")
      setNewPersonRoom("")
      // send to excel as well
    }
  }

  // ============ useState variable ===================

  let [cookieVal, setCookieVal] = useState("");
  let [cookieArr, setCookieArr] = useState([]); //[[room, CHN_name, order, timestamp], ...]
  let [currDateTime, setCurrDateTime] = useState(getTimeNow());

  let [adminTap, setAdminTap] = useState(0);
  let [isAdminMenuActive, setIsAdminMenuActive] = useState(false);

  let [sortedArr, setSortedArr] = useState(NGPeopleArr); //[[room, {CHN_name, ENG_name}]]
  let [isArrSorted, setIsArrSorted] = useState(false);

  let [newPersonName, setNewPersonName] = useState("");
  let [newPersonRoom, setNewPersonRoom] = useState(null);
  let [newPersonOrder, setNewPersonOrder] = useState(null);


  const formRef = useRef(null)

  // ============ useEffect ===================
  // on render
  useEffect(()=> {
    console.log(peopleData)
    // from cookie stored in client side
    // set state variable [cookie value and cookie object]
    let currCookieDate = "NG"+currDateTime[0];
    let currAttendanceCookie = document.cookie.split("; ").find(element => element.startsWith("NG"+getTimeNow()[0]));

    if (currAttendanceCookie === undefined) {
      document.cookie = `${currCookieDate}=`+ getCookieExpireTime();
    } else {
      let currCookieValue = currAttendanceCookie.split("=")[1];
      setCookieVal(currCookieValue);
    }
    // setCookieObj(InitialCookieObj());
    setCookieArr(CookieArr(peopleData));
  }, [])

  useEffect(()=> {

  }, [currDateTime])

  useEffect(()=> {
    // when state varibale (cookie value) change
    // decrypt cookie into object and set new cookie object
    setCookieArr(CookieArr(peopleData))

  }, [cookieVal])

  useEffect(()=> {
    if (adminTap >= 3) setIsAdminMenuActive(true)
    // in case of misclick, only can turn on admin menu with 3 quick taps
    setTimeout(()=>{setAdminTap(0)}, 3000)
  }, [adminTap])

  useEffect(()=> {
    if (isArrSorted) {
      let newArr = [];

      // put checked in people at the beginning of array

      // put the rest of people

      setSortedArr(newArr)
    }
    else setSortedArr(CookieArr(peopleData))
  }, [isArrSorted])


  return (
    <div className='AttendanceContainer'>

      <div className='AttendanceFormContainer'>
        <div onClick={()=> {if (!isAdminMenuActive) setAdminTap(adminTap+1)}} className='txt-center'>
          <h1>北门长者大厦聚会签到</h1>
        </div>


        {isAdminMenuActive && <div className='adminMenu'>
          <button className='AttendanceClearButton' onClick={()=>clearAttendance()}>
            清除签到
          </button>
          <button className='HideAdminMenuButton' onClick={()=>{setIsAdminMenuActive(false);setAdminTap(0)}}>
            隐蔽admin菜单
          </button>
        </div>}

        <div className='AttendanceFormTitleContainer'>
          <div className='AttendanceFormTitle'>
            <div>名字</div>
            <div>签到按钮</div>
            <div onClick={()=>setIsArrSorted(!isArrSorted)} className='AttendanceSortOrderBtn'>
              顺序
              <div className='AttendanceSortOrderBtnArrow'>
                {isArrSorted ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-up"></i>}
              </div>
            </div>
            <div>签到时间</div>
          </div>
        </div>

        {isAdminMenuActive && <div className='addNewAttendancePerson'>
          <input placeholder='名字' value={newPersonName} onChange={(e)=> setNewPersonName(e.target.value)}
            className='addNewPersonInput' />
          <input placeholder='房間號' value={newPersonRoom} onChange={(e)=> setNewPersonRoom(e.target.value)}
            className='addNewPersonInput'/>
          <input placeholder='順序' value={newPersonOrder} onChange={(e)=> setNewPersonOrder(e.target.value)}
            className='addNewPersonInput'/>
          <button onClick={()=>addNewAttendancePerson()} className='addNewPersonBtn'>添加</button>
        </div>}

        {cookieArr.map(([room, CHN_Name, order, timestamp]) => {
          return (
            <div className={isAdminMenuActive ? 'AttendanceSinglePersonAdminMode' : 'AttendanceSinglePerson'}>
              <div className='checkInName'>
                {CHN_Name}
              </div>
              <div>
                <button onClick={()=> submitTime(room)} className='checkInButton'>
                  签到
                </button>
                {isAdminMenuActive && <OpenModalButton
                  modalComponent={<AttendanceReasonModal data = {[room, CHN_Name]}/>}
                  buttonText={<i className ="fas fa-user-slash"></i>}
                  customizeStyle = "adminCantAttendReasonBtn"/>}
              </div>
              <div className='checkInOrder'>
                {order !== Infinity ? order : " "}
              </div>
              <div className='checkInTime'>
                {timestamp !== 'timestamp' ? timestamp : " "}
              </div>
            </div>
          )
        })}

      </div>

    </div>
  )
}

export default Attendance
