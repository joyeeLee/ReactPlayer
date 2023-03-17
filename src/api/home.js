import { GET,POST } from "./init";

export function testNode(params){
    return POST('issue-2',params)
}