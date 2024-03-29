const svgtofont = require('svgtofont');
// const Svgs2fonts = require('svgs2fonts');
var potrace = require('potrace'),
    fs = require('fs');
const path = require('path');

var cheerio = require('cheerio');

class CreaterFont{
  // 图片转svg
  fileDisplay(filePath,callBack){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
      if (err) return console.error('Error:(spec)', err)
      let files_len = files.length
      let count = 0
      files.forEach((filename) => {
        //获取当前文件的绝对路径
        const filedir = path.join(filePath, filename);
        // fs.stat(path)执行后，会将stats类的实例返回给其回调函数。
        
        fs.stat(filedir, (eror, stats) => {
          if (eror) return console.error('Error:(spec)', err);
          const isFile = stats.isFile();
          if(isFile){
            let prefixName = filename.split('.')[0]
            potrace.trace(filedir, function(err, svg) {
              if (err) throw err;
              fs.writeFileSync(path.join('./assets/svgs/'+prefixName+'.svg'), svg);
              count++
              if(count>=files_len){
                callBack&&callBack()
              }
            });
          }
  
        })
      });
      // setTimeout(()=>{
      //   this.svgFont2()
      // },2000)
    });
  }
  // 清空多个
  moreEmptyDir=(arr,callBack)=>{
    let count = 0
    if(arr.length>0){
        arr.forEach(item=>{
            this.emptyDir(item,()=>{
                count++
                if(count>=arr.length){
                    callBack&&callBack('succ')
                }
            })
        })
    }else{
      callBack&&callBack('empty')
    }
  }
  // 清空单个
  emptyDir=(path,callBack)=> {
    const files = fs.readdirSync(path);
  
    let nums = 0
    if(files.length==0){
      callBack&&callBack()
      return
    }
    files.forEach(file => {
        const filePath = `${path}/${file}`;
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            this.emptyDir(filePath);
        } else {
            fs.unlinkSync(filePath);
            nums++
            if(nums >=files.length){
                callBack&&callBack()
            }
            // console.log(`删除${file}文件成功`);
        }
    });
  }
// svg转font 方法1
  svgFont(){
    return new Promise((res,rej)=>{
      svgtofont({
        src:path.join('./assets/svgs'), // svg path
        dist: path.join('./assets/fonts'), // output path
        fontName: 'iconfont', // font name
        svgicons2svgfont: {
          // fontWidth: 500,
          // fontHeight: 500,
          // centerHorizontally:true,
        },
        website: {
          title: "svgtofont",
          // Must be a .svg format image.
          logo: path.resolve(process.cwd(), "svg", "git.svg"),
          meta: {
            description: "Converts SVG fonts to TTF/EOT/WOFF/WOFF2/SVG format.",
            keywords: "svgtofont,TTF,EOT,WOFF,WOFF2,SVG"
          },
          description: ``,
        }
      })
        .then((a) => res({data:'ok'}))
        .catch(err => console.log(`task failed(${err})`));
    })
  }
  //svg转font 方法2
  // svgFont2(){
  //   Svgs2fonts.init({
  //     src:path.join('./assets/svgs'), // svg path
  //     dist: path.join('./assets/fonts'), // output path
  //     fontName: 'iconfont', // font name
  //     noDemo:true,
  //     // debug:true
  //   }).then(() => {
  //     // createJson();
  //     console.log('task success!')
  //   }).catch(err => console.log(`task failed(${err})`));
  // }
  // 批量修改svg文件，添加宽500 高500 
  SvgInit(filePath){
    const spliceSvg = (soure)=>{
      
      let start = 4
      let newStr = " width='500' height='500'"
      let j = new RegExp(newStr,"g")
      let a1 = soure
      if(j.test(soure)){
        a1 = soure.replace(j,"")
      }else{
        a1 = a1.slice(0, start) + newStr + a1.slice(start);
      }
      return a1
    }
    fs.readdir(filePath, function (err, files) {
      if (err) return console.error('Error:(spec)', err)
      files.forEach(filename => {
        //获取当前文件的绝对路径
        const filedir = path.join(filePath, filename);
        let prefixName = filename.split('.')[0]
        fs.readFile(filedir, "utf8", (err, dataStr) => {
          if (err) return console.error('Error:(spec)', err)
          fs.writeFileSync(path.join('./assets/svgs/'+prefixName+'.svg'), spliceSvg(dataStr));
        })
      });
  
    });
  }
  createJson(){
    var $ = null
    let filePath = path.resolve('./assets/fonts/demo_unicode.html')
     //获取当前文件的绝对路径
     fs.readFile(filePath, "utf8", (err, dataStr) => {
       if (err) return console.error('Error:(spec)', err)
           $ = cheerio.load(dataStr);
           let iconData = {};
           [...$('.m-demos_ctn li')].forEach(e=>{
               // let unicode = $(e).find('.unicode').text()
               let unicode = $(e).find('.m-icon_ctn').attr('title')
               iconData[unicode] = $(e).find('.m-icon_ctn').next().text().match(/&#(\S*);/)[1]-0
           })
           // for (let i = 0; i < $('.unicode-icon').length; i++) {
           //     console.log($('.unicode-icon')[i].children[0].text.data,111)
           // }
           fs.writeFileSync(path.join('./assets/fonts/iconfont.json'),JSON.stringify(iconData));
     })
  }
  playCareteSvg(){
      // 先清空 svgs和fonts 文件夹    图片生成font
    this.moreEmptyDir(['./assets/svgs','./assets/fonts'],(type)=>{
      this.fileDisplay(path.resolve('./assets/imgs'))
    })
  }  
  // 图片创建Svg
  createSvg(ctype='img',callBack){
    this.moreEmptyDir(['./assets/svgs',],(type)=>{
      this.fileDisplay(path.resolve('./assets/imgs'),async()=>{
        if(ctype=='fonts'){
         let {data}  = await this.svgFont()
         if(data=='ok'){
          callBack&&callBack()
         }
        }else{
          callBack&&callBack()
        }
      })
    })
  }

  // 清空 
  empty(callBack){
    this.moreEmptyDir(['./assets/svgs','./assets/fonts','./assets/imgs'],(type)=>{
      callBack
    })
  }
} 


  // SvgInit(path.resolve('./assets/svgNew3'))
  
  // 先清空 svgs和fonts 文件夹    图片生成font
  // moreEmptyDir(['./assets/svgs','./assets/fonts'],(type)=>{
  //   fileDisplay(path.resolve('./assets/imgs'))
  // })

  // 直接svg生成font
  // moreEmptyDir(['./assets/fonts9'],(type)=>{
  //     svgFont2()
  // })

  module.exports = CreaterFont
