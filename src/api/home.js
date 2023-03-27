import { GET,POST } from "./init";

export function testNode(params){
    return POST('imgFontsRouter/uploadFiles',params)
}

export function createFonts(params){
    return GET('imgFontsRouter/createFonts',params)
}