//导入express服务器第三方的包
const express = require("express")
const app = express();
//导入路由对象
const router = express.Router()
const multer = require('multer');
const cors = require("cors");
const fs = require('fs')
const ImgFonts = require('../fonts')

app.use(cors())
const path = require('path');
const upload = multer({
  // 文件上传的位置
  fileFilter(req, file, callback) {
    // 解决中文名乱码的问题
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    callback(null, true);
  },
});

//挂载查询用户列表的路由


const apiOptions = {
  origin: true,
  methods: ["POST","OPTIONS"],
  credentials: true,
  maxAge: 3600
};

// 获取图片 保存本地
router.options("/uploadFiles", cors(apiOptions));
router.post("/uploadFiles",cors(apiOptions),upload.array('files', 10) ,(req, res) => {
  const files =  req.files
    for (let i = 0; i < files.length; i++) {
      let r_path = './assets/imgs/'+ files[i].originalname
      fs.writeFileSync(path.join(r_path), files[i].buffer);
    }
  try{
    res.json({
      success:true,
      data:'ok'
    });
  }catch{
    res.json({
      success:false,
      msg:'上传失败'
    });
  }
});

// 图片转svg  图片转fonts
router.get('/createFonts',cors(),(req,res)=>{
  if(req.query){
  new ImgFonts().createSvg(req.query.type,()=>{
    res.json('ok')
  })
  }
})

router.get('/empty',cors(),(req,res)=>{
  try {
    new ImgFonts().moreEmptyDir(()=>{
      res.json({success:true})
    }) 
  } catch (error) {
    res.json({success:false})
  }
})

module.exports = router  
