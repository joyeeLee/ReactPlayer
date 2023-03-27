import React, { useState } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import {testNode,createFonts} from '../../api/home'
function srcset(image, size, rows = 1, cols = 1,name) {
    let baseUrl = '../../../server/uploadFolder/'
    return {
      src: image,
    };
  }
const analysisImg=(files,callBack)=>{
  return new Promise((res,rej)=>{
    let count = 0
    let data = []
    for (let i = 0; i < files.length; i++) {
      let fr = new FileReader()
      fr.readAsDataURL(files[i]);
      fr.onloadend = function(){
        data.push({img:fr.result,title:22})
        count++
        if(count>=files.length){
          res({success:true,imgData:data})
        }
      } 
    }
  })
}
const ImgsToIcons = ()=>{
    const imgChange =async (files)=>{
        if(files.length>10){
          return
        }
        var formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }

        let {imgData} = await analysisImg(files)
        testNode(formData).then(res=>{
          if(res.success){
            if(imgData.length>0){
              setImgList([...imgList,...imgData])
            }
          }else{
            alert(res.msg)
          }
        })
    }
    
    const palyCreateSvg = ()=>{
      createFonts({type:'img'}).then(()=>{
        
      })
    }
    const palyCreateFonts = ()=>{
      createFonts({type:'fonts'}).then(()=>{
        
      })
    }

    const [imgList,setImgList] = useState([])

    return (
        <div className='imgsWrap'>
        <ImageList
        sx={{ width: '100%', height: '100%' }}
        variant="quilted"
        cols={3}
        gap={8}
        rowHeight={180}
      >
        {imgList.map((item,index) => (
          <ImageListItem key={index}>
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <div>
      <div className='up_btn_box'>
        
      </div> 
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" multiple="multiple" type="file" onChange={(e)=>imgChange(e.target.files)}/>
        <AddIcon className='addIcon'  sx={{ fontSize: 60, color:'red', }}></AddIcon>
      </IconButton>
      {imgList.length>0?<div>
      <Button variant="contained" onClick={palyCreateSvg}>图片装SVG</Button>
      <Button variant="contained" onClick={palyCreateFonts}>图片装fonts</Button>
      </div>:''
     }
      </div>
      </div>
    )
}

// const itemData = [
//     {
//       img: 'POPO20210517-103005.png',
//       title: 'POPO20210517-103005.png',
//     },
//   ];

export default ImgsToIcons