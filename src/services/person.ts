import request from "@/utils/request";

export const getPerson = async ()=>{
  const data = await request('/api/person');
  console.log('数据'+data)
  return data
}
