import RedisClient from '../config/redis'
const threeMinsInSecs = 3*60

class Redis{
  clientGet(key:string){
    return new Promise((resolve,reject)=>{
      RedisClient.get(key, (err, reply) => {
        if(err) reject(err)
        else{
          resolve(reply)
        }
      })
    });
  }

  clientSet(key:string, value:string, timeInMins ?:number)
  {
    let time = threeMinsInSecs
    if(timeInMins) time = timeInMins
    return new Promise((resolve,reject)=>{
     RedisClient.setex(key, time, value, (err, reply) => {
       if(err) reject(err)
       else resolve(reply)
     });
    });
  }
}

const redis = new Redis()

export default redis